
document.querySelector('.signupBtn').addEventListener('click', async () => {
    const name = document.getElementById('signupName').value;
    const password = document.getElementById('signupPassword').value;

    // Validate inputs
    if (!name || !password) {
        alert("Please enter both name and password");
        return;
    }

    try {
        // Send signup request to backend
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registration successful! Please login.");
            window.location.href = "/index.html"; // Redirect to the login page
        } else {
            alert(data.message || "Registration failed. Please try again.");
        }
    } catch (error) {
        console.error("Error during registration:", error);
        alert("An error occurred. Please try again later.");
    }
});
