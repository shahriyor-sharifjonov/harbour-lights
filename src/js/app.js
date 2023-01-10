import * as functions from "./modules/functions.js";

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";

import { ScrollToPlugin } from 'gsap/ScrollToPlugin.js'

import { Draggable } from "gsap/dist/Draggable.js";

import { Fancybox } from "@fancyapps/ui";

import Swiper, {
  Autoplay,
  EffectFade,
  FreeMode,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper";

import SmoothScroll from "smoothscroll-for-websites";

SmoothScroll({
  animationTime: 1000,
  stepSize: 60,
  keyboardSupport: true,
  arrowScroll: 100,
  touchpadSupport: true,
});

gsap.registerPlugin(ScrollTrigger, Draggable, ScrollToPlugin);


// Preloader

const preloader = document.querySelector('#preloader');
let weekDay = document.querySelector('.preloader-calendar-week');
let calendarLogo = document.querySelector('.preloader-calendar-logo');

let secWrap = document.querySelector('.preloader-numbers');
let secspan = document.querySelector('.preloader-numbers .preloader-num');
let secspans = document.querySelectorAll('.preloader-num');

let calHours = document.querySelector('.preloader-calendar-hours');
let calMinutes = document.querySelector('.preloader-calendar-minutes');
let calDay = document.querySelector('.preloader-calendar-day');
let calWeek = document.querySelector('.preloader-calendar-week');
let calYear = document.querySelector('.preloader-calendar-year');


let sec = 1;
const secspanHeight = secspan.clientHeight;

while (sec <= 100) {
    let span = document.createElement('span');
    span.textContent = sec;
    span.setAttribute("class", "preloader-num");
    secWrap.appendChild(span);
    sec++;
}
var i = 0;
window.setInterval(function () {
    i = i + 1;
    if (i <= 100) {
        secWrap.style.transform = `translateY(-${secspanHeight * i}px)`;
    }
}, 1000);


setTimeout(calendarLogo.classList.add('active'), 1000);

// Get Time
const d = new Date();

const theYear = d.getFullYear();
calYear.innerHTML = theYear;

const weekday = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
let week = weekday[d.getDay()];
calWeek.innerHTML = week;

let currentDay = d.getDate();
if (currentDay <= 9) {
    let exactDay = '0' + currentDay
    calDay.innerHTML = exactDay;
} else {
    calDay.innerHTML = currentDay;
}

function digitalClock() {

    var d = new Date();
    var hours = d.getHours();
    hours = addZero(hours);
    var minutes = d.getMinutes();
    minutes = addZero(minutes);

    calHours.innerHTML = hours;
    calMinutes.innerHTML = minutes;
}

function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}

setInterval(digitalClock, 1000);

window.addEventListener('load', function (event) {
    document.body.classList.add('loaded');
});


const tlMenu = gsap.timeline({ paused: true });

const btnToggler = document.querySelector(".menu-nav__menu");
btnToggler.addEventListener("click", toggleMenu);
function toggleMenu() {
  tlMenu.reversed() ? tlMenu.timeScale(1).play() : tlMenu.timeScale(2).reverse();
  btnToggler.classList.toggle('open')
}
tlMenu.reverse();

function getSamePageAnchor(link) {
  if (
    link.protocol !== window.location.protocol ||
    link.host !== window.location.host ||
    link.pathname !== window.location.pathname ||
    link.search !== window.location.search
  ) {
    return false;
  }

  return link.hash;
}
function scrollToHash(hash, e) {
  const elem = hash ? document.querySelector(hash) : false;
  if (elem) {
    if (e) e.preventDefault();
    gsap.to(window, { duration: 0, scrollTo: elem });
  }
}
document.querySelectorAll('a[href]').forEach((a) => {
  a.addEventListener("click", (e) => {
    scrollToHash(getSamePageAnchor(a), e);
    toggleMenu();
  });
});

// ============= gallery

(function gsapMatchMedia() {
  ScrollTrigger.matchMedia({
    all: function () {},
    // 2500 - 1025
    "(max-width: 2500px) and (min-width: 1025px)": function () {
      let sections = gsap.utils.toArray(".gallery-slide");

      gsap.to(sections, {
        xPercent: -92.5 * (sections.length - 1),
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".gallery",
          pin: true,
          scrub: true,
          start: "top 0%",
          end: "+=10000",
        },
      });
    },
    // 1024 - 577
    "(max-width: 1024px) and (min-width: 577px)": function () {
      let sections = gsap.utils.toArray(".gallery-slide");
      gsap.to(sections, {
        xPercent: -96 * (sections.length - 1),
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".gallery",
          pin: true,
          scrub: true,
          start: "top 0%",
          end: "+=10000",
        },
      });
    },
    // 576 - 320
    "(max-width: 576px) and (min-width: 320px)": function () {
      let sections = gsap.utils.toArray(".gallery-slide");
      gsap.to(sections, {
        xPercent: -90 * (sections.length - 1),
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".gallery",
          pin: true,
          scrub: true,
          start: "top 0%",
          end: "+=1000",
        },
      });
    },
  });
})();

