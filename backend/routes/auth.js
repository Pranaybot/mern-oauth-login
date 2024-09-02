const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const keys = require('../config/keys');

// @route   GET /auth/google
// @desc    Authenticate user with Google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @route   GET /auth/google/callback
// @desc    Google auth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const payload = { id: req.user.id, name: req.user.displayName };
    jwt.sign(
      payload,
      keys.jwtSecret,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.redirect(`http://localhost:3000/login?token=${token}`);
      }
    );
  }
);

module.exports = router;
