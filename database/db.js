// Database connection and query module
const { Pool } = require('pg');
require('dotenv').config();

// Create PostgreSQL connection pool with optimized settings
const pool = new Pool({
    connectionString: process.env.SUPABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    max: 10, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    connectionTimeoutMillis: 10000, // Return an error after 10 seconds if connection can't be established
    statement_timeout: 30000, // Query timeout 30 seconds
});

// Log only the first successful connection
let firstConnection = true;
pool.on('connect', () => {
    if (firstConnection) {
        console.log('✅ Database connection pool initialized');
        firstConnection = false;
    }
});

pool.on('error', (err) => {
    console.error('❌ Unexpected database pool error:', err);
});

// Query helper function with reduced logging
const query = async (text, params) => {
    const start = Date.now();
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
        console.error('Database query error:', error);
        throw error;
    }
};

// Initialize database tables
const initializeDatabase = async () => {
    const fs = require('fs');
    const path = require('path');

    try {
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        // Execute the entire schema as one statement to handle functions properly
        await pool.query(schema);

        console.log('✅ Database schema initialized successfully');
        return true;
    } catch (error) {
        console.error('❌ Failed to initialize database:', error);
        return false;
    }
};

module.exports = {
    query,
    pool,
    initializeDatabase
};
