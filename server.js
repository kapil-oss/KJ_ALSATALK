const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Token endpoint for OpenAI Realtime API
app.get('/token', (req, res) => {
  // In production, this should generate an ephemeral token
  // For demo purposes, return the API key from environment variable
  const token = process.env.OPENAI_API_KEY;
  
  if (!token) {
    console.warn('⚠️  Please set your OPENAI_API_KEY in the .env file');
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }
  
  res.json({ value: token });
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log('💡 Set OPENAI_API_KEY environment variable for API access');
});