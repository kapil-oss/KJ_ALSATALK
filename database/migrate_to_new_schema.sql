-- Migration script to update from old schema to new schema
-- Run this to migrate existing database

-- Add new columns to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone_number VARCHAR(20);
ALTER TABLE users ADD COLUMN IF NOT EXISTS whatsapp_number VARCHAR(20);
ALTER TABLE users ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS company_name VARCHAR(200);
ALTER TABLE users ADD COLUMN IF NOT EXISTS user_type VARCHAR(20) CHECK (user_type IN ('individual', 'firm'));
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS verification_token VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS verification_expires TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS approved_by INTEGER REFERENCES users(id);

-- Update existing admin user with new fields
UPDATE users
SET
    phone_number = '+971-443-32348',
    whatsapp_number = '+971-443-32348',
    address = 'Alsatronix Solutions DMCC, 2507 The Dome Tower, Cluster N, Jumeirah Lake Towers, Dubai, UAE',
    company_name = 'Alsatronix Solutions DMCC',
    user_type = 'firm',
    email_verified = TRUE,
    is_active = TRUE
WHERE email = 'admin@alsatalk.com';

-- Create new indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_verification_token ON users(verification_token);
CREATE INDEX IF NOT EXISTS idx_users_active ON users(is_active);

-- Make username nullable (for backward compatibility during migration)
ALTER TABLE users ALTER COLUMN username DROP NOT NULL;
ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL;

-- Make new fields required for future inserts (NOT NULL constraints)
-- Note: We'll handle this in the application layer for now to avoid breaking existing data
