const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ensure User model is imported correctly
const bcrypt = require('bcryptjs');

// Register endpoint
router.post('/register', async (req, res) => {
    const { name, password } = req.body;

    // Validate inputs
    if (!name || !password) {
        return res.status(400).json({ message: "Name and password are required." });
    }

    try {
        // Check for duplicate username
        const existingUser = await User.findOne({ username: name });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists. Please choose another." });
        }

        // Hash password and create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username: name, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: "Username already exists." });
        } else {
            console.error("Registration error:", error);
            res.status(500).json({ message: "An error occurred. Please try again later." });
        }
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    const { name, password } = req.body;

    // Validate inputs
    if (!name || !password) {
        return res.status(400).json({ message: "Name and password are required." });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ username: name });
        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password." });
        }

        // Successful login
        res.status(200).json({ message: "Login successful!" });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "An error occurred. Please try again later." });
    }
});

module.exports = router;
