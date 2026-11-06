const curriculumVerses = [
    { id: 1, ref: "Genesis 1:1", translations: {
        ESV: "In the beginning, God created the heavens and the earth.",
        NIV: "In the beginning God created the heavens and the earth.",
        KJV: "In the beginning God created the heaven and the earth.",
        NKJV: "In the beginning God created the heavens and the earth.",
        NLT: "In the beginning God created the heavens and the earth."
    }},
    { id: 2, ref: "John 3:16", translations: {
        ESV: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
        NIV: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
        KJV: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
        NKJV: "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.",
        NLT: "For this is how God loved the world: He gave his one and only Son, so that everyone who believes in him will not perish but have eternal life."
    }},
    { id: 3, ref: "Proverbs 3:5", translations: {
        ESV: "Trust in the LORD with all your heart, and do not lean on your own understanding.",
        NIV: "Trust in the LORD with all your heart and lean not on your own understanding;",
        KJV: "Trust in the LORD with all thine heart; and lean not unto thine own understanding.",
        NKJV: "Trust in the Lord with all your heart, And lean not on your own understanding;",
        NLT: "Trust in the LORD with all your heart; do not depend on your own understanding."
    }},
    { id: 4, ref: "Romans 3:23", translations: {
        ESV: "for all have sinned and fall short of the glory of God,",
        NIV: "for all have sinned and fall short of the glory of God,",
        KJV: "For all have sinned, and come short of the glory of God;",
        NKJV: "for all have sinned and fall short of the glory of God,",
        NLT: "For everyone has sinned; we all fall short of God's glorious standard."
    }},
    { id: 5, ref: "Romans 6:23", translations: {
        ESV: "For the wages of sin is death, but the free gift of God is eternal life in Christ Jesus our Lord.",
        NIV: "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.",
        KJV: "For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord.",
        NKJV: "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.",
        NLT: "For the wages of sin is death, but the free gift of God is eternal life through Christ Jesus our Lord."
    }},
    { id: 6, ref: "Philippians 4:13", translations: {
        ESV: "I can do all things through him who strengthens me.",
        NIV: "I can do all this through him who gives me strength.",
        KJV: "I can do all things through Christ which strengtheneth me.",
        NKJV: "I can do all things through Christ who strengthens me.",
        NLT: "For I can do everything through Christ, who gives me strength."
    }},
    { id: 7, ref: "Psalm 23:1", translations: {
        ESV: "The LORD is my shepherd; I shall not want.",
        NIV: "The LORD is my shepherd, I lack nothing.",
        KJV: "The LORD is my shepherd; I shall not want.",
        NKJV: "The Lord is my shepherd; I shall not want.",
        NLT: "The LORD is my shepherd; I have all that I need."
    }},
    { id: 8, ref: "Romans 8:28", translations: {
        ESV: "And we know that for those who love God all things work together for good, for those who are called according to his purpose.",
        NIV: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
        KJV: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
        NKJV: "And we know that all things work together for good to those who love God, to those who are the called according to His purpose.",
        NLT: "And we know that God causes everything to work together for the good of those who love God and are called according to his purpose for them."
    }},
    { id: 9, ref: "Joshua 1:9", translations: {
        ESV: "Have I not commanded you? Be strong and courageous. Do not be afraid, and do not be dismayed, for the LORD your God is with you wherever you go.",
        NIV: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.",
        KJV: "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.",
        NKJV: "Have I not commanded you? Be strong and of good courage; do not be afraid, nor be dismayed, for the Lord your God is with you wherever you go.",
        NLT: "This is my command—be strong and courageous! Do not be afraid or discouraged. For the LORD your God is with you wherever you go."
    }},
    { id: 10, ref: "Matthew 6:33", translations: {
        ESV: "But seek first the kingdom of God and his righteousness, and all these things will be given to you as well.",
        NIV: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
        KJV: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
        NKJV: "But seek first the kingdom of God and His righteousness, and all these things shall be added to you.",
        NLT: "Seek the Kingdom of God above all else, and live righteously, and he will give you everything you need."
    }}
];

const hintPhrases = {
    "Genesis 1:1": "In the beginning",
    "John 3:16": "He gave his only Son",
    "Proverbs 3:5": "Trust in the LORD",
    "Romans 3:23": "All have sinned",
    "Romans 6:23": "Wages of sin",
    "Philippians 4:13": "I can do all things",
    "Psalm 23:1": "My shepherd",
    "Romans 8:28": "Those who love God",
    "Joshua 1:9": "Be strong and courageous",
    "Matthew 6:33": "Seek the kingdom"
};

