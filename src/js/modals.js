/**
 * Модальные окна на Micromodal.
 * Триггеры: data-engram-button="modal-id" (сохраняем старый атрибут для совместимости разметки).
 */
import MicroModal from 'micromodal';

function initModals() {
    // Открытие по клику на [data-engram-button]
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-engram-button]');
        if (!trigger) return;
        e.preventDefault();
        const modalId = trigger.getAttribute('data-engram-button');
        if (!modalId || !document.getElementById(modalId)) return;
        // Закрыть любую уже открытую модалку перед открытием другой
        document.querySelectorAll('.modal.is-open').forEach((el) => {
            el.classList.remove('is-open');
            el.setAttribute('aria-hidden', 'true');
        });
        document.body.style.overflow = '';
        MicroModal.show(modalId);
    });
}

export { initModals };
