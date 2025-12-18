const carousel = document.querySelector(".carousel-list");
const prevBtn = document.querySelector(".carousel-btn--prev");
const nextBtn = document.querySelector(".carousel-btn--next");
const wrapper = document.querySelector(".carousel-wrapper");

const largeScreen = window.matchMedia("(width > 1024px)");
const mediumScreen = window.matchMedia("(width <= 1024px)");
const smallScreen = window.matchMedia("(width <= 640px)");

let currentIndex = 0;
let cardWidth; // card width + gap

function updateButtons() {
    cardWidth = setCardWidth();

    const maxScroll = carousel.scrollWidth - wrapper.clientWidth;
    const currentScroll = currentIndex * cardWidth;

    prevBtn.classList.toggle("hidden", currentIndex === 0);
    nextBtn.classList.toggle("hidden", currentScroll >= maxScroll);
}

function setCardWidth() {
    let currCardWidth;

    if (smallScreen.matches) {
        currCardWidth = 200 + 16;
    } else if (mediumScreen.matches) {
        currCardWidth = 250 + 16;
    } else if (largeScreen.matches) {
        currCardWidth = 300 + 16;
    }

    return currCardWidth;
}

function slide(direction) {
    console.log("clicked");

    const maxIndex = Math.ceil(
        (carousel.scrollWidth - wrapper.clientWidth) / cardWidth
    );

    currentIndex = Math.max(0, Math.min(currentIndex + direction, maxIndex));
    carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    updateButtons();
}

export function initCarousel() {
    prevBtn.addEventListener("click", () => slide(-1));
    nextBtn.addEventListener("click", () => slide(1));

    window.addEventListener("resize", updateButtons);
    updateButtons();
}
