// Database connection and query module
const { Pool } = require('pg');
require('dotenv').config();

// Create PostgreSQL connection pool with optimized settings
const pool = new Pool({
    connectionString: process.env.SUPABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 60000, // Close idle clients after 60 seconds
    connectionTimeoutMillis: 20000, // Return an error after 20 seconds if connection can't be established
    statement_timeout: 30000, // Query timeout 30 seconds
    // Add keepalive settings to prevent connection drops
    keepAlive: true,
    keepAliveInitialDelayMillis: 10000,
});

// Log only the first successful connection
let firstConnection = true;
pool.on('connect', (client) => {
    if (firstConnection) {
        console.log('✅ Database connection pool initialized');
        firstConnection = false;
    }
});

// Handle pool errors with auto-reconnect
let lastErrorTime = 0;
const ERROR_THROTTLE_MS = 5000; // Only log same error once every 5 seconds

pool.on('error', (err, client) => {
    const now = Date.now();

    // Throttle error messages to avoid spam
    if (now - lastErrorTime < ERROR_THROTTLE_MS) {
        return;
    }
    lastErrorTime = now;

    // Handle specific error types
    if (err.code === 'ENOTFOUND') {
        console.error('❌ Database DNS error: Cannot resolve hostname. Check your internet connection.');
    } else if (err.code === 'XX000' || err.message.includes('shutdown') || err.message.includes('termination')) {
        console.log('🔄 Database connection lost, pool will reconnect automatically');
    } else if (err.message.includes('Connection terminated')) {
        console.log('⚠️ Database connection terminated, reconnecting...');
    } else {
        console.error('❌ Database pool error:', err.code || err.message);
    }
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('⏹ Closing database pool...');
    await pool.end();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('⏹ Closing database pool...');
    await pool.end();
    process.exit(0);
});

// Query helper function with reduced logging and retry logic
const query = async (text, params, retries = 3) => {
    const start = Date.now();
    let lastError;

    for (let i = 0; i < retries; i++) {
        try {
            const res = await pool.query(text, params);
            const duration = Date.now() - start;
            // Only log slow queries (> 1000ms)
            if (duration > 1000) {
                console.log(`⚠ Slow query (${duration}ms)`, {
                    query: text.substring(0, 100),
                    rows: res.rowCount
                });
            }
            return res;
        } catch (error) {
            lastError = error;

            // Retry on connection errors
            if (error.code === 'XX000' || error.message.includes('shutdown') || error.message.includes('termination')) {
                console.log(`🔄 Query failed (attempt ${i + 1}/${retries}), retrying...`);
                // Wait before retrying (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
                continue;
            }

            // Don't retry on other errors
            console.error('Database query error:', error.message);
            throw error;
        }
    }

    console.error('Database query failed after retries:', lastError.message);
    throw lastError;
};

// Test database connection
const testConnection = async () => {
    let retries = 3;
    while (retries > 0) {
        try {
            const result = await pool.query('SELECT NOW()');
            console.log('✅ Database connection test successful');
            return true;
        } catch (error) {
            retries--;
            if (error.code === 'ENOTFOUND') {
                console.error(`❌ Cannot connect to database: DNS resolution failed for ${error.hostname}`);
                console.error('   Please check your internet connection or database URL in .env file');
                return false;
            }
            if (retries > 0) {
                console.log(`⚠️ Connection test failed, retrying... (${retries} attempts left)`);
                await new Promise(resolve => setTimeout(resolve, 2000));
            } else {
                console.error('❌ Database connection test failed:', error.message);
                return false;
            }
        }
    }
    return false;
};

// Initialize database tables
const initializeDatabase = async () => {
    const fs = require('fs');
    const path = require('path');

    // First test connection
    const connected = await testConnection();
    if (!connected) {
        console.error('⚠️ Skipping database initialization due to connection failure');
        console.error('   The application will continue but database features may not work');
        return false;
    }

    try {
        const schemaPath = path.join(__dirname, 'complete_schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        // Execute the entire schema as one statement to handle functions properly
        await pool.query(schema);

        console.log('✅ Database schema initialized successfully');
        return true;
    } catch (error) {
        console.error('❌ Failed to initialize database:', error.message);
        return false;
    }
};

module.exports = {
    query,
    pool,
    initializeDatabase
};
