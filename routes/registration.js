// Registration routes for client self-service registration
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { sendVerificationEmail } = require('../services/emailService');

// Register new user (public route)
router.post('/api/register', async (req, res) => {
    try {
        const {
            email,
            username,
            password,
            fullName,
            phoneNumber,
            whatsappNumber,
            address,
            companyName,
            userType
        } = req.body;

        // Validate required fields
        if (!email || !username || !password || !fullName || !phoneNumber || !address || !userType) {
            return res.status(400).json({
                error: 'Please provide all required fields: email, username, password, fullName, phoneNumber, address, userType'
            });
        }

        // Validate password strength
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Validate user type
        if (!['individual', 'firm'].includes(userType)) {
            return res.status(400).json({ error: 'User type must be either "individual" or "firm"' });
        }

        // Check if email already exists
        const existingEmail = await User.findByEmail(email);
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Check if username already exists
        const existingUsername = await User.findByUsername(username);
        if (existingUsername) {
            return res.status(400).json({ error: 'Username already taken' });
        }

        // Create user with is_active = false (will be activated after email verification)
        const user = await User.create({
            email,
            username,
            password,
            fullName,
            phoneNumber,
            whatsappNumber: whatsappNumber || phoneNumber,
            address,
            companyName,
            userType,
            isActive: false  // Will be set to true after email verification
        });

        // Generate OTP and send verification email immediately
        const { generateOTP } = require('../services/emailService');
        const otp = generateOTP();
        const verificationExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        // Store OTP in database
        const { query } = require('../database/db');
        await query(`
            UPDATE users
            SET verification_token = $1, verification_expires = $2
            WHERE id = $3
        `, [otp, verificationExpires, user.id]);

        // Send verification email
        await sendVerificationEmail(email, fullName, otp);

        console.log(`✅ New user registered: ${email} - OTP sent`);

        res.status(201).json({
            success: true,
            message: 'Registration successful! Please check your email for the verification code.',
            user: {
                id: user.id,
                email: user.email,
                fullName: user.full_name
            },
            redirectTo: `/verify-email?email=${encodeURIComponent(email)}`
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            error: error.message || 'Registration failed. Please try again.'
        });
    }
});

// Verify email with OTP
router.post('/api/verify-email', async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ error: 'Email and OTP are required' });
        }

        // Verify the OTP and activate account
        const user = await User.verifyEmailAndActivate(email, otp);

        console.log(`✅ Email verified and account activated for user: ${email}`);

        res.json({
            success: true,
            message: 'Email verified successfully! Your account is now active. You can login.',
            user: {
                id: user.id,
                email: user.email,
                fullName: user.full_name,
                emailVerified: user.email_verified,
                isActive: user.is_active
            }
        });
    } catch (error) {
        console.error('Email verification error:', error);
        res.status(400).json({
            error: error.message || 'Email verification failed'
        });
    }
});

// Resend OTP
router.post('/api/resend-otp', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Generate new OTP and send email
        const { user, otp } = await User.resendOTP(email);
        await sendVerificationEmail(user.email, user.full_name, otp);

        console.log(`✅ OTP resent to: ${email}`);

        res.json({
            success: true,
            message: 'Verification code sent to your email'
        });
    } catch (error) {
        console.error('Resend OTP error:', error);
        res.status(400).json({
            error: error.message || 'Failed to resend OTP'
        });
    }
});

// Check registration status (for users to check if approved)
router.get('/api/registration-status/:email', async (req, res) => {
    try {
        const { email } = req.params;

        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            email: user.email,
            fullName: user.full_name,
            isActive: user.is_active,
            emailVerified: user.email_verified,
            status: !user.is_active ? 'pending' : !user.email_verified ? 'approved_awaiting_verification' : 'active'
        });
    } catch (error) {
        console.error('Status check error:', error);
        res.status(500).json({ error: 'Failed to check status' });
    }
});

module.exports = router;