let originalWordsArray = [];
let currentVerseText = "";
let currentReference = "";
let currentActiveId = null;
let masteredVerses = JSON.parse(localStorage.getItem('masteredScriptures')) || [];
let forceUnlocked = localStorage.getItem('forceUnlockedDevotional') === 'true';
let insertTarget = null;
let insertPosition = null;
let longPressTimer = null;
let rewardLongPressTimer = null;
let isMusicMuted = false;
let allExpanded = false;

function getSelectedTranslation() {
    return document.getElementById('versionSelect')?.value || 'ESV';
}

function updateEnglishLines() {
    const t = getSelectedTranslation();
    document.querySelectorAll('.verse-dropdown').forEach(dropdown => {
        const ref = dropdown.getAttribute('data-ref');
        const verseObj = curriculumVerses.find(v => v.ref === ref);
        const englishEl = dropdown.querySelector('.english-line');
        if (verseObj && englishEl && verseObj.translations[t]) {
            englishEl.innerHTML = `<br><strong>English (${t}):</strong> ${verseObj.translations[t]}`;
        }
    });
}

function setExpandAllState(expanded) {
    allExpanded = expanded;
    const topBtn = document.getElementById('expandAllTop');
    const bottomBtn = document.getElementById('expandAllBottom');
    if (topBtn) topBtn.textContent = expanded ? 'Collapse ▾' : 'Expand ▾';
    if (bottomBtn) bottomBtn.textContent = expanded ? 'Collapse ▾' : 'Expand ▾';

    const hebrewContent = document.getElementById('hebrewContent');
    const greekContent = document.getElementById('greekContent');
    if (hebrewContent) hebrewContent.classList.toggle('hidden', !expanded);
    if (greekContent) greekContent.classList.toggle('hidden', !expanded);

    document.querySelectorAll('.verse-body').forEach(body => {
        body.classList.toggle('hidden', !expanded);
    });
}

function renderCurriculum() {
    const grid = document.getElementById('curriculumGrid');
    if (!grid) return;
    grid.innerHTML = "";
    
    curriculumVerses.forEach(v => {
        const isMastered = masteredVerses.includes(v.id);
        const item = document.createElement('div');
        item.className = `verse-item ${isMastered ? 'mastered' : ''}`;
        item.innerHTML = `
            <span><strong>${v.id}.</strong> ${v.ref} (${getSelectedTranslation()})</span>
            <span class="status-badge">${isMastered ? '✓ Mastered' : 'Not Done'}</span>
        `;
        item.onclick = () => startCurriculumVerse(v);
        grid.appendChild(item);
    });

    const rewardContainer = document.getElementById('rewardContainer');
    if (!rewardContainer) return;
    
    const allCompleted = curriculumVerses.every(v => masteredVerses.includes(v.id));
    const isUnlocked = allCompleted || forceUnlocked;
    
    rewardContainer.innerHTML = "";
    const rewardBtn = document.createElement('div');
    
    if (isUnlocked) {
        rewardBtn.className = "reward-item unlocked";
        rewardBtn.innerHTML = `<span class="devotional-blue">Devotional: Walking in the Love of God Through Faithful Obedience</span> (Unlocked)`;
        rewardBtn.onclick = () => toggleRewardModal(true);
    } else {
        rewardBtn.className = "reward-item locked";
        rewardBtn.innerText = "Devotional: Walking in the Love of God Through Faithful Obedience (Locked)";
        rewardBtn.addEventListener('touchstart', startRewardLongPress, {passive: true});
        rewardBtn.addEventListener('mousedown', startRewardLongPress);
        rewardBtn.addEventListener('touchend', cancelRewardLongPress);
        rewardBtn.addEventListener('mouseup', cancelRewardLongPress);
        rewardBtn.addEventListener('mouseleave', cancelRewardLongPress);
    }
    rewardContainer.appendChild(rewardBtn);

    updateEnglishLines();
}

function startRewardLongPress() {
    cancelRewardLongPress();
    rewardLongPressTimer = setTimeout(() => {
        forceUnlocked = true;
        localStorage.setItem('forceUnlockedDevotional', 'true');
        renderCurriculum();
        if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
        alert("Devotional unlocked!");
    }, 3000);
}

function cancelRewardLongPress() {
    if (rewardLongPressTimer) {
        clearTimeout(rewardLongPressTimer);
        rewardLongPressTimer = null;
    }
}

function startCurriculumVerse(verseObj) {
    currentActiveId = verseObj.id;
    const t = getSelectedTranslation();
    document.getElementById('verseInput').value = verseObj.translations[t];
    document.getElementById('referenceInput').value = `${verseObj.ref} (${t})`;
    initGame();
}

function clearInsertMode() {
    if (insertTarget) insertTarget.classList.remove('insert-target');
    insertTarget = null;
    insertPosition = null;
    document.getElementById('insertControls')?.classList.add('hidden');
    // clear outlines
    document.getElementById('insertBeforeBtn').style.outline = 'none';
    document.getElementById('insertAfterBtn').style.outline = 'none';
}

function updatePuzzleStatus() {
    const statusEl = document.getElementById('puzzleStatus');
    const customBottom = document.getElementById('customBottomBack');
    if (!statusEl) return;

    if (currentActiveId === null) {
        statusEl.classList.add('hidden');
        if (customBottom) customBottom.classList.remove('hidden');
        return;
    }

    statusEl.classList.remove('hidden');
    if (customBottom) customBottom.classList.add('hidden');
    const isMastered = masteredVerses.includes(currentActiveId);
    statusEl.textContent = isMastered ? "Status: Mastered" : "Status: Not Done";
    statusEl.classList.toggle('mastered', isMastered);
}

function initGame() {
    clearInsertMode();
    
    currentVerseText = document.getElementById('verseInput').value.trim();
    currentReference = document.getElementById('referenceInput').value.trim();
    
    if (!currentVerseText) {
        alert("Please select or enter a verse first!");
        return;
    }
    if (!currentReference) currentReference = "Custom Verse";

    originalWordsArray = currentVerseText.split(/\s+/).filter(w => w.length > 0);

    document.getElementById('verseDisplayHeader').innerText = currentReference;

    const cleanRef = currentReference.split('(')[0].trim();
    document.getElementById('hintRef').innerText = currentReference;
    document.getElementById('hintPhrase').innerText = hintPhrases[cleanRef] || "Remember the key phrase...";
    document.getElementById('hintText').innerText = currentVerseText;
    document.getElementById('hintText').classList.add('hidden');

    const seeBtn = document.getElementById('seeFullVerseBtn');
    seeBtn.textContent = "See Full Verse";
    seeBtn.classList.remove('hide-mode');

    const wordPool = document.getElementById('wordPool');
    const dropZone = document.getElementById('dropZone');
    wordPool.innerHTML = "";
    dropZone.innerHTML = "";
    
    document.getElementById('successBlock').classList.add('hidden');

    const isCustom = currentActiveId === null;

    document.getElementById('gameControls').classList.toggle('hidden', isCustom);
    document.getElementById('curriculumSuccessNav').classList.toggle('hidden', isCustom);
    document.getElementById('customSuccessNav').classList.toggle('hidden', !isCustom);

    let indexedWords = originalWordsArray.map((word, index) => ({ word, index }));
    for (let i = indexedWords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indexedWords[i], indexedWords[j]] = [indexedWords[j], indexedWords[i]];
    }

    indexedWords.forEach(item => {
        wordPool.appendChild(createWordPiece(item.word));
    });

    updatePuzzleStatus();

    document.getElementById('setupView').classList.add('hidden');
    document.getElementById('gameView').classList.remove('hidden');
    document.getElementById('optionsModal')?.classList.remove('open');
}

function createWordPiece(word) {
    const el = document.createElement('div');
    el.className = 'word-piece';
    el.innerText = word;

    el.addEventListener('click', (e) => {
        if (insertTarget && insertPosition && el.parentElement.id === 'wordPool') {
            e.stopPropagation();
            performInsert(el);
            return;
        }
        if (el.parentElement.id === 'wordPool') {
            document.getElementById('dropZone').appendChild(el);
        } else if (el !== insertTarget) {
            document.getElementById('wordPool').appendChild(el);
        }
        checkWinState();
    });

    el.addEventListener('touchstart', startLongPress, {passive: true});
    el.addEventListener('mousedown', startLongPress);
    el.addEventListener('touchend', cancelLongPress);
    el.addEventListener('mouseup', cancelLongPress);
    el.addEventListener('mouseleave', cancelLongPress);
    el.addEventListener('touchmove', cancelLongPress);

    function startLongPress() {
        if (el.parentElement.id !== 'dropZone') return;
        cancelLongPress();
        longPressTimer = setTimeout(() => {
            clearInsertMode();
            insertTarget = el;
            el.classList.add('insert-target');
            document.getElementById('insertControls').classList.remove('hidden');
            if (navigator.vibrate) navigator.vibrate(40);
        }, 600);
    }

    function cancelLongPress() {
        if (longPressTimer) {
            clearTimeout(longPressTimer);
            longPressTimer = null;
        }
    }

    return el;
}

