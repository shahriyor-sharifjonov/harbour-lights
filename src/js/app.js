import * as functions from "./modules/functions.js";

// import SmoothScroll from 'smoothscroll-for-websites'

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";

import { Draggable } from "gsap/dist/Draggable.js";

import { Fancybox } from "@fancyapps/ui";

// SmoothScroll({
//     animationTime: 1000,
//     stepSize: 60,
//     keyboardSupport: true,
//     arrowScroll: 100,
//     touchpadSupport: true
// })

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

gsap.registerPlugin(ScrollTrigger, Draggable);

const body = document.getElementById("body");

window.onload = function () {
  var a = document.getElementsByTagName("a"),
    i = a.length;

  while (i--) {
    a[i].onclick = (function () {
      return function () {
        return false;
      };
    })();
  }
};

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
      x: 100,
      scale: 0.9,
      ease: "expo.ease",
    },
    {
      x: 0,
      scale: 1.1,
      opacity: 1,
    },
    "start"
  );
});

gsap.utils.toArray(".formInput").forEach((section) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 90%",
      end: "top 70%",
      scrub: 2,
      markers: false,
    },
    stagger: 0.2,
  });
  tl.add("start").from(
    section,
    {
      x: -80,
      opacity: 0,
      ease: "expo.ease",
      stagger: 0.2,
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

functions.isWebp();

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
    delay: 2000, 
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
      });
    });
  }
};
maps();

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
  console.log("idiot opened");
  menu.classList.add("menuOpened");
  body.style.overflowY = "hidden";
});

menu_btn_back.forEach((el) => {
  el.addEventListener("click", () => {
    console.log("idiot closed");
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

const towersHeight = document.querySelector(".twr-sticky").clientHeight / 2;
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

// ============= gallery

(function gsapMatchMedia() {
  ScrollTrigger.matchMedia({
    all: function () {},
    // 2500 - 1025
    "(max-width: 2500px) and (min-width: 1025px)": function () {
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
    // 1024 - 577
    "(max-width: 1024px) and (min-width: 577px)": function () {
      let sections = gsap.utils.toArray(".gallery-slide");
      gsap.to(sections, {
        xPercent: -97.8 * (sections.length - 1),
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
        xPercent: -97.8 * (sections.length - 1),
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
  });
})();

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

