// middleware/authorize.js
const jwt = require('jsonwebtoken');
require('dotenv').config();


const authorize = (allowedRoles) => {
  return (req, res, next) => {
    // Extract token from request headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }

    try {
      // Verify the token
      const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
      const { roles } = decodedToken;

      // Check if user has the required role
      if (!roles || !allowedRoles.some((allowedRole) => roles.includes(allowedRole))) {
        return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
      }

      // Pass the user's roles to the request for further use
      req.user = { roles: decodedToken.roles };
      next();
    } catch (error) {
      console.error('Error during token verification:', error);
      res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  };
};

module.exports = authorize;
