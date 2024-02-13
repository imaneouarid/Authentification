// routes/UserRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const authorize = require('../Middlewares/authorize'); // Adjust the path accordingly


router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/',authController.getuser);
router.delete('/:userId',  authorize(['admin']),authController.deleteUser)

module.exports = router;