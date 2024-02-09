// controllers/roleController.js
const Role = require('../models/rolesModel');

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ message: 'Error fetching roles' });
  }
};

exports.createRole = async (req, res) => {
    const { name, permissions } = req.body;
    console.log('Received Request Body:', req.body); // Add this line for logging
    console.log('Parsed JSON Object:', { name, permissions });
    // console.log('Raw Request Payload:', req.body);

  
    try {
        console.log('Request Body:', req.body);  
      const newRole = new Role({ name, permissions });
      await newRole.save();
  
      res.status(201).json({ message: 'Role created successfully', role: newRole });
    } catch (error) {
      console.error('Error creating role:', error);
      res.status(500).json({ message: 'Error creating role' });
    }
  };