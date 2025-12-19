import { initNavbar } from "../components/navbar.js";
import { initCarousel } from "../components/carousel.js";

function initAccommodationPage() {
    initNavbar();
    initCarousel();
}

document.addEventListener("DOMContentLoaded", initAccommodationPage);
