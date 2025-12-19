const carousels = document.querySelectorAll(".carousel");
const prevBtns = document.querySelectorAll(".carousel-btn--prev");
const nextBtns = document.querySelectorAll(".carousel-btn--next");
const wrapper = document.querySelector(".carousel-wrapper");

const largeScreen = window.matchMedia("(width > 1024px)");
const mediumScreen = window.matchMedia("(width <= 1024px)");
const smallScreen = window.matchMedia("(width <= 640px)");

let currentIndexes = [];
let cardWidth; // card width + gap

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

function updateButtons(index) {
    cardWidth = setCardWidth();

    const maxScroll = carousels[index].scrollWidth - wrapper.clientWidth;
    const currentScroll = currentIndexes[index] * cardWidth;

    prevBtns[index].classList.toggle("hidden", currentIndexes[index] === 0);
    nextBtns[index].classList.toggle("hidden", currentScroll >= maxScroll);
}

function slide(direction, index) {
    const maxIndex = Math.ceil(
        (carousels[index].scrollWidth - wrapper.clientWidth) / cardWidth
    );

    currentIndexes[index] = Math.max(
        0,
        Math.min(currentIndexes[index] + direction, maxIndex)
    );
    carousels[index].style.transform = `translateX(-${
        currentIndexes[index] * cardWidth
    }px)`;
    updateButtons(index);
}

export function initCarousel() {
    currentIndexes = Array(carousels.length).fill(0);

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
