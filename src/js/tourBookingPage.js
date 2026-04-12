function formatUsd(amount) {
    const n = Math.round(Number(amount) || 0);
    return `$ ${n.toLocaleString('ru-RU')}`;
}

function pluralPeopleRu(n) {
    const n100 = n % 100;
    if (n100 >= 11 && n100 <= 14) {
        return 'человек';
    }
    const n10 = n % 10;
    if (n10 === 1) return 'человек';
    if (n10 >= 2 && n10 <= 4) return 'человека';
    return 'человек';
}

export function initTourBookingPage() {
    const form = document.querySelector('.js-tour-booking-form');
    if (!form) return;

    const totalEl = form.querySelector('.js-tour-booking-total');
    const participantsSelect = form.querySelector('.js-tour-booking-participants');
    const radios = form.querySelectorAll('input[name="tour_date"]');

    if (!totalEl || !participantsSelect) return;

    function getSelectedPrice() {
        const checked = form.querySelector('input[name="tour_date"]:checked');
        if (!checked) return 0;
        const p = Number(checked.dataset.price);
        return Number.isFinite(p) ? p : 0;
    }

    function updateTotal() {
        const pricePerPerson = getSelectedPrice();
        const participants = Math.max(1, Math.min(6, Number(participantsSelect.value) || 1));
        const total = pricePerPerson * participants;
        const peopleWord = pluralPeopleRu(participants);
        totalEl.textContent = `Стоимость: ${formatUsd(total)} за ${participants} ${peopleWord}`;
    }

    radios.forEach((radio) => {
        radio.addEventListener('change', updateTotal);
    });
    participantsSelect.addEventListener('change', updateTotal);

    updateTotal();
}
