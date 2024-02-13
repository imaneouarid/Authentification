//checkPermissions
const User = require('../models/userModel');
const Permission = require('../models/permissionModel');

const checkPermissions = async (req, res, next, requiredPermission) => {
    const userId = req.user.id; // Assuming user information is in the request
    console.log('UserID:', userId); 
  
    try {
     // Add this line for debugging
  
      // Fetch the user's permissions from the database
      const userPermissions = await getUserPermissions(userId);
  
      console.log('User Permissions:', userPermissions);
  
      if (userPermissions.length === 0) {
        // No permissions found, handle this case
        return res.status(403).json({ error: 'User has no roles or permissions' });
      }
  
      if (userPermissions.includes(requiredPermission)) {
        next(); // User has the required permission, proceed to the next middleware or route handler
      } else {
        res.status(403).json({ error: 'Permission denied' });
      }
    } catch (error) {
      console.error('Error checking permissions:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  

  const getUserPermissions = async (userId) => {
    try {
      // Fetch the user by user ID and populate the roles
      const user = await User.findById(userId).populate('roles');
  
      if (!user) {
        console.error(`User with ID '${userId}' not found`);
        return [];
      }
  
      // Check if roles are populated
      if (!user.roles || user.roles.length === 0) {
        console.error(`Roles not populated for the user with ID '${userId}'`);
        return [];
      }
  
      // Collect permissions from roles
      const permissions = user.roles.reduce((acc, role) => {
        return acc.concat(role.permissions.map(permission => permission.toString()));
      }, []);
  
      console.log(`User Permissions for user with ID '${userId}':`, permissions);
  
      return permissions;
    } catch (error) {
      console.error(`Error fetching user roles and permissions for user with ID '${userId}':`, error);
      return [];
    }
  };
  
  
module.exports = checkPermissions;
