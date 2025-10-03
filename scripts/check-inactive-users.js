// Script to check for inactive or unverified users
const { query } = require('../database/db');

async function checkInactiveUsers() {
    try {
        console.log('Checking for inactive/unverified users...\n');

        // Check inactive users
        const inactiveSql = 'SELECT id, email, username, full_name, is_active, email_verified, created_at FROM users WHERE is_active = FALSE ORDER BY created_at DESC';
        const inactiveResult = await query(inactiveSql);

        if (inactiveResult.rows.length > 0) {
            console.log(`Found ${inactiveResult.rows.length} INACTIVE users:\n`);
            inactiveResult.rows.forEach((user, index) => {
                console.log(`${index + 1}. ${user.email}`);
                console.log(`   Username: ${user.username}`);
                console.log(`   Email Verified: ${user.email_verified}`);
                console.log(`   Active: ${user.is_active}`);
                console.log(`   Created: ${user.created_at}`);
                console.log('');
            });
        } else {
            console.log('No inactive users found\n');
        }

        // Check unverified users
        const unverifiedSql = 'SELECT id, email, username, full_name, is_active, email_verified, created_at FROM users WHERE email_verified = FALSE ORDER BY created_at DESC';
        const unverifiedResult = await query(unverifiedSql);

        if (unverifiedResult.rows.length > 0) {
            console.log(`Found ${unverifiedResult.rows.length} UNVERIFIED users:\n`);
            unverifiedResult.rows.forEach((user, index) => {
                console.log(`${index + 1}. ${user.email}`);
                console.log(`   Username: ${user.username}`);
                console.log(`   Active: ${user.is_active}`);
                console.log(`   Email Verified: ${user.email_verified}`);
                console.log(`   Created: ${user.created_at}`);
                console.log('');
            });
        } else {
            console.log('No unverified users found');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkInactiveUsers();
