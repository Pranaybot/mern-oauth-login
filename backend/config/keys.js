// This file exports the keys (environment variables) required for the application

module.exports = {
  mongoURI: process.env.MONGO_URI, // MongoDB connection string
  jwtSecret: process.env.JWT_SECRET, // Secret key for JWT token generation
  googleClientID: process.env.GOOGLE_CLIENT_ID, // Google OAuth Client ID
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google OAuth Client Secret
};
