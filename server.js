const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
require('dotenv').config();

// Import database and authentication
const { pool, initializeDatabase } = require('./database/db');
const { passport, isAuthenticated, isAdmin } = require('./middleware/auth');
const { checkTokenLimit } = require('./middleware/tokenTracking');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const registrationRoutes = require('./routes/registration');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database tables
initializeDatabase().then(success => {
  if (success) {
    console.log('✅ Database ready');
  } else {
    console.error('❌ Database initialization failed');
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  store: new pgSession({
    pool: pool,
    tableName: 'sessions'
  }),
  secret: process.env.SESSION_SECRET || 'alsatalk-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Static files (only for login page and assets, main app is protected)
app.use('/login.html', express.static(path.join(__dirname, 'public', 'login.html')));
app.use('/admin.html', isAuthenticated, isAdmin, express.static(path.join(__dirname, 'public', 'admin.html')));

// Public routes
app.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Public registration routes
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/verify-email', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'verify-email.html'));
});

// Authentication routes
app.use('/', authRoutes);
app.use('/', adminRoutes);
app.use('/', registrationRoutes);

// Serve only specific public assets (CSS, JS, images) without protection
app.use('/logo_large_1024.png', express.static(path.join(__dirname, 'public', 'logo_large_1024.png')));
app.use('/styles.css', express.static(path.join(__dirname, 'public', 'styles.css')));
app.use('/persona-manager.js', isAuthenticated, express.static(path.join(__dirname, 'public', 'persona-manager.js')));
app.use('/ai-persona-chat.js', isAuthenticated, express.static(path.join(__dirname, 'public', 'ai-persona-chat.js')));

// Serve other dataset files with authentication
app.get('/datasets/:filename', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'datasets', req.params.filename));
});

// Protected: Token endpoint for OpenAI Realtime API
app.get('/token', isAuthenticated, checkTokenLimit, (req, res) => {
  const token = process.env.OPENAI_API_KEY;

  if (!token) {
    console.warn('⚠️  Please set your OPENAI_API_KEY in the .env file');
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  const response = { value: token };

  // Add warning if user is near token limit
  if (req.tokenWarning) {
    response.warning = req.tokenWarning;
  }

  // Add token status
  if (req.tokenStatus) {
    response.tokenStatus = {
      used: req.tokenStatus.tokensUsed,
      limit: req.tokenStatus.tokenLimit,
      remaining: req.tokenStatus.remaining,
      percentageUsed: req.tokenStatus.percentageUsed
    };
  }

  res.json(response);
});

// Protected: Serve the main voice app page
app.get('/', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Protected: Admin panel
app.get('/admin', isAuthenticated, isAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Protected: Persona chat page
app.get('/persona-chat', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'persona-chat.html'));
});

// Catch-all: redirect to login if not authenticated (excluding public routes)
app.get('*', (req, res) => {
  // Allow public routes
  const publicRoutes = ['/login', '/register', '/verify-email'];
  if (publicRoutes.includes(req.path)) {
    return res.status(404).send('Page not found');
  }

  if (!req.isAuthenticated()) {
    res.redirect('/login');
  } else {
    res.status(404).send('Page not found');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log('💡 Set OPENAI_API_KEY environment variable for API access');
  console.log('🔐 Authentication enabled - Login to access voice app');
  console.log('👤 Default admin credentials: username: admin, password: admin123');
});
