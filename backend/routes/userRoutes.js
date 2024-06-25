const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new user
router.post('/users', async (req, res) => {
  console.log('POST /users called with data:', req.body); // Log request data
  try {
    const { username, roomUrl } = req.body;
    const newUser = new User({ username, roomUrl });
    await newUser.save();
    console.log('User saved:', newUser); // Log saved user
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error saving user:', err); // Log any errors
    res.status(500).json({ error: err.message });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
