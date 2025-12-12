const nav = document.querySelector(".nav");
const hamburgerMenu = document.querySelector(".header__hamburger-menu");
const closeBtnNav = document.querySelector(".nav__close-btn");

export function initNavbar() {
    hamburgerMenu.addEventListener("click", showSideNav);
    closeBtnNav.addEventListener("click", hideSideNav);
}

function showSideNav() {
    nav.style.display = "block";
}

function hideSideNav() {
    nav.style.display = "none";
}
