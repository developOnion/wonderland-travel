import { initNavbar } from "../components/navbar.js";
import { initCarousel } from "../components/carousel.js";

function initialize() {
    initNavbar();
    initCarousel();
}

document.addEventListener("DOMContentLoaded", initialize);
