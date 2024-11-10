
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Initialize dotenv for environment variables
dotenv.config();

// Create the Express app
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/employee', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB:', err));

// Middleware
app.use(cors());
app.use(express.json()); // Built-in JSON parser
app.use(bodyParser.json()); // For handling JSON bodies
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploads folder

// Define Schema for Employee data
const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: String,
    designation: String,
    gender: String,
    course: String,
    imgUpload: String, // Store file path for image
});

const Employee = mongoose.model('Employee', employeeSchema);

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath); // Create uploads folder if it doesn't exist
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filename
    },
});

const upload = multer({ storage: storage });

// POST route to add an employee
app.post('/api/employees', upload.single('imgUpload'), async (req, res) => {
    try {
        const { name, email, mobile, designation, gender, course } = req.body;
        const imgUpload = req.file ? req.file.path : null;

        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }

        // Create a new employee document
        const newEmployee = new Employee({
            name,
            email,
            mobile,
            designation,
            gender,
            course,
            imgUpload,
        });

        await newEmployee.save();
        res.status(201).json({ message: 'Employee added successfully!' });
    } catch (error) {
        console.error('Error saving employee:', error);
        res.status(500).json({ message: 'Failed to add employee', error });
    }
});

// GET route to fetch all employees
app.get('/api/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ message: 'Failed to fetch employees', error });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