function performInsert(poolPiece) {
    if (!insertTarget || !insertPosition) return;
    const dropZone = document.getElementById('dropZone');
    if (insertPosition === 'before') {
        dropZone.insertBefore(poolPiece, insertTarget);
    } else {
        if (insertTarget.nextSibling) {
            dropZone.insertBefore(poolPiece, insertTarget.nextSibling);
        } else {
            dropZone.appendChild(poolPiece);
        }
    }
    clearInsertMode();
    checkWinState();
}

function moveSelectedWord(direction) {
    if (!insertTarget) return;
    const dropZone = document.getElementById('dropZone');
    const children = Array.from(dropZone.children);
    const index = children.indexOf(insertTarget);
    if (index === -1) return;

    if (direction === 'left' && index > 0) {
        dropZone.insertBefore(insertTarget, children[index - 1]);
    } else if (direction === 'right' && index < children.length - 1) {
        dropZone.insertBefore(children[index + 1], insertTarget);
    }
    // keep the panel open and the highlight
    checkWinState();
}

function checkWinState() {
    const dropZone = document.getElementById('dropZone');
    const placedWords = Array.from(dropZone.children).map(el => el.innerText);

    if (placedWords.length !== originalWordsArray.length) return;

    const isCorrect = placedWords.every((word, index) => word === originalWordsArray[index]);

    if (isCorrect) {
        if (currentActiveId !== null && !masteredVerses.includes(currentActiveId)) {
            masteredVerses.push(currentActiveId);
            localStorage.setItem('masteredScriptures', JSON.stringify(masteredVerses));
        }
        document.getElementById('successBlock').classList.remove('hidden');
        document.getElementById('gameControls').classList.add('hidden');
        updatePuzzleStatus();
        clearInsertMode();
    }
}

function goToMainMenu() {
    clearInsertMode();
    document.getElementById('gameView').classList.add('hidden');
    document.getElementById('setupView').classList.remove('hidden');
    document.getElementById('successBlock').classList.add('hidden');
    currentActiveId = null;
    renderCurriculum();
}

function goToOptionsFromCustom() {
    clearInsertMode();
    document.getElementById('gameView').classList.add('hidden');
    document.getElementById('setupView').classList.remove('hidden');
    document.getElementById('successBlock').classList.add('hidden');
    currentActiveId = null;
    toggleOptions(true);
    document.getElementById('customVerseContent').classList.remove('hidden');
}

function goToNextTrack() {
    if (currentActiveId === null) {
        goToMainMenu();
        return;
    }
    const currentIndex = curriculumVerses.findIndex(v => v.id === currentActiveId);
    const nextIndex = currentIndex + 1;
    if (nextIndex < curriculumVerses.length) {
        startCurriculumVerse(curriculumVerses[nextIndex]);
    } else {
        goToMainMenu();
        if (curriculumVerses.every(v => masteredVerses.includes(v.id)) || forceUnlocked) {
            setTimeout(() => toggleRewardModal(true), 400);
        }
    }
}

function retryPuzzle() {
    initGame();
}

function toggleHint(show) {
    document.getElementById('hintModal').classList.toggle('open', show);
}

function toggleRewardModal(show) {
    document.getElementById('rewardModal').classList.toggle('open', show);
    if (!show) {
        document.getElementById('devotionalVerseSelect').value = "";
        document.getElementById('devotionalVerseDisplay').classList.add('hidden');
    }
}

function toggleOptions(show) {
    document.getElementById('optionsModal').classList.toggle('open', show);
}

function applyDarkMode(enabled) {
    document.body.classList.toggle('dark-mode', enabled);
    localStorage.setItem('darkMode', enabled ? 'true' : 'false');

    // Update the label text
    const label = document.getElementById('modeLabel');
    if (label) {
        label.textContent = enabled ? 'Light Mode' : 'Night Mode';
    }
}

