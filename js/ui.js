// --- MAPEAMENTO DOS ELEMENTOS DO DOM ---
export const elements = {
    gridContainer: document.getElementById('grid-container'),
    codeEditor: document.getElementById('code-editor'),
    runButton: document.getElementById('run-button'),
    resetButton: document.getElementById('reset-button'),
    levelTitle: document.getElementById('level-title'),
    hintButton: document.getElementById('hint-button'),
    levelSelector: document.getElementById('level-selector'),
    
    // Modais
    messageBox: document.getElementById('message-box'),
    messageTitle: document.getElementById('message-title'),
    messageText: document.getElementById('message-text'),
    nextLevelButton: document.getElementById('next-level-button'),
    tryAgainButton: document.getElementById('try-again-button'),
    hintBox: document.getElementById('hint-box'),
    hintText: document.getElementById('hint-text'),
    closeHintButton: document.getElementById('close-hint-button')
};

/**
 * Mostra uma caixa de mensagem (modal) na tela.
 * @param {string} type - O tipo de mensagem ('success', 'fail', 'wall').
 * @param {boolean} isLastLevel - Determina se é o último nível para ajustar o texto.
 */
export function showMessageBox(type, isLastLevel) {
    if (type === 'success') {
        elements.messageTitle.textContent = 'Parabéns! 🎉';
        elements.messageTitle.className = 'text-4xl font-black mb-2 text-green-500';
        elements.messageText.textContent = 'Você completou o desafio com código!';
        elements.nextLevelButton.style.display = 'inline-block';
        elements.tryAgainButton.style.display = 'none';
        
        if (isLastLevel) {
            elements.nextLevelButton.textContent = "Jogar Novamente";
        } else {
            elements.nextLevelButton.textContent = "Próximo Nível";
        }
    } else if (type === 'fail') {
        elements.messageTitle.textContent = 'Oh não... 😟';
        elements.messageTitle.className = 'text-4xl font-black mb-2 text-red-500';
        elements.messageText.textContent = 'O robô não chegou ao destino. Revise seu código e tente de novo!';
        elements.nextLevelButton.style.display = 'none';
        elements.tryAgainButton.style.display = 'inline-block';
    } else if (type === 'wall') {
        elements.messageTitle.textContent = 'Cuidado! 🧱';
        elements.messageTitle.className = 'text-4xl font-black mb-2 text-orange-500';
        elements.messageText.textContent = 'Você bateu em um obstáculo! O nível será reiniciado quando fechar esta mensagem.';
        elements.nextLevelButton.style.display = 'none';
        elements.tryAgainButton.style.display = 'inline-block';
    }
    elements.messageBox.classList.add('visible');
}

export function hideMessageBox() {
    elements.messageBox.classList.remove('visible');
}

export function showHint(hintMessage) {
    elements.hintText.textContent = hintMessage;
    elements.hintBox.classList.add('visible');
}

export function hideHint() {
    elements.hintBox.classList.remove('visible');
}
