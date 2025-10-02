# AlsaTalk - Setup Instructions

## 🔐 Authentication System Setup

Your AlsaTalk voice application now includes a complete user authentication system with admin panel.

## 📋 Features

- ✅ User authentication with PostgreSQL
- ✅ Admin panel for user management
- ✅ Session management
- ✅ Protected voice application routes
- ✅ Role-based access control (Admin/User)

## 🚀 Quick Start

### 1. Database Setup

The database schema will be automatically initialized when you start the server. The schema includes:

- **users** - User accounts with authentication
- **sessions** - Session management
- **conversation_history** - Store AI conversations (for future memory feature)
- **user_preferences** - Store user preferences per persona

### 2. Start the Server

```bash
npm start
```

The server will:
- Initialize database tables automatically
- Create default admin account
- Start on port 3000

### 3. First Login

Navigate to: `http://localhost:3000`

You'll be redirected to the login page. Use these **default credentials**:

```
Username: admin
Password: admin123
```

⚠️ **IMPORTANT**: Change the default admin password immediately after first login!

## 👨‍💼 Admin Panel

Access the admin panel at: `http://localhost:3000/admin`

### Admin Features:

1. **User Management**
   - Create new users
   - Edit existing users
   - Activate/Deactivate accounts
   - Assign admin roles
   - Delete users
   - Reset passwords

2. **Dashboard Statistics**
   - Total users count
   - Active users
   - Admin users
   - Inactive users

3. **User Creation**
   - Required fields: Username, Email, Password
   - Optional fields: Full Name
   - Set admin privileges
   - Password minimum: 6 characters

## 🔑 User Accounts

### Creating New Users (Admin Only)

1. Go to Admin Panel (`/admin`)
2. Click "Create User" button
3. Fill in user details:
   - Username (unique)
   - Email (unique)
   - Password (min 6 characters)
   - Full Name (optional)
   - Admin checkbox (to grant admin privileges)
4. Click "Save"

### User Login

1. Navigate to `http://localhost:3000`
2. Enter username and password
3. Access the voice application

## 🗄️ Database Schema

### Users Table
```sql
- id (Primary Key)
- username (Unique)
- email (Unique)
- password_hash (Bcrypt encrypted)
- full_name
- is_admin (Boolean)
- is_active (Boolean)
- created_at
- updated_at
- last_login
```

### Sessions Table
```sql
- sid (Primary Key)
- sess (JSON)
- expire (Timestamp)
```

## 🔒 Security Features

1. **Password Encryption**: All passwords are hashed using bcrypt (10 salt rounds)
2. **Session Management**: Secure sessions stored in PostgreSQL
3. **Route Protection**: All voice app routes require authentication
4. **Role-Based Access**: Admin-only routes for user management
5. **HTTPS Ready**: Cookie security for production

## ⚙️ Configuration

### Environment Variables (.env)

```env
OPENAI_API_KEY=your-openai-api-key
SUPABASE_URL=your-postgresql-connection-string
SESSION_SECRET=your-super-secret-session-key
```

**Important**: Change `SESSION_SECRET` in production to a secure random string!

## 📱 User Workflow

### For End Users:
1. Admin creates user account
2. User receives credentials
3. User logs in at `/login`
4. User accesses voice application
5. User can chat with AI personas
6. Session persists for 30 days

### For Admins:
1. Login with admin account
2. Access admin panel at `/admin`
3. Manage users (create, edit, delete)
4. View user statistics
5. Reset user passwords if needed

## 🛡️ Password Management

### Change User Password (Admin):
1. Go to Admin Panel
2. Click "Edit" on user
3. (Future feature: Add password reset option)

### Security Best Practices:
- Minimum password length: 6 characters
- Passwords are never stored in plain text
- Passwords are hashed with bcrypt
- Session cookies are httpOnly

## 🔄 Session Management

- **Duration**: 30 days
- **Storage**: PostgreSQL (sessions table)
- **Security**: HTTP-only cookies
- **Auto-cleanup**: Expired sessions cleaned automatically

## 📊 API Endpoints

### Authentication
- `POST /login` - User login
- `POST /logout` - User logout
- `GET /api/auth/status` - Check auth status

### Admin (Protected)
- `GET /api/admin/users` - List all users
- `POST /api/admin/users` - Create user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `POST /api/admin/users/:id/password` - Change password
- `GET /api/admin/stats` - User statistics

### Voice App (Protected)
- `GET /` - Main voice application
- `GET /token` - OpenAI API token (authenticated)

## 🐛 Troubleshooting

### Database Connection Issues
- Verify SUPABASE_URL in .env
- Check PostgreSQL is accessible
- Ensure SSL is properly configured

### Login Problems
- Clear browser cookies
- Check database tables are created
- Verify default admin user exists

### Session Issues
- Check SESSION_SECRET is set
- Verify sessions table exists
- Clear old sessions from database

### Permission Denied
- Ensure user account is active (is_active = true)
- Check user has correct role (admin for /admin)
- Verify session is valid

## 🚀 Production Deployment

### Before Deploying:
1. ✅ Change default admin password
2. ✅ Set strong SESSION_SECRET
3. ✅ Enable HTTPS (set NODE_ENV=production)
4. ✅ Use secure PostgreSQL connection
5. ✅ Configure proper CORS
6. ✅ Set up database backups
7. ✅ Review admin user list

### Production .env:
```env
NODE_ENV=production
OPENAI_API_KEY=your-production-key
SUPABASE_URL=your-production-db
SESSION_SECRET=very-long-random-secure-string
```

## 📚 Next Steps

1. Login with default credentials
2. Create additional user accounts
3. Change default admin password
4. Test authentication flow
5. Customize user roles as needed
6. Set up production environment

## 🆘 Support

For issues or questions:
1. Check server logs
2. Verify database connection
3. Review this setup guide
4. Check browser console for errors

---

**🎉 Your AlsaTalk voice application is now secured with user authentication!**

Only logged-in users can access the AI persona voice chat system.
