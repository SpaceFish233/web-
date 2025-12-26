// Carousel Functionality
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

function showSlide(index) {
  // Wrap around logic
  if (index >= totalSlides) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = totalSlides - 1;
  } else {
    currentSlide = index;
  }

  // Remove active class from all
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  // Add active class to current
  slides[currentSlide].classList.add("active");
}

function moveSlide(direction) {
  showSlide(currentSlide + direction);
}

// Auto play carousel every 5 seconds
setInterval(() => {
  moveSlide(1);
}, 5000);

// Clock Functionality
function updateTime() {
  const timeElement = document.getElementById("current-time");
  const now = new Date();

  // Format: YYYY年MM月DD日 HH:mm:ss
  const timeString =
    now.getFullYear() +
    "年" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "月" +
    String(now.getDate()).padStart(2, "0") +
    "日 " +
    String(now.getHours()).padStart(2, "0") +
    ":" +
    String(now.getMinutes()).padStart(2, "0") +
    ":" +
    String(now.getSeconds()).padStart(2, "0");

  if (timeElement) {
    timeElement.textContent = "当前时间: " + timeString;
  }
}

// Update time immediately and then every second
updateTime();
setInterval(updateTime, 1000);

// Add Global Decorations (Mascot + Christmas Text)
// Add Global Decorations (Mascot + Christmas Text + Nav Update)
function addDecorations() {
  // 1. Mascot - NOT on Danger Page
  if (!window.location.pathname.endsWith("danger.html")) {
    const mascotImg = document.createElement("img");
    mascotImg.src = "img/mascot.jpg";
    mascotImg.alt = "Animation Mascot";
    mascotImg.classList.add("mascot-widget");
    document.body.appendChild(mascotImg);

    // Interaction: Spin faster on hover (Acceleration)
    let spinInterval;
    let currentDuration = 2.0; // Seconds (Initial Match with CSS)

    mascotImg.addEventListener("mouseenter", () => {
      clearInterval(spinInterval);
      spinInterval = setInterval(() => {
        if (currentDuration > 0.1) {
          currentDuration *= 0.9; // Accelerate
          mascotImg.style.animationDuration = currentDuration + "s";
        }
      }, 50);
    });

    mascotImg.addEventListener("mouseleave", () => {
      clearInterval(spinInterval);
      currentDuration = 2.0; // Reset
      mascotImg.style.animationDuration = "2s";
    });
  }

  // 2. Christmas Text (Clickable Link) - Only on Homepage
  const path = window.location.pathname;
  // Check if we are on index.html or root
  if (path.endsWith("index.html") || path === "/" || path.endsWith("/")) {
    const xmasLink = document.createElement("a");
    xmasLink.href = "gallery.html"; // Jump to Christmas Special
    xmasLink.textContent = "Merry Christmas";
    xmasLink.classList.add("christmas-text");
    document.body.appendChild(xmasLink);
  }

  // 3. Update Navigation Text: "光影集" -> "圣诞特辑"
  // Find all nav links
  const navLinks = document.querySelectorAll(".nav-links li a");
  navLinks.forEach((link) => {
    if (link.textContent.includes("光影集")) {
      link.textContent = "圣诞特辑";
    }
  });

  // 4. Global Snowfall Effect - NOT on Danger Page
  if (!window.location.pathname.endsWith("danger.html")) {
    setInterval(createSnowflake, 300); // Create a snowflake every 300ms
  }
}

function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.textContent = "❄"; // Using unicode snowflake char

  // Random horizontal position
  snowflake.style.left = Math.random() * 100 + "vw";

  // Random animation duration (fall speed) between 5s and 10s
  const duration = Math.random() * 5 + 5;
  snowflake.style.animationDuration = duration + "s";

  // Random size between 10px and 25px
  const size = Math.random() * 15 + 10;
  snowflake.style.fontSize = size + "px";

  // Random opacity
  snowflake.style.opacity = Math.random() * 0.5 + 0.3;

  document.body.appendChild(snowflake);

  // Remove snowflake after it falls to clean up DOM
  setTimeout(() => {
    snowflake.remove();
  }, duration * 1000); // Match animation duration
}

// Ensure DOM is loaded before adding
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", addDecorations);
} else {
  addDecorations();
}

// Console log for debugging
console.log("Website Scripts Loaded Successfully");
