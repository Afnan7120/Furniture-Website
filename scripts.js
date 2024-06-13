// scripts.js

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        validateLoginForm();
    });

    registerForm.addEventListener('button', (e) => {
        e.preventDefault();
        validateRegisterForm();
    });

    function validateLoginForm() {
        const uemail = document.getElementById('loginEmail');
        const password = document.getElementById('loginPassword');
        const emailError = document.getElementById('loginEmailError');
        const passwordError = document.getElementById('loginPasswordError');

        emailError.style.display = 'none';
        passwordError.style.display = 'none';

        let valid = true;

        if (!uemail.value) {
            emailError.textContent = 'Email is required';
            emailError.style.display = 'block';
            valid = false;
        }

        if (!password.value) {
            passwordError.textContent = 'Password is required';
            passwordError.style.display = 'block';
            valid = false;
        }

        if (valid) {
          
            localStorage.setItem("mydata",uemail);
           let getData = localStorage.getItem("mydata");
            console.log(getData)
            alert('Login successful');
         //   loginForm.reset();
        }
    }

    function validateRegisterForm() {
        const email = document.getElementById('registerEmail');
        const password = document.getElementById('registerPassword');
        const confirmPassword = document.getElementById('confirmPassword');
        const emailError = document.getElementById('registerEmailError');
        const passwordError = document.getElementById('registerPasswordError');
        const confirmPasswordError = document.getElementById('confirmPasswordError');

        emailError.style.display = 'none';
        passwordError.style.display = 'none';
        confirmPasswordError.style.display = 'none';

        let valid = true;

        if (!email.value) {
            emailError.textContent = 'Email is required';
            emailError.style.display = 'block';
            valid = false;
        }

        if (!password.value) {
            passwordError.textContent = 'Password is required';
            passwordError.style.display = 'block';
            valid = false;
        }

        if (password.value !== confirmPassword.value) {
            confirmPasswordError.textContent = 'Passwords do not match';
            confirmPasswordError.style.display = 'block';
            valid = false;
        }

        if (valid) {
            alert('Registration successful');
            registerForm.reset();
        }
    }
});