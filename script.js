// =======================
// Typing Effect
// =======================
const typing = document.querySelector(".typing");
let typingTimer = null; // Store reference for potential cleanup

if (typing) {
  const texts = [
    "Freelance Web Developer",
    "Java & Frontend Engineer",
    "Building Sites That Convert"
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const current = texts[textIndex];
    // SECURITY: Use textContent (not innerHTML) to prevent XSS
    typing.textContent = current.substring(0, charIndex);
    charIndex += isDeleting ? -1 : 1;
    let speed = isDeleting ? 55 : 110;

    if (!isDeleting && charIndex === current.length) {
      speed = 1400;
      isDeleting = true;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      speed = 400;
    }

    typingTimer = setTimeout(typeEffect, speed);
  }

  typeEffect();
}

// =======================
// Mobile Menu
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
    if (e.key === "Escape" && navLinks.classList.contains("active")) closeMenu();
  });
}

// =======================
// Scroll Reveal
// =======================
const revealElements = document.querySelectorAll(".reveal");

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
    { threshold: 0.12 }
  );

  revealElements.forEach(el => revealObserver.observe(el));
}

// =======================
// Active Navbar
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
  setTimeout(() => (toast.className = ""), 3500);
}

// =======================
// EmailJS Contact Form
// =======================
// Both scripts use defer, so EmailJS is guaranteed to be loaded by now
if (typeof emailjs !== "undefined") {
  emailjs.init("eTl6eGjIuIEZNHmXY");
  // NOTE: Enable domain restriction in your EmailJS dashboard
  // to prevent abuse (only allow genzxr.in)
}

const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");

if (contactForm && submitBtn) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();

    // Honeypot spam check
    if (contactForm.company && contactForm.company.value) return;

    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    emailjs
      .sendForm("service_chl7279", "template_3hzwpmg", contactForm)
      .then(() => {
        contactForm.reset();
        showToast("Message sent! I'll reply within 24 hours ✓");
      })
      .catch(() => {
        showToast("Failed to send. Please try again.", "error");
      })
      .finally(() => {
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
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

  // SECURITY: Whitelist allowed preview URL patterns to prevent XSS via iframe injection
  const ALLOWED_PREVIEW_PATTERNS = [
    /^demo\//,                          // Local demo pages
    /^https:\/\/(www\.)?genzxr\.in\//   // Own domain
  ];

  function isAllowedPreviewUrl(url) {
    return ALLOWED_PREVIEW_PATTERNS.some(pattern => pattern.test(url));
  }

  document.querySelectorAll(".project-btn.preview").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const url = btn.dataset.previewUrl;

      if (!url || !isAllowedPreviewUrl(url)) {
        console.warn("Blocked suspicious preview URL:", url);
        showToast("Preview unavailable for this URL.", "error");
        return;
      }

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
    fullscreenBtn.onclick = () => modal.classList.toggle("fullscreen");
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
      const matchesSearch = card.textContent.toLowerCase().includes(query);
      const matchesCategory =
        activeCategory === "all" || card.dataset.category === activeCategory;
      card.classList.toggle("hidden", !(matchesSearch && matchesCategory));
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