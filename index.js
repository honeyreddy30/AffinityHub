document.addEventListener('DOMContentLoaded', function() {
    // Redirect if not logged in and trying to access restricted pages
    redirectIfNotLoggedIn();
    handleLoginForm();
    handleSignupForm();
    handleLogout();
});

function redirectIfNotLoggedIn() {
    const currentUser = localStorage.getItem('currentUser');
    const onPublicPage = location.href.endsWith('description.html') || location.href.endsWith('index.html');

    if (!currentUser && !onPublicPage) {
        window.location.href = 'index.html';
    }
}

function handleLoginForm() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('login-username').value;
            loginUser(username);
        });
    }
}

function handleSignupForm() {
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('signup-username').value;
            signupUser(username);
        });
    }
}

function handleLogout() {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', logOutUser);
    }
}

function loginUser(username) {
    const userData = JSON.parse(localStorage.getItem(username));
    if (userData) {
        localStorage.setItem('currentUser', username);
        window.location.href = 'user.html';
    } else {
        alert("User not found. Please sign up.");
    }
}

function signupUser(username) {
    if (localStorage.getItem(username)) {
        alert("User already exists. Please log in.");
    } else {
        const userData = { joinedClubs: [], interests: [] };
        localStorage.setItem(username, JSON.stringify(userData));
        localStorage.setItem('currentUser', username);
        window.location.href = 'user.html';
    }
}

function logOutUser() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function personalizeContent() {
    const personalizedGreeting = document.getElementById('personalizedGreeting');
    if (personalizedGreeting) {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const userData = JSON.parse(localStorage.getItem(currentUser));
            personalizedGreeting.innerHTML = `<h2>Welcome back, ${userData.username || currentUser}!</h2>`;
        } else {
            personalizedGreeting.innerHTML = `<h2>Welcome to our site!</h2>`;
        }
    }
}


if (document.getElementById('personalizedGreeting')) {
    personalizeContent();
}








