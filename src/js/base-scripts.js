/**
 * Глобальные простые скрипты
 */

function initBaseScripts() {
    headerOpacityOnHome();
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

export { initBaseScripts };
