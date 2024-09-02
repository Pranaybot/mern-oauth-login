const GoogleStrategy = require('passport-google-oauth20').Strategy; // Google OAuth 2.0 strategy for Passport
const mongoose = require('mongoose'); // Mongoose to interact with MongoDB
const User = mongoose.model('users'); // User model to store/retrieve users from MongoDB
const keys = require('./keys'); // Import keys from the config file

// Export a function to configure Passport.js
module.exports = (passport) => {
  // Define the Google OAuth strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID, // Client ID from Google Developer Console
        clientSecret: keys.googleClientSecret, // Client Secret from Google Developer Console
        callbackURL: '/auth/google/callback', // Callback URL after Google authenticates the user
      },
      async (accessToken, refreshToken, profile, done) => {
        // Extract user profile information returned by Google
        const newUser = {
          googleId: profile.id, // Google user ID
          displayName: profile.displayName, // User's display name
          firstName: profile.name.givenName, // User's first name
          lastName: profile.name.familyName, // User's last name
          image: profile.photos[0].value, // User's profile image URL
        };

        try {
          // Check if the user already exists in the database
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            done(null, user); // User found, proceed with authentication
          } else {
            // If user doesn't exist, create a new user in the database
            user = await new User(newUser).save();
            done(null, user); // New user created, proceed with authentication
          }
        } catch (err) {
          console.error(err); // Log any errors
        }
      }
    )
  );

  // Serialize user information into the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user information from the session
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user)); // Retrieve user by ID from the database
  });
};