const body = document.getElementById("body");

gsap.utils.toArray(".places-top").forEach((section) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      end: "top 20%",
      scrub: 2,
      markers: false,
    },
  });
  tl.add("start")
    .from(
      section.querySelector(".box-left-side"),
      {
        x: -200,
        opacity: 0,
        ease: "expo.ease",
      },
      "start"
    )
    .from(
      section.querySelector(".box-right-side"),
      {
        x: 200,
        opacity: 0,
        ease: "expo.ease",
      },
      "start"
    );
});

gsap.utils.toArray(".places-bottom").forEach((section) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      end: "top 20%",
      scrub: 2,
      markers: false,
    },
  });
  tl.add("start")
    .from(
      section.querySelector(".box-left-side"),
      {
        x: -200,
        opacity: 0,
        ease: "expo.ease",
      },
      "start"
    )
    .from(
      section.querySelector(".box-right-side"),
      {
        x: 200,
        opacity: 0,
        ease: "expo.ease",
      },
      "start"
    );
});

gsap.utils.toArray(".book-img").forEach((section) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 60%",
      end: "top 20%",
      scrub: 2,
      markers: false,
    },
  });
  tl.add("start").fromTo(
    section,
    {
      x: 110,
      y: 0,
      scale: 0.9,
      ease: "expo.ease",
    },
    {
      x: 30,
      y: -20,
      scale: 1.1,
      opacity: 1,
    },
    "start"
  );
});

gsap.utils.toArray(".developerAnim").forEach((section) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      end: "top 0%",
      scrub: 1,
      markers: false,
    },
  });
  tl.add("start").from(
    section,
    {
      y: 80,
      opacity: 0,
      stagger: 5,
    },
    "start"
  );
});

const swiper = new Swiper(".mySwiper", {
  modules: [Navigation],
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const autoSwiper = new Swiper(".twrSwiper", {
  modules: [Pagination, Autoplay],
  spaceBetween: 0,
  simulateTouch: true,
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  autoplay: {
    delay: 6000,
  },
});

new Swiper(".developer__swiper", {
  slidesPerView: 1.2,
  spaceBetween: 10,
  breakpoints: {
    576: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },
});

const tabs = () => {
  if (document.querySelectorAll(".floor__tab-item")) {
    const tabBtns = document.querySelectorAll(".floor__tab-item");
    const tabContents = document.querySelectorAll(".floor__content");
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const target = btn.getAttribute("data-target");
        const el = document.querySelector(target);
        tabBtns.forEach((btn) => {
          btn.classList.remove("active");
        });
        e.target.classList.add("active");
        tabContents.forEach((content) => {
          content.classList.remove("active");
        });
        el.classList.add("active");
      });
    });
  }
};
tabs();

new Swiper(".floor__swiper", {
  modules: [Navigation, EffectFade],
  slidesPerView: 1,
  slidesPerGroup: 1,
  preventClicks: true,
  preventClicksPropagation: true,
  noSwiping: true,
  noSwipingSelector: "button",
  slideToClickedSlide: false,
  focusableElements: "button",
  createElements: true,
  watchSlidesProgress: true,
  speed: 600,
  effect: "fade",
  navigation: {
    nextEl: ".floor__next",
    prevEl: ".floor__prev",
  },
});

let scrollBefore = 0;
const header = document.getElementById("header");

window.addEventListener("scroll", (e) => {
  const scrolled = window.scrollY;
  if (scrolled > 300) {
    if (scrollBefore > scrolled) {
      if (header.classList.contains("hide")) {
        header.classList.remove("hide");
      }
      scrollBefore = scrolled;
    } else {
      scrollBefore = scrolled;
      if (!header.classList.contains("hide")) {
        header.classList.add("hide");
      }
    }
  }
});

const menu_btn = document.querySelector(".menu-nav__menu");
const menu_btn_back = document.querySelectorAll(".menu-close");
const menu = document.getElementById("menu");

menu_btn.addEventListener("click", () => {
  menu.classList.add("menuOpened");
  body.style.overflowY = "hidden";
});

