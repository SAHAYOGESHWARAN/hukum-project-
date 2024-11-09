document.querySelector('.signupBtn').addEventListener('click', async () => {
    const name = document.getElementById('signupName').value.trim();
    const password = document.getElementById('signupPassword').value.trim();

    // Validate inputs
    if (!name || !password) {
        alert("Please enter both name and password.");
        return;
    }

    try {
        // Send signup request to backend
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, password })
        });

        // Check for server response
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Server error:", errorData);
            alert(errorData.message || "Registration failed. Please try again.");
            return;
        }

        // Attempt to parse the JSON response
        let data;
        try {
            data = await response.json();
        } catch (err) {
            console.error("Could not parse JSON:", err);
            alert("An error occurred with the response format.");
            return;
        }

        if (response.ok) {
            alert("Registration successful! Please login.");
            window.location.href = "/index.html"; // Redirect to the login page
        }
    } catch (error) {
        console.error("Error during registration:", error);
        alert("An error occurred. Please try again later.");
    }
});
