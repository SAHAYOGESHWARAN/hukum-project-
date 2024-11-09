import React, { useState } from 'react';

const EmployeeForm = ({ existingEmployee, onSave }) => {
    const [formData, setFormData] = useState({
        name: existingEmployee?.name || '',
        email: existingEmployee?.email || '',
        mobile: existingEmployee?.mobile || '',
        designation: existingEmployee?.designation || '',
        gender: existingEmployee?.gender || '',
        course: existingEmployee?.course || '',
        imgUpload: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, imgUpload: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formPayload = new FormData();
        Object.keys(formData).forEach((key) => {
            formPayload.append(key, formData[key]);
        });

        try {
            const response = await fetch('/api/employees', {
                method: 'POST',
                body: formPayload
            });

            if (response.ok) {
                alert('Employee added successfully!');
                onSave();
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to add employee');
            }
        } catch (error) {
            console.error('Error adding employee:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" required />
            <input type="text" name="designation" value={formData.designation} onChange={handleChange} placeholder="Designation" required />
            <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" required />
            <input type="text" name="course" value={formData.course} onChange={handleChange} placeholder="Course" required />
            <input type="file" name="imgUpload" onChange={handleFileChange} accept="image/jpeg, image/png, image/jpg" />
            <button type="submit">Save Employee</button>
        </form>
    );
};

export default EmployeeForm;
