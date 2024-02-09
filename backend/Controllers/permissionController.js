// controllers/permissionController.js
const Permission = require('../models/permissionModel');

exports.getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.json(permissions);
  } catch (error) {
    console.error('Error fetching permissions:', error);
    res.status(500).json({ message: 'Error fetching permissions' });
  }
};
exports.createPermission = async (req, res) => {
    const { name } = req.body;
  
    try {
      const newPermission = new Permission({ name });
      await newPermission.save();
  
      res.status(201).json({ message: 'Permission created successfully', permission: newPermission });
    } catch (error) {
      console.error('Error creating permission:', error);
      res.status(500).json({ message: 'Error creating permission' });
    }
  };
