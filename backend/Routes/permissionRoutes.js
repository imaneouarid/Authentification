// routes/permissionRoutes.js
const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');

router.get('/permissions', permissionController.getAllPermissions);

module.exports = router;
