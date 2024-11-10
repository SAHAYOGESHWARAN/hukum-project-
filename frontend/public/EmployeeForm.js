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


// Initial fetch
fetchEmployeeList();

// Logout function (example)
function logout() {
    alert('Logged out');
    // Implement actual logout logic here
}
