document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const userDisplay = document.getElementById('user-display');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                alert('Inicio de sesión exitoso');
                window.location.href = 'index.html';
            } else {
                alert('Correo electrónico o contraseña incorrectos');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some(user => user.email === email);

            if (userExists) {
                alert('El usuario ya está registrado');
            } else {
                const newUser = { name, email, password };
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                alert('Registro exitoso');
                window.location.href = 'login.html';
            }
        });
    }

    if (userDisplay) {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (loggedInUser) {
            userDisplay.innerText = `Bienvenido, ${loggedInUser.name}`;
        } else {
            userDisplay.innerText = '';
        }
    }
});

function addToCart(courseName) {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        alert('Debes iniciar sesión para agregar cursos al carrito');
        window.location.href = 'login.html';
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(courseName);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${courseName} ha sido añadido al carrito.`);
    window.location.href = 'carrito.html';
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}
