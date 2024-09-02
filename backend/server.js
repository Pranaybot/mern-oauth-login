const express = require('express'); // Import Express.js to create the server
const mongoose = require('mongoose'); // Import Mongoose to interact with MongoDB
const passport = require('passport'); // Import Passport.js for authentication
const dotenv = require('dotenv'); // Import dotenv to load environment variables

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Passport Configuration: Load Passport strategies
require('./config/passport')

// MongoDB Connection using Mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected')) // Success message if connected
  .catch((err) => console.log(err)); // Log any errors

// Routes for authentication
app.use('/auth', require('./routes/auth'));

// Set the server to listen on the specified port (5000 by default)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
