/**
 * Глобальные простые скрипты
 */

function initBaseScripts() {
    headerOpacityOnHome();
}

function openMobileMenu() {
    const burgerMenuBtn = document.querySelector('.burger-menu-btn');
    const mobileMenu = document.querySelector('.header-mobile-menu');
    
    burgerMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        burgerMenuBtn.classList.toggle('active');
    });

}

function headerOpacityOnHome() {
    const path = window.location.pathname;
    const isHome = path === '/' || path === '/index.html' || path === '';
    const header = document.querySelector('.header');
    if (!header) return;
    if (isHome) {
        header.classList.add('opacityu-mod');
    } else {
        header.classList.remove('opacityu-mod');
    }
}

export { initBaseScripts, openMobileMenu };
