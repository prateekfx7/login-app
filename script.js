   // Check if user is already logged in
   window.onload = function() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        showSecuredContent();
    }
}

function toggleForms() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

function register() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    if (!name || !email || !password) {
        alert('Please fill in all fields');
        return;
    }

    // Get existing users or initialize empty array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.find(user => user.email === email)) {
        alert('User already exists');
        return;
    }

    // Add new user
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Registration successful! Please login.');
    toggleForms();
}

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', email);
        showSecuredContent();
    } else {
        alert('Invalid credentials');
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    document.getElementById('secured-content').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
}

function showSecuredContent() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('secured-content').style.display = 'block';
}