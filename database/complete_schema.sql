-- ============================================================
-- AlsaTalk Complete Database Schema
-- Alsatronix Solutions DMCC
-- ============================================================
-- This schema includes all tables for the AlsaTalk application:
-- - User authentication and management
-- - Session storage
-- - Conversation history and persona preferences
-- - Application settings
-- - Token tracking and usage limits
-- ============================================================

-- ============================================================
-- 1. USERS TABLE
-- ============================================================
-- Main user table for authentication, authorization, and usage tracking
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,

    -- Authentication fields
    username VARCHAR(50) UNIQUE,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255),

    -- User profile information
    full_name VARCHAR(100),
    phone_number VARCHAR(20),
    whatsapp_number VARCHAR(20),
    address TEXT,
    company_name VARCHAR(100),
    user_type VARCHAR(20), -- 'individual' or 'firm'

    -- Email verification and approval workflow
    email_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(100),
    verification_expires TIMESTAMP,
    approved_by INTEGER REFERENCES users(id),
    approved_at TIMESTAMP,

    -- Token usage tracking (OpenAI API usage)
    tokens_used INTEGER DEFAULT 0,
    token_limit INTEGER DEFAULT 500, -- 500 tokens default
    token_reset_date TIMESTAMP,

    -- Account status and permissions
    is_admin BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);
CREATE INDEX IF NOT EXISTS idx_users_email_verified ON users(email_verified);

-- ============================================================
-- 2. SESSIONS TABLE
-- ============================================================
-- Express session storage using connect-pg-simple
CREATE TABLE IF NOT EXISTS sessions (
    sid VARCHAR NOT NULL PRIMARY KEY,
    sess JSON NOT NULL,
    expire TIMESTAMP(6) NOT NULL
);

-- Index for session cleanup/pruning
CREATE INDEX IF NOT EXISTS idx_session_expire ON sessions(expire);

-- ============================================================
-- 3. CONVERSATION HISTORY TABLE
-- ============================================================
-- Stores conversation messages per user and persona for memory/context
CREATE TABLE IF NOT EXISTS conversation_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    persona_id VARCHAR(50) NOT NULL, -- e.g., 'sales-agent', 'product-expert'
    role VARCHAR(20) NOT NULL, -- 'user' or 'assistant'
    message TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for efficient conversation retrieval
CREATE INDEX IF NOT EXISTS idx_conversation_user_persona ON conversation_history(user_id, persona_id);
CREATE INDEX IF NOT EXISTS idx_conversation_timestamp ON conversation_history(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_conversation_user_id ON conversation_history(user_id);

-- ============================================================
-- 4. USER PREFERENCES TABLE
-- ============================================================
-- Stores per-user, per-persona preferences (settings, customizations)
CREATE TABLE IF NOT EXISTS user_preferences (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    persona_id VARCHAR(50) NOT NULL,
    preference_key VARCHAR(100) NOT NULL,
    preference_value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, persona_id, preference_key)
);

-- Index for efficient preference lookups
CREATE INDEX IF NOT EXISTS idx_user_preferences_user ON user_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_user_preferences_persona ON user_preferences(user_id, persona_id);

