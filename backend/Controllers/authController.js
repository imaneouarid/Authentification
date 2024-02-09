// controllers/authController.js
const User = require('../models/userModel');
const Role = require('../models/rolesModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.registerUser = async (req, res) => {
  const { username, email, password, roles } = req.body;

  try {
    // Check if the user with the given email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      // User with the same email already exists
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

    // Create a new user
    const user = new User({ username, email, password, roles });
    await user.save();

    // Respond with success
    res.status(201).json({ message: 'User registered successfully' });
    console.log(user);
  } catch (error) {
    // Handle other errors
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Error during user registration', error: error.message });
  }
};
exports.getuser=async(req,res)=>{
    try {
        const users = await User.find({}, 'username email roles'); // Only fetch necessary fields
        res.json(users);
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    };



exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ username, roles: user.roles },  process.env.SECRET_TOKEN, { expiresIn: '1h' });

    res.json({ user,token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error during login' });
  }
};

