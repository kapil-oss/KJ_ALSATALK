const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.SUPABASE_URL
});

async function runMigration() {
  try {
    console.log('🔄 Adding token limit columns to database...');

    const migrationSQL = fs.readFileSync(
      path.join(__dirname, 'database', 'add_token_limits.sql'),
      'utf8'
    );

    await pool.query(migrationSQL);

    console.log('✅ Token limit migration completed successfully!');
    console.log('📋 Columns added:');
    console.log('   - token_limit (default: 10000)');
    console.log('   - tokens_used (default: 0)');
    console.log('   - token_reset_date (default: now)');

    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

runMigration();
