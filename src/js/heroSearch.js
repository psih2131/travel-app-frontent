function heroSearch() {
    const block = document.querySelector('.hero-search');
    if (!block) return;

    const input = block.querySelector('[data-hero-input]');
    const field = block.querySelector('[data-hero-field="destination"]');
    const dropdown = block.querySelector('.hero-search__dropdown--destinations');
    const options = Array.from(block.querySelectorAll('[data-hero-list="destinations"] .hero-search__option'));
    const emptyState = block.querySelector('[data-hero-empty]');

    if (!input || !field || !dropdown) return;

    let selectedValue = '';

    function closeDropdown() {
        dropdown.hidden = true;
        field.classList.remove('is-open');
    }

    function openDropdown() {
        dropdown.hidden = false;
        field.classList.add('is-open');
    }

    function normalizeValue(value) {
        return value.trim().toLowerCase();
    }

    function filterOptions(query) {
        const normalizedQuery = normalizeValue(query);
        let visibleCount = 0;

        options.forEach((option) => {
            const label = option.getAttribute('data-label') || option.textContent || '';
            const isVisible = !normalizedQuery || normalizeValue(label).includes(normalizedQuery);
            option.parentElement.hidden = !isVisible;
            if (isVisible) visibleCount += 1;
        });

        if (emptyState) emptyState.hidden = visibleCount > 0;
    }

    options.forEach((option) => {
        option.addEventListener('click', () => {
            input.value = option.getAttribute('data-label') || '';
            selectedValue = option.getAttribute('data-value') || '';
            closeDropdown();
        });
    });

    input.addEventListener('focus', () => {
        openDropdown();
        filterOptions(input.value);
    });

    input.addEventListener('click', () => {
        openDropdown();
        filterOptions(input.value);
    });

    input.addEventListener('input', () => {
        selectedValue = '';
        openDropdown();
        filterOptions(input.value);
    });

    document.addEventListener('click', (event) => {
        if (!block.contains(event.target)) closeDropdown();
    });

    function submitSearch() {
        const params = new URLSearchParams();
        const destination = selectedValue || input.value.trim();

        if (destination) params.set('destination', destination);
        window.location.href = `/tours.html?${params.toString()}`;
    }

    input.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter') return;
        event.preventDefault();
        submitSearch();
    });
}

export { heroSearch };
