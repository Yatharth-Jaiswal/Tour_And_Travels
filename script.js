// Nav Bar Blurry Glassmorphic Background on Scroll
const header = document.getElementById("header");
function handleNavScroll() {
  if (window.scrollY > 20) {
    header?.classList.add("scrolled");
  } else {
    header?.classList.remove("scrolled");
  }
}
window.addEventListener("scroll", handleNavScroll, { passive: true });
handleNavScroll();


//Hero Slider (Swiper if present)
if (document.querySelector(".js_hero-slider") && typeof Swiper !== "undefined") {
    var swiper = new Swiper(".js_hero-slider", {
        rewind: true,
        loop: true,
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next-hero-slider",
            prevEl: ".swiper-button-prev-hero-slider",
        },
    });
}


const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const slides = document.querySelectorAll('.slide');
const numberOfSlides = slides.length;
let slideNumber = 0;

//slider next button
if (nextBtn && slides.length > 0) {
    nextBtn.onclick = () => {
        slides.forEach((slide) => {
            slide.classList.remove('active');
        });

        slideNumber++;

        if (slideNumber > (numberOfSlides - 1)) {
            slideNumber = 0;
        }

        slides[slideNumber].classList.add('active');
    }
}

//slider prev button
if (prevBtn && slides.length > 0) {
    prevBtn.onclick = () => {
        slides.forEach((slide) => {
            slide.classList.remove('active');
        });

        slideNumber--;

        if (slideNumber < 0) {
            slideNumber = numberOfSlides - 1;
        }

        slides[slideNumber].classList.add('active');
    }
}

// Destination Flip Cards Touch Toggle (for mobile and tablet)
function initFlipCards() {
    const flipCards = document.querySelectorAll(".destination-cards ul li");
    flipCards.forEach((card) => {
        card.addEventListener("click", function (e) {
            if (e.target.closest("a")) return;
            this.classList.toggle("flipped");
        });
    });
}

// Footer Accordion on mobile
function initFooterAccordion() {
    const footerAccordions = document.querySelectorAll("footer .accordion");
    footerAccordions.forEach((accordion) => {
        accordion.style.cursor = "pointer";
        accordion.addEventListener("click", function (e) {
            e.preventDefault();
            this.classList.toggle("active");
            const panel = this.nextElementSibling;
            if (panel) {
                panel.classList.toggle("show");
            }
        });
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
}

// Global Scroll Progress Bar
function initScrollProgress() {
    let progressBar = document.getElementById("scrollProgress");
    if (!progressBar) {
        progressBar = document.createElement("div");
        progressBar.id = "scrollProgress";
        progressBar.className = "scroll-progress-bar";
        document.body.prepend(progressBar);
    }
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = scrollPercent + "%";
    }, { passive: true });
}

// Global Scroll-Triggered Fade & Slide Animations
function initScrollReveal() {
    const targetSelectors = [
        ".section-header",
        ".section-badge",
        ".section-subtitle",
        ".destination .heading",
        ".destination .info",
        ".features-grid .feature-card",
        ".stats-counter-strip",
        ".four-column-image-section .img-gallery ul li",
        ".features .container",
        ".features ul li",
        ".destination-cards .container-1340 h2",
        ".destination-cards ul li",
        ".feedback-section .section-header",
        ".testimonials-grid .testimonial-card",
        ".research .section-header",
        ".article-grid .article-card",
        ".site-footer .footer-top-grid",
        ".site-footer .footer-links-grid",
        ".site-footer .footer-bottom-bar",
        ".scroll-reveal",
        ".reveal-up",
        ".reveal-left",
        ".reveal-right",
        ".reveal-zoom",
        ".fade-slide-up",
        ".fade-slide-down",
        ".fade-slide-left",
        ".fade-slide-right",
        ".fade-zoom"
    ];

    const elements = document.querySelectorAll(targetSelectors.join(", "));

    elements.forEach((el) => {
        if (!el.classList.contains("scroll-reveal") &&
            !el.classList.contains("reveal-up") &&
            !el.classList.contains("reveal-left") &&
            !el.classList.contains("reveal-right") &&
            !el.classList.contains("reveal-zoom") &&
            !el.classList.contains("fade-slide-up") &&
            !el.classList.contains("fade-slide-left") &&
            !el.classList.contains("fade-slide-right") &&
            !el.classList.contains("fade-zoom")) {
            
            if (el.classList.contains("heading")) {
                el.classList.add("fade-slide-left");
            } else if (el.classList.contains("info")) {
                el.classList.add("fade-slide-right");
            } else if (el.closest(".img-gallery")) {
                el.classList.add("fade-zoom");
            } else {
                el.classList.add("fade-slide-up");
            }

            // Auto-stagger sibling items inside grids or lists
            const parent = el.closest(".features-grid, .testimonials-grid, .article-grid, .img-gallery ul, .features ul, .destination-cards ul");
            if (parent) {
                const siblings = Array.from(parent.children);
                const elIndex = siblings.indexOf(el);
                if (elIndex >= 0) {
                    el.style.transitionDelay = `${(elIndex % 6) * 0.1}s`;
                }
            }
        }
    });

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                obs.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.08
    });

    document.querySelectorAll(".scroll-reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-zoom, .fade-slide-up, .fade-slide-down, .fade-slide-left, .fade-slide-right, .fade-zoom, .section-header").forEach((el) => {
        observer.observe(el);
    });
}

