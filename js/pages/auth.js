import { initNavbar } from "../components/navbar.js";

const signInForm = document.getElementById("sign-in-form");
const signUpForm = document.getElementById("sign-up-form");

function initAuth() {
    initNavbar();

    signInForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(signInForm);
        const data = Object.fromEntries(formData);
        console.log("Sign In:", data);
    });

    signUpForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(signUpForm);
        const data = Object.fromEntries(formData);

        if (data.password !== data.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (data.password.length < 8) {
            alert("Password must be at least 8 characters!");
            return;
        }

        console.log("Sign Up:", data);
    });
}

document.addEventListener("DOMContentLoaded", initAuth);
