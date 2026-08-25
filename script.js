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
        ".destination-cards .btn-secondary",
        ".feedback-section .section-header",
        ".testimonials-grid .testimonial-card",
        ".research .section-header",
        ".article-grid .article-card",
        ".journal-cta",
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

// Hero Scroll Cue Fadeout
function initHeroScrollCue() {
    const cue = document.getElementById("heroScrollCue");
    if (!cue) return;
    window.addEventListener("scroll", () => {
        if (window.scrollY > 70) {
            cue.classList.add("faded");
        } else {
            cue.classList.remove("faded");
        }
    }, { passive: true });
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

// Dynamic Radial SVG Scroll "Back to Top" Widget
function initRadialScrollWidget() {
    let widget = document.getElementById("floatingScrollWidget");
    if (!widget) {
        widget = document.createElement("div");
        widget.id = "floatingScrollWidget";
        widget.className = "floating-scroll-widget";
        widget.innerHTML = `
            <svg class="progress-ring" width="54" height="54">
                <circle class="progress-ring-bg" stroke="rgba(255,255,255,0.12)" stroke-width="3" fill="transparent" r="22" cx="27" cy="27"/>
                <circle class="progress-ring-circle" stroke="#068686" stroke-width="3" fill="transparent" r="22" cx="27" cy="27"/>
            </svg>
            <button class="floating-top-btn" aria-label="Back to Top">
                <i class='bx bx-up-arrow-alt'></i>
            </button>
        `;
        document.body.appendChild(widget);
    }

    const circle = widget.querySelector(".progress-ring-circle");
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    const topBtn = widget.querySelector(".floating-top-btn");
    if (topBtn) {
        topBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

        const offset = circumference - scrollPercent * circumference;
        circle.style.strokeDashoffset = offset;

        if (scrollTop > 260) {
            widget.classList.add("active");
        } else {
            widget.classList.remove("active");
        }
    }, { passive: true });
}

function initAll() {
    initScrollProgress();
    initScrollReveal();
    initTopDestinationImageReveal();
    initFooterAccordion();
    initFlipCards();
    initHeroScrollCue();
    initStatsCounter();
    initScrollSpy();
    initRadialScrollWidget();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
} else {
    initAll();
}