-- Add token usage tracking columns to users table

ALTER TABLE users ADD COLUMN IF NOT EXISTS token_limit INTEGER DEFAULT 10000;
ALTER TABLE users ADD COLUMN IF NOT EXISTS tokens_used INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS token_reset_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_users_token_limit ON users(token_limit);

-- Update existing users with default token limit
UPDATE users SET token_limit = 10000 WHERE token_limit IS NULL;
UPDATE users SET tokens_used = 0 WHERE tokens_used IS NULL;
UPDATE users SET token_reset_date = CURRENT_TIMESTAMP WHERE token_reset_date IS NULL;
