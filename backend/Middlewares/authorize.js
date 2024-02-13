// middleware/authorize.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authorize = (allowedRoles) => {
  return (req, res, next) => {
    // Extract token from request headers
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }

    const token = authorizationHeader.split(' ')[1];
    console.log('Received Token:', req.headers.authorization);

    try {
      // Verify the token
      console.log("Token:", token);
      const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
      console.log('Decoded Token:', decodedToken);

      const { userId, username, roles } = decodedToken;
      console.log('UserID:', userId);
      console.log('User Roles:', roles);
      console.log('Allowed Roles:', allowedRoles);
console.log('User Roles:', roles);


      // Check if user has the required role
      if (!roles || !allowedRoles.some((allowedRole) => roles.includes(allowedRole))) {
        console.log('Forbidden: Insufficient permissions');
        return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
      }

      // Pass the user's information to the request for further use
      req.user = { userId, username, roles };
      next();
    } catch (error) {
      console.error('Error during token verification:', error);
      res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  };
};

module.exports = authorize;
