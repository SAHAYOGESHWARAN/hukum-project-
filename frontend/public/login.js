
document.querySelector('.loginBtn').addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;

    // Validate inputs
    if (!name || !password) {
        alert("Please enter both name and password");
        return;
    }

    try {
        // Send login request to backend
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Login successful!");
            window.location.href = "/dashboard.html"; // Redirect to the dashboard page
        } else {
            alert(data.message || "Login failed, please try again.");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again later.");
    }
});
