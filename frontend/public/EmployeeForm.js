document.getElementById('employeeForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(document.getElementById('employeeForm'));
    try {
        const response = await fetch('http://localhost:5000/api/employees', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Employee registered successfully!');
            document.getElementById('employeeForm').reset();
            fetchEmployeeList();
        } else {
            const data = await response.json();
            alert(data.message || 'Failed to register employee');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while registering employee.');
    }
});

// Fetch and display employees
async function fetchEmployeeList() {
    const response = await fetch('http://localhost:5000/api/employees');
    const employees = await response.json();
    const employeeListElement = document.getElementById('app');
    employeeListElement.innerHTML = '';

    employees.forEach(employee => {
        const employeeCard = document.createElement('div');
        employeeCard.classList.add('employee-card');
        employeeCard.innerHTML = `
            <p><strong>Name:</strong> ${employee.name}</p>
            <p><strong>Email:</strong> ${employee.email}</p>
            <p><strong>Mobile:</strong> ${employee.mobile}</p>
            <p><strong>Designation:</strong> ${employee.designation}</p>
            <p><strong>Gender:</strong> ${employee.gender}</p>
            <p><strong>Course:</strong> ${employee.course}</p>
            <img src="http://localhost:5000/${employee.imgUpload}" alt="Employee Image" width="100">
        `;
        employeeListElement.appendChild(employeeCard);
    });
}

// Initial fetch
fetchEmployeeList();

// Logout function (example)
function logout() {
    alert('Logged out');
    // Implement actual logout logic here
}
