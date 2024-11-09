const express = require('express');
const multer = require('multer');
const path = require('path');
const Employee = require('../models/Employee'); // Assuming your model is set up here

const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save uploaded files to the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the original file name
    }
});

// Multer file filter for image validation
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const isValidType = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (isValidType) {
        cb(null, true);
    } else {
        cb(new Error('Only JPEG, JPG, and PNG images are allowed'), false);
    }
};

const upload = multer({ storage, fileFilter });

// Route to add a new employee with image upload
router.post('/employees', upload.single('imgUpload'), async (req, res) => {
    const { name, email, mobile, designation, gender, course } = req.body;

    try {
        const newEmployee = new Employee({
            name,
            email,
            mobile,
            designation,
            gender,
            course,
            imgUpload: req.file ? req.file.filename : null // Store the image file name in the database
        });

        await newEmployee.save();
        res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
    } catch (error) {
        console.error("Error saving employee:", error);
        res.status(500).json({ message: 'Error adding employee', error });
    }
});

module.exports = router;
