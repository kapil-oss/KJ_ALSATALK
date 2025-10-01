// Script to create or update admin user with correct password
const bcrypt = require('bcrypt');
const { query } = require('../database/db');

async function createAdmin() {
    try {
        const username = 'admin';
        const password = 'admin123';
        const email = 'admin@alsatalk.com';
        const fullName = 'System Administrator';

        // Generate password hash
        const passwordHash = await bcrypt.hash(password, 10);

        console.log('Generated password hash:', passwordHash);

        // Check if admin exists
        const checkResult = await query('SELECT * FROM users WHERE username = $1', [username]);

        if (checkResult.rows.length > 0) {
            // Update existing admin
            await query(
                'UPDATE users SET password_hash = $1, email = $2, full_name = $3, is_admin = TRUE, is_active = TRUE WHERE username = $4',
                [passwordHash, email, fullName, username]
            );
            console.log('✅ Admin user updated successfully');
        } else {
            // Create new admin
            await query(
                'INSERT INTO users (username, email, password_hash, full_name, is_admin, is_active) VALUES ($1, $2, $3, $4, TRUE, TRUE)',
                [username, email, passwordHash, fullName]
            );
            console.log('✅ Admin user created successfully');
        }

        console.log('\n=================================');
        console.log('Admin Credentials:');
        console.log('Username: admin');
        console.log('Password: admin123');
        console.log('=================================\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin:', error);
        process.exit(1);
    }
}

createAdmin();
