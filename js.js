// Image slider

// Select the image track element and store it in a constant track.
// Define a function handleOnDown that takes an event e as a parameter, and sets the mouseDownAt attribute of the track dataset to the event's clientX value.
// Define a function handleOnUp that sets the mouseDownAt attribute of the track dataset to "0" and updates the prevPercentage attribute with the current percentage value.

const track = document.getElementById("image-track");

const handleOnDown = (e) => (track.dataset.mouseDownAt = e.clientX);

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

// Define a function getTotalImagesWidth that calculates the total width of all images within the track and returns it.
// Define a function handleOnMove that takes an event e as a parameter, and handles moving the image track.

function getTotalImagesWidth() {
  let totalWidth = 0;
  for (const image of track.getElementsByClassName("image")) {
    totalWidth += image.offsetWidth;
  }
  return totalWidth;
}

const handleOnMove = (e) => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  const maxDelta = track.offsetWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage;

  const images = track.getElementsByClassName("image");
  const totalImagesWidth = Array.from(images).reduce(
    (acc, img) => acc + img.clientWidth,
    0
  );
  const containerWidth = track.clientWidth;

  const maxNegativePercentage =
    -((totalImagesWidth - containerWidth) / containerWidth) * 100;

  const nextPercentage = Math.max(
    Math.min(nextPercentageUnconstrained, 0),
    maxNegativePercentage
  );

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translate(${nextPercentage}%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of images) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

// Add event listeners for mousedown, touchstart, mouseup, touchend, mousemove, and touchmove to the element with the ID dishes. Call the appropriate functions for each event.

document.querySelector("#dishes").onmousedown = (e) => handleOnDown(e);

document.querySelector("#dishes").ontouchstart = (e) =>
  handleOnDown(e.touches[0]);

document.querySelector("#dishes").onmouseup = (e) => handleOnUp(e);

document.querySelector("#dishes").ontouchend = (e) => handleOnUp(e.touches[0]);

document.querySelector("#dishes").onmousemove = (e) => handleOnMove(e);

document.querySelector("#dishes").ontouchmove = (e) =>
  handleOnMove(e.touches[0]);

//   Contact form validation and submission:
//   Select the contact form, email input field, and email validation message elements, storing them in constants.
// Add a submit event listener to the form that prevents default submission, validates input fields, and displays an alert with the appropriate message.
// Define a function validateEmail that takes an email string as a parameter and returns a boolean indicating whether the email is valid based on a regex pattern.
// Add an input event listener to the email input field that validates the email and updates the email validation message accordingly.

const form = document.getElementById("contact-form");
const emailField = document.getElementById("email");
const emailValidation = document.getElementById("email-validation");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = form.elements["name"].value;
  const email = emailField.value;
  const phone = form.elements["phone"].value;
  const message = form.elements["message"].value;
  if (name === "" || email === "" || phone === "" || message === "") {
    alert("Please fill out all fields.");
    return;
  }
  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  alert("Form submitted successfully!");
  form.reset();
});

function validateEmail(email) {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

emailField.addEventListener("input", (event) => {
  const email = event.target.value;
  if (validateEmail(email)) {
    emailValidation.textContent = "Valid email address.";
    emailValidation.style.color = "green";
  } else {
    emailValidation.textContent = "Please enter a valid email address.";
    emailValidation.style.color = "red";
  }
});

// Dynamic main section height calculation:
// Calculate the heights of the header and footer elements, and store them in constants headerHeight and footerHeight.
// Calculate the total height of the header and footer by adding their heights and store it in the constant totalHeight.
// Calculate the main section height by subtracting the totalHeight from the window's inner height, and store it in the constant mainHeight.
// Set the height of the main section to mainHeight using a template literal.

const headerHeight = document.querySelector("header").offsetHeight;
const footerHeight = document.querySelector("footer").offsetHeight;
console.log(headerHeight);
console.log(footerHeight);

const totalHeight = headerHeight + footerHeight;
const mainHeight = window.innerHeight - totalHeight;
document.querySelector("main").style.height = `${mainHeight}px`;
console.log(totalHeight);

// Mobile menu toggle animation:
// Add an event listener for the DOMContentLoaded event to ensure that the DOM is fully loaded before executing the script.
// Select the menu toggle button and menu navigation elements, and store them in constants menuToggle and menuNav.
// Add a click event listener to the menu toggle button that toggles the menu-nav-active class on the menuNav element and animates the menu sliding in and out based on the current state.
// Define a function animateMenu that takes an element, a start value, and an end value as parameters, and animates the element's position between the start and end values.

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const menuNav = document.querySelector(".menu-nav");

  menuToggle.addEventListener("click", function () {
    menuNav.classList.toggle("menu-nav-active");
    if (menuNav.classList.contains("menu-nav-active")) {
      animateMenu(menuNav, -100, 0);
    } else {
      animateMenu(menuNav, 0, -100);
    }
  });
});

function animateMenu(element, start, end) {
  const animationDuration = 400;
  const startTime = performance.now();
  const change = end - start;

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = elapsed / animationDuration;

    element.style.right = start + change * progress + "%";

    if (elapsed < animationDuration) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

// Smooth scrolling to page sections:
// Add an event listener for the DOMContentLoaded event to ensure that the DOM is fully loaded before executing the script.
// Select all navigation link elements and the menu navigation element, and store them in constants navLinks and menuNav.
// Iterate through each navigation link, adding a click event listener that prevents the default link action, calculates the target position based on the target element's offset and header height, and smoothly scrolls to the target position.

document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const menuNav = document.querySelector(".menu-nav");

  for (const link of navLinks) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = event.target.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      const screenWidth = window.innerWidth;

      let headerHeight;
      if (screenWidth > 810) {
        headerHeight = menuNav.offsetHeight;
      } else {
        headerHeight = 200 /* height value for screens <= 810px */;
      }

      const targetPosition = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  }
});

// dark mode toggle

const darkModeToggle = document.getElementById("dark-mode-toggle");

darkModeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
});
