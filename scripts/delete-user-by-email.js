// Script to delete a user by email
const { query } = require('../database/db');

async function deleteUserByEmail(email) {
    try {
        console.log(`Attempting to delete user with email: ${email}`);

        // First check if user exists
        const checkSql = 'SELECT id, email, username FROM users WHERE email = $1';
        const checkResult = await query(checkSql, [email]);

        if (checkResult.rows.length === 0) {
            console.log('No user found with that email');
            process.exit(0);
        }

        console.log('Found user:', checkResult.rows[0]);

        // Delete the user
        const deleteSql = 'DELETE FROM users WHERE email = $1 RETURNING id, email, username';
        const deleteResult = await query(deleteSql, [email]);

        console.log('Successfully deleted user:', deleteResult.rows[0]);
        process.exit(0);
    } catch (error) {
        console.error('Error deleting user:', error);
        process.exit(1);
    }
}

// Get email from command line argument
const email = process.argv[2];

if (!email) {
    console.error('Please provide an email address');
    console.log('Usage: node delete-user-by-email.js <email>');
    process.exit(1);
}

deleteUserByEmail(email);