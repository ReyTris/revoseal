console.log("components");
import "./jquery.js";
import { disableScroll } from "./functions/disable-scroll.js";
import { enableScroll } from "./functions/enable-scroll.js";

// const $ = require("jquery");

const App = {
  init() {
    this.burger();
    this.langDropdown();
    this.accordion();
    this.productsTabs();
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
      }
    });

    const disableBurger = () => {
      burger?.setAttribute("aria-expanded", "false");
      burger?.setAttribute("aria-label", "Открыть меню");
      burger.classList.remove("burger--active");
      menu.classList.remove("menu--active");
      // enableScroll();
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
    let activeTab = 0;
    $(".pt-menu-item").each((i, el) => {
      $(el).on("click", () => {
        $(".pt-menu-item").removeClass("pt-menu-item--active");
        $(el).addClass("pt-menu-item--active");
        activeTab = i;
        $(".pt-content").removeClass("pt-content--active");
        $(`[data-tab=${i}]`).addClass("pt-content--active");
      });
    });
  },
};

App.init();
