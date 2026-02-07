import Flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru.js';
import 'flatpickr/dist/flatpickr.min.css';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

function hideFlatpickrYear(instance) {
    if (!instance?.calendarContainer) return;
    const yearWrap = instance.calendarContainer.querySelector('.flatpickr-current-month .numInputWrapper');
    if (yearWrap) yearWrap.style.display = 'none';
}

const PRICE_MIN = 0;
const PRICE_MAX = 1000000;
const PRICE_DEFAULT = [0, 500000];

function heroSearch() {
    const block = document.querySelector('.hero-search');
    if (!block) return;

    const directionTrigger = block.querySelector('[data-hero-trigger="direction"]');
    const directionValue = block.querySelector('[data-hero-value="direction"]');
    const directionDropdown = block.querySelector('.hero-search__dropdown--direction');
    const directionOptions = block.querySelectorAll('[data-hero-list="direction"] .hero-search__option');

    const priceTrigger = block.querySelector('[data-hero-trigger="price"]');
    const priceValue = block.querySelector('[data-hero-value="price"]');
    const priceDropdown = block.querySelector('.hero-search__dropdown--price');
    const priceSliderEl = block.querySelector('#hero-price-slider');
    const priceInputMin = block.querySelector('.hero-search__price-input--min');
    const priceInputMax = block.querySelector('.hero-search__price-input--max');

    const dateTrigger = block.querySelector('[data-hero-trigger="date"]');
    const dateValue = block.querySelector('[data-hero-value="date"]');
    const dateInput = block.querySelector('#hero-date-input');

    const fields = block.querySelectorAll('[data-hero-field]');
    const searchBtn = block.querySelector('[data-hero-search]');

    // ——— Направление: выпадающий список ———
    const directionLabels = { '': 'Направление', norway: 'Норвегия', kamchatka: 'Камчатка', italy: 'Италия', thailand: 'Тайланд', iceland: 'Исландия', canada: 'Канада', karelia: 'Карелия', crimea: 'Крым', jordan: 'Иордания', greece: 'Греция' };

    directionOptions.forEach((opt) => {
        opt.addEventListener('click', () => {
            const value = opt.getAttribute('data-value') || '';
            directionTrigger.setAttribute('data-value', value);
            directionValue.textContent = directionLabels[value] || opt.textContent.trim();
            directionTrigger.setAttribute('aria-expanded', 'false');
            directionDropdown.hidden = true;
            directionTrigger.closest('.hero-search__field')?.classList.remove('is-open');
        });
    });

    directionTrigger?.addEventListener('click', (e) => {
        e.stopPropagation();
        const field = directionTrigger.closest('.hero-search__field');
        const isOpen = directionDropdown.hidden === false;
        closeAllDropdowns();
        if (!isOpen) {
            directionDropdown.hidden = false;
            directionTrigger.setAttribute('aria-expanded', 'true');
            field?.classList.add('is-open');
        }
    });

    // ——— Цена: слайдер + поля ввода ———
    let priceSlider = null;
    if (priceSliderEl && priceInputMin && priceInputMax) {
        priceSlider = noUiSlider.create(priceSliderEl, {
            start: PRICE_DEFAULT,
            connect: true,
            range: { min: PRICE_MIN, max: PRICE_MAX },
            step: 1000,
            format: {
                to: (v) => Math.round(v),
                from: (v) => Number(v),
            },
        });

        priceSlider.on('update', (values) => {
            const [min, max] = values.map((v) => Math.round(Number(v)));
            priceInputMin.value = min;
            priceInputMax.value = max;
            priceValue.textContent = formatPriceRange(min, max);
            priceTrigger?.setAttribute('data-value', '1');
        });
        priceValue.textContent = formatPriceRange(PRICE_DEFAULT[0], PRICE_DEFAULT[1]);

        priceInputMin.addEventListener('change', () => {
            let v = parseInt(priceInputMin.value, 10) || PRICE_MIN;
            v = Math.max(PRICE_MIN, Math.min(v, PRICE_MAX));
            priceSlider.set([v, null]);
        });
        priceInputMax.addEventListener('change', () => {
            let v = parseInt(priceInputMax.value, 10) || PRICE_MAX;
            v = Math.max(PRICE_MIN, Math.min(v, PRICE_MAX));
            priceSlider.set([null, v]);
        });
    }

    function formatPriceRange(min, max) {
        if (min <= 0 && max >= PRICE_MAX) return 'Цена';
        const fmt = (n) => (n >= 1000 ? `${(n / 1000).toFixed(0)} тыс.` : String(n));
        return `${fmt(min)} – ${fmt(max)}`;
    }

    priceTrigger?.addEventListener('click', (e) => {
        e.stopPropagation();
        const field = priceTrigger.closest('.hero-search__field');
        const isOpen = priceDropdown.hidden === false;
        closeAllDropdowns();
        if (!isOpen) {
            priceDropdown.hidden = false;
            priceTrigger.setAttribute('aria-expanded', 'true');
            field?.classList.add('is-open');
        }
    });

    // ——— Дата: Flatpickr (диапазон) ———
    let flatpickrInstance = null;
    if (dateInput && dateTrigger && dateValue) {
        flatpickrInstance = new Flatpickr(dateInput, {
            mode: 'range',
            locale: Russian,
            dateFormat: 'd.m.Y',
            allowInput: false,
            disableMobile: true,
            defaultDate: new Date(),
            appendTo: document.body,
            onOpen: () => {
                dateTrigger?.closest('.hero-search__field')?.classList.add('is-open');
            },
            onClose: () => {
                dateTrigger?.closest('.hero-search__field')?.classList.remove('is-open');
                dateTrigger?.setAttribute('aria-expanded', 'false');
            },
            onReady: (selectedDates, dateStr, instance) => {
                hideFlatpickrYear(instance);
            },
            onMonthChange: (selectedDates, dateStr, instance) => {
                hideFlatpickrYear(instance);
            },
            onChange: (selectedDates) => {
                if (selectedDates.length === 0) {
                    dateValue.textContent = 'Дата';
                    dateTrigger?.removeAttribute('data-value');
                } else {
                    dateValue.textContent = dateInput.value || 'Дата';
                    dateTrigger?.setAttribute('data-value', '1');
                }
            },
        });

        dateTrigger?.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllDropdowns();
            flatpickrInstance.open();
            dateTrigger.setAttribute('aria-expanded', 'true');
        });
    }

    function closeAllDropdowns() {
        fields.forEach((f) => f.classList.remove('is-open'));
        directionDropdown && (directionDropdown.hidden = true);
        priceDropdown && (priceDropdown.hidden = true);
        directionTrigger?.setAttribute('aria-expanded', 'false');
        priceTrigger?.setAttribute('aria-expanded', 'false');
        flatpickrInstance?.close();
    }

    document.addEventListener('click', (e) => {
        const insideSearch = block.contains(e.target);
        const insideCalendar = flatpickrInstance?.calendarContainer?.contains(e.target);
        if (!insideSearch && !insideCalendar) closeAllDropdowns();
    });

    searchBtn?.addEventListener('click', () => {
        const direction = directionTrigger?.getAttribute('data-value') || '';
        const [minPrice, maxPrice] = priceSlider ? priceSlider.get().map(Number) : [PRICE_MIN, PRICE_MAX];
        const dates = flatpickrInstance?.selectedDates || [];
        const params = new URLSearchParams();
        if (direction) params.set('direction', direction);
        if (minPrice > PRICE_MIN || maxPrice < PRICE_MAX) {
            params.set('minPrice', minPrice);
            params.set('maxPrice', maxPrice);
        }
        if (dates.length) params.set('dateFrom', dates[0].toISOString().slice(0, 10));
        if (dates.length > 1) params.set('dateTo', dates[1].toISOString().slice(0, 10));
        window.location.href = `/tours.html?${params.toString()}`;
    });
}

export { heroSearch };
