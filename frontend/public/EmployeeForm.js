async function fetchEmployeeList() {
    try {
        const response = await fetch('http://localhost:5000/api/employees');
        if (!response.ok) throw new Error('Failed to fetch employees.');

        const employees = await response.json();
        const employeeListElement = document.getElementById('employeeList');
        employeeListElement.innerHTML = ''; // Clear existing list

        employees.forEach(employee => {
            const li = document.createElement('li');
            li.innerHTML = `
                <p><strong>Name:</strong> ${employee.name}</p>
                <p><strong>Email:</strong> ${employee.email}</p>
                <p><strong>Mobile:</strong> ${employee.mobile}</p>
                <p><strong>Designation:</strong> ${employee.designation}</p>
                <p><strong>Gender:</strong> ${employee.gender}</p>
                <p><strong>Course:</strong> ${employee.course}</p>
                <img src="${employee.imgUpload ? '/' + employee.imgUpload : '/uploads/default-image.png'}" alt="Employee Image" width="100" />
                <button onclick="editEmployee('${employee._id}')">Edit</button>
            `;
            employeeListElement.appendChild(li);
        });
    } catch (error) {
        // console.error('Error fetching employees:', error);
        // alert('Could not load employees. Please try again later.');
    }
}

// Handle form submission
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
            alert(data.message || 'Failed to register employee.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while registering employee.');
    }
});

// Logout function (example)
function logout() {
    alert('Logged out');
    // Implement actual logout logic here
}


