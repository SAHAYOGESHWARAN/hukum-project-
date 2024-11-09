const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./config/db'); // Make sure to have this file set up for MongoDB connection
const employeeRoutes = require('./routes/employeeRoutes'); // Assuming employee routes are set up correctly

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create the Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Built-in JSON parser
app.use(bodyParser.json()); // For handling JSON bodies
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Example in-memory user data (for demonstration purposes)
const users = [
    { name: 'JohnDoe', password: 'password123' }, // Example user for login
];

// POST route for user registration
app.post('/api/register', (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ message: 'Please provide both name and password.' });
    }

    // Simulate saving to a database (In a real-world scenario, use MongoDB or other DB)
    users.push({ name, password });

    // Respond with success message
    res.status(200).json({ message: 'Registration successful!' });
});

// POST route for user login
app.post('/api/login', (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ message: 'Please provide both name and password.' });
    }

    // Find the user with matching credentials
    const user = users.find(u => u.name === name && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials. Please try again.' });
    }

    // Respond with success message
    res.status(200).json({ message: 'Login successful!' });
});

// Use employee-related routes
app.use('/api/employees', employeeRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
