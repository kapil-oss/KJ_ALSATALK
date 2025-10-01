// Admin routes for user management
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isAdmin, isAdminAPI } = require('../middleware/auth');
const { sendVerificationEmail, sendApprovalNotification } = require('../services/emailService');

// Get all users (API)
router.get('/api/admin/users', isAdminAPI, async (req, res) => {
    try {
        const users = await User.findAll();
        res.json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Create new user (API)
router.post('/api/admin/users', isAdminAPI, async (req, res) => {
    try {
        const { username, email, password, fullName, tokenLimit, isAdmin } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Username, email, and password are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        // Admin-created users are active by default
        const user = await User.createWithPassword({
            username,
            email,
            password,
            fullName,
            isAdmin: isAdmin || false
        });

        // Set token limit if provided
        if (tokenLimit !== undefined) {
            await User.updateTokenLimit(user.id, tokenLimit);
        }

        res.json({ user, message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.message === 'Username or email already exists') {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to create user' });
        }
    }
});

// Update user (API)
router.put('/api/admin/users/:id', isAdminAPI, async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const { username, email, fullName, tokenLimit, isActive, isAdmin } = req.body;

        // Get current user status before update
        const currentUser = await User.findById(userId);
        const wasInactive = currentUser && !currentUser.is_active;

        const user = await User.update(userId, {
            username,
            email,
            fullName,
            isActive,
            isAdmin
        });

        // Update token limit if provided
        if (tokenLimit !== undefined) {
            await User.updateTokenLimit(userId, tokenLimit);
        }

        // Send activation email if user was just activated
        if (wasInactive && isActive) {
            const { sendActivationEmail } = require('../services/emailService');
            try {
                await sendActivationEmail(user.email, user.full_name || user.username);
                console.log(`✅ Activation email sent to ${user.email}`);
            } catch (emailError) {
                console.error('Failed to send activation email:', emailError);
                // Continue even if email fails
            }
        }

        res.json({ user, message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        if (error.message === 'Username or email already exists') {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to update user' });
        }
    }
});

// Delete user (API)
router.delete('/api/admin/users/:id', isAdminAPI, async (req, res) => {
    try {
        const userId = parseInt(req.params.id);

        // Prevent self-deletion
        if (userId === req.user.id) {
            return res.status(400).json({ error: 'Cannot delete your own account' });
        }

        await User.delete(userId);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// Change user password (API)
router.post('/api/admin/users/:id/password', isAdminAPI, async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const { newPassword } = req.body;

        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        await User.changePassword(userId, newPassword);
        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ error: 'Failed to change password' });
    }
});

// Get user statistics (API)
router.get('/api/admin/stats', isAdminAPI, async (req, res) => {
    try {
        const totalUsers = await User.count();
        const pendingUsers = await User.countPending();
        const users = await User.findAll();
        const activeUsers = users.filter(u => u.is_active && !u.is_admin).length;
        const verifiedUsers = users.filter(u => u.email_verified && !u.is_admin).length;

        res.json({
            totalUsers,
            activeUsers,
            pendingUsers,
            verifiedUsers
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
});

// Get pending registrations (API)
router.get('/api/admin/pending', isAdminAPI, async (req, res) => {
    try {
        const pendingUsers = await User.findPending();
        res.json({ users: pendingUsers });
    } catch (error) {
        console.error('Error fetching pending users:', error);
        res.status(500).json({ error: 'Failed to fetch pending registrations' });
    }
});

// Approve user registration (API)
router.post('/api/admin/users/:id/approve', isAdminAPI, async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const adminId = req.user.id;

        // Approve user and generate OTP
        const { user, otp } = await User.approve(userId, adminId);

        // Send approval notification
        await sendApprovalNotification(user.email, user.full_name);

        // Send verification email with OTP
        await sendVerificationEmail(user.email, user.full_name, otp);

        console.log(`✅ User approved: ${user.email} by admin ID: ${adminId}`);

        res.json({
            success: true,
            message: 'User approved and verification email sent',
            user
        });
    } catch (error) {
        console.error('Error approving user:', error);
        res.status(500).json({ error: 'Failed to approve user' });
    }
});

// Reject user registration (API)
router.post('/api/admin/users/:id/reject', isAdminAPI, async (req, res) => {
    try {
        const userId = parseInt(req.params.id);

        const deletedUser = await User.reject(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found or already approved' });
        }

        console.log(`❌ User rejected and deleted: ID ${userId}`);

        res.json({
            success: true,
            message: 'User registration rejected'
        });
    } catch (error) {
        console.error('Error rejecting user:', error);
        res.status(500).json({ error: 'Failed to reject user' });
    }
});

module.exports = router;
