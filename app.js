document.addEventListener('DOMContentLoaded', () => {
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const learnMoreModal = document.getElementById('learnMoreModal');
    const closeLearnMoreBtn = document.getElementById('closeLearnMoreBtn');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const appSelect = document.getElementById('appSelect');

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

    // ===== Night / Light Mode =====
    function applyTheme(isDark) {
        document.body.classList.toggle('dark-mode', isDark);
        themeToggleBtn.textContent = isDark ? 'Light Mode' : 'Night Mode';
        localStorage.setItem('mainMenuDarkMode', isDark ? 'true' : 'false');
    }

    // Restore saved preference
    const savedDark = localStorage.getItem('mainMenuDarkMode') === 'true';
    applyTheme(savedDark);

    themeToggleBtn?.addEventListener('click', () => {
        const isCurrentlyDark = document.body.classList.contains('dark-mode');
        applyTheme(!isCurrentlyDark);
    });

    // ===== App Switcher Dropdown =====
    appSelect?.addEventListener('change', () => {
        const value = appSelect.value;

        if (value === 'memorize') {
            // Already on the Memorize Scripture App main menu – do nothing
        } else if (value === 'lost') {
            // Placeholder until you provide the real link
            appSelect.value = 'memorize';

            // Optional: uncomment the line below if you want a temporary alert
            // alert('Lost Books of Scripture – Coming soon!');
        }
    });
});
