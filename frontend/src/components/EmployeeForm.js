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
    const [progressVisible, setProgressVisible] = useState(false);
    const [progressWidth, setProgressWidth] = useState(0);

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

        // Simulate progress
        setProgressVisible(true);
        let width = 0;
        const interval = setInterval(() => {
            if (width < 100) {
                width += 20;
                setProgressWidth(width);
            } else {
                clearInterval(interval);
            }
        }, 500);

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
        } finally {
            setProgressVisible(false);
            setProgressWidth(0);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`employee-form ${progressVisible ? 'loading' : ''}`}>
            <ul>
                <li>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                </li>
                <li>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                </li>
                <li>
                    <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="Mobile"
                        required
                    />
                </li>
                <li>
                    <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        placeholder="Designation"
                        required
                    />
                </li>
                <li>
                    <div>
                        <label>Gender:</label>
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={formData.gender === 'Male'}
                            onChange={handleChange}
                        />
                        Male
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={formData.gender === 'Female'}
                            onChange={handleChange}
                        />
                        Female
                    </div>
                </li>
                <li>
                    <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Course</option>
                        <option value="MSC">MSC</option>
                        <option value="MCS">MCS</option>
                        <option value="BSC">BSC</option>
                    </select>
                </li>
                <li>
                    <input
                        type="file"
                        name="imgUpload"
                        onChange={handleFileChange}
                        accept="image/jpeg, image/png, image/jpg"
                    />
                </li>
                {progressVisible && (
                    <div className="progress">
                        <div className="progress-bar" style={{ width: `${progressWidth}%` }}></div>
                    </div>
                )}
                <li>
                    <button type="submit">Save Employee</button>
                </li>
            </ul>
        </form>
    );
};

export default EmployeeForm;
