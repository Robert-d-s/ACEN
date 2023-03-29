const track = document.getElementById("image-track");

const handleOnDown = (e) => (track.dataset.mouseDownAt = e.clientX);

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

// -----------------------------------------------------------

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

// -----------------------------------------------------------------

document.querySelector("#dishes").onmousedown = (e) => handleOnDown(e);

document.querySelector("#dishes").ontouchstart = (e) =>
  handleOnDown(e.touches[0]);

document.querySelector("#dishes").onmouseup = (e) => handleOnUp(e);

document.querySelector("#dishes").ontouchend = (e) => handleOnUp(e.touches[0]);

document.querySelector("#dishes").onmousemove = (e) => handleOnMove(e);

document.querySelector("#dishes").ontouchmove = (e) =>
  handleOnMove(e.touches[0]);

// -----------------------------------------------------------------

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

const headerHeight = document.querySelector("header").offsetHeight;
const footerHeight = document.querySelector("footer").offsetHeight;
console.log(headerHeight);
console.log(footerHeight);

const totalHeight = headerHeight + footerHeight;
const mainHeight = window.innerHeight - totalHeight;
document.querySelector("main").style.height = `${mainHeight}px`;
console.log(totalHeight);

// -------------------------------------------

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

// -----------------------------------------------------

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

const darkModeToggle = document.getElementById("dark-mode-toggle");

darkModeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
});
