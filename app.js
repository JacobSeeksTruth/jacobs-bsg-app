document.addEventListener('DOMContentLoaded', () => {
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const learnMoreModal = document.getElementById('learnMoreModal');
    const closeLearnMoreBtn = document.getElementById('closeLearnMoreBtn');

    // Open Learn More modal
    learnMoreBtn?.addEventListener('click', () => {
        learnMoreModal.classList.add('open');
    });

    // Close modal with Back button
    closeLearnMoreBtn?.addEventListener('click', () => {
        learnMoreModal.classList.remove('open');
    });

    // Close modal when clicking outside the content
    learnMoreModal?.addEventListener('click', (e) => {
        if (e.target === learnMoreModal) {
            learnMoreModal.classList.remove('open');
        }
    });

    // Optional: Make the footer "Main Menu" do nothing (or refresh)
    document.getElementById('mainMenuFooter')?.addEventListener('click', (e) => {
        e.preventDefault();
        // Already on the main menu
    });
});