menu_btn_back.forEach((el) => {
  el.addEventListener("click", () => {
    menu.classList.remove("menuOpened");
    body.style.overflowY = "auto";
  });
});

const numberClass = document.querySelectorAll(".show-number");
numberClass?.forEach((el) => {
  el.addEventListener("click", () => {
    el.innerHTML = el.getAttribute("data-number");
    el.style.color = "#5E7390";
  });
});

const broshureOpen = document.querySelectorAll(".broshure-open");
const broshureClose = document.querySelectorAll(".broshure-close");
const broshureContainer = document.getElementById("broshureContainer");


broshureOpen?.forEach((el) => {
  el.addEventListener("click", () => {
    broshureContainer.classList.add("opening");
  });
});

broshureClose?.forEach((el) => {
  el.addEventListener("click", () => {
    broshureContainer.classList.remove("opening");
  });
});


const floorModal = document.getElementById('floor-plan__modal')

document.querySelectorAll('.floor-modal__open').forEach(el => {
  el.addEventListener('click',() => {
    floorModal.classList.add('floor-plan__opened')
  })
})

document.querySelectorAll('.floor-modal__close').forEach(el => {
  el.addEventListener('click',() => {
    floorModal.classList.remove('floor-plan__opened')
  })
})

document.querySelectorAll('.floor__item-btn')?.forEach(el => {
  el.addEventListener('click',() => {
    const dataNumber = el.getAttribute('data-number')
    const srclnk = 'img/'+dataNumber 
    document.querySelectorAll(".floor-plan__img").forEach(elem => {
      elem.setAttribute("src", srclnk)
    })
  })
})

gsap.utils.toArray(".twr-sticky").forEach((section) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "130% top",
      scrub: true,
      markers: false,
    },
  });
  tl.add("start").to(
    section.querySelector(".twr-title"),
    {
      opacity: 0,
      scale: 2,
    },
    "start"
  );
});

function format_number(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const n = document.querySelectorAll(".numbers");
n.forEach((el) => {
  let value = { val: parseInt(el.getAttribute("data-number")) };
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: "0% 90%",
      end: "30% 50%",
      markers: false,
    },
  });
  tl.from(value, {
    duration: 3,
    ease: "circ.out",
    val: 0,
    roundProps: "val",
    onUpdate: function () {
      el.innerText = format_number(value.val);
    },
  });
});

const menuBtnActive = document.querySelectorAll(".menu-con__btn");

menuBtnActive?.forEach((el) => {
  el.addEventListener("click", () => {
    menuBtnActive.forEach((all) => {
      all.classList.remove("active");
    });
    el.classList.add("active");
  });
});

// ======= map

const map = document.querySelector('.bg-map')

map.scrollLeft +=150

const maps = () => {
  if (document.querySelectorAll(".map-btn")) {
    const mapBtns = document.querySelectorAll(".map-btn");
    const maps = document.querySelectorAll(".bg-map");
    mapBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const target = btn.getAttribute("data-target");
        const el = document.querySelector(target);
        mapBtns.forEach((btn) => {
          btn.classList.remove("active");
        });
        e.target.classList.add("active");
        maps.forEach((content) => {
          content.classList.remove("active");
        });
        el.classList.add("active");
        el.scrollLeft = 0
        el.scrollLeft +=150
      });
    });
  }
};
maps();

// Book don't edit

gsap.utils.toArray(".book-container").forEach((section) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "30% 70%",
      end: "30% 50%",
      scrub: 2,
      markers: false,
    },
  });
  tl.add("start").to(
    section.querySelector(".text"),
    {
      scale: 1.2,
    },
    "start"
  );
});

const bookHeight = document.querySelector(".twr-title").clientHeight / 2;

gsap.utils.toArray(".book-sticky").forEach((section) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "150% top",
      scrub: true,
      markers: false,
    },
  });
  tl.add("start")
    .to(
      section.querySelector(".sticky-bg"),
      {
        opacity: 0,
        scale: 2,
        duration: 0.4,
      },
      "start"
    )
    .fromTo(
      section.querySelector(".text"),
      {
        y: bookHeight * 5,
      },
      {
        y: -bookHeight + 30,
      },
      "start"
    );
});

gsap.utils.toArray(".book-container").forEach((section) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "30% 70%",
      end: "30% 50%",
      scrub: 2,
      markers: false,
    },
  });
  tl.add("start").to(
    section.querySelector(".text"),
    {
      scale: 1.2,
    },
    "start"
  );
});
