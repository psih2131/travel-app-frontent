import { slideUp, slideDown } from "./libs/toggleAnim";

const DURATION = 300;

function faqAccordion() {
    const wrappers = document.querySelectorAll(".faq-accordion");
    if (!wrappers.length) return;

    wrappers.forEach((wrapper) => {
        const headers = wrapper.querySelectorAll("[data-faq-toggle]");
        if (!headers.length) return;

        headers.forEach((btn) => {
            const item = btn.closest(".faq-item");
            const body = item?.querySelector(".faq-item__body");
            if (!body) return;

            btn.addEventListener("click", () => {
                const isOpen = item.classList.contains("is-open");

                if (isOpen) {
                    slideUp(body, DURATION);
                    item.classList.remove("is-open");
                    btn.setAttribute("aria-expanded", "false");
                    body.setAttribute("hidden", "");
                } else {
                    body.removeAttribute("hidden");
                    slideDown(body, DURATION);
                    item.classList.add("is-open");
                    btn.setAttribute("aria-expanded", "true");
                }
            });
        });
    });
}

export { faqAccordion };
