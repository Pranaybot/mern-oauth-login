const express = require('express'); // Import Express to create routes
const passport = require('passport'); // Import Passport for authentication
const jwt = require('jsonwebtoken'); // Import JWT for token generation
const router = express.Router(); // Create a new Express router
const keys = require('../config/keys'); // Import keys (environment variables) for JWT

// @route   GET /auth/google
// @desc    Redirects the user to Google for authentication
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @route   GET /auth/google/callback
// @desc    Callback route that Google redirects to after user authentication
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }), // Authenticate without creating a session
  (req, res) => {
    // Create a JWT token for the authenticated user
    const payload = { id: req.user.id, name: req.user.displayName }; // Payload with user info
    jwt.sign(
      payload,
      keys.jwtSecret, // Sign the JWT with the secret key
      { expiresIn: 3600 }, // Set token expiration time to 1 hour
      (err, token) => {
        if (err) throw err; // Handle any errors during token generation
        res.redirect(`http://localhost:3000/login?token=${token}`); // Redirect to the frontend with the token
      }
    );
  }
);

module.exports = router; // Export the router for use in server.js
