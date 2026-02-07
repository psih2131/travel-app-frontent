import 'swiper/css';

import Swiper from 'swiper/bundle';
import { Navigation, Pagination, FreeMode, Scrollbar } from 'swiper/modules';


function postSlider() {
    let currentPadding
    let container = document.querySelector('.container').offsetWidth
    let windowsWidth = window.innerWidth;
    currentPadding = (+windowsWidth - +container - 30) / 2

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
                slidesPerView: "auto",
                spaceBetween: 0,

                // centeredSlides: true
            },
            // when window width is >= 320px

            // when window width is >= 320px
            780: {
                slidesPerView: "auto",
                spaceBetween: 0,
            },
            // when window width is >= 480px
            1281: {
                slidesPerView: "auto",
                spaceBetween: 0,
            },
            // when window width is >= 640px
            1540: {
                slidesPerView: "auto",
                spaceBetween: 0,
            }
        }

    });
}



function guideSlider() {

    const swiper = new Swiper(".guide-slider-swiper", {
        modules: [Navigation, Pagination],
        loop: true,
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
            nextEl: ".guide-swiper-button-next",
            prevEl: ".guide-swiper-button-prev",
        },
        breakpoints: {
            // when window width is >= 320px
            300: {
                slidesPerView: 3,
                spaceBetween: 30,

                // centeredSlides: true
            },
            // when window width is >= 320px

            // when window width is >= 320px
            780: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            // when window width is >= 480px
            1281: {
                slidesPerView: 4,
                spaceBetween: 0,
            },

        }

    });
}





function reviewsSlider() {
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