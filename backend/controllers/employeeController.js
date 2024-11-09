const Employee = require('../models/Employee');

// Add new employee
exports.addEmployee = async (req, res) => {
    try {
        const { name, email, mobile, designation, gender, course } = req.body;
        const imgUpload = req.file ? req.file.path : null;

        const newEmployee = new Employee({ name, email, mobile, designation, gender, course, imgUpload });
        await newEmployee.save();

        res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
    } catch (error) {
        console.error('Add employee error:', error);
        res.status(500).json({ message: 'An error occurred while adding the employee.' });
    }
};

// Get all employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error('Get employees error:', error);
        res.status(500).json({ message: 'An error occurred while retrieving employees.' });
    }
};

// Update employee
exports.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, mobile, designation, gender, course } = req.body;
        const imgUpload = req.file ? req.file.path : req.body.imgUpload;

        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { name, email, mobile, designation, gender, course, imgUpload },
            { new: true }
        );

        res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
    } catch (error) {
        console.error('Update employee error:', error);
        res.status(500).json({ message: 'An error occurred while updating the employee.' });
    }
};
