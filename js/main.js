import { levels } from './levels.js';
import { elements, hideMessageBox, showHint, hideHint } from './ui.js';
import { 
    getCurrentLevel, 
    setCurrentLevel, 
    nextLevel, 
    setupLevel, 
    resetLevel, 
    parseAndRunCommands 
} from './engine.js';

// --- EVENT LISTENERS (Ouvintes de Eventos) ---

elements.runButton.addEventListener('click', parseAndRunCommands);
elements.resetButton.addEventListener('click', resetLevel);

elements.tryAgainButton.addEventListener('click', () => {
    hideMessageBox();
    setupLevel(getCurrentLevel());
});

elements.nextLevelButton.addEventListener('click', () => {
    hideMessageBox();
    nextLevel();
    elements.levelSelector.value = getCurrentLevel();
    resetLevel();
});

elements.hintButton.addEventListener('click', () => {
    const hintMsg = levels[getCurrentLevel()].hint;
    showHint(hintMsg);
});
elements.closeHintButton.addEventListener('click', hideHint);

elements.levelSelector.addEventListener('change', (e) => {
    setCurrentLevel(parseInt(e.target.value, 10));
    resetLevel();
});

// --- INICIALIZAÇÃO ---
window.onload = () => {
    levels.forEach((level, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = level.title;
        elements.levelSelector.appendChild(option);
    });
    
    setupLevel(getCurrentLevel());
};
