const mongoose = require('mongoose'); // Import Mongoose to define a schema and model

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true, // Google ID is required
  },
  displayName: {
    type: String,
    required: true, // User's display name is required
  },
  firstName: {
    type: String,
    required: true, // User's first name is required
  },
  lastName: {
    type: String,
    required: true, // User's last name is required
  },
  image: {
    type: String, // URL of the user's profile image (optional)
  },
  date: {
    type: Date,
    default: Date.now, // Automatically set the date when the user is created
  },
});

// Export the User model for use in other parts of the application
module.exports = mongoose.model('users', UserSchema);
