function initUserBookingReview() {
    const form = document.querySelector('.js-user-booking-review-form');
    if (!form) return;

    const starsWrap = form.querySelector('.js-user-booking-review-stars');
    const hidden = form.querySelector('.js-user-booking-review-rating');
    const err = form.querySelector('.js-user-booking-review-error');
    const stars = form.querySelectorAll('.js-user-booking-review-star');

    if (!starsWrap || !hidden || !stars.length) return;

    stars.forEach((btn) => {
        btn.addEventListener('click', () => {
            const v = btn.getAttribute('data-value') || '';
            hidden.value = v;
            starsWrap.dataset.rating = v;
            if (err) {
                err.textContent = '';
                err.hidden = true;
            }
        });
    });

    form.addEventListener('submit', (e) => {
        if (!hidden.value) {
            e.preventDefault();
            if (err) {
                err.textContent = 'Выберите оценку от 1 до 5 звёзд.';
                err.hidden = false;
            }
        }
    });
}

export { initUserBookingReview };
