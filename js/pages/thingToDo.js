import { initNavbar } from "../components/navbar.js";
import { initCarousel } from "../components/carousel.js";

function initThingToDo() {
    initNavbar();
    initCarousel();
}

document.addEventListener("DOMContentLoaded", initThingToDo);
