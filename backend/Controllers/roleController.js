// controllers/roleController.js
const Role = require('../models/rolesModel');
const mongoose = require('mongoose');
const Permission = require('../models/permissionModel');


const { ObjectId } = mongoose.Types;


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
  
    try {
      console.log('Request Body:', req.body);
  
      // Validate permissions are valid ObjectIds
      const permissionsObjectIds = await Promise.all(permissions.map(async permission => {
        let existingPermission = await Permission.findOne({ name: permission });
  
        if (!existingPermission) {
          // If the permission doesn't exist, create it
          existingPermission = await Permission.create({ name: permission });
        }
  
        return existingPermission._id;
      }));
  
      const newRole = new Role({ name, permissions: permissionsObjectIds });
      await newRole.save();
  
      res.status(201).json({ message: 'Role created successfully', role: newRole });
    } catch (error) {
      console.error('Error creating role:', error);
      res.status(500).json({ message: 'Error creating role', error: error.message });
    }
  };