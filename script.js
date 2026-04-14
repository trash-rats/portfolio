const toggle = document.querySelector(".nav-toggle");
const mobile = document.querySelector(".nav-mobile");
const iconOpen = document.querySelector(".nav-toggle .icon-menu");
const iconClose = document.querySelector(".nav-toggle .icon-close");

if (toggle && mobile) {
  toggle.addEventListener("click", () => {
    const isOpen = mobile.classList.toggle("open");
    iconOpen?.toggleAttribute("hidden", isOpen);
    iconClose?.toggleAttribute("hidden", !isOpen);
  });
  mobile.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      mobile.classList.remove("open");
      iconOpen?.removeAttribute("hidden");
      iconClose?.setAttribute("hidden", "");
    });
  });
}

const yearEl = document.querySelector("[data-year]");
if (yearEl) yearEl.textContent = new Date().getFullYear();
