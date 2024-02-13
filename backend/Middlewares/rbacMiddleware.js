// rbacMiddleware.js

const checkPermissions = (requiredPermissions) => {
    return (req, res, next) => {
        // Check if user has the required permissions
        const userRoles = req.user.roles;

        if (userRoles.includes('admin')) {
            // Admin has all permissions, allow access
            next();
        } else {
            // User does not have the required permissions, send forbidden response
            res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        }
    };
};

  
  // Function to fetch permissions associated with user roles
  const getUserPermissionsFromRoles = (userRoles) => {
    // Replace this with logic to fetch permissions associated with roles from your data store
    // For simplicity, this example assumes roles directly contain permissions
    return userRoles;
  };
  
  module.exports = checkPermissions;
  
  