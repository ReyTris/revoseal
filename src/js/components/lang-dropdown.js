export const langDropdown = () => {
  const dropdown = document.querySelector("[data-button]");
  const dropdownWrapper = document.querySelector(".hl-dropdown");

  dropdown.addEventListener("click", () => {
    dropdownWrapper.classList.toggle("hl-dropdown--active");
  });

  document.addEventListener("click", (e) => {
    if (!dropdownWrapper.contains(e.target) && !dropdown.contains(e.target)) {
      dropdownWrapper.classList.remove("hl-dropdown--active");
    }
  });
};
