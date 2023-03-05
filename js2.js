const track = document.getElementById("image-track");

const handleOnDown = (e) => (track.dataset.mouseDownAt = e.clientX);

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

// -----------------------------------------------------------

const handleOnMove = (e) => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  const maxDelta = track.offsetWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translate(${nextPercentage}%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("image")) {
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

// const headerHeight = document.getElementById("header").offsetHeight;
// const footerHeight = document.getElementById("footer").offsetHeight;
// const totalHeight = headerHeight + footerHeight;
// const mainHeight = window.innerHeight - totalHeight;

const headerHeight = document.querySelector("header").offsetHeight;
const footerHeight = document.querySelector("footer").offsetHeight;
console.log(headerHeight);
console.log(footerHeight);

const totalHeight = headerHeight + footerHeight;
const mainHeight = window.innerHeight - totalHeight;

// -------------------------------------------
const menuToggle = document.querySelector(".menu-toggle");
const menuNav = document.querySelector(".menu-nav");

menuToggle.addEventListener("click", () => {
  menuNav.classList.toggle("menu-nav-active");
});

// -----------------------------------------------------
