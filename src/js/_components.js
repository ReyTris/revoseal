console.log("components");
import "./jquery.js";
import { disableScroll } from "./functions/disable-scroll.js";
import { enableScroll } from "./functions/enable-scroll.js";

import Swiper from "swiper";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";

const App = {
  init() {
    this.burger();
    this.langDropdown();
    this.accordion();
    this.productsTabs();
    this.sliderProducts();
    this.geographyTabs();
    this.playVideo();
    this.scrollTo($(".link-to-form"));
  },

  burger() {
    const burger = document?.querySelector("[data-burger]");
    const menu = document?.querySelector("[data-menu]");
    const menuItems = document?.querySelectorAll("[data-menu-item]");
    const overlay = document?.querySelector("[data-menu-overlay]");
    const burgerClose = document?.querySelector("[data-burger-close]");

    burger?.addEventListener("click", (e) => {
      burger?.classList.toggle("burger--active");
      menu?.classList.toggle("menu--active");

      if (menu?.classList.contains("menu--active")) {
        burger?.setAttribute("aria-expanded", "true");
        burger?.setAttribute("aria-label", "Закрыть меню");
        disableScroll();
      } else {
        burger?.setAttribute("aria-expanded", "false");
        burger?.setAttribute("aria-label", "Открыть меню");
        enableScroll();
      }
    });

    overlay?.addEventListener("click", () => {
      disableBurger();
    });

    burgerClose?.addEventListener("click", () => {
      disableBurger();
      enableScroll();
    });

    menuItems?.forEach((el) => {
      el.addEventListener("click", () => {
        disableBurger();
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        disableBurger();
        enableScroll();
      }
    });

    const disableBurger = () => {
      burger?.setAttribute("aria-expanded", "false");
      burger?.setAttribute("aria-label", "Открыть меню");
      burger.classList.remove("burger--active");
      menu.classList.remove("menu--active");
    };
  },

  langDropdown() {
    const dropdown = document.querySelectorAll("[data-button]");
    dropdown.forEach((el) => {
      const dropdownWrapper = el.querySelector(".hl-dropdown");
      el.addEventListener("click", () => {
        dropdownWrapper.classList.toggle("hl-dropdown--active");
      });

      document.addEventListener("click", (e) => {
        if (!dropdownWrapper.contains(e.target) && !el.contains(e.target)) {
          dropdownWrapper.classList.remove("hl-dropdown--active");
        }
      });
    });
  },

  accordion() {
    const accordion = document?.querySelector("[data-accordion]");
    const accordionItems = accordion?.querySelectorAll("[data-accordion-item]");

    $(accordionItems).each((i, el) => {
      const accordionItemHeader = $(el).find(".sl-accordion-item-header");
      accordionItemHeader.on("click", () => {
        $(el).toggleClass("sl-accordion-item--active");
        $(el).find(".sl-accordion-item-info").slideToggle();
      });
    });
  },

  productsTabs() {
    $(".pt-menu-item").each((i, el) => {
      $(el).on("click", () => {
        $(".pt-menu-item").removeClass("pt-menu-item--active");
        $(el).addClass("pt-menu-item--active");
        $(".pt-content").removeClass("pt-content--active");
        $(`[data-tab=${i}]`).addClass("pt-content--active");
      });
    });
  },

  sliderProducts() {
    const mainImage = document.querySelector(".pd-image__full img");
    Swiper.use([Navigation, Pagination, Scrollbar]);
    const swiper = new Swiper(".swiper", {
      slidesPerView: 3,
      spaceBetween: 30,
      autoplay: false,
      grabCursor: true,
      scrollbar: {
        el: ".swiper-scrollbar",
      },
      on: {
        click(i, e) {
          if (e.target.tagName === "IMG") {
            console.log("click", e);
            mainImage.src = e.target.currentSrc;
          }
        },
      },
    });
  },

  geographyTabs() {
    $(".g-tabs-item").each((i, el) => {
      $(el).on("click", () => {
        $(".g-tabs-item").removeClass("g-tabs-item--active");
        $(el).addClass("g-tabs-item--active");
        $(".g-map-item").removeClass("g-map-item--active");
        $(`[data-card=${i + 1}]`).addClass("g-map-item--active");
      });
    });

    $(".g-map-item__close").on("click", () => {
      $(".g-map-item").removeClass("g-map-item--active");
      $(".g-tabs-item").removeClass("g-tabs-item--active");
    });

    $(document).on("click", (e) => {
      if (!$(e.target).closest(".g-tabs-item, .g-map-item").length) {
        $(".g-tabs-item").removeClass("g-tabs-item--active");
        $(".g-map-item").removeClass("g-map-item--active");
      }
    });
  },

  playVideo() {
    const buttonPlay = $(".video-player").find(".vp-button-play");
    const videoUrl = $(".video-player").data("youtube");

    console.log(buttonPlay, videoUrl);

    $(buttonPlay).on("click", () => {
      $(".video-player").addClass("state-play");
      const iframe = $(".video-player iframe")[0];
      iframe.src += "&autoplay=1";
    });
  },

  scrollTo(link) {
    link.on("click", function (e) {
      var anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $(anchor.attr("href")).offset().top,
          },
          {
            duration: 500,
            easing: "swing",
            delay: 0,
          }
        );
      e.preventDefault();
      return false;
    });
  },
};

App.init();
