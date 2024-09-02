const jwt = require('jsonwebtoken'); // Import JWT for token verification
const keys = require('../config/keys'); // Import keys for JWT secret

// Middleware function to verify JWT token and protect routes
module.exports = function (req, res, next) {
  const token = req.header('x-auth-token'); // Get the token from the request header
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' }); // Return an error if no token is found
  }

  try {
    const decoded = jwt.verify(token, keys.jwtSecret); // Verify the token using the secret key
    req.user = decoded; // Attach the decoded user info to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' }); // Return an error if the token is invalid
  }
};
