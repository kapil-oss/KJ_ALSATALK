// User model for authentication and user management
const { query } = require('../database/db');
const { generateOTP, generateToken } = require('../services/emailService');

class User {
    // Create a new user (registration - for client self-registration)
    static async create(userData) {
        const bcrypt = require('bcrypt');
        const {
            email,
            username,
            password,
            fullName,
            phoneNumber,
            whatsappNumber,
            address,
            companyName,
            userType,
            isAdmin = false,
            isActive = false  // Default to inactive for new registrations
        } = userData;

        // Hash password if provided
        let passwordHash = null;
        if (password) {
            passwordHash = await bcrypt.hash(password, 10);
        }

        // Generate verification token
        const verificationToken = generateToken();
        const verificationExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        const sql = `
            INSERT INTO users (
                email, username, password_hash, full_name, phone_number, whatsapp_number,
                address, company_name, user_type, is_admin, is_active,
                verification_token, verification_expires
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
            RETURNING id, email, username, full_name, phone_number, whatsapp_number,
                      address, company_name, user_type, is_admin, is_active,
                      email_verified, created_at
        `;

        try {
            const result = await query(sql, [
                email, username, passwordHash, fullName, phoneNumber, whatsappNumber || phoneNumber,
                address, companyName, userType, isAdmin, isActive,
                verificationToken, verificationExpires
            ]);
            return result.rows[0];
        } catch (error) {
            if (error.code === '23505') { // Unique violation
                throw new Error('Email or username already registered');
            }
            throw error;
        }
    }

