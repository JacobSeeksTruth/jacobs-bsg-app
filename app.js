document.addEventListener('DOMContentLoaded', () => {
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const learnMoreModal = document.getElementById('learnMoreModal');
    const closeLearnMoreBtn = document.getElementById('closeLearnMoreBtn');
    const themeToggleBtn = document.getElementById('themeToggleBtn');

    // ===== Learn More Modal =====
    learnMoreBtn?.addEventListener('click', () => {
        learnMoreModal.classList.add('open');
    });

    closeLearnMoreBtn?.addEventListener('click', () => {
        learnMoreModal.classList.remove('open');
    });

    learnMoreModal?.addEventListener('click', (e) => {
        if (e.target === learnMoreModal) {
            learnMoreModal.classList.remove('open');
        }
    });

    // ===== Dark / Light Mode =====
    function applyTheme(isDark) {
        document.body.classList.toggle('dark-mode', isDark);
        themeToggleBtn.textContent = isDark ? 'Light Mode' : 'Dark Mode';
        localStorage.setItem('mainMenuDarkMode', isDark ? 'true' : 'false');
    }

    // Restore saved preference
    const savedDark = localStorage.getItem('mainMenuDarkMode') === 'true';
    applyTheme(savedDark);

    themeToggleBtn?.addEventListener('click', () => {
        const isCurrentlyDark = document.body.classList.contains('dark-mode');
        applyTheme(!isCurrentlyDark);
    });
});
