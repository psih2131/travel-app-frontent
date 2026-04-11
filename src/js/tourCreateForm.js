import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const quillToolbar = {
    toolbar: [
        [{ header: [2, 3, false] }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
        ['clean'],
    ],
};

const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const ALLOWED_EXT_RE = /\.(jpe?g|png|webp)$/i;

function isAllowedImageFile(file) {
    if (ALLOWED_IMAGE_TYPES.has(file.type)) return true;
    if ((!file.type || file.type === 'application/octet-stream') && ALLOWED_EXT_RE.test(file.name)) {
        return true;
    }
    return false;
}

function filterAllowedFiles(fileList) {
    const allowed = [];
    const rejected = [];
    for (let i = 0; i < fileList.length; i++) {
        const f = fileList[i];
        if (isAllowedImageFile(f)) allowed.push(f);
        else rejected.push(f.name);
    }
    return { allowed, rejected };
}

function applyFilesToInput(fileInput, files) {
    const dt = new DataTransfer();
    files.forEach((f) => dt.items.add(f));
    fileInput.files = dt.files;
}

function revokeAll(urls) {
    urls.forEach((u) => URL.revokeObjectURL(u));
}

function bindSingleImagePreview(fileInput, previewEl, errorEl) {
    if (!fileInput || !previewEl) return;

    let lastUrl = null;

    const clear = () => {
        if (lastUrl) {
            URL.revokeObjectURL(lastUrl);
            lastUrl = null;
        }
        fileInput.value = '';
        previewEl.innerHTML = '';
    };

    const render = () => {
        previewEl.innerHTML = '';
        if (errorEl) {
            errorEl.textContent = '';
            errorEl.hidden = true;
        }
        if (lastUrl) {
            URL.revokeObjectURL(lastUrl);
            lastUrl = null;
        }

        const file = fileInput.files?.[0];
        if (!file) return;

        if (!isAllowedImageFile(file)) {
            if (errorEl) {
                errorEl.textContent = 'Допустимы только JPG, PNG и WebP.';
                errorEl.hidden = false;
            }
            fileInput.value = '';
            return;
        }

        lastUrl = URL.createObjectURL(file);
        const wrap = document.createElement('div');
        wrap.className = 'user-tour-create-form__preview-thumb-wrap user-tour-create-form__preview-thumb-wrap--single';

        const img = document.createElement('img');
        img.className = 'user-tour-create-form__preview-img user-tour-create-form__preview-img--single';
        img.alt = '';
        img.src = lastUrl;
        wrap.appendChild(img);

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'user-tour-create-form__preview-remove';
        removeBtn.setAttribute('aria-label', 'Удалить изображение');
        removeBtn.innerHTML =
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>';
        removeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            clear();
            if (errorEl) {
                errorEl.textContent = '';
                errorEl.hidden = true;
            }
        });
        wrap.appendChild(removeBtn);

        previewEl.appendChild(wrap);

        const caption = document.createElement('span');
        caption.className = 'user-tour-create-form__preview-caption';
        caption.textContent = file.name;
        previewEl.appendChild(caption);
    };

    fileInput.addEventListener('change', render);
}

function bindMultiImagePreviews(fileInput, previewEl, errorEl) {
    if (!fileInput || !previewEl) return;

    /** @type {File[]} */
    let storedFiles = [];
    let objectUrls = [];

    const render = () => {
        revokeAll(objectUrls);
        objectUrls = [];
        previewEl.innerHTML = '';

        applyFilesToInput(fileInput, storedFiles);

        if (!storedFiles.length) {
            return;
        }

        for (let i = 0; i < storedFiles.length; i++) {
            const file = storedFiles[i];
            const idx = i;
            const url = URL.createObjectURL(file);
            objectUrls.push(url);

            const item = document.createElement('div');
            item.className = 'user-tour-create-form__preview-item';

            const thumbWrap = document.createElement('div');
            thumbWrap.className = 'user-tour-create-form__preview-thumb-wrap';

            const img = document.createElement('img');
            img.className = 'user-tour-create-form__preview-img';
            img.alt = '';
            img.src = url;
            thumbWrap.appendChild(img);

            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'user-tour-create-form__preview-remove';
            removeBtn.setAttribute('aria-label', 'Удалить изображение');
            removeBtn.innerHTML =
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>';
            removeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                storedFiles.splice(idx, 1);
                if (errorEl) {
                    errorEl.textContent = '';
                    errorEl.hidden = true;
                }
                render();
            });
            thumbWrap.appendChild(removeBtn);

            item.appendChild(thumbWrap);

            const cap = document.createElement('span');
            cap.className = 'user-tour-create-form__preview-name';
            cap.textContent = file.name;
            cap.title = file.name;
            item.appendChild(cap);

            previewEl.appendChild(item);
        }
    };

    const onPickMore = () => {
        if (errorEl) {
            errorEl.textContent = '';
            errorEl.hidden = true;
        }

        const incoming = Array.from(fileInput.files || []);
        if (!incoming.length) {
            return;
        }

        const { allowed, rejected } = filterAllowedFiles(incoming);

        if (rejected.length) {
            const list = rejected.join(', ');
            if (errorEl) {
                errorEl.textContent =
                    rejected.length === 1
                        ? `Файл «${list}» не подходит. Допустимы только JPG, PNG и WebP.`
                        : `Не подходят: ${list}. Допустимы только JPG, PNG и WebP.`;
                errorEl.hidden = false;
            }
        }

        if (allowed.length) {
            storedFiles = [...storedFiles, ...allowed];
        }

        render();
    };

    fileInput.addEventListener('change', onPickMore);
}

