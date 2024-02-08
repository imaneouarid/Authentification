// routes/roleRoutes.js
const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

router.get('/roles', roleController.getAllRoles);
router.post('/roles', roleController.createRole);

module.exports = router;
