const carousels = document.querySelectorAll(".carousel");
const prevBtns = document.querySelectorAll(".carousel-btn--prev");
const nextBtns = document.querySelectorAll(".carousel-btn--next");
const wrapper = document.querySelector(".carousel-wrapper");

const largeScreen = window.matchMedia("(width > 1024px)");
const mediumScreen = window.matchMedia("(width <= 1024px)");
const smallScreen = window.matchMedia("(width <= 640px)");

let currentIndex = 0;
let cardWidth; // card width + gap

function updateButtons(index) {
    cardWidth = setCardWidth();

    const maxScroll = carousels[0].scrollWidth - wrapper.clientWidth;
    const currentScroll = currentIndex * cardWidth;

    prevBtns[index].classList.toggle("hidden", currentIndex === 0);
    nextBtns[index].classList.toggle("hidden", currentScroll >= maxScroll);
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

function slide(direction, index) {
    const maxIndex = Math.ceil(
        (carousels[index].scrollWidth - wrapper.clientWidth) / cardWidth
    );

    currentIndex = Math.max(0, Math.min(currentIndex + direction, maxIndex));
    carousels[index].style.transform = `translateX(-${
        currentIndex * cardWidth
    }px)`;
    updateButtons(index);
}

export function initCarousel() {
    prevBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => slide(-1, index));
    });

    nextBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => slide(1, index));
    });

    window.addEventListener("resize", () => {
        carousels.forEach((_, index) => {
            updateButtons(index);
        });
    });

    carousels.forEach((_, index) => {
        updateButtons(index);
    });
}
