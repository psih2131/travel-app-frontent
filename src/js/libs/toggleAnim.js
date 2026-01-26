function slideUp(el, duration = 300) {
    el.style.height = el.offsetHeight + 'px';
    el.style.transitionProperty = 'height, margin, padding';
    el.style.transitionDuration = duration + 'ms';
    el.offsetHeight; // force repaint

    el.style.overflow = 'hidden';
    el.style.height = 0;
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
    el.style.marginTop = 0;
    el.style.marginBottom = 0;

    window.setTimeout(() => {
        el.style.display = 'none';
        cleanup(el);
    }, duration);
}

function slideDown(el, duration = 300) {
    el.style.removeProperty('display');
    let display = window.getComputedStyle(el).display;
    if (display === 'none') display = 'block';
    el.style.display = display;

    const height = el.scrollHeight;

    el.style.overflow = 'hidden';
    el.style.height = 0;
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
    el.style.marginTop = 0;
    el.style.marginBottom = 0;

    el.offsetHeight; // force repaint

    el.style.transitionProperty = 'height, margin, padding';
    el.style.transitionDuration = duration + 'ms';
    el.style.height = height + 'px';

    window.setTimeout(() => {
        cleanup(el);
    }, duration);
}

function slideToggle(el, duration = 300) {
    if (window.getComputedStyle(el).display === 'none') {
        slideDown(el, duration);
    } else {
        slideUp(el, duration);
    }
}

function cleanup(el) {
    el.style.removeProperty('height');
    el.style.removeProperty('overflow');
    el.style.removeProperty('transition-duration');
    el.style.removeProperty('transition-property');
    el.style.removeProperty('padding-top');
    el.style.removeProperty('padding-bottom');
    el.style.removeProperty('margin-top');
    el.style.removeProperty('margin-bottom');
}

export { slideUp, slideDown, slideToggle }