import { initNavbar } from "../components/navbar.js";
import { initCarousel } from "../components/carousel.js";

function initTransport() {
    initNavbar();
    initCarousel();
}

document.addEventListener("DOMContentLoaded", initTransport);
