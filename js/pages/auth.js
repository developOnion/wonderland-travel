const hamburgerMenu = document.querySelector(".header__hamburger-menu");
const nav = document.querySelector(".nav");
const closeBtn = document.querySelector(".nav__close-btn");

hamburgerMenu?.addEventListener("click", () => {
    nav?.classList.add("nav--open");
});

closeBtn?.addEventListener("click", () => {
    nav?.classList.remove("nav--open");
});

const signInForm = document.getElementById("sign-in-form");
signInForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(signInForm);
    const data = Object.fromEntries(formData);
    console.log("Sign In:", data);
});

const signUpForm = document.getElementById("sign-up-form");
signUpForm?.addEventListener("submit", (e) => {
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
