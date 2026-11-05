const curriculumVerses = [
    { 
        id: 1, 
        ref: "Genesis 1:1", 
        translations: {
            ESV: "In the beginning, God created the heavens and the earth.",
            NIV: "In the beginning God created the heavens and the earth.",
            KJV: "In the beginning God created the heaven and the earth.",
            NLT: "In the beginning God created the heavens and the earth."
        }
    },
    { 
        id: 2, 
        ref: "John 3:16", 
        translations: {
            ESV: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
            NIV: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
            KJV: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
            NLT: "For this is how God loved the world: He gave his one and only Son, so that everyone who believes in him will not perish but have eternal life."
        }
    },
    { 
        id: 3, 
        ref: "Proverbs 3:5", 
        translations: {
            ESV: "Trust in the LORD with all your heart, and do not lean on your own understanding.",
            NIV: "Trust in the LORD with all your heart and lean not on your own understanding;",
            KJV: "Trust in the LORD with all thine heart; and lean not unto thine own understanding.",
            NLT: "Trust in the LORD with all your heart; do not depend on your own understanding."
        }
    },
    { 
        id: 4, 
        ref: "Romans 3:23", 
        translations: {
            ESV: "for all have sinned and fall short of the glory of God,",
            NIV: "for all have sinned and fall short of the glory of God,",
            KJV: "For all have sinned, and come short of the glory of God;",
            NLT: "For everyone has sinned; we all fall short of God's glorious standard."
        }
    },
    { 
        id: 5, 
        ref: "Romans 6:23", 
        translations: {
            ESV: "For the wages of sin is death, but the free gift of God is eternal life in Christ Jesus our Lord.",
            NIV: "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.",
            KJV: "For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord.",
            NLT: "For the wages of sin is death, but the free gift of God is eternal life through Christ Jesus our Lord."
        }
    },
    { 
        id: 6, 
        ref: "Philippians 4:13", 
        translations: {
            ESV: "I can do all things through him who strengthens me.",
            NIV: "I can do all this through him who gives me strength.",
            KJV: "I can do all things through Christ which strengtheneth me.",
            NLT: "For I can do everything through Christ, who gives me strength."
        }
    },
    { 
        id: 7, 
        ref: "Psalm 23:1", 
        translations: {
            ESV: "The LORD is my shepherd; I shall not want.",
            NIV: "The LORD is my shepherd, I lack nothing.",
            KJV: "The LORD is my shepherd; I shall not want.",
            NLT: "The LORD is my shepherd; I have all that I need."
        }
    },
    { 
        id: 8, 
        ref: "Romans 8:28", 
        translations: {
            ESV: "And we know that for those who love God all things work together for good, for those who are called according to his purpose.",
            NIV: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
            KJV: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
            NLT: "And we know that God causes everything to work together for the good of those who love God and are called according to his purpose for them."
        }
    },
    { 
        id: 9, 
        ref: "Joshua 1:9", 
        translations: {
            ESV: "Have I not commanded you? Be strong and courageous. Do not be afraid, and do not be dismayed, for the LORD your God is with you wherever you go.",
            NIV: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.",
            KJV: "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.",
            NLT: "This is my command—be strong and courageous! Do not be afraid or discouraged. For the LORD your God is with you wherever you go."
        }
    },
    { 
        id: 10, 
        ref: "Matthew 6:33", 
        translations: {
            ESV: "But seek first the kingdom of God and his righteousness, and all these things will be given to you as well.",
            NIV: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
            KJV: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
            NLT: "Seek the Kingdom of God above all else, and live righteously, and he will give you everything you need."
        }
    }
];

let originalWordsArray = [];
let currentVerseText = "";
let currentReference = "";
let currentActiveId = null;

let masteredVerses = JSON.parse(localStorage.getItem('masteredScriptures')) || [];

function getSelectedTranslation() {
    const selector = document.getElementById('versionSelect');
    return selector ? selector.value : 'ESV';
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
    rewardContainer.innerHTML = "";

    const rewardBtn = document.createElement('div');
    if (allCompleted) {
        rewardBtn.className = "reward-item unlocked";
        rewardBtn.innerText = "Devitional: Walking in the Love of God Through Faithful Obedience (Devotional Unlocked)";
        rewardBtn.onclick = () => toggleRewardModal(true);
    } else {
        rewardBtn.className = "reward-item locked";
        rewardBtn.innerText = "Devitional: Walking in the Love of God Through Faithful Obedience";
    }
    rewardContainer.appendChild(rewardBtn);
}

function startCurriculumVerse(verseObj) {
    currentActiveId = verseObj.id;
    const currentTranslation = getSelectedTranslation();
    document.getElementById('verseInput').value = verseObj.translations[currentTranslation];
    document.getElementById('referenceInput').value = `${verseObj.ref} (${currentTranslation})`;
    initGame();
}

function cleanWord(str) {
    return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"’']/g, "").toLowerCase().trim();
}

function initGame() {
    currentVerseText = document.getElementById('verseInput').value.trim();
    currentReference = document.getElementById('referenceInput').value.trim();
    
    if (!currentVerseText) return alert("Please select or enter a verse first!");
    if (!currentReference) currentReference = "Custom Verse";

    originalWordsArray = currentVerseText.split(/\s+/).filter(w => w.length > 0);

    document.getElementById('verseDisplayHeader').innerText = currentReference;
    document.getElementById('hintRef').innerText = currentReference;
    document.getElementById('hintText').innerText = currentVerseText;

    const wordPool = document.getElementById('wordPool');
    const dropZone = document.getElementById('dropZone');
    wordPool.innerHTML = "";
    dropZone.innerHTML = "";
    document.getElementById('successBlock').classList.add('hidden');
    document.getElementById('gameControls').classList.remove('hidden');

    let indexedWords = originalWordsArray.map((word, index) => ({ word, index }));
    
    for (let i = indexedWords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indexedWords[i], indexedWords[j]] = [indexedWords[j], indexedWords[i]];
    }

    indexedWords.forEach(item => {
        const el = document.createElement('div');
        el.className = 'word-piece';
        el.innerText = item.word;
        
        el.onclick = () => {
            if (el.parentElement.id === 'wordPool') {
                dropZone.appendChild(el);
            } else {
                wordPool.appendChild(el);
            }
            checkWinState();
        };
        
        wordPool.appendChild(el);
    });

    document.getElementById('setupView').classList.add('hidden');
    document.getElementById('gameView').classList.remove('hidden');
}

function toggleHint(show) {
    const modal = document.getElementById('hintModal');
    if (show) modal.classList.add('open');
    else modal.classList.remove('open');
}

function toggleRewardModal(show) {
    const modal = document.getElementById('rewardModal');
    if (show) modal.className = 'modal open';
    else modal.className = 'modal';
}

function checkWinState() {