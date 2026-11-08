document.addEventListener('DOMContentLoaded', () => {
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

    function formatTime(seconds) {
        if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    }

    // Learn More
    learnMoreBtn?.addEventListener('click', () => learnMoreModal.classList.add('open'));
    closeLearnMoreBtn?.addEventListener('click', () => learnMoreModal.classList.remove('open'));
    learnMoreModal?.addEventListener('click', e => {
        if (e.target === learnMoreModal) learnMoreModal.classList.remove('open');
    });

    // Theme
    function applyTheme(isDark) {
        document.body.classList.toggle('dark-mode', isDark);
        if (themeToggleBtn) themeToggleBtn.textContent = isDark ? 'Light Mode' : 'Night Mode';
        localStorage.setItem('mainMenuDarkMode', isDark ? 'true' : 'false');
    }
    applyTheme(localStorage.getItem('mainMenuDarkMode') === 'true');
    themeToggleBtn?.addEventListener('click', () => {
        applyTheme(!document.body.classList.contains('dark-mode'));
    });

    // Coming Soon
    comingSoonBtns.forEach(btn => {
        btn.addEventListener('click', () => comingSoonModal.classList.add('open'));
    });
    closeComingSoonBtn?.addEventListener('click', () => comingSoonModal.classList.remove('open'));
    comingSoonModal?.addEventListener('click', e => {
        if (e.target === comingSoonModal) comingSoonModal.classList.remove('open');
    });

    // Enoch Modal
    enochBtn?.addEventListener('click', () => enochModal.classList.add('open'));
    closeEnochBtn?.addEventListener('click', () => {
        enochModal.classList.remove('open');
        document.querySelectorAll('audio').forEach(a => {
            a.pause();
            const btn = a.closest('.chapter-block')?.querySelector('.play-pause-btn');
            if (btn) btn.textContent = 'Play';
        });
    });
    enochModal?.addEventListener('click', e => {
        if (e.target === enochModal) {
            enochModal.classList.remove('open');
            document.querySelectorAll('audio').forEach(a => {
                a.pause();
                const btn = a.closest('.chapter-block')?.querySelector('.play-pause-btn');
                if (btn) btn.textContent = 'Play';
            });
        }
    });

    // Accordion (supports nested levels)
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const targetId = header.getAttribute('data-target');
            const content = document.getElementById(targetId);
            if (!content) return;

            const isOpen = content.classList.contains('open');
            const parent = header.closest('.accordion-item')?.parentElement;

            if (parent) {
                parent.querySelectorAll(':scope > .accordion-item > .accordion-content').forEach(c => {
                    c.classList.remove('open');
                });
                parent.querySelectorAll(':scope > .accordion-item > .accordion-header').forEach(h => {
                    h.classList.remove('active');
                });
            }

            if (!isOpen) {
                content.classList.add('open');
                header.classList.add('active');
            }
        });
    });

    // Audio Players
    document.querySelectorAll('.chapter-block').forEach(block => {
        const audio = block.querySelector('audio');
        const playBtn = block.querySelector('.play-pause-btn');
        const progressBar = block.querySelector('.progress-bar');
        const currentTimeEl = block.querySelector('.current-time');
        const totalTimeEl = block.querySelector('.total-time');
        const rewindBtn = block.querySelector('.rewind-btn');
        const restartBtn = block.querySelector('.restart-btn');
        const forwardBtn = block.querySelector('.forward-btn');

        if (!audio || !playBtn) return;

        audio.addEventListener('loadedmetadata', () => {
            totalTimeEl.textContent = formatTime(audio.duration);
            progressBar.max = audio.duration;
        });

        if (audio.readyState >= 1) {
            totalTimeEl.textContent = formatTime(audio.duration);
            progressBar.max = audio.duration;
        }

        audio.addEventListener('timeupdate', () => {
            progressBar.value = audio.currentTime;
            currentTimeEl.textContent = formatTime(audio.currentTime);
        });

        audio.addEventListener('ended', () => {
            playBtn.textContent = 'Play';
            progressBar.value = 0;
            currentTimeEl.textContent = '0:00';
        });

        playBtn.addEventListener('click', () => {
            document.querySelectorAll('audio').forEach(other => {
                if (other !== audio && !other.paused) {
                    other.pause();
                    const otherBtn = other.closest('.chapter-block')?.querySelector('.play-pause-btn');
                    if (otherBtn) otherBtn.textContent = 'Play';
                }
            });

            if (audio.paused) {
                audio.play().then(() => {
                    playBtn.textContent = 'Pause';
                }).catch(() => {
                    alert('Unable to play this audio. Please try again.');
                });
            } else {
                audio.pause();
                playBtn.textContent = 'Play';
            }
        });

        progressBar?.addEventListener('input', () => {
            audio.currentTime = progressBar.value;
            currentTimeEl.textContent = formatTime(audio.currentTime);
        });

        rewindBtn?.addEventListener('click', () => {
            audio.currentTime = Math.max(0, audio.currentTime - 15);
        });

        restartBtn?.addEventListener('click', () => {
            audio.currentTime = 0;
            currentTimeEl.textContent = '0:00';
            progressBar.value = 0;
        });

        forwardBtn?.addEventListener('click', () => {
            audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 15);
        });
    });
});
