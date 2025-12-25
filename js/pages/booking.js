import { initNavbar } from "../components/navbar.js";

function initBooking() {
    initNavbar();
    initBookingForm();
}

function initBookingForm() {
    const form = document.getElementById("booking-form");
    const paymentMethodRadios = document.querySelectorAll(
        'input[name="payment-method"]'
    );
    const cardForm = document.querySelector(".card-form");
    const addTravelerBtn = document.querySelector(".add-traveler-btn");

    paymentMethodRadios.forEach((radio) => {
        radio.addEventListener("change", (e) => {
            if (e.target.value === "card") {
                cardForm.style.display = "block";
            } else {
                cardForm.style.display = "none";
            }
        });
    });

    if (addTravelerBtn) {
        addTravelerBtn.addEventListener("click", addTravelerFields);
    }
    if (form) {
        form.addEventListener("submit", handleFormSubmit);
    }

    const cardNumberInput = document.getElementById("card-number");
    if (cardNumberInput) {
        cardNumberInput.addEventListener("input", formatCardNumber);
    }

    const expiryInput = document.getElementById("expiry");
    if (expiryInput) {
        expiryInput.addEventListener("input", formatExpiryDate);
    }

    const cvvInput = document.getElementById("cvv");
    if (cvvInput) {
        cvvInput.addEventListener("input", formatCVV);
    }

    updatePriceSummary();
}

function formatCardNumber(e) {
    let value = e.target.value.replace(/\s/g, "");
    value = value.replace(/\D/g, "");
    value = value.substring(0, 16);
    value = value.replace(/(\d{4})/g, "$1 ").trim();
    e.target.value = value;
}

function formatExpiryDate(e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    e.target.value = value;
}

function formatCVV(e) {
    let value = e.target.value.replace(/\D/g, "");
    value = value.substring(0, 3);
    e.target.value = value;
}

function addTravelerFields() {
    const travelersSection = document.getElementById("travelers");
    const sectionContent = travelersSection.querySelector(".section-content");
    const travelerCards = sectionContent.querySelectorAll(".traveler-card");
    const travelerCount = travelerCards.length + 1;

    const newTravelerCard = document.createElement("div");
    newTravelerCard.className = "traveler-card";
    newTravelerCard.innerHTML = `
        <h3>Traveler ${travelerCount} (Adult)</h3>
        <div class="form-row two-columns">
            <div class="form-group">
                <label for="first-name">First Name *</label>
                <input type="text" id="first-name-${travelerCount}" name="first-name" required>
            </div>
            <div class="form-group">
                <label for="last-name">Last Name *</label>
                <input type="text" id="last-name-${travelerCount}" name="last-name" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="dob}">Date of Birth</label>
                <input type="date" id="dob-${travelerCount}" name="dob">
            </div>
        </div>
        <button type="button" class="remove-traveler-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/>
            </svg>
            Remove Traveler
        </button>
    `;

    const addButton = sectionContent.querySelector(".add-traveler-btn");
    sectionContent.insertBefore(newTravelerCard, addButton);

    const removeBtn = newTravelerCard.querySelector(".remove-traveler-btn");
    removeBtn.addEventListener("click", function () {
        newTravelerCard.remove();
        updatePriceSummary();
        updateTravelerNumbers();
    });

    updatePriceSummary();
}

function updateTravelerNumbers() {
    const travelerCards = document.querySelectorAll(".traveler-card");
    travelerCards.forEach((card, index) => {
        const heading = card.querySelector("h3");
        if (index === 0) {
            heading.textContent = "Lead Traveler (Adult)";
        } else {
            heading.textContent = `Traveler ${index + 1} (Adult)`;
        }
    });
}

function updatePriceSummary() {
    const PRICE_PER_ADULT = 73;
    const SERVICE_FEE = 15;
    const DISCOUNT_PER_PERSON = 10;

    const travelerCards = document.querySelectorAll(".traveler-card");
    const travelerCount = travelerCards.length;

    const adultsSubtotal = PRICE_PER_ADULT * travelerCount;
    const discount = DISCOUNT_PER_PERSON * travelerCount;
    const total = adultsSubtotal + SERVICE_FEE - discount;

    const priceRows = document.getElementsByClassName("price-row");
    if (priceRows.length >= 4) {
        priceRows[0].children[0].textContent = `Adult x ${travelerCount}`;
        priceRows[0].children[1].textContent = `$${adultsSubtotal.toFixed(2)}`;
        priceRows[2].children[1].textContent = `-$${discount.toFixed(2)}`;
        priceRows[3].children[1].textContent = `$${total.toFixed(2)}`;
    }

    const tourInfo = document.querySelector(".tour-info");
    if (tourInfo) {
        const travelersInfoP = Array.from(tourInfo.querySelectorAll("p")).find(
            (p) => p.textContent.includes("Adult")
        );
        if (travelersInfoP) {
            const textNode =
                travelersInfoP.childNodes[travelersInfoP.childNodes.length - 1];
            if (textNode) {
                textNode.textContent = `${travelerCount} ${
                    travelerCount === 1 ? "Adult" : "Adults"
                }`;
            }
        }
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const bookingData = {
        contact: {
            email: formData.get("email"),
            phone: formData.get("country-code") + formData.get("phone"),
        },
        travelers: [],
        specialRequests: formData.get("special-requests"),
        payment: {
            method: formData.get("payment-method"),
            cardName: formData.get("card-name"),
            cardNumber: formData.get("card-number"),
            expiry: formData.get("expiry"),
            cvv: formData.get("cvv"),
        },
        billing: {
            country: formData.get("country"),
            address: formData.get("address"),
            city: formData.get("city"),
            zip: formData.get("zip"),
        },
        termsAccepted: formData.get("terms") === "on",
    };

    const firstNames = formData.getAll("first-name");
    const lastNames = formData.getAll("last-name");
    const dobs = formData.getAll("dob");
    firstNames.forEach((firstName, index) => {
        bookingData.travelers.push({
            firstName,
            lastName: lastNames[index],
            dateOfBirth: dobs[index],
        });
    });

    console.log("Booking Data:", bookingData);
}

document.addEventListener("DOMContentLoaded", initBooking);
