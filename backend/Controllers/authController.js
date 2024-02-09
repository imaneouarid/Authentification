// controllers/authController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.registerUser = async (req, res) => {
  const { username, email, password, roles } = req.body;
  try {
    const user = new User({ username, email, password,roles });
    await user.save();
  
    res.status(201).json({ message: 'User registered successfully' });
    console.log(user);
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Error during user registration', error: error.message });
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

