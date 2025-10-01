// Database connection and query module
const { Pool } = require('pg');
require('dotenv').config();

// Create PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.SUPABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Test connection
pool.on('connect', () => {
    console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
    console.error('❌ Unexpected database error:', err);
});

// Query helper function
const query = async (text, params) => {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log('Executed query', { text, duration, rows: res.rowCount });
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
