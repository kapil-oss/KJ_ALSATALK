// Authentication middleware
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// Configure Passport Local Strategy
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findByUsername(username);

            if (!user) {
                return done(null, false, { message: 'Invalid username or password' });
            }

            if (!user.is_active) {
                return done(null, false, { message: 'Account is inactive' });
            }

            const isValid = await User.verifyPassword(password, user.password_hash);

            if (!isValid) {
                return done(null, false, { message: 'Invalid username or password' });
            }

            // Update last login
            await User.updateLastLogin(user.id);

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

// Serialize user for session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.is_admin) {
        return next();
    }
    res.status(403).send('Access denied. Admin privileges required.');
};

// API middleware for JSON responses
const isAuthenticatedAPI = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'Unauthorized' });
};

const isAdminAPI = (req, res, next) => {
    if (req.isAuthenticated() && req.user.is_admin) {
        return next();
    }
    res.status(403).json({ error: 'Access denied. Admin privileges required.' });
};

module.exports = {
    passport,
    isAuthenticated,
    isAdmin,
    isAuthenticatedAPI,
    isAdminAPI
};
