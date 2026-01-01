// =======================
// Typing Effect (PROFILE ALIGNED)
// =======================
const typing = document.querySelector(".typing");

if (typing) {
  const texts = [
    "Software Development Engineer",
    "Java & DSA Enthusiast",
    "Frontend Engineer"
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const current = texts[textIndex];
    typing.textContent = current.substring(0, charIndex);

    charIndex += isDeleting ? -1 : 1;
    let speed = isDeleting ? 60 : 120;

    if (!isDeleting && charIndex === current.length) {
      speed = 1200;
      isDeleting = true;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      speed = 400;
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();
}

// =======================
// Mobile Menu (FINAL SAFE)
// =======================
const menuBtn = document.getElementById("menu-icon");
const navLinks = document.querySelector(".nav-links");
const navbar = document.querySelector(".navbar");

if (menuBtn && navLinks && navbar) {
  const menuIcon = menuBtn.querySelector("i") || menuBtn;

  function openMenu() {
    navLinks.classList.add("active");
    menuBtn.setAttribute("aria-expanded", "true");

    menuIcon.classList.remove("bx-menu");
    menuIcon.classList.add("bx-x");

    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    navLinks.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");

    menuIcon.classList.remove("bx-x");
    menuIcon.classList.add("bx-menu");

    document.body.style.overflow = "";
  }

  menuBtn.addEventListener("click", e => {
    e.stopPropagation();
    navLinks.classList.contains("active") ? closeMenu() : openMenu();
  });

  document.addEventListener("click", e => {
    if (navLinks.classList.contains("active") && !navbar.contains(e.target)) {
      closeMenu();
    }
  });

  navLinks.querySelectorAll("a").forEach(link =>
    link.addEventListener("click", closeMenu)
  );

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && navLinks.classList.contains("active")) {
      closeMenu();
    }
  });
}

// =======================
// Scroll Reveal Animation
// =======================
const revealElements = document.querySelectorAll("section, .project-card");

if (revealElements.length) {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach(el => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });
}

// =======================
// Active Navbar (OPTIMIZED)
// =======================
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");
let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      let current = "";

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (scrollY >= top - 200 && scrollY < top + height - 200) {
          current = section.id;
        }
      });

      navItems.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${current}`
        );
      });

      ticking = false;
    });
    ticking = true;
  }
});

// =======================
// Footer Year
// =======================
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// =======================
// Toast Notification
// =======================
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.className = `show ${type}`;
  setTimeout(() => (toast.className = ""), 3000);
}

// =======================
// EmailJS Contact Form (SAFE)
// =======================
if (typeof emailjs !== "undefined") {
  emailjs.init("eTl6eGjIuIEZNHmXY");
}

const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");

if (contactForm && submitBtn) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();

    if (
      typeof grecaptcha === "undefined" ||
      grecaptcha.getResponse() === ""
    ) {
      showToast("Please verify reCAPTCHA", "error");
      return;
    }

    submitBtn.classList.add("loading");

    emailjs
      .sendForm("service_chl7279", "template_3hzwpmg", contactForm)
      .then(() => {
        submitBtn.classList.remove("loading");
        grecaptcha.reset();
        contactForm.reset();
        showToast("Message sent successfully!");
      })
      .catch(() => {
        submitBtn.classList.remove("loading");
        showToast("Failed to send message.", "error");
      });
  });
}

// =======================
// Live Preview Modal
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("preview-modal");
  const frame = document.getElementById("preview-frame");
  const closeBtn = document.querySelector(".close-preview");
  const fullscreenBtn = document.getElementById("fullscreen-btn");
  const openSiteBtn = document.getElementById("open-site-btn");

  if (!modal || !frame || !closeBtn) return;

  document.querySelectorAll(".project-btn.preview").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const url = btn.dataset.previewUrl;
      frame.src = url;
      if (openSiteBtn) openSiteBtn.href = url;
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  closeBtn.onclick = () => {
    modal.classList.remove("active", "fullscreen");
    frame.src = "";
    document.body.style.overflow = "";
  };

  if (fullscreenBtn) {
    fullscreenBtn.onclick = () =>
      modal.classList.toggle("fullscreen");
  }

  modal.addEventListener("click", e => {
    if (e.target === modal) closeBtn.click();
  });
});

// =======================
// Resources Search + Filter
// =======================
const searchInput = document.getElementById("resourceSearch");
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".link-card");

let activeCategory = "all";

if (searchInput && cards.length) {
  function filterResources() {
    const query = searchInput.value.toLowerCase();

    cards.forEach(card => {
      const matchesSearch = card.textContent
        .toLowerCase()
        .includes(query);

      const matchesCategory =
        activeCategory === "all" ||
        card.dataset.category === activeCategory;

      card.classList.toggle(
        "hidden",
        !(matchesSearch && matchesCategory)
      );
    });
  }

  searchInput.addEventListener("input", filterResources);

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.dataset.category;
      filterResources();
    });
  });
}
