const REVIEW_TEXT_MAX = 300;

function reviewCardTruncate() {
    const textElements = document.querySelectorAll(".review-card__text");
    if (!textElements.length) return;

    textElements.forEach((el) => {
        const fullText = el.getAttribute("data-full-text") || "";
        if (fullText.length <= REVIEW_TEXT_MAX) return;
        const shortText = fullText.slice(0, REVIEW_TEXT_MAX).trim() + "...";
        el.textContent = shortText;
        const wrap = el.closest(".review-card__text-wrap");
        const btn = wrap?.querySelector(".review-card__more");
        if (!btn) return;
        btn.hidden = false;
        btn.textContent = "Ещё";
        btn.addEventListener("click", function () {
            if (el.dataset.expanded === "1") {
                el.textContent = shortText;
                el.dataset.expanded = "";
                btn.textContent = "Ещё";
            } else {
                el.textContent = fullText;
                el.dataset.expanded = "1";
                btn.textContent = "Свернуть";
            }
        });
    });
}

export { reviewCardTruncate };
