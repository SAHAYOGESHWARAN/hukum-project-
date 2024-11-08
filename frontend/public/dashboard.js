document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');

    // Greet the user based on time of day
    const hours = new Date().getHours();
    const greeting = hours < 12 ? 'Good Morning' :
                     hours < 18 ? 'Good Afternoon' : 'Good Evening';
    document.querySelector('h1').innerText = `${greeting}, Welcome to the Dashboard`;

    // Logout button event listener
    logoutBtn.addEventListener('click', () => {
        // Perform logout actions
        alert('You have been logged out.');
        window.location.href = 'login.html'; // Redirect to login page
    });

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
