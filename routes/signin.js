const express = require('express');
const router = express.Router();

// Mock user credentials (Consider replacing this with a database in the future)
const VALID_EMAIL = 'anigram@gmail.com';
const VALID_PASSWORD = 'by-akram';

// Route: Sign-up / Sign-in Page
router.get('/', (req, res) => {
  if (req.session.isAuthenticated) {
    return res.redirect('/ig');
  }
  res.render('auth/signup.ejs', { error: '' });
});

// Route: Handle Sign-up or Sign-in Logic
router.post('/signin', (req, res) => {
  const { email, password } = req.body;

  // Ensure email comparison is case-insensitive, but keep password case-sensitive
  if (email?.toLowerCase() === VALID_EMAIL.toLowerCase() && password === VALID_PASSWORD) {
    req.session.isAuthenticated = true;
    return res.redirect('/ig');
  }

  // Re-render the signup page with an error message
  res.render('auth/signup.ejs', {
    error: 'Warning: Invalid Credentials! Please copy the input fields, then try again',
  });
});

module.exports = router;
