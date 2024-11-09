import React, { useEffect, useState } from 'react';

const EmployeeList = ({ refresh, onEditEmployee }) => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetch('/api/employees')
            .then(res => res.json())
            .then(data => setEmployees(data))
            .catch(error => console.error('Error fetching employees:', error));
    }, [refresh]); // Refresh employee list when `refresh` changes

    return (
        <div>
            <h2>Employee List</h2>
            <ul>
                {employees.map(employee => (
                    <li key={employee._id}>
                        <p>Name: {employee.name}</p>
                        <p>Email: {employee.email}</p>
                        <p>Mobile: {employee.mobile}</p>
                        <p>Designation: {employee.designation}</p>
                        <p>Gender: {employee.gender}</p>
                        <p>Course: {employee.course}</p>
                        {employee.imgUpload && <img src={`/${employee.imgUpload}`} alt="Employee" width="100" />}
                        <button onClick={() => onEditEmployee(employee)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeList;