function syncQuillToHidden(quill, hiddenInput) {
    hiddenInput.value = quill.root.innerHTML;
}

function initQuillInRow(row) {
    const editorEl = row.querySelector('.js-tour-accommodation-quill');
    const hiddenInput = row.querySelector('.js-tour-accommodation-desc');
    if (!editorEl || !hiddenInput) return;

    const quill = new Quill(editorEl, {
        theme: 'snow',
        modules: quillToolbar,
    });

    quill.on('text-change', () => syncQuillToHidden(quill, hiddenInput));

    row._tourQuill = quill;
}

function reindexAccommodationRows(listEl) {
    const rows = listEl.querySelectorAll('.js-tour-accommodation-row');
    rows.forEach((row, i) => {
        const hidden = row.querySelector('.js-tour-accommodation-desc');
        const gallery = row.querySelector('.js-tour-accommodation-gallery');
        if (hidden) hidden.name = `tour_accommodation[${i}][description]`;
        if (gallery) gallery.name = `tour_accommodation[${i}][izobrazheniya_mesta_prozhivaniya][]`;
    });
}

function reindexProgramStages(programList) {
    const stages = programList.querySelectorAll('.js-tour-program-stage');
    stages.forEach((stage, si) => {
        const titleInput = stage.querySelector('.js-tour-program-stage-title');
        if (titleInput) titleInput.name = `tour_program_stages[${si}][nazvanie_etapa]`;

        const galleryInput = stage.querySelector('.js-tour-program-stage-gallery');
        if (galleryInput) galleryInput.name = `tour_program_stages[${si}][gallery][]`;

        const daySteps = stage.querySelectorAll('.js-tour-program-day-step');
        daySteps.forEach((step, dj) => {
            const h = step.querySelector('.js-tour-program-day-heading');
            const d = step.querySelector('.js-tour-program-day-description');
            if (h) h.name = `tour_program_stages[${si}][day_steps][${dj}][heading]`;
            if (d) d.name = `tour_program_stages[${si}][day_steps][${dj}][description]`;
        });
    });
}

function bindProgramStageControls(programList, stageEl, dayStepTemplate) {
    const dayStepsList = stageEl.querySelector('.js-tour-program-day-steps');
    const addDayStepBtn = stageEl.querySelector('.js-tour-add-day-step');

    const addDayStep = () => {
        const node = dayStepTemplate.content.cloneNode(true);
        const step = node.querySelector('.js-tour-program-day-step');
        if (!step || !dayStepsList) return;
        dayStepsList.appendChild(step);
        reindexProgramStages(programList);
    };

    if (addDayStepBtn) {
        addDayStepBtn.addEventListener('click', addDayStep);
    }

    if (dayStepsList) {
        dayStepsList.addEventListener('click', (e) => {
            const btn = e.target.closest('.js-tour-program-day-step-remove');
            if (!btn) return;
            const row = btn.closest('.js-tour-program-day-step');
            row?.remove();
            reindexProgramStages(programList);
        });
    }
}

function initTourProgram(form) {
    const programList = form.querySelector('.js-tour-program-stages-list');
    const addStageBtn = form.querySelector('.js-tour-add-program-stage');
    const stageTemplate = document.getElementById('tour-program-stage-template');
    const dayStepTemplate = document.getElementById('tour-program-day-step-template');

    if (!programList || !addStageBtn || !stageTemplate || !dayStepTemplate) return;

    const addStage = () => {
        const node = stageTemplate.content.cloneNode(true);
        const stage = node.querySelector('.js-tour-program-stage');
        if (!stage) return;

        programList.appendChild(stage);
        reindexProgramStages(programList);

        const galleryIn = stage.querySelector('.js-tour-program-stage-gallery');
        const galleryPreviews = stage.querySelector('.js-tour-program-stage-gallery-previews');
        const galleryError = stage.querySelector('.js-tour-program-stage-gallery-error');
        bindMultiImagePreviews(galleryIn, galleryPreviews, galleryError);

        bindProgramStageControls(programList, stage, dayStepTemplate);

        const removeStageBtn = stage.querySelector('.js-tour-program-stage-remove');
        if (removeStageBtn) {
            removeStageBtn.addEventListener('click', () => {
                stage.remove();
                reindexProgramStages(programList);
            });
        }
    };

    addStageBtn.addEventListener('click', addStage);
}

function reindexTourPriceIncludes(listEl) {
    const rows = listEl.querySelectorAll('.js-tour-price-include-row');
    rows.forEach((row, i) => {
        const input = row.querySelector('.js-tour-price-include-input');
        if (input) input.name = `tour_price_includes[${i}]`;
    });
}

function initTourPriceIncludes(form) {
    const list = form.querySelector('.js-tour-price-includes-list');
    const addBtn = form.querySelector('.js-tour-add-price-include');
    const template = document.getElementById('tour-price-include-row-template');

    if (!list || !addBtn || !template) return;

    const addRow = () => {
        const node = template.content.cloneNode(true);
        const row = node.querySelector('.js-tour-price-include-row');
        if (!row) return;

        list.appendChild(row);
        reindexTourPriceIncludes(list);

        const removeBtn = row.querySelector('.js-tour-price-include-remove');
        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                row.remove();
                reindexTourPriceIncludes(list);
            });
        }
    };

    addBtn.addEventListener('click', addRow);
}

function reindexTourPriceExcludes(listEl) {
    const rows = listEl.querySelectorAll('.js-tour-price-exclude-row');
    rows.forEach((row, i) => {
        const input = row.querySelector('.js-tour-price-exclude-input');
        if (input) input.name = `chto_ne_vhodit_v_stoimost[${i}]`;
    });
}

function initTourPriceExcludes(form) {
    const list = form.querySelector('.js-tour-price-excludes-list');
    const addBtn = form.querySelector('.js-tour-add-price-exclude');
    const template = document.getElementById('tour-price-exclude-row-template');

    if (!list || !addBtn || !template) return;

    const addRow = () => {
        const node = template.content.cloneNode(true);
        const row = node.querySelector('.js-tour-price-exclude-row');
        if (!row) return;

        list.appendChild(row);
        reindexTourPriceExcludes(list);

        const removeBtn = row.querySelector('.js-tour-price-exclude-remove');
        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                row.remove();
                reindexTourPriceExcludes(list);
            });
        }
    };

    addBtn.addEventListener('click', addRow);
}

function initTourAccommodation(form) {
    const accommodationList = form.querySelector('.js-tour-accommodation-list');
    const addBtn = form.querySelector('.js-tour-add-accommodation');
    const rowTemplate = document.getElementById('tour-accommodation-row-template');

    if (!accommodationList || !addBtn || !rowTemplate) return;

    const addRow = () => {
        const node = rowTemplate.content.cloneNode(true);
        const row = node.querySelector('.js-tour-accommodation-row');
        if (!row) return;

        accommodationList.appendChild(row);
        reindexAccommodationRows(accommodationList);

        const galleryIn = row.querySelector('.js-tour-accommodation-gallery');
        const galleryPreviewsIn = row.querySelector('.js-tour-accommodation-gallery-previews');
        const galleryErrorIn = row.querySelector('.js-tour-accommodation-gallery-error');
        bindMultiImagePreviews(galleryIn, galleryPreviewsIn, galleryErrorIn);

        initQuillInRow(row);

        const removeBtn = row.querySelector('.js-tour-accommodation-remove');
        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                if (row._tourQuill) {
                    row._tourQuill = null;
                }
                row.remove();
                reindexAccommodationRows(accommodationList);
            });
        }
    };

    addBtn.addEventListener('click', addRow);
}

function initTourCreateForm() {
    const form = document.querySelector('.user-tour-create-form');
    if (!form) return;

    const bgInput = form.querySelector('.js-tour-bg-image');
    const bgPreview = form.querySelector('.js-tour-bg-preview');
    const bgError = form.querySelector('.js-tour-bg-error');
    bindSingleImagePreview(bgInput, bgPreview, bgError);

    const galleryInput = form.querySelector('.js-tour-gallery-input');
    const galleryPreviews = form.querySelector('.js-tour-gallery-previews');
    const galleryError = form.querySelector('.js-tour-gallery-error');
    bindMultiImagePreviews(galleryInput, galleryPreviews, galleryError);

    initTourProgram(form);
    initTourAccommodation(form);

    const usefulQuillEl = form.querySelector('.js-tour-useful-info-quill');
    const usefulHidden = form.querySelector('.js-tour-useful-info-value');
    let usefulInfoQuill = null;
    if (usefulQuillEl && usefulHidden) {
        usefulInfoQuill = new Quill(usefulQuillEl, {
            theme: 'snow',
            modules: quillToolbar,
        });
        usefulInfoQuill.on('text-change', () => syncQuillToHidden(usefulInfoQuill, usefulHidden));
    }

    initTourPriceIncludes(form);
    initTourPriceExcludes(form);

    form.addEventListener('submit', () => {
        if (usefulInfoQuill && usefulHidden) {
            syncQuillToHidden(usefulInfoQuill, usefulHidden);
        }

        const accommodationList = form.querySelector('.js-tour-accommodation-list');
        if (accommodationList) {
            const rows = accommodationList.querySelectorAll('.js-tour-accommodation-row');
            rows.forEach((row) => {
                const quill = row._tourQuill;
                const hidden = row.querySelector('.js-tour-accommodation-desc');
                if (quill && hidden) syncQuillToHidden(quill, hidden);
            });
        }
    });
}

export { initTourCreateForm };
