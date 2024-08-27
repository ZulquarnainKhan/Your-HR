const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/create', userController.createUser);

// Display all users
router.get('/', userController.getAllUsers);

// Display user by userId
router.post('/getById', userController.getUserById);

// Delete all users
router.delete('/', userController.deleteAllUsers);

// Delete user by userId
router.delete('/deleteById', userController.deleteUserById);

// Login user
router.post('/login', userController.loginUser);

module.exports = router;
