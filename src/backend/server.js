const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const cors = require('cors');

const app = express();
const port = 5000;

// CORS FIXED: Allow frontend requests
app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests from frontend
  credentials: true                 // Allow cookies/session data
}));

//  Middleware setup
app.use(express.json()); // Parse JSON bodies

//  Express-session setup (for authentication)
app.use(session({
  secret: 'your_secret_key_here', // Change this in production
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true } // Secure: true in production with HTTPS
}));

//  Connect to MongoDB
mongoose.connect('mongodb+srv://shamuraanim7:1234@cluster0.iziuig8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

//  User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

//  Registration Endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: '⚠️ Please provide username and password' });
  }

  try {
    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: '⚠️ User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ msg: '🎉 User registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: '⚠️ Server error', error: err.message });
  }
});

//  Login Endpoint (Session-based Authentication)
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: '⚠️ Please provide username and password' });
  }

  try {
    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: '❌ Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: '❌ Invalid credentials' });
    }

    // Create session
    req.session.user = { id: user._id, username: user.username };
    res.status(200).json({ msg: '✅ Logged in successfully' });
  } catch (err) {
    res.status(500).json({ msg: '⚠️ Server error', error: err.message });
  }
});

//  Authentication Middleware
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.status(401).json({ msg: '🚫 Unauthorized. Please log in.' });
  }
}

//  Protected Route: Dashboard
app.get('/dashboard', isAuthenticated, (req, res) => {
  res.status(200).json({
    msg: '🏠 Welcome to your dashboard!',
    user: req.session.user
  });
});

// ✅ Logout Endpoint
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ msg: '⚠️ Could not log out.' });
    }
    res.status(200).json({ msg: '✅ Logged out successfully' });
  });
});

// ✅ Start Server
app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
