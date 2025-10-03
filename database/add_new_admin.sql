-- Add New Admin User
-- This script creates a new admin user for AlsaTalk

-- New Admin Credentials:
-- Username: alsatalk_admin
-- Email: admin@alsatronix.com
-- Password: Admin@2025
-- Password Hash: $2b$10$28yHrGz34xSn/KZkv8a4C.0DWLUpP5ggYDVU5v62lbj8a0cC/oR72

INSERT INTO users (
    username,
    email,
    password_hash,
    full_name,
    is_admin,
    is_active,
    email_verified
)
VALUES (
    'alsatalk_admin',
    'admin@alsatronix.com',
    '$2b$10$28yHrGz34xSn/KZkv8a4C.0DWLUpP5ggYDVU5v62lbj8a0cC/oR72',
    'AlsaTalk Administrator',
    TRUE,
    TRUE,
    TRUE
)
ON CONFLICT (username) DO UPDATE
SET
    password_hash = EXCLUDED.password_hash,
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    is_admin = TRUE,
    is_active = TRUE,
    email_verified = TRUE;

-- Verify the admin user was created
SELECT
    id,
    username,
    email,
    full_name,
    is_admin,
    is_active,
    email_verified,
    created_at
FROM users
WHERE username = 'alsatalk_admin';
