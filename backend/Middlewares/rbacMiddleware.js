// rbacMiddleware.js

const checkPermissions = (requiredPermissions) => {
    return (req, res, next) => {
      // Check if user has the required permissions
      const userPermissions = req.user.roles; // Assuming user roles are stored in the 'roles' property
  
      const hasRequiredPermissions = requiredPermissions.every(
        (permission) => userPermissions.includes(permission)
      );
  
      if (hasRequiredPermissions) {
        // User has the required permissions, allow access
        next();
      } else {
        // User does not have the required permissions, send forbidden response
        res.status(403).json({ message: 'Forbidden' });
      }
    };
  };
  
  module.exports = checkPermissions;
  