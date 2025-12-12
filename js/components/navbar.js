const nav = document.querySelector(".nav");
const hamburgerMenu = document.querySelector(".header__hamburger-menu");
const closeBtnNav = document.querySelector(".nav__close-btn");
const largeScreen = window.matchMedia("(width > 1024px)");

export function initNavbar() {
    hamburgerMenu.addEventListener("click", toggleSideNav);
    closeBtnNav.addEventListener("click", toggleSideNav);
    largeScreen.addEventListener("change", handleViewportChange);
}

function handleViewportChange(event) {
    if (event.matches) nav.classList.remove("nav--open");
}

function toggleSideNav() {
    nav.classList.toggle("nav--open");
}
