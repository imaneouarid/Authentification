// controllers/authController.js
const User = require('../models/userModel');
const Role = require('../models/rolesModel');
const jwt = require('jsonwebtoken');
const checkPermissions = require('../Middlewares/checkPermissions');


require('dotenv').config();


exports.registerUser = async (req, res) => {
    const { username, email, password, roles } = req.body;
  
    try {
      // Check if the user with the given email or username already exists
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  
      if (existingUser) {
        // User with the same email or username already exists
        return res.status(409).json({ error: 'User with this email or username already exists' });
      }
  
      // Map role names to role IDs
      const roleIds = await Promise.all(
        roles.map(async (role) => {
          let existingRole = await Role.findOne({ name: role }).select('_id');
          if (!existingRole) {
            // If a role does not exist, you can handle it based on your application logic
            existingRole = await Role.create({ name: role });
          }
          return existingRole._id;
        })
      );
  
      // Create a new user with role IDs
      const user = new User({ username, email, password, roles: roles || [] });
      await user.save();
  
      // Respond with success
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      // Handle other errors
      console.error('Error during user registration:', error);
      res.status(500).json({ message: 'Error during user registration', error: error.message });
    }
  };
  
exports.getuser=async(req,res)=>{
    try {
        const users = await User.find({}).populate('roles', 'name').select('username email roles');
        res.json(users);
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    };



exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password }).populate('roles');;

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'Invalid username or password' });
    }
    console.log('User before roles check:', user);

    if (!user.roles) {
      console.log('User roles not found')
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    console.log('User after roles check:', user);

    // Check if user has roles before accessing the 'roles' property
    const roles = user.roles.map(role => role.toString());

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, username, roles: roles }, process.env.SECRET_TOKEN, { expiresIn: '1h' });

    res.json({ user,token,roles });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error during login' });
  }
};
exports.deleteUser = async (req, res) => {
    const userId = req.params.userId;
    const currentUserId = req.user.id; // Assuming you have middleware to extract user information from the token
  
    // Apply the 'DELETE_USER' permission check
    checkPermissions(req, res, async () => {
      // This function will be called if the user has the required permission
  
      try {
        const deletedUser = await User.findByIdAndDelete(userId);
  
        if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        res.status(200).json({ deletedUser, message: 'User deleted successfully' });
      } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }, 'DELETE_USER'); // Pass the required permission as an argument to the middleware
  };
