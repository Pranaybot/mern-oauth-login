// backend/config/passport.js
const passport = require('passport'); // Import passport
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Import Google OAuth strategy
const mongoose = require('mongoose'); // Import mongoose
const User = require('../models/User'); // Import the User model

// Configure Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // Google client ID from environment variables
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google client secret from environment variables
      callbackURL: '/auth/google/callback', // Callback URL for Google OAuth
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          done(null, user); // If user exists, return the user
        } else {
          // If user doesn't exist, create a new user
          user = await User.create({
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value,
          });
          done(null, user); // Return the newly created user
        }
      } catch (err) {
        console.error(err);
        done(err, null); // Handle any errors
      }
    }
  )
);

// Serialize the user into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize the user from the session
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});