-- ============================================================
-- 5. APPLICATION SETTINGS TABLE
-- ============================================================
-- Global application-wide key/value store for configuration
CREATE TABLE IF NOT EXISTS app_settings (
    key VARCHAR(100) PRIMARY KEY,
    value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- TRIGGERS
-- ============================================================

-- Trigger function to auto-update users.updated_at
CREATE OR REPLACE FUNCTION update_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_users_updated_at();

-- Trigger function to auto-update user_preferences.updated_at
CREATE OR REPLACE FUNCTION update_user_preferences_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_user_preferences_updated_at ON user_preferences;
CREATE TRIGGER update_user_preferences_updated_at
BEFORE UPDATE ON user_preferences
FOR EACH ROW EXECUTE FUNCTION update_user_preferences_updated_at();

-- Trigger function to auto-update app_settings.updated_at
CREATE OR REPLACE FUNCTION update_app_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_app_settings_timestamp ON app_settings;
CREATE TRIGGER update_app_settings_timestamp
BEFORE UPDATE ON app_settings
FOR EACH ROW EXECUTE FUNCTION update_app_settings_updated_at();

-- ============================================================
-- SEED DATA
-- ============================================================

-- Insert default admin users
-- Admin 1: Legacy admin (for backward compatibility)
-- Username: admin | Password: admin123
INSERT INTO users (username, email, password_hash, full_name, is_admin, is_active, email_verified)
VALUES ('admin', 'admin@alsatalk.com', '$2b$10$rKZvXQlPqYHq.gJ3MxQKa.8LhYXYvG5qYp8xOBZJKC.W5lM8Qy8Dy', 'System Administrator', TRUE, TRUE, TRUE)
ON CONFLICT (username) DO NOTHING;

-- Admin 2: Primary admin account
-- Username: alsatalk_admin | Password: Admin@2025
INSERT INTO users (username, email, password_hash, full_name, is_admin, is_active, email_verified)
VALUES ('alsatalk_admin', 'admin@alsatronix.com', '$2b$10$28yHrGz34xSn/KZkv8a4C.0DWLUpP5ggYDVU5v62lbj8a0cC/oR72', 'AlsaTalk Administrator', TRUE, TRUE, TRUE)
ON CONFLICT (username) DO NOTHING;

-- Insert default OpenAI realtime model setting
INSERT INTO app_settings (key, value)
VALUES ('openai_realtime_model', 'gpt-4o-realtime-preview-2024-12-17')
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- UTILITY FUNCTIONS
-- ============================================================

-- Function to get active users count
CREATE OR REPLACE FUNCTION get_active_users_count()
RETURNS INTEGER AS $$
BEGIN
    RETURN (SELECT COUNT(*) FROM users WHERE is_active = TRUE AND is_admin = FALSE);
END;
$$ LANGUAGE plpgsql;

-- Function to get pending registrations count
CREATE OR REPLACE FUNCTION get_pending_registrations_count()
RETURNS INTEGER AS $$
BEGIN
    RETURN (SELECT COUNT(*) FROM users WHERE is_active = FALSE AND is_admin = FALSE);
END;
$$ LANGUAGE plpgsql;

-- Function to cleanup expired sessions (can be run via cron)
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM sessions WHERE expire < NOW();
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Function to cleanup old conversation history (optional, keeps last 90 days)
CREATE OR REPLACE FUNCTION cleanup_old_conversations(days_to_keep INTEGER DEFAULT 90)
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM conversation_history
    WHERE timestamp < NOW() - (days_to_keep || ' days')::INTERVAL;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================

COMMENT ON TABLE users IS 'User accounts with authentication, profile, and token tracking';
COMMENT ON TABLE sessions IS 'Express session storage managed by connect-pg-simple';
COMMENT ON TABLE conversation_history IS 'Chat history between users and AI personas';
COMMENT ON TABLE user_preferences IS 'User-specific preferences per AI persona';
COMMENT ON TABLE app_settings IS 'Global application configuration key-value store';

COMMENT ON COLUMN users.tokens_used IS 'Total OpenAI API tokens consumed by this user';
COMMENT ON COLUMN users.token_limit IS 'Maximum OpenAI API tokens allowed for this user';
COMMENT ON COLUMN users.verification_token IS 'OTP token for email verification (6-digit code)';
COMMENT ON COLUMN users.is_active IS 'Whether user account is active (admin-approved)';
COMMENT ON COLUMN users.email_verified IS 'Whether user has verified their email address';

-- ============================================================
-- VERIFICATION QUERIES
-- ============================================================
-- Uncomment the following to verify schema installation:

-- SELECT 'Tables created successfully:' AS status;
-- SELECT table_name FROM information_schema.tables
-- WHERE table_schema = 'public'
-- AND table_type = 'BASE TABLE'
-- ORDER BY table_name;

-- SELECT 'Total users:' AS metric, COUNT(*) AS value FROM users
-- UNION ALL
-- SELECT 'Active users:', COUNT(*) FROM users WHERE is_active = TRUE
-- UNION ALL
-- SELECT 'Admin users:', COUNT(*) FROM users WHERE is_admin = TRUE;

-- ============================================================
-- SCHEMA VERSION
-- ============================================================
INSERT INTO app_settings (key, value)
VALUES ('schema_version', '1.0.0'), ('schema_updated_at', NOW()::TEXT)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- ============================================================
-- END OF SCHEMA
-- ============================================================