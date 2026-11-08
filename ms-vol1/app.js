function setExpandAllState(expanded) {
    allExpanded = expanded;
    const topBtn = document.getElementById('expandAllTop');
    const bottomBtn = document.getElementById('expandAllBottom');
    if (topBtn) topBtn.textContent = expanded ? 'Collapse ▾' : 'Expand ▾';
    if (bottomBtn) bottomBtn.textContent = expanded ? 'Collapse ▾' : 'Expand ▾';

    const hebrewContent = document.getElementById('hebrewContent');
    const greekContent = document.getElementById('greekContent');
    const aramaicContent = document.getElementById('aramaicContent');
    if (hebrewContent) hebrewContent.classList.toggle('hidden', !expanded);
    if (greekContent) greekContent.classList.toggle('hidden', !expanded);
    if (aramaicContent) aramaicContent.classList.toggle('hidden', !expanded);

    document.querySelectorAll('.verse-body').forEach(body => {
        body.classList.toggle('hidden', !expanded);
    });
    // Optionally also expand the new sub-dropdowns when fully expanding
    if (expanded) {
        document.querySelectorAll('.word-breakdown-body, .untranslatable-body').forEach(b => {
            b.classList.remove('hidden');
        });
    }
}

// Inside DOMContentLoaded, add/replace the language toggles section:

    // Hebrew / Greek / Aramaic
    document.getElementById('hebrewToggleBtn')?.addEventListener('click', () => {
        document.getElementById('hebrewContent').classList.toggle('hidden');
    });
    document.getElementById('greekToggleBtn')?.addEventListener('click', () => {
        document.getElementById('greekContent').classList.toggle('hidden');
    });
    document.getElementById('aramaicToggleBtn')?.addEventListener('click', () => {
        document.getElementById('aramaicContent').classList.toggle('hidden');
    });

    // Individual verses
    document.querySelectorAll('[data-verse-toggle]').forEach(title => {
        title.addEventListener('click', () => {
            const body = title.nextElementSibling;
            if (body) body.classList.toggle('hidden');
        });
    });

    // Word Breakdown toggles
    document.querySelectorAll('[data-wb-toggle]').forEach(title => {
        title.addEventListener('click', () => {
            const body = title.nextElementSibling;
            if (body) body.classList.toggle('hidden');
        });
    });

    // Untranslatable Word toggles
    document.querySelectorAll('[data-ut-toggle]').forEach(title => {
        title.addEventListener('click', () => {
            const body = title.nextElementSibling;
            if (body) body.classList.toggle('hidden');
        });
    });
