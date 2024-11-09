const express = require('express');
const multer = require('multer');
const { addEmployee, getEmployees, updateEmployee } = require('../controllers/employeeController');
const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Routes
router.post('/employees', upload.single('imgUpload'), addEmployee);
router.get('/employees', getEmployees);
router.put('/employees/:id', upload.single('imgUpload'), updateEmployee);

module.exports = router;
