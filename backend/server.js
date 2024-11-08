const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Import the updated auth routes

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/employee', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Define User schema and model, checking if already defined
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Check if the model is already defined, if so, use it, otherwise define it
const User = mongoose.models.User || mongoose.model('User', userSchema);

// Register endpoint
app.post('/api/register', async (req, res) => {
    const { name, password } = req.body;

    // Validate input fields
    if (!name || !password) {
        return res.status(400).json({ message: "Name and password are required." });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ name });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Hash password and create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        if (error.code === 11000) {
            // Handle duplicate key error
            return res.status(400).json({ message: "Username is already taken." });
        }
        console.error("Registration error:", error);
        res.status(500).json({ message: "An error occurred. Please try again later." });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { name, password } = req.body;

    // Validate input fields
    if (!name || !password) {
        return res.status(400).json({ message: "Name and password are required." });
    }

    try {
        // Find user by name
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }

        // Check if the password is correct
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

// Use the auth routes
app.use('/api', authRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
