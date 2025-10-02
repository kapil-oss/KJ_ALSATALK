const User = require('../models/User');

// Middleware to check token limit before allowing API access
async function checkTokenLimit(req, res, next) {
    try {
        if (!req.user || !req.user.id) {
            return next();
        }

        const tokenStatus = await User.checkTokenLimit(req.user.id);

        if (!tokenStatus) {
            return next();
        }

        // Attach token status to request for use in routes
        req.tokenStatus = tokenStatus;

        // If limit exceeded, block access
        if (tokenStatus.exceeded) {
            return res.status(403).json({
                error: 'Token limit exceeded',
                message: `You have exceeded your token limit of ${tokenStatus.tokenLimit.toLocaleString()}. Please contact administrator@alsatronix.com to increase your limit.`,
                tokenStatus
            });
        }

        // If near limit (80%+), add warning to response
        if (tokenStatus.percentageUsed >= 80) {
            req.tokenWarning = {
                message: `Warning: You have used ${tokenStatus.percentageUsed}% of your token limit. ${tokenStatus.remaining.toLocaleString()} tokens remaining.`,
                contact: 'administrator@alsatronix.com'
            };
        }

        next();
    } catch (error) {
        console.error('Token limit check error:', error);
        next(); // Continue even if check fails
    }
}

// Function to track token usage after API call
async function trackTokenUsage(userId, tokensUsed) {
    try {
        if (!userId || !tokensUsed || tokensUsed <= 0) {
            return;
        }

        const result = await User.addTokenUsage(userId, tokensUsed);

        // Check if limit was just exceeded
        if (result && result.tokens_used >= result.token_limit) {
            console.log(`⚠️ User ${userId} has exceeded token limit: ${result.tokens_used}/${result.token_limit}`);
        }

        return result;
    } catch (error) {
        console.error('Token tracking error:', error);
    }
}

module.exports = {
    checkTokenLimit,
    trackTokenUsage
};
