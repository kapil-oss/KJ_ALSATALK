// Script to check user OTP details
const { query } = require('../database/db');

async function checkUserOTP(email) {
    try {
        console.log(`Checking OTP details for: ${email}\n`);

        const sql = `
            SELECT id, email, username, full_name,
                   verification_token, verification_expires,
                   is_active, email_verified, created_at
            FROM users
            WHERE email = $1
        `;
        const result = await query(sql, [email]);

        if (result.rows.length === 0) {
            console.log('No user found with that email');
            process.exit(0);
        }

        const user = result.rows[0];
        console.log('User found:');
        console.log(`  Email: ${user.email}`);
        console.log(`  Username: ${user.username}`);
        console.log(`  Full Name: ${user.full_name}`);
        console.log(`  Verification Token (OTP): ${user.verification_token}`);
        console.log(`  Token Expires: ${user.verification_expires}`);
        console.log(`  Is Active: ${user.is_active}`);
        console.log(`  Email Verified: ${user.email_verified}`);
        console.log(`  Created: ${user.created_at}`);

        if (user.verification_expires) {
            const now = new Date();
            const expires = new Date(user.verification_expires);
            const isExpired = now > expires;
            console.log(`  Token Status: ${isExpired ? '❌ EXPIRED' : '✅ VALID'}`);
            if (!isExpired) {
                const minutesLeft = Math.floor((expires - now) / 1000 / 60);
                console.log(`  Time remaining: ${minutesLeft} minutes`);
            }
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

// Get email from command line argument
const email = process.argv[2];

if (!email) {
    console.error('Please provide an email address');
    console.log('Usage: node check-user-otp.js <email>');
    process.exit(1);
}

checkUserOTP(email);
