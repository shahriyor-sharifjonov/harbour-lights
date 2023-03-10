import * as functions from "./modules/functions.js";
import imagesLoaded from 'imagesloaded'
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";

import { ScrollToPlugin } from "gsap/ScrollToPlugin.js";

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

gsap.registerPlugin(ScrollTrigger, Draggable, ScrollToPlugin);

const images = gsap.utils.toArray("img");

const showDemo = () => {

    gsap.to(document.querySelector(".main-preloader"), { autoAlpha: 0 });
    document.body.classList.add('loaded');

  SmoothScroll({
    animationTime: 1000,
    stepSize: 60,
    keyboardSupport: true,
    arrowScroll: 100,
    touchpadSupport: true,
  });
  
  const tlMenu = gsap.timeline({ paused: true });
  
  const btnToggler = document.querySelector(".menu-nav__menu");
  btnToggler.addEventListener("click", toggleMenu);
  function toggleMenu() {
    tlMenu.reversed()
      ? tlMenu.timeScale(1).play()
      : tlMenu.timeScale(2).reverse();
    btnToggler.classList.toggle("open");
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
  document.querySelectorAll("a[href]").forEach((a) => {
    a.addEventListener("click", (e) => {
      scrollToHash(getSamePageAnchor(a), e);
      toggleMenu();
    });
  });
  
  // ============= gallery
  
  (function gsapMatchMedia() {
    ScrollTrigger.matchMedia({
      all: function () {
        const sections = gsap.utils.toArray(".gallery-slide");
        let maxWidth = 0;
  
        const getMaxWidth = () => {
          maxWidth = 0;
          sections.forEach((section) => {
            maxWidth += section.offsetWidth;
          });
        };
        getMaxWidth();
        ScrollTrigger.addEventListener("refreshInit", getMaxWidth);
  
        gsap.to(sections, {
          x: () => `-${maxWidth - window.innerWidth}`,
          ease: "none",
          scrollTrigger: {
            trigger: ".gallery",
            pin: true,
            scrub: 2,
            end: () => `+=${maxWidth}`,
            invalidateOnRefresh: true,
          },
        });
  
        sections.forEach((sct, i) => {
          ScrollTrigger.create({
            trigger: sct,
            start: () =>
              "top top-=" +
              (sct.offsetLeft - window.innerWidth / 2) *
                (maxWidth / (maxWidth - window.innerWidth)),
            end: () =>
              "+=" +
              sct.offsetWidth * (maxWidth / (maxWidth - window.innerWidth)),
            toggleClass: { targets: sct, className: "active" },
          });
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
        start: "top 100%",
        end: "top 60%",
        scrub: 2,
        markers: false,
      },
    });
    tl.add("start").fromTo(
      section,
      {
        x: 100,
        y: 0,
        scale: 0.9,
        ease: "expo.ease",
        duration: 2,
      },
      {
        x: 20,
        y: -10,
        scale: 1.05,
        opacity: 1,
        duration: 2,
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
  
  setTimeout(() => {
    var mq = window.matchMedia("(max-width: 992px)");
    if (mq.matches) {
      modalFloor.classList.add("modal-opening");
    } else {
      broshureContainer.classList.add("opening");
    }
  }, 40000);
  
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
  
  setTimeout(() => {
    var mq = window.matchMedia("(max-width: 992px)");
    if (mq.matches) {
      modalFloor.classList.add("modal-opening");
    } else {
      broshureContainer.classList.add("opening");
    }
  }, 40000);
  
  // Modal
  
  const modalFloorOpen = document.querySelectorAll(".modal__open");
  const modalFloorClose = document.querySelectorAll(".modal__close");
  const modalFloor = document.getElementById("modal");
  
  modalFloorOpen?.forEach((el) => {
    el.addEventListener("click", () => {
      modalFloor.classList.add("modal-opening");
      body.style.overflowY = "hidden";
    });
  });
  
  modalFloorClose?.forEach((el) => {
    el.addEventListener("click", () => {
      modalFloor.classList.remove("modal-opening");
      body.style.overflowY = "auto";
    });
  });
  
  const floorModal = document.getElementById("floor-plan__modal");
  
  document.querySelectorAll(".floor-modal__open").forEach((el) => {
    el.addEventListener("click", () => {
      floorModal.classList.add("floor-plan__opened");
      body.style.overflowY = "hidden";
    });
  });
  
  document.querySelectorAll(".floor-modal__close").forEach((el) => {
    el.addEventListener("click", () => {
      floorModal.classList.remove("floor-plan__opened");
      body.style.overflowY = "auto";
    });
  });
  
  document.querySelectorAll(".floor__item-btn")?.forEach((el) => {
    el.addEventListener("click", () => {
      const img = el.parentElement.parentElement
        .querySelector(".floor__item-img")
        .querySelector("img");
      const from = el.parentElement.parentElement.querySelector(".floor__price");
      const price = "Starting from " + from.innerHTML + " AED";
      console.log(price);
      document.querySelectorAll(".floor-plan__from")?.forEach((fromFor) => {
        fromFor.innerHTML = price;
      });
      const src = img.getAttribute("src");
      document.querySelectorAll(".floor-plan__img").forEach((elem) => {
        elem.setAttribute("src", src);
      });
    });
  });
  
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
  
  const map = document.querySelector(".bg-map");
  
  map.scrollLeft += 150;
  
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
          el.scrollLeft = 0;
          el.scrollLeft += 150;
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
  
  gsap.timeline({
    scrollTrigger: {
      trigger: ".book-container",
      start: "top top",
      end: "bottom bottom",
      pin: ".sticky-bg",
    },
  }),
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".book-container",
          start: "20% top",
          end: "50% 50%",
          scrub: 1,
        },
      })
      .to(".sticky-bg-substract", {
        opacity: 0,
      }),
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".book-container",
          start: "top top",
          end: "30% top",
          scrub: 1,
        },
      })
      .to(".sticky-bg-substract", {
        scale: 5,
      }),
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".book-container",
          start: "60% bottom",
          end: "bottom bottom",
          scrub: 1,
        },
      })
      .fromTo(
        ".sticky-bg-img",
        {
          opacity: 1,
        },
        {
          opacity: 0.3,
        }
      );
  
  
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
  
};
setTimeout(() => imagesLoaded(images).on("always", showDemo), 1000 )

