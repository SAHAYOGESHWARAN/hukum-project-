document.addEventListener('DOMContentLoaded', fetchEmployees);

async function fetchEmployees() {
    const loadingElement = document.getElementById('loading');
    const employeeListElement = document.getElementById('employeeList');
    
    try {
        const response = await fetch('/api/employees');
        if (!response.ok) {
            throw new Error('Failed to fetch employees');
        }

        const employees = await response.json();
        loadingElement.style.display = 'none'; // Hide the loading text

        if (employees.length === 0) {
            employeeListElement.innerHTML = '<li>No employees found.</li>';
        } else {
            employees.forEach(employee => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <p><strong>Name:</strong> ${employee.name}</p>
                    <p><strong>Email:</strong> ${employee.email}</p>
                    <p><strong>Mobile:</strong> ${employee.mobile}</p>
                    <p><strong>Designation:</strong> ${employee.designation}</p>
                    <p><strong>Gender:</strong> ${employee.gender}</p>
                    <p><strong>Course:</strong> ${employee.course}</p>
                    <img src="${employee.imgUpload ? '/' + employee.imgUpload : '/uploads/default-image.png'}" alt="Employee Image" />
                    <button onclick="editEmployee('${employee._id}')">Edit</button>
                `;
                employeeListElement.appendChild(li);
            });
        }
    } catch (error) {
        console.error(error);
        loadingElement.textContent = 'Could not load employees. Please try again later.';
    }
}

function editEmployee(employeeId) {
    alert('Editing employee with ID: ' + employeeId);
    // Implement redirect or load employee data for editing here
}
