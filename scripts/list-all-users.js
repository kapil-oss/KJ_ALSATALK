// Script to list all users in the database
const { query } = require('../database/db');

async function listAllUsers() {
    try {
        console.log('Fetching all users from database...\n');

        const sql = 'SELECT id, email, username, full_name, is_active, email_verified, created_at FROM users ORDER BY created_at DESC';
        const result = await query(sql);

        if (result.rows.length === 0) {
            console.log('No users found in database');
        } else {
            console.log(`Found ${result.rows.length} users:\n`);
            result.rows.forEach((user, index) => {
                console.log(`${index + 1}. ${user.email}`);
                console.log(`   Username: ${user.username}`);
                console.log(`   Full Name: ${user.full_name}`);
                console.log(`   Email Verified: ${user.email_verified}`);
                console.log(`   Active: ${user.is_active}`);
                console.log(`   Created: ${user.created_at}`);
                console.log('');
            });
        }

        process.exit(0);
    } catch (error) {
        console.error('Error listing users:', error);
        process.exit(1);
    }
}

listAllUsers();