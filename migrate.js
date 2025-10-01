const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.SUPABASE_URL
});

async function runMigration() {
  try {
    console.log('🔄 Starting database migration...');

    const migrationSQL = fs.readFileSync(
      path.join(__dirname, 'database', 'migrate_to_new_schema.sql'),
      'utf8'
    );

    await pool.query(migrationSQL);

    console.log('✅ Migration completed successfully!');
    console.log('📋 New columns added:');
    console.log('   - phone_number');
    console.log('   - whatsapp_number');
    console.log('   - address');
    console.log('   - company_name');
    console.log('   - user_type');
    console.log('   - email_verified');
    console.log('   - verification_token');
    console.log('   - verification_expires');
    console.log('   - approved_at');
    console.log('   - approved_by');

    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

runMigration();
