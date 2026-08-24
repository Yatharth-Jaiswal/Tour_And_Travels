//Nav Bar
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header").style.top = "0";
  } else {
    document.getElementById("header").style.top = "-100px";
  }
  prevScrollpos = currentScrollPos;
}


//Hero Slider
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




const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const slides = document.querySelectorAll('.slide');
const numberOfSlides = slides.length;
let slideNumber = 0;

//slider next button
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

//slider prev button
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