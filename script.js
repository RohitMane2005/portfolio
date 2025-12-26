// =======================
// Typing Effect (SAFE)
// =======================
const typing = document.querySelector(".typing");

if (typing) {
    const texts = ["Full Stack Developer", "UI/UX Designer", "Creative Coder"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const current = texts[textIndex];
        typing.textContent = current.substring(0, charIndex);

        isDeleting ? charIndex-- : charIndex++;

        let speed = isDeleting ? 60 : 120;

        if (!isDeleting && charIndex === current.length + 1) {
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
// Mobile Menu (ADVANCED UX)
// =======================
const menuBtn = document.getElementById("menu-icon");
const navLinks = document.querySelector(".nav-links");
const navbar = document.querySelector(".navbar");
const menuIcon = menuBtn.querySelector("i");

function openMenu() {
    navLinks.classList.add("active");
    menuBtn.setAttribute("aria-expanded", "true");
    menuIcon.classList.replace("bx-menu", "bx-x");
    document.body.style.overflow = "hidden"; // disable scroll
}

function closeMenu() {
    navLinks.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
    menuIcon.classList.replace("bx-x", "bx-menu");
    document.body.style.overflow = ""; // restore scroll
}

// Toggle menu
menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.contains("active") ? closeMenu() : openMenu();
});

// Click outside → close
document.addEventListener("click", (e) => {
    if (navLinks.classList.contains("active") && !navbar.contains(e.target)) {
        closeMenu();
    }
});

// Click link → close
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", closeMenu);
});

// ESC key → close
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("active")) {
        closeMenu();
    }
});

// =======================
// Scroll Reveal Animation
// =======================
const revealElements = document.querySelectorAll(
    "section, .project-card"
);

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(el => {
    el.classList.add("reveal");
    revealObserver.observe(el);
});

// =======================
// Active Navbar Link
// =======================
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navItems.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
});
// =======================
// Auto Update Footer Year
// =======================
document.getElementById("year").textContent = new Date().getFullYear();


function showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = `show ${type}`;

    setTimeout(() => {
        toast.className = "";
    }, 3000);
}


// =======================
// EmailJS Contact Form
// =======================
(function () {
    emailjs.init("eTl6eGjIuIEZNHmXY"); // 🔴 Replace with your EmailJS Public Key
})();

const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // reCAPTCHA check
    if (grecaptcha.getResponse() === "") {
        showToast("Please verify reCAPTCHA", "error");
        return;
    }

    submitBtn.classList.add("loading");

    emailjs.sendForm(
        "service_chl7279",
        "template_3hzwpmg",
        this
    )
    .then(() => {
        submitBtn.classList.remove("loading");
        grecaptcha.reset();
        contactForm.reset();
        showToast("Message sent successfully!");
    })
    .catch(() => {
        submitBtn.classList.remove("loading");
        showToast("Failed to send message. Try again.", "error");
    });
});


// =======================
// Live Preview Modal (Advanced)
// =======================
document.addEventListener("DOMContentLoaded", () => {

    const previewModal = document.getElementById("preview-modal");
    const previewFrame = document.getElementById("preview-frame");
    const closePreview = document.querySelector(".close-preview");
    const fullscreenBtn = document.getElementById("fullscreen-btn");
    const openSiteBtn = document.getElementById("open-site-btn");

    document.querySelectorAll(".project-btn.preview").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();

            const url = btn.dataset.previewUrl;
            if (!url) return;

            previewFrame.src = url;
            openSiteBtn.href = url;

            previewModal.classList.add("active");
            previewModal.classList.remove("fullscreen");
            document.body.style.overflow = "hidden";
        });
    });

    // Close
    closePreview.addEventListener("click", () => {
        previewModal.classList.remove("active", "fullscreen");
        previewFrame.src = "";
        document.body.style.overflow = "";
    });

    // Fullscreen toggle
    fullscreenBtn.addEventListener("click", () => {
        previewModal.classList.toggle("fullscreen");
    });

    // Click outside
    previewModal.addEventListener("click", (e) => {
        if (e.target === previewModal) closePreview.click();
    });

    // ESC key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && previewModal.classList.contains("active")) {
            closePreview.click();
        }
    });
});

