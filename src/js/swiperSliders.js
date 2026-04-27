import 'swiper/css';

import Swiper from 'swiper/bundle';
import { Navigation, Pagination, FreeMode, Scrollbar } from 'swiper/modules';


function postSlider() {
    const sliderEl = document.querySelector(".post-slider-swiper");
    if (!sliderEl) return;

    const containerEl = document.querySelector('.container');
    const container = containerEl ? containerEl.offsetWidth : window.innerWidth;
    const windowsWidth = window.innerWidth;
    const currentPadding = (+windowsWidth - +container - 30) / 2;

    const swiper = new Swiper(".post-slider-swiper", {
        modules: [Navigation, Pagination],
        loop: false,
        slidesPerView: 3,
        spaceBetween: 30,
        speed: 700,
        freeMode: {
            enabled: true,
            sticky: true,
        },
        slidesPerView: "auto",
        scrollbar: { draggable: true },
        navigation: {
            nextEl: ".blog-swiper-button-next",
            prevEl: ".blog-swiper-button-prev",
        },
        slidesOffsetBefore: +currentPadding,
        breakpoints: {
            // when window width is >= 320px
            300: {
                slidesPerView: 1,
                spaceBetween: 0,
                slidesOffsetBefore: 0,
                freeMode: false,

                // centeredSlides: true
            },
            // when window width is >= 320px

            // when window width is >= 320px
            760: {
                slidesPerView: "auto",
                spaceBetween: 0,
                slidesOffsetBefore: +currentPadding,
            },

        }

    });
}



function guideSlider() {
    if (!document.querySelector(".guide-slider-swiper")) return;

    new Swiper(".guide-slider-swiper", {
        modules: [Navigation, Pagination],
        loop: true,
        speed: 700,
        watchOverflow: true,
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
            nextEl: ".guide-swiper-button-next",
            prevEl: ".guide-swiper-button-prev",
        },
        // max-width 760: 1; max-width 1250: 2; иначе 3 (как home-guide-sec, directions-guide-sec)
        breakpoints: {
            761: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
            1251: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
    });
}





function reviewsSlider() {
    if (!document.querySelector(".reviews-slider-swiper")) return;

    const swiper = new Swiper(".reviews-slider-swiper", {
        modules: [Navigation],
        loop: true,
        slidesPerView: 3,
        spaceBetween: 30,
        speed: 700,
        navigation: {
            nextEl: ".reviews-swiper-button-next",
            prevEl: ".reviews-swiper-button-prev",
        },
        breakpoints: {
            300: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            780: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
            1281: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
        },
    });
}

export { postSlider, guideSlider, reviewsSlider }