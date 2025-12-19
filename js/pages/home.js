import { initNavbar } from "../components/navbar.js";
import { initCarousel } from "../components/carousel.js";

function initHomePage() {
    initNavbar();
    initCarousel();
}

document.addEventListener("DOMContentLoaded", initHomePage);