// Top Destination Luxury Image Curtain Reveal Animation
function initTopDestinationImageReveal() {
    const cards = document.querySelectorAll(".destination-cards ul li");
    if (cards.length === 0) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const siblings = Array.from(card.parentElement ? card.parentElement.children : []);
                const index = siblings.indexOf(card);
                const delay = (index >= 0 ? (index % 6) * 110 : 0);
                setTimeout(() => {
                    card.classList.add("img-revealed");
                }, delay);
                obs.unobserve(card);
            }
        });
    }, {
        root: null,
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.15
    });

    cards.forEach((card) => observer.observe(card));
}

// Milestone Live Number Counters
function initStatsCounter() {
    const counters = document.querySelectorAll(".counter[data-target]");
    if (counters.length === 0) return;

    let animated = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                counters.forEach((counter) => {
                    const target = parseFloat(counter.getAttribute("data-target"));
                    const format = counter.getAttribute("data-format") || "integer";
                    const decimals = parseInt(counter.getAttribute("data-decimals") || "0", 10);
                    const duration = 2000; // ms
                    const startTime = performance.now();

                    function updateCount(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease-out cubic formula
                        const easeProgress = 1 - Math.pow(1 - progress, 3);
                        const currentValue = target * easeProgress;

                        if (format === "comma") {
                            counter.innerText = Math.floor(currentValue).toLocaleString();
                        } else if (format === "decimal") {
                            counter.innerText = currentValue.toFixed(decimals);
                        } else {
                            counter.innerText = Math.floor(currentValue);
                        }

                        if (progress < 1) {
                            requestAnimationFrame(updateCount);
                        } else {
                            if (format === "comma") {
                                counter.innerText = target.toLocaleString();
                            } else if (format === "decimal") {
                                counter.innerText = target.toFixed(decimals);
                            } else {
                                counter.innerText = target;
                            }
                        }
                    }

                    requestAnimationFrame(updateCount);
                });
            }
        });
    }, { threshold: 0.3 });

    const strip = document.querySelector(".stats-counter-strip");
    if (strip) {
        observer.observe(strip);
    }
}

// Scroll-Spy Active Link Indicator on Navbar
function initScrollSpy() {
    const navLinks = document.querySelectorAll(".site-header .navbar a[href^='#']");
    if (navLinks.length === 0) return;

    const sections = [];
    navLinks.forEach((link) => {
        const id = link.getAttribute("href").substring(1);
        const section = document.getElementById(id);
        if (section) {
            sections.push({ link, section });
        }
    });

    function highlightNav() {
        const scrollPosition = window.scrollY + 160;
        sections.forEach(({ link, section }) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach((l) => l.classList.remove("nav-active"));
                link.classList.add("nav-active");
            }
        });
        if (window.scrollY < 100) {
            navLinks.forEach((l) => l.classList.remove("nav-active"));
        }
    }

    window.addEventListener("scroll", highlightNav, { passive: true });
    highlightNav();
}

// Parallax Effect for Destinations City & Nature Gallery
function initCityNatureParallax() {
    const gallerySection = document.querySelector(".four-column-image-section");
    if (!gallerySection) return;

    const galleryCards = gallerySection.querySelectorAll(".img-gallery li");
    const galleryImages = gallerySection.querySelectorAll(".img-gallery .img-section img");
    if (galleryImages.length === 0) return;

    let ticking = false;

    function updateParallax() {
        const rect = gallerySection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if gallery is entering or within viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
            const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
            const normalized = (progress - 0.5) * 2; // Range -1 to 1

            galleryImages.forEach((img, idx) => {
                if (img.dataset.hovered === "true") return; // Respect mouse hover
                // Stagger movement speeds based on index for true multi-plane 3D depth
                const depthRates = [-20, 24, -16, 20, -22, 18, -26, 22];
                const rate = depthRates[idx % depthRates.length];
                const translateY = normalized * rate;
                img.style.transform = `translateY(${translateY.toFixed(1)}px) scale(1.08)`;
            });
        }
        ticking = false;
    }

    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });

    // Interactive mouse hover micro-tilt parallax on desktop
    galleryCards.forEach((card) => {
        const img = card.querySelector(".img-section img");
        if (!img) return;

        card.addEventListener("mousemove", (e) => {
            img.dataset.hovered = "true";
            const cardRect = card.getBoundingClientRect();
            const x = (e.clientX - cardRect.left) / cardRect.width - 0.5;
            const y = (e.clientY - cardRect.top) / cardRect.height - 0.5;
            img.style.transform = `translate(${x * 14}px, ${y * 14}px) scale(1.14)`;
        });

        card.addEventListener("mouseleave", () => {
            img.dataset.hovered = "false";
            updateParallax();
        });
    });

    updateParallax();
}

function initAll() {
    initScrollProgress();
    initScrollReveal();
    initTopDestinationImageReveal();
    initCityNatureParallax();
    initFooterAccordion();
    initFlipCards();
    initStatsCounter();
    initScrollSpy();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
} else {
    initAll();
}