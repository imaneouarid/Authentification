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

  try {
    const role = new Role({ name, permissions });
    await role.save();

    res.status(201).json({ message: 'Role created successfully' });
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ message: 'Error creating role' });
  }
};