import { initNavbar } from "../components/navbar.js";
import { initCarousel } from "../components/carousel.js";

function initTripPage() {
    initNavbar();
    initCarousel();
}

document.addEventListener("DOMContentLoaded", initTripPage);
