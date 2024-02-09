// routes/permissionRoutes.js
const express = require('express');
const router = express.Router();
const permissionController = require('../Controllers/permissionController');

router.get('/permissions', permissionController.getAllPermissions);
router.post('/permissions', permissionController.createPermission);


module.exports = router;