function resetAllProgress() {
    if (!confirm("Are you sure you want to reset all Mastered verses and lock the Devotional again?")) return;

    masteredVerses = [];
    forceUnlocked = false;
    localStorage.setItem('masteredScriptures', JSON.stringify([]));
    localStorage.setItem('forceUnlockedDevotional', 'false');
    renderCurriculum();
    alert("All progress has been reset.");
}

function setupMusic() {
    const audio = document.getElementById('bgMusic');
    const source = document.getElementById('audioSource');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const restartBtn = document.getElementById('restartMusicBtn');
    const muteBtn = document.getElementById('muteMusicBtn');
    const selectSongBtn = document.getElementById('selectSongBtn');
    const songSelectModal = document.getElementById('songSelectModal');
    const closeSongSelectBtn = document.getElementById('closeSongSelectBtn');
    const currentSongTitle = document.getElementById('currentSongTitle');

    audio.pause();
    audio.currentTime = 0;

    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().then(() => {
                playPauseBtn.textContent = 'Pause';
                playPauseBtn.classList.remove('btn-play');
                playPauseBtn.classList.add('btn-pause');
            }).catch(() => {
                alert('Unable to play audio. Please try again or select a different song.');
            });
        } else {
            audio.pause();
            playPauseBtn.textContent = 'Play';
            playPauseBtn.classList.remove('btn-pause');
            playPauseBtn.classList.add('btn-play');
        }
    });

    restartBtn.addEventListener('click', () => {
        audio.currentTime = 0;
        audio.play().then(() => {
            playPauseBtn.textContent = 'Pause';
            playPauseBtn.classList.remove('btn-play');
            playPauseBtn.classList.add('btn-pause');
        }).catch(() => {});
    });

    muteBtn.addEventListener('click', () => {
        isMusicMuted = !isMusicMuted;
        audio.muted = isMusicMuted;
        muteBtn.textContent = isMusicMuted ? 'Unmute' : 'Mute';
    });

    selectSongBtn.addEventListener('click', () => {
        songSelectModal.classList.add('open');
    });

    closeSongSelectBtn.addEventListener('click', () => {
        songSelectModal.classList.remove('open');
    });

    songSelectModal.addEventListener('click', (e) => {
        if (e.target === songSelectModal) songSelectModal.classList.remove('open');
    });

    document.querySelectorAll('.song-option').forEach(btn => {
        btn.addEventListener('click', () => {
            const newSrc = btn.getAttribute('data-src');
            const newTitle = btn.getAttribute('data-title');
            
            audio.pause();
            source.src = newSrc;
            audio.load();
            currentSongTitle.textContent = newTitle;
            
            playPauseBtn.textContent = 'Play';
            playPauseBtn.classList.remove('btn-pause');
            playPauseBtn.classList.add('btn-play');
            
            songSelectModal.classList.remove('open');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const savedDark = localStorage.getItem('darkMode') === 'true';
    document.getElementById('darkModeToggle').checked = savedDark;
    applyDarkMode(savedDark);

    renderCurriculum();
    setupMusic();
    updateEnglishLines();

    document.getElementById('versionSelect')?.addEventListener('change', () => {
        renderCurriculum();
        updateEnglishLines();
    });

    document.getElementById('optionsBtn')?.addEventListener('click', () => toggleOptions(true));
    document.getElementById('closeOptionsBtn')?.addEventListener('click', () => toggleOptions(false));
    document.getElementById('optionsModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'optionsModal') toggleOptions(false);
    });

    // Section toggles
    document.getElementById('customVerseToggleBtn')?.addEventListener('click', () => {
        document.getElementById('customVerseContent').classList.toggle('hidden');
    });
    document.getElementById('langToggleBtn')?.addEventListener('click', () => {
        document.getElementById('langContent').classList.toggle('hidden');
    });
    document.getElementById('musicSectionToggleBtn')?.addEventListener('click', () => {
        document.getElementById('musicSectionContent').classList.toggle('hidden');
    });
    document.getElementById('updatesToggleBtn')?.addEventListener('click', () => {
        document.getElementById('updatesContent').classList.toggle('hidden');
    });
    document.getElementById('resetToggleBtn')?.addEventListener('click', () => {
        document.getElementById('resetContent').classList.toggle('hidden');
    });

    // Hebrew / Greek
    document.getElementById('hebrewToggleBtn')?.addEventListener('click', () => {
        document.getElementById('hebrewContent').classList.toggle('hidden');
    });
    document.getElementById('greekToggleBtn')?.addEventListener('click', () => {
        document.getElementById('greekContent').classList.toggle('hidden');
    });

    // Individual verses
    document.querySelectorAll('[data-verse-toggle]').forEach(title => {
        title.addEventListener('click', () => {
            const body = title.nextElementSibling;
            if (body) body.classList.toggle('hidden');
        });
    });

    // Expand / Collapse
    document.getElementById('expandAllTop')?.addEventListener('click', () => {
        setExpandAllState(!allExpanded);
    });
    document.getElementById('expandAllBottom')?.addEventListener('click', () => {
        setExpandAllState(!allExpanded);
    });

    // Reset
    document.getElementById('resetProgressBtn')?.addEventListener('click', resetAllProgress);
    document.getElementById('devotionalHintToggle')?.addEventListener('click', () => {
        document.getElementById('devotionalHintContent').classList.toggle('hidden');
    });

    document.getElementById('darkModeToggle')?.addEventListener('change', (e) => {
        applyDarkMode(e.target.checked);
    });

    document.getElementById('generateBtn')?.addEventListener('click', () => {
        currentActiveId = null;
        initGame();
    });

    // Custom Back button
    document.getElementById('customBackBtn')?.addEventListener('click', goToOptionsFromCustom);

    // Custom Retry
    document.getElementById('customRetryBtn')?.addEventListener('click', retryPuzzle);

    // Insert / Move controls
    document.getElementById('insertBeforeBtn')?.addEventListener('click', () => {
        insertPosition = 'before';
        document.getElementById('insertBeforeBtn').style.outline = '2px solid #0369a1';
        document.getElementById('insertAfterBtn').style.outline = 'none';
    });
    document.getElementById('insertAfterBtn')?.addEventListener('click', () => {
        insertPosition = 'after';
        document.getElementById('insertAfterBtn').style.outline = '2px solid #0369a1';
        document.getElementById('insertBeforeBtn').style.outline = 'none';
    });
    document.getElementById('cancelInsertBtn')?.addEventListener('click', clearInsertMode);

    document.getElementById('moveLeftBtn')?.addEventListener('click', () => moveSelectedWord('left'));
    document.getElementById('moveRightBtn')?.addEventListener('click', () => moveSelectedWord('right'));

    document.getElementById('showHintBtn')?.addEventListener('click', () => toggleHint(true));
    document.getElementById('closeHintBtn')?.addEventListener('click', () => toggleHint(false));
    document.getElementById('newVerseBtn')?.addEventListener('click', goToMainMenu);

    document.getElementById('seeFullVerseBtn')?.addEventListener('click', () => {
        const full = document.getElementById('hintText');
        const btn = document.getElementById('seeFullVerseBtn');
        
        if (full.classList.contains('hidden')) {
            full.classList.remove('hidden');
            btn.textContent = "Hide Full Verse";
            btn.classList.add('hide-mode');
        } else {
            full.classList.add('hidden');
            btn.textContent = "See Full Verse";
            btn.classList.remove('hide-mode');
        }
    });

    document.getElementById('nextTrackBtn')?.addEventListener('click', goToNextTrack);
    document.getElementById('retryBtn')?.addEventListener('click', retryPuzzle);
    document.getElementById('backToDirBtn')?.addEventListener('click', goToMainMenu);

    document.getElementById('closeRewardBtn')?.addEventListener('click', () => toggleRewardModal(false));

    document.getElementById('devotionalVerseSelect')?.addEventListener('change', (e) => {
        const ref = e.target.value;
        const display = document.getElementById('devotionalVerseDisplay');
        if (ref) {
            const verseObj = curriculumVerses.find(v => v.ref === ref);
            const t = getSelectedTranslation();
            if (verseObj && verseObj.translations[t]) {
                display.innerHTML = `<strong>${ref} (${t})</strong><br>${verseObj.translations[t]}`;
                display.classList.remove('hidden');
            }
        } else {
            display.classList.add('hidden');
        }
    });

    document.getElementById('hintModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'hintModal') toggleHint(false);
    });
    document.getElementById('rewardModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'rewardModal') toggleRewardModal(false);
    });
});
