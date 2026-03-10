import { slideUp, slideDown, slideToggle } from "./libs/toggleAnim";

import { Fancybox } from "@fancyapps/ui/dist/fancybox/";

function acordeon() {
    let orgDetAcordeon = document.querySelectorAll('.org-det__element')

    if (orgDetAcordeon?.length > 0) {
        orgDetAcordeon.forEach(el => {
            const header = el.querySelector('.org-det__element-header');
            if (!header) return;
            header.addEventListener('click', function () {
                slideToggle(el.querySelector('.org-det__element-body'));
            });
        })
    }

}

function acordeonProgram() {
    let orgDetAcordeon = document.querySelectorAll('.program-tour__acordeon')

    if (orgDetAcordeon?.length > 0) {
        orgDetAcordeon.forEach(el => {
            const header = el.querySelector('.program-tour__acordeon-header');
            if (!header) return;
            header.addEventListener('click', function () {
                slideToggle(el.querySelector('.program-tour__acordeon-body'));
            });
        })
    }

}

function funcyBox() {
    Fancybox.bind('[data-fancybox]', {
        theme: "light",
        mainStyle: {
            "--f-toolbar-padding": "16px 32px",
            "--f-toolbar-gap": "8px",
            "--f-button-border-radius": "50%",
            "--f-thumb-width": "82px",
            "--f-thumb-height": "82px",
            "--f-thumb-opacity": "0.5",
            "--f-thumb-hover-opacity": "1",
            "--f-thumb-selected-opacity": "1",
        },
        Carousel: {
            Toolbar: {
                display: {
                    right: ["toggleFull", "close"],
                },
            },
        },
    });
}

function tourReviewsAccordion() {
    const detailsBtn = document.querySelector('.js-tour-reviews-details');
    const accordion = document.querySelector('.js-tour-reviews-accordion');
    const closeBtn = document.querySelector('.js-tour-reviews-accordion-close');

    if (!detailsBtn || !accordion) return;

    detailsBtn.addEventListener('click', () => {
        accordion.removeAttribute('hidden');
        accordion.classList.add('tour-reviews__accordion--open');
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            accordion.setAttribute('hidden', '');
            accordion.classList.remove('tour-reviews__accordion--open');
        });
    }
}

export { acordeon, funcyBox, acordeonProgram, tourReviewsAccordion }

