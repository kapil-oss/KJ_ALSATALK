// Authentication routes
const express = require('express');
const router = express.Router();
const { passport } = require('../middleware/auth');

// Login route (POST)
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login?error=1',
    failureFlash: false
}), (req, res) => {
    // Redirect all users (including admin) to homepage
    res.redirect('/');
});

// Logout route
router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.redirect('/login');
    });
});

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send('Logout failed');
        }
        res.redirect('/login');
    });
});

// Check auth status (API)
router.get('/api/auth/status', async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const User = require('../models/User');
            const tokenStatus = await User.checkTokenLimit(req.user.id);

            res.json({
                authenticated: true,
                user: {
                    id: req.user.id,
                    username: req.user.username,
                    email: req.user.email,
                    fullName: req.user.full_name,
                    isAdmin: req.user.is_admin
                },
                tokenStatus: tokenStatus ? {
                    used: tokenStatus.tokensUsed,
                    limit: tokenStatus.tokenLimit,
                    remaining: tokenStatus.remaining,
                    percentageUsed: tokenStatus.percentageUsed,
                    exceeded: tokenStatus.exceeded
                } : null
            });
        } catch (error) {
            console.error('Error fetching token status:', error);
            res.json({
                authenticated: true,
                user: {
                    id: req.user.id,
                    username: req.user.username,
                    email: req.user.email,
                    fullName: req.user.full_name,
                    isAdmin: req.user.is_admin
                }
            });
        }
    } else {
        res.json({ authenticated: false });
    }
});

module.exports = router;
