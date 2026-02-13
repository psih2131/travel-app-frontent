function hideShowPassword() {
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.auth-form__toggle-password');
        if (!btn) return;

        const wrap = btn.closest('.auth-form__input-wrap');
        const input = wrap?.querySelector('.auth-form__input');
        if (!input) return;

        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        btn.setAttribute('aria-label', isPassword ? 'Скрыть пароль' : 'Показать пароль');
        btn.classList.toggle('auth-form__toggle-password--active', isPassword);
    });
}

export { hideShowPassword };
