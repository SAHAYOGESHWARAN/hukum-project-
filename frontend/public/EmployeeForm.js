import React, { useState } from 'react';
import axios from 'axios';

function CreateEmployee() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: 'HR',
        gender: '',
        course: [],
        imgUpload: null,
    });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Handle form change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle file upload
    const handleFileChange = (e) => {
        setFormData({ ...formData, imgUpload: e.target.files[0] });
    };

    // Handle checkbox change
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        const updatedCourses = checked
            ? [...formData.course, value]
            : formData.course.filter((course) => course !== value);
        setFormData({ ...formData, course: updatedCourses });
    };

    // Validate form inputs
    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.mobile || !formData.gender) {
            setMessage('All fields are required');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setMessage('Invalid email format');
            return false;
        }
        if (!/^\d{10}$/.test(formData.mobile)) {
            setMessage('Mobile number must be 10 digits');
            return false;
        }
        return true;
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form before submitting
        if (!validateForm()) return;

        // Prepare form data for sending
        const formDataToSend = new FormData();
        for (const key in formData) {
            if (key === 'course') {
                formData.course.forEach(course => formDataToSend.append('course[]', course));
            } else {
                formDataToSend.append(key, formData[key]);
            }
        }

        setMessage('');
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/employees/create', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                setMessage('Employee created successfully!');
                setFormData({
                    name: '',
                    email: '',
                    mobile: '',
                    designation: 'HR',
                    gender: '',
                    course: [],
                    imgUpload: null,
                });
            } else {
                setMessage(response.data.message || 'Failed to create employee');
            }
        } catch (error) {
            setMessage(error.response?.data?.error || 'Error creating employee');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="create-employee-form">
            <h2>Create Employee</h2>
            
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                aria-required="true"
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                aria-required="true"
            />

            <input
                type="text"
                name="mobile"
                placeholder="Mobile No (10 digits)"
                value={formData.mobile}
                onChange={handleChange}
                aria-required="true"
            />

            <select name="designation" value={formData.designation} onChange={handleChange} aria-required="true">
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
            </select>
           <p>sex </p>
            <div className="radio-group">
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="M"
                        checked={formData.gender === 'M'}
                        onChange={handleChange}
                        aria-required="true"
                    /> Male
                </label>
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="F"
                        checked={formData.gender === 'F'}
                        onChange={handleChange}
                        aria-required="true"
                    /> Female
                </label>
            </div>
            <p> Cource</p>
            <div className="checkbox-group">
                <label>
                    <input
                        type="checkbox"
                        name="course"
                        value="MCA"
                        checked={formData.course.includes('MCA')}
                        onChange={handleCheckboxChange}
                    /> MCA
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="course"
                        value="BCA"
                        checked={formData.course.includes('BCA')}
                        onChange={handleCheckboxChange}
                    /> BCA
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="course"
                        value="BSC"
                        checked={formData.course.includes('BSC')}
                        onChange={handleCheckboxChange}
                    /> BSC
                </label>
            </div>

            <input type="file" name="imgUpload" accept=".jpg,.png" onChange={handleFileChange} />

            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Submit'}
            </button>

            {message && (
                <p className={`message ${isLoading ? 'loading' : ''}`} aria-live="polite">
                    {message}
                </p>
            )}
        </form>
    );
}

export default CreateEmployee;
