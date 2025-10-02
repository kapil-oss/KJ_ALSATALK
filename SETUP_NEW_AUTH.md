# AlsaTalk New Authentication System Setup Guide

## ✅ What's Been Implemented

### 1. Database Schema
- **New file**: `database/schema_new.sql` - Complete new schema
- **Migration file**: `database/migrate_to_new_schema.sql` - Update existing database
- **New fields**: phone_number, whatsapp_number, address, company_name, user_type, email_verified, verification_token, etc.

### 2. Backend Services
- **Email Service** (`services/emailService.js`):
  - OTP generation and sending
  - Beautiful HTML email templates
  - Approval notifications

- **Updated User Model** (`models/User.js`):
  - Registration without password
  - Email verification methods
  - Approve/reject methods
  - Pending user queries

### 3. API Routes
- **Registration Routes** (`routes/registration.js`):
  - `POST /api/register` - Public registration
  - `POST /api/verify-email` - Email verification
  - `POST /api/resend-otp` - Resend OTP
  - `GET /api/registration-status/:email` - Check status

- **Updated Admin Routes** (`routes/admin.js`):
  - `GET /api/admin/pending` - Get pending registrations
  - `POST /api/admin/users/:id/approve` - Approve user
  - `POST /api/admin/users/:id/reject` - Reject user
  - Updated stats endpoint

### 4. Frontend Pages
- **Registration Page** (`public/register.html`): Public self-service registration
- **Email Verification** (`public/verify-email.html`): OTP verification page

## 📋 Setup Steps

### Step 1: Update Environment Variables
Add these to your `.env` file:

```env
# Gmail Configuration for sending emails
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-app-password-here

# App URL (for email links)
APP_URL=http://localhost:3000

# Existing variables
OPENAI_API_KEY=your-key
DATABASE_URL=your-supabase-url
SESSION_SECRET=your-secret
```

**Important**:
- You need to create a Gmail App Password (not regular password)
- Go to Google Account → Security → 2-Step Verification → App Passwords
- Generate an app password for "Mail"

### Step 2: Run Database Migration
Run the migration script to update your existing database:

```bash
# Connect to your PostgreSQL database and run:
psql -h <your-supabase-host> -U postgres -d postgres -f database/migrate_to_new_schema.sql
```

OR if starting fresh:
```bash
psql -h <your-supabase-host> -U postgres -d postgres -f database/schema_new.sql
```

### Step 3: Update server.js
Add the registration routes:

```javascript
const registrationRoutes = require('./routes/registration');

// Add after other routes
app.use('/', registrationRoutes);

// Make registration page public
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/verify-email', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'verify-email.html'));
});
```

### Step 4: Update Admin Panel (TODO)
The admin panel needs to be updated to show:
- Pending registrations tab
- Approve/Reject buttons
- More user details (phone, address, etc.)

### Step 5: Implement Gmail OAuth for Login (TODO)
Replace username/password login with Gmail OAuth:
- Setup Google OAuth 2.0 credentials
- Update middleware/auth.js
- Update login.html

## 🔄 Complete User Flow

1. **User Registration**:
   - User visits `/register`
   - Fills form with all details
   - Submits → Account created with `is_active = FALSE`
   - Sees "Pending approval" message

2. **Admin Approval**:
   - Admin logs in to admin panel
   - Sees "Pending Registrations" tab
   - Reviews user details
   - Clicks "Approve" or "Reject"
   - If approved:
     - `is_active` set to TRUE
     - OTP generated and sent via email
     - User receives approval + verification email

3. **Email Verification**:
   - User receives email with 6-digit OTP
   - Clicks link or goes to `/verify-email?email=their@email.com`
   - Enters OTP
   - Email verified → `email_verified = TRUE`

4. **Login** (TODO - Gmail OAuth):
   - User goes to `/login`
   - Clicks "Login with Google"
   - Gmail OAuth authentication
   - Check: is_active AND email_verified
   - If both true → logged in

## 📁 Files Created/Modified

### New Files:
- `database/schema_new.sql`
- `database/migrate_to_new_schema.sql`
- `services/emailService.js`
- `routes/registration.js`
- `public/register.html`
- `public/verify-email.html`

### Modified Files:
- `models/User.js` - Completely rewritten
- `routes/admin.js` - Added approval endpoints
- `package.json` - Added nodemailer, passport-google-oauth20

### Files to Update:
- `server.js` - Add registration routes
- `.env` - Add Gmail credentials
- `middleware/auth.js` - Add Gmail OAuth (TODO)
- `public/login.html` - Gmail OAuth button (TODO)
- `public/admin.html` - Pending registrations UI (TODO)

## 🚀 Next Steps

1. ✅ Database migration
2. ✅ Email service configuration
3. ⏳ Update server.js
4. ⏳ Update admin panel UI
5. ⏳ Implement Gmail OAuth
6. ⏳ Test complete flow

## 📧 Email Templates Included

Both emails have beautiful HTML templates with AlsaTalk branding:
- **Verification Email**: Contains 6-digit OTP with 15-minute expiry
- **Approval Notification**: Informs user their account is approved

## ⚠️ Important Notes

- Old username/password system will be phased out
- Existing admin user will remain for backward compatibility
- All new users must go through this flow
- Email verification is mandatory
- Admin approval is mandatory for new registrations
