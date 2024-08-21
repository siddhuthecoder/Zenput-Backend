const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();

// User registration
router.post('/register', userController.registerUser);

// User login
router.post('/login', userController.loginUser);

// Get user profile
router.get('/profile', authMiddleware, userController.getUserProfile);

// Update user profile
router.put('/profile', authMiddleware, userController.updateUserProfile);

// Get all users (admin only)
router.get('/allusers', authMiddleware, userController.getAllUsers);

module.exports = router;
