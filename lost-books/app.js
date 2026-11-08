document.addEventListener('DOMContentLoaded', () => {
    // ===== Elements =====
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const learnMoreModal = document.getElementById('learnMoreModal');
    const closeLearnMoreBtn = document.getElementById('closeLearnMoreBtn');

    const themeToggleBtn = document.getElementById('themeToggleBtn');

    const comingSoonModal = document.getElementById('comingSoonModal');
    const closeComingSoonBtn = document.getElementById('closeComingSoonBtn');
    const comingSoonBtns = document.querySelectorAll('.coming-soon-btn');

    const enochBtn = document.getElementById('enochBtn');
    const enochModal = document.getElementById('enochModal');
    const closeEnochBtn = document.getElementById('closeEnochBtn');

    // Audio elements
    const audio = document.getElementById('enochAudio');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const progressBar = document.getElementById('progressBar');
    const currentTimeEl = document.getElementById('currentTime');
    const totalTimeEl = document.getElementById('totalTime');
    const rewindBtn = document.getElementById('rewindBtn');
    const restartBtn = document.getElementById('restartBtn');
    const forwardBtn = document.getElementById('forwardBtn');

    // ===== Helper: Format time (m:ss) =====
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    }

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

    const savedDark = localStorage.getItem('mainMenuDarkMode') === 'true';
    applyTheme(savedDark);

    themeToggleBtn?.addEventListener('click', () => {
        const isCurrentlyDark = document.body.classList.contains('dark-mode');
        applyTheme(!isCurrentlyDark);
    });

    // ===== Coming Soon Modal =====
    comingSoonBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            comingSoonModal.classList.add('open');
        });
    });

    closeComingSoonBtn?.addEventListener('click', () => {
        comingSoonModal.classList.remove('open');
    });

    comingSoonModal?.addEventListener('click', (e) => {
        if (e.target === comingSoonModal) {
            comingSoonModal.classList.remove('open');
        }
    });

    // ===== Book of Enoch Modal =====
    enochBtn?.addEventListener('click', () => {
        enochModal.classList.add('open');
    });

    closeEnochBtn?.addEventListener('click', () => {
        enochModal.classList.remove('open');
        // Pause audio when closing
        if (audio && !audio.paused) {
            audio.pause();
            playPauseBtn.textContent = 'Play';
        }
    });

    enochModal?.addEventListener('click', (e) => {
        if (e.target === enochModal) {
            enochModal.classList.remove('open');
            if (audio && !audio.paused) {
                audio.pause();
                playPauseBtn.textContent = 'Play';
            }
        }
    });

    // ===== Accordion =====
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const targetId = header.getAttribute('data-target');
            const content = document.getElementById(targetId);
            const isOpen = content.classList.contains('open');

            // Close all other accordions
            document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('open'));
            document.querySelectorAll('.accordion-header').forEach(h => h.classList.remove('active'));

            if (!isOpen) {
                content.classList.add('open');
                header.classList.add('active');
            }
        });
    });

    // ===== Audio Player =====
    if (audio) {
        // Update total time when metadata loads
        audio.addEventListener('loadedmetadata', () => {
            totalTimeEl.textContent = formatTime(audio.duration);
            progressBar.max = audio.duration;
        });

        // Update progress while playing
        audio.addEventListener('timeupdate', () => {
            progressBar.value = audio.currentTime;
            currentTimeEl.textContent = formatTime(audio.currentTime);
        });

        // When audio ends
        audio.addEventListener('ended', () => {
            playPauseBtn.textContent = 'Play';
            progressBar.value = 0;
            currentTimeEl.textContent = '0:00';
        });

        // Play / Pause toggle
        playPauseBtn?.addEventListener('click', () => {
            if (audio.paused) {
                audio.play().catch(err => {
                    console.warn('Audio play failed. Make sure you replaced YOUR_AUDIO_URL_HERE.mp3 with a real file.');
                    alert('Audio file not found.\n\nPlease replace "YOUR_AUDIO_URL_HERE.mp3" in the HTML with your actual audio link.');
                });
                playPauseBtn.textContent = 'Pause';
            } else {
                audio.pause();
                playPauseBtn.textContent = 'Play';
            }
        });

        // Seek with progress bar
        progressBar?.addEventListener('input', () => {
            audio.currentTime = progressBar.value;
            currentTimeEl.textContent = formatTime(audio.currentTime);
        });

        // −15 seconds
        rewindBtn?.addEventListener('click', () => {
            audio.currentTime = Math.max(0, audio.currentTime - 15);
        });

        // Restart
        restartBtn?.addEventListener('click', () => {
            audio.currentTime = 0;
            currentTimeEl.textContent = '0:00';
            progressBar.value = 0;
        });

        // +15 seconds
        forwardBtn?.addEventListener('click', () => {
            audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 15);
        });
    }

    // ===== Download PDF (placeholder) =====
    document.getElementById('downloadPdfBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        alert('PDF download coming soon!\n\nReplace the href of the Download PDF button with your real PDF link.');
    });
});
