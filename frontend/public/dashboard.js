document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    const employeeFormBtn = document.getElementById('employeeFormBtn');
    const employeeListBtn = document.getElementById('employeeListBtn');
    const employeeFormSection = document.getElementById('employeeFormSection');
    const employeeListSection = document.getElementById('employeeListSection');
    const employeeListElement = document.getElementById('employeeList');
    
    // Greet the user based on time of day
    const hours = new Date().getHours();
    const greeting = hours < 12 ? 'Good Morning' :
                     hours < 18 ? 'Good Afternoon' : 'Good Evening';
    document.querySelector('h1').innerText = `${greeting}, Welcome to the Dashboard`;

    // Employee Form Button - Show the employee form section
    employeeFormBtn.addEventListener('click', function() {
        employeeListSection.style.display = 'none';
        employeeFormSection.style.display = 'block';
    });

    // Employee List Button - Show the employee list section and fetch employees
    employeeListBtn.addEventListener('click', function() {
        employeeFormSection.style.display = 'none';
        employeeListSection.style.display = 'block';
        fetchEmployeeList();
    });

    // Logout Button - Perform logout actions
    logoutBtn.addEventListener('click', () => {
        alert('You have been logged out.');
        window.location.href = 'login.html'; // Redirect to login page
    });

    // Simulated function to fetch employee list (replace with actual API call)
    function fetchEmployeeList() {
        const employees = [

        ];

        employeeListElement.innerHTML = '';  // Clear existing list

        employees.forEach(employee => {
            const li = document.createElement('li');
            li.innerHTML = `
                <p><strong>Name:</strong> ${employee.name}</p>
                <p><strong>Email:</strong> ${employee.email}</p>
                <p><strong>Mobile:</strong> ${employee.mobile}</p>
                <p><strong>Designation:</strong> ${employee.designation}</p>
                <p><strong>Gender:</strong> ${employee.gender}</p>
                <p><strong>Course:</strong> ${employee.course}</p>
                <img src="${employee.imgUpload}" alt="Employee" width="100" />
            `;
            employeeListElement.appendChild(li);
        });
    }

    // Background color animation
    setInterval(() => {
        document.body.style.background = `linear-gradient(135deg, 
            rgb(${Math.floor(Math.random() * 255)}, 
                ${Math.floor(Math.random() * 255)}, 
                ${Math.floor(Math.random() * 255)}), 
            rgb(${Math.floor(Math.random() * 255)}, 
                ${Math.floor(Math.random() * 255)}, 
                ${Math.floor(Math.random() * 255)}))`;
    }, 5000); // Changes every 5 seconds
});