    // Create user with password (for admin-created users)
    static async createWithPassword(userData) {
        const bcrypt = require('bcrypt');
        const {
            username,
            email,
            password,
            fullName,
            isAdmin = false
        } = userData;

        const passwordHash = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users (
                username, email, password_hash, full_name, is_admin, is_active
            )
            VALUES ($1, $2, $3, $4, $5, TRUE)
            RETURNING id, username, email, full_name, is_admin, is_active, created_at
        `;

        try {
            const result = await query(sql, [username, email, passwordHash, fullName, isAdmin]);
            return result.rows[0];
        } catch (error) {
            if (error.code === '23505') {
                throw new Error('Username or email already exists');
            }
            throw error;
        }
    }

    // Find user by email
    static async findByEmail(email) {
        const sql = 'SELECT * FROM users WHERE email = $1';
        const result = await query(sql, [email]);
        return result.rows[0];
    }

    // Find user by ID
    static async findById(id) {
        const sql = `
            SELECT id, email, full_name, phone_number, whatsapp_number,
                   address, company_name, user_type, is_admin, is_active,
                   email_verified, created_at, last_login, approved_at
            FROM users WHERE id = $1
        `;
        const result = await query(sql, [id]);
        return result.rows[0];
    }

    // Get all users (for admin panel)
    static async findAll() {
        const sql = `
            SELECT id, email, full_name, phone_number, whatsapp_number,
                   address, company_name, user_type, is_admin, is_active,
                   email_verified, created_at, last_login, approved_at
            FROM users
            ORDER BY created_at DESC
        `;
        const result = await query(sql);
        return result.rows;
    }

    // Get pending users (not approved yet)
    static async findPending() {
        const sql = `
            SELECT id, email, full_name, phone_number, whatsapp_number,
                   address, company_name, user_type, created_at
            FROM users
            WHERE is_active = FALSE AND is_admin = FALSE
            ORDER BY created_at DESC
        `;
        const result = await query(sql);
        return result.rows;
    }

    // Update last login timestamp
    static async updateLastLogin(userId) {
        const sql = 'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1';
        await query(sql, [userId]);
    }

    // Approve user (admin action)
    static async approve(userId, adminId) {
        const otp = generateOTP();
        const verificationToken = otp;
        const verificationExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        const sql = `
            UPDATE users
            SET is_active = TRUE,
                approved_at = CURRENT_TIMESTAMP,
                approved_by = $2,
                verification_token = $3,
                verification_expires = $4
            WHERE id = $1
            RETURNING id, email, full_name, is_active, approved_at
        `;

        try {
            const result = await query(sql, [userId, adminId, verificationToken, verificationExpires]);
            return { user: result.rows[0], otp };
        } catch (error) {
            throw error;
        }
    }

    // Reject user (admin action)
    static async reject(userId) {
        const sql = 'DELETE FROM users WHERE id = $1 AND is_active = FALSE RETURNING id';
        const result = await query(sql, [userId]);
        return result.rows[0];
    }

    // Verify email with OTP and activate account (new flow)
    static async verifyEmailAndActivate(email, otp) {
        const sql = `
            UPDATE users
            SET email_verified = TRUE,
                is_active = TRUE,
                verification_token = NULL,
                verification_expires = NULL
            WHERE email = $1
              AND verification_token = $2
              AND verification_expires > NOW()
            RETURNING id, email, username, full_name, email_verified, is_active, created_at
        `;

        try {
            const result = await query(sql, [email, otp]);

            if (result.rows.length === 0) {
                throw new Error('Invalid or expired verification code');
            }

            return result.rows[0];
        } catch (error) {
            if (error.message === 'Invalid or expired verification code') {
                throw error;
            }
            throw new Error('Email verification failed');
        }
    }

    // Verify email with OTP (old flow - kept for backward compatibility)
    static async verifyEmail(email, otp) {
        const sql = `
            UPDATE users
            SET email_verified = TRUE,
                verification_token = NULL,
                verification_expires = NULL
            WHERE email = $1
            AND verification_token = $2
            AND verification_expires > NOW()
            RETURNING id, email, full_name, email_verified
        `;

        const result = await query(sql, [email, otp]);
        if (result.rows.length === 0) {
            throw new Error('Invalid or expired OTP');
        }
        return result.rows[0];
    }

    // Resend verification OTP
    static async resendOTP(email) {
        const otp = generateOTP();
        const verificationExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        const sql = `
            UPDATE users
            SET verification_token = $2,
                verification_expires = $3
            WHERE email = $1 AND is_active = TRUE AND email_verified = FALSE
            RETURNING id, email, full_name
        `;

        const result = await query(sql, [email, otp, verificationExpires]);
        if (result.rows.length === 0) {
            throw new Error('User not found or already verified');
        }
        return { user: result.rows[0], otp };
    }

    // Update user
    static async update(userId, updates) {
        const {
            email, fullName, phoneNumber, whatsappNumber,
            address, companyName, userType, isActive, isAdmin
        } = updates;

        const sql = `
            UPDATE users
            SET email = COALESCE($1, email),
                full_name = COALESCE($2, full_name),
                phone_number = COALESCE($3, phone_number),
                whatsapp_number = COALESCE($4, whatsapp_number),
                address = COALESCE($5, address),
                company_name = COALESCE($6, company_name),
                user_type = COALESCE($7, user_type),
                is_active = COALESCE($8, is_active),
                is_admin = COALESCE($9, is_admin)
            WHERE id = $10
            RETURNING id, email, full_name, phone_number, whatsapp_number,
                      address, company_name, user_type, is_admin, is_active
        `;

        try {
            const result = await query(sql, [
                email, fullName, phoneNumber, whatsappNumber,
                address, companyName, userType, isActive, isAdmin, userId
            ]);
            return result.rows[0];
        } catch (error) {
            if (error.code === '23505') {
                throw new Error('Email already exists');
            }
            throw error;
        }
    }

    // Delete user
    static async delete(userId) {
        const sql = 'DELETE FROM users WHERE id = $1 RETURNING id';
        const result = await query(sql, [userId]);
        return result.rows[0];
    }

    // Count total users
    static async count() {
        const sql = 'SELECT COUNT(*) as total FROM users WHERE is_admin = FALSE';
        const result = await query(sql);
        return parseInt(result.rows[0].total);
    }

    // Count pending users
    static async countPending() {
        const sql = 'SELECT COUNT(*) as total FROM users WHERE is_active = FALSE AND is_admin = FALSE';
        const result = await query(sql);
        return parseInt(result.rows[0].total);
    }

    // ====== BACKWARD COMPATIBILITY METHODS FOR OLD LOGIN SYSTEM ======

    // Find user by username (for admin login)
    static async findByUsername(username) {
        const sql = 'SELECT * FROM users WHERE username = $1';
        const result = await query(sql, [username]);
        return result.rows[0];
    }

    // Verify password
    static async verifyPassword(inputPassword, hashedPassword) {
        const bcrypt = require('bcrypt');
        return bcrypt.compare(inputPassword, hashedPassword);
    }

    // Update last login timestamp
    static async updateLastLogin(userId) {
        const sql = 'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1';
        await query(sql, [userId]);
    }

    // ====== TOKEN USAGE TRACKING ======

    // Add tokens used for a user
    static async addTokenUsage(userId, tokensUsed) {
        const sql = `
            UPDATE users
            SET tokens_used = tokens_used + $1
            WHERE id = $2
            RETURNING id, tokens_used, token_limit
        `;
        const result = await query(sql, [tokensUsed, userId]);
        return result.rows[0];
    }

    // Check if user has exceeded token limit
    static async checkTokenLimit(userId) {
        const sql = 'SELECT tokens_used, token_limit FROM users WHERE id = $1';
        const result = await query(sql, [userId]);
        if (result.rows.length === 0) return null;

        const { tokens_used, token_limit } = result.rows[0];
        return {
            tokensUsed: tokens_used,
            tokenLimit: token_limit,
            exceeded: tokens_used >= token_limit,
            remaining: Math.max(0, token_limit - tokens_used),
            percentageUsed: token_limit > 0 ? Math.round((tokens_used / token_limit) * 100) : 0
        };
    }

    // Update user token limit (admin only)
    static async updateTokenLimit(userId, newLimit) {
        const sql = `
            UPDATE users
            SET token_limit = $1
            WHERE id = $2
            RETURNING id, token_limit
        `;
        const result = await query(sql, [newLimit, userId]);
        return result.rows[0];
    }

    // Reset token usage for a user
    static async resetTokenUsage(userId) {
        const sql = `
            UPDATE users
            SET tokens_used = 0, token_reset_date = CURRENT_TIMESTAMP
            WHERE id = $1
            RETURNING id, tokens_used, token_reset_date
        `;
        const result = await query(sql, [userId]);
        return result.rows[0];
    }

    // Get token usage statistics
    static async getTokenStats(userId) {
        const sql = `
            SELECT
                id,
                email,
                username,
                full_name,
                tokens_used,
                token_limit,
                token_reset_date,
                CASE
                    WHEN token_limit > 0 THEN ROUND((tokens_used::float / token_limit) * 100, 2)
                    ELSE 0
                END as usage_percentage
            FROM users
            WHERE id = $1
        `;
        const result = await query(sql, [userId]);
        return result.rows[0];
    }
}

module.exports = User;
