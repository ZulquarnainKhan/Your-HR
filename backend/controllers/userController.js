const UserData = require('../models/userModel');
const bcrypt = require('bcryptjs');  // For hashing passwords
const jwt = require('jsonwebtoken'); // For generating tokens
require('dotenv').config();

// Create a new user
exports.createUser = async (req, res) => {
  const { userId, userName, emailId, password } = req.body;

  try {
    // Check if user already exists
    const user = await UserData.findOne({ emailId });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new UserData({
      userId,
      userName,
      emailId,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Display all user details
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserData.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Display user details by userId
exports.getUserById = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await UserData.findOne({ userId });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Delete all users
exports.deleteAllUsers = async (req, res) => {
  try {
    await UserData.deleteMany({});
    res.status(200).json({ msg: 'All users deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Delete a user by userId
exports.deleteUserById = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await UserData.findOneAndDelete({ userId });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json({ msg: 'User deleted', user });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Validate user login
exports.loginUser = async (req, res) => {
  const { emailId, password } = req.body;

  try {
    // Validate input
    if (!emailId || !password) {
      return res.status(400).json({ msg: 'Email ID and password are required' });
    }

    // Find user by emailId
    const user = await UserData.findOne({ emailId });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = {
      userId: user.userId,
      emailId: user.emailId
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return success response
    res.status(200).json({user, token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};