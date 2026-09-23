// =============================================================================
// KEYCODE - GERENCIADOR DE INTERFACE DO USUÁRIO & GAMIFICAÇÃO (UI / HUD)
// Responsável por renderizar o HUD de estrelas, sons, feedback visual de erros,
// inserção de comandos rápidos (chips), modais e integração com o sistema
// visual de ícones vetoriais próprios (sem emojis).
// =============================================================================

import { loadProgress, isLevelUnlocked, getLevelData } from './storage.js';
import { levels } from './levels.js';
import { sound } from './audio.js';
import { Icons } from './icons.js';

function getEl(id) {
    return typeof document !== 'undefined' ? document.getElementById(id) : null;
}

function getAll(sel) {
    return typeof document !== 'undefined' ? document.querySelectorAll(sel) : [];
}

export const elements = {
    // Grid e Tabuleiro
    gridContainer: getEl('grid-container'),
    levelTitle: getEl('level-title'),
    levelConcept: getEl('level-concept'),
    levelSelector: getEl('level-selector'),

    // HUD Superior
    totalStarsDisplay: getEl('total-stars-display'),
    totalScoreDisplay: getEl('total-score-display'),
    soundToggleBtn: getEl('sound-toggle-btn'),
    resetProgressBtn: getEl('reset-progress-btn'),

    // Editor e Controles
    codeEditor: getEl('code-editor'),
    runButton: getEl('run-button'),
    resetButton: getEl('reset-button'),
    hintButton: getEl('hint-button'),
    stepButton: getEl('step-button'),
    speedButtons: getAll('.speed-btn'),
    quickChips: getAll('.quick-chip'),
    syntaxBanner: getEl('syntax-error-banner'),
    executionStatus: getEl('execution-status'),

    // Modais
    messageBox: getEl('message-box'),
    messageTitle: getEl('message-title'),
    messageText: getEl('message-text'),
    modalStarsContainer: getEl('modal-stars-container'),
    modalScoreBreakdown: getEl('modal-score-breakdown'),
    nextLevelButton: getEl('next-level-button'),
    tryAgainButton: getEl('try-again-button'),

    // Modal de Dicas
    hintBox: getEl('hint-box'),
    hintText: getEl('hint-text'),
    closeHintButton: getEl('close-hint-button')
};

export function refreshElements() {
    elements.gridContainer = getEl('grid-container');
    elements.levelTitle = getEl('level-title');
    elements.levelConcept = getEl('level-concept');
    elements.levelSelector = getEl('level-selector');
    elements.totalStarsDisplay = getEl('total-stars-display');
    elements.totalScoreDisplay = getEl('total-score-display');
    elements.soundToggleBtn = getEl('sound-toggle-btn');
    elements.resetProgressBtn = getEl('reset-progress-btn');
    elements.codeEditor = getEl('code-editor');
    elements.runButton = getEl('run-button');
    elements.resetButton = getEl('reset-button');
    elements.hintButton = getEl('hint-button');
    elements.stepButton = getEl('step-button');
    elements.speedButtons = getAll('.speed-btn');
    elements.quickChips = getAll('.quick-chip');
    elements.syntaxBanner = getEl('syntax-error-banner');
    elements.executionStatus = getEl('execution-status');
    elements.messageBox = getEl('message-box');
    elements.messageTitle = getEl('message-title');
    elements.messageText = getEl('message-text');
    elements.modalStarsContainer = getEl('modal-stars-container');
    elements.modalScoreBreakdown = getEl('modal-score-breakdown');
    elements.nextLevelButton = getEl('next-level-button');
    elements.tryAgainButton = getEl('try-again-button');
    elements.hintBox = getEl('hint-box');
    elements.hintText = getEl('hint-text');
    elements.closeHintButton = getEl('close-hint-button');
}

/**
 * Atualiza o cabeçalho HUD com total de estrelas, pontuação e estado do áudio.
 */
export function updateHUD(currentLevelIndex = 0) {
    const progress = loadProgress();

    // Total de estrelas (máximo 3 por fase * número de níveis)
    const maxPossibleStars = levels.length * 3;
    if (elements.totalStarsDisplay) {
        elements.totalStarsDisplay.textContent = `${progress.totalStars} / ${maxPossibleStars}`;
    }

    // Pontuação geral formatada
    if (elements.totalScoreDisplay) {
        elements.totalScoreDisplay.textContent = `${progress.totalScore.toLocaleString('pt-BR')} pts`;
    }

    // Botão de Áudio com ícone SVG próprio
    if (elements.soundToggleBtn) {
        const isMuted = sound.isMuted();
        elements.soundToggleBtn.innerHTML = `
            <span class="btn-icon">${isMuted ? Icons.soundOff : Icons.soundOn}</span>
            <span>${isMuted ? 'Áudio Desligado' : 'Áudio Ativo'}</span>
        `;
        elements.soundToggleBtn.classList.toggle('muted', isMuted);
    }

    // Conceito pedagógico do nível atual (BNCC)
    const lvl = levels[currentLevelIndex];
    if (elements.levelConcept && lvl) {
        elements.levelConcept.textContent = lvl.concept || 'Lógica de Programação';
    }

    // Atualiza as opções do seletor de níveis com texto limpo e status profissional
    if (elements.levelSelector) {
        elements.levelSelector.innerHTML = '';
        levels.forEach((level, index) => {
            const option = document.createElement('option');
            option.value = index;

            const unlocked = isLevelUnlocked(index);
            const data = getLevelData(index);
            const stars = data ? data.stars || 0 : 0;

            let starSuffix = '';
            if (stars > 0) {
                starSuffix = ` (${stars}/3 estrelas)`;
            }

            if (!unlocked) {
                option.textContent = `${level.title} - Bloqueado`;
                option.disabled = true;
            } else {
                option.textContent = `${level.title}${starSuffix}`;
            }

            if (index === currentLevelIndex) {
                option.selected = true;
            }

            elements.levelSelector.appendChild(option);
        });
    }
}

/**
 * Exibe o banner de aviso de erro de digitação/sintaxe com ícone vetorial de alerta.
 */
export function showSyntaxError(message) {
    if (elements.syntaxBanner) {
        elements.syntaxBanner.innerHTML = `
            <span class="banner-icon">${Icons.warning}</span>
            <span class="banner-text">${message}</span>
        `;
        elements.syntaxBanner.classList.remove('hidden');
        elements.syntaxBanner.classList.add('visible', 'pulse-banner');
    }
}

/**
 * Limpa o banner de erro de sintaxe.
 */
export function clearSyntaxError() {
    if (elements.syntaxBanner) {
        elements.syntaxBanner.innerHTML = '';
        elements.syntaxBanner.classList.remove('visible', 'pulse-banner');
        elements.syntaxBanner.classList.add('hidden');
    }
}

/**
 * Mostra a linha e instrução ativa em tempo real durante a execução com ícone indicador.
 */
export function updateActiveExecutionLine(lineNum, cmdLabel = '') {
    if (!elements.executionStatus) return;

    if (lineNum === null) {
        elements.executionStatus.innerHTML = '';
        elements.executionStatus.classList.remove('visible');
        elements.executionStatus.classList.add('hidden');
    } else {
        elements.executionStatus.innerHTML = `
            <span class="exec-icon">${Icons.executing}</span>
            <span>Executando Linha <strong>${lineNum}</strong>: <code>${cmdLabel}</code></span>
        `;
        elements.executionStatus.classList.remove('hidden');
        elements.executionStatus.classList.add('visible');
    }
}

/**
 * Insere um comando rápido na posição do cursor do editor de código.
 */
export function insertCommandAtCursor(commandText) {
    sound.playClick();
    const textarea = elements.codeEditor;
    if (!textarea) return;

    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const before = textarea.value.substring(0, startPos);
    const after = textarea.value.substring(endPos);

    // Adiciona quebra de linha se não estiver no começo de uma linha limpa
    let insert = commandText;
    if (before.length > 0 && !before.endsWith('\n')) {
        insert = '\n' + insert;
    }
    if (!after.startsWith('\n')) {
        insert = insert + '\n';
    }

    textarea.value = before + insert + after;
    const newCursor = startPos + insert.length;
    textarea.selectionStart = newCursor;
    textarea.selectionEnd = newCursor;
    textarea.focus();
}

/**
 * Exibe a caixa modal na tela (vitória, colisão ou não alcance) com ícones vetoriais.
 */
export function showMessageBox(type, isLastLevel = false, resultData = null) {
    if (!elements.messageBox) return;

    if (type === 'success') {
        elements.messageTitle.innerHTML = `
            <div class="modal-icon-badge success-badge">${Icons.victory}</div>
            <div class="modal-title-text">Nível Concluído!</div>
        `;
        elements.messageTitle.className = 'modal-title text-green-500';
        elements.messageText.textContent = 'Parabéns! Seu robô executou o algoritmo com sucesso.';

        elements.nextLevelButton.style.display = 'inline-flex';
        elements.tryAgainButton.style.display = 'inline-flex';
        elements.tryAgainButton.innerHTML = `
            <span class="btn-icon">${Icons.reset}</span>
            <span>Repetir Nível</span>
        `;

        if (isLastLevel) {
            elements.nextLevelButton.innerHTML = `
                <span class="btn-icon">${Icons.graduation}</span>
                <span>Concluir Projeto</span>
            `;
        } else {
            elements.nextLevelButton.innerHTML = `
                <span>Próximo Nível</span>
                <span class="btn-icon">${Icons.arrowRight}</span>
            `;
        }

        // Renderiza estrelas e detalhes de pontuação
        if (resultData && elements.modalStarsContainer && elements.modalScoreBreakdown) {
            renderGamifiedSuccessModal(resultData);
        }
    } else if (type === 'fail') {
        elements.messageTitle.innerHTML = `
            <div class="modal-icon-badge fail-badge">${Icons.target}</div>
            <div class="modal-title-text">Quase lá!</div>
        `;
        elements.messageTitle.className = 'modal-title text-red-500';
        elements.messageText.textContent = 'O robô finalizou todos os comandos, mas ainda não alcançou a estrela. Revise as distâncias e direções!';
        if (elements.modalStarsContainer) elements.modalStarsContainer.innerHTML = '';
        if (elements.modalScoreBreakdown) elements.modalScoreBreakdown.innerHTML = '';

        elements.nextLevelButton.style.display = 'none';
        elements.tryAgainButton.style.display = 'inline-flex';
        elements.tryAgainButton.innerHTML = `
            <span class="btn-icon">${Icons.reset}</span>
            <span>Tentar Novamente</span>
        `;
    } else if (type === 'wall') {
        elements.messageTitle.innerHTML = `
            <div class="modal-icon-badge collision-badge">${Icons.collision}</div>
            <div class="modal-title-text">Colisão Detectada!</div>
        `;
        elements.messageTitle.className = 'modal-title text-orange-500';
        elements.messageText.textContent = 'O robô bateu em um obstáculo ou tentou sair dos limites do grid! Ajuste a rota para desviar.';
        if (elements.modalStarsContainer) elements.modalStarsContainer.innerHTML = '';
        if (elements.modalScoreBreakdown) elements.modalScoreBreakdown.innerHTML = '';

        elements.nextLevelButton.style.display = 'none';
        elements.tryAgainButton.style.display = 'inline-flex';
        elements.tryAgainButton.innerHTML = `
            <span class="btn-icon">${Icons.reset}</span>
            <span>Tentar Novamente</span>
        `;
    }

    elements.messageBox.classList.add('visible');
}

/**
 * Constrói a exibição animada de estrelas e o resumo pedagógico de pontuação
 * utilizando ícones vetoriais próprios escaláveis.
 */
function renderGamifiedSuccessModal(result) {
    const { stars, score, starDetails, linesCount, optimalLines } = result;

    // Constrói estrelas com animação escalonada
    let starsHtml = '<div class="stars-display">';
    for (let s = 1; s <= 3; s++) {
        const earned = s <= stars;
        starsHtml += `
            <div class="star-icon-wrapper ${earned ? 'earned' : 'empty'}" style="animation-delay: ${s * 150}ms">
                ${earned ? Icons.modalStarEarned : Icons.modalStarEmpty}
            </div>
        `;
    }
    starsHtml += '</div>';

    // Toca efeitos das estrelas conquistadas
    for (let s = 1; s <= stars; s++) {
        setTimeout(() => {
            sound.playStar(s);
        }, s * 160);
    }

    // Ícones vetoriais para cada item de conquista
    const goalIcon = starDetails.goalReached ? Icons.checkCircle : Icons.pendingCircle;
    const hintIcon = starDetails.noHints ? Icons.checkCircle : Icons.hintBadge;
    const optIcon = starDetails.codeOptimized ? Icons.checkCircle : Icons.docCode;

    // Detalhes didáticos das conquistas
    let breakdownHtml = `
        <div class="result-score-badge">
            <span class="badge-icon">${Icons.trophy}</span>
            <span>+${score.toLocaleString('pt-BR')} pontos</span>
        </div>
        <div class="achievements-list">
            <div class="achievement-item ${starDetails.goalReached ? 'done' : 'pending'}">
                <span class="ach-icon">${goalIcon}</span>
                <span class="ach-label">Objetivo alcançado (+1 estrela)</span>
            </div>
            <div class="achievement-item ${starDetails.noHints ? 'done' : 'pending'}">
                <span class="ach-icon">${hintIcon}</span>
                <span class="ach-label">${starDetails.noHints ? 'Concluiu sem consultar dicas (+1 estrela)' : 'Dica utilizada nesta tentativa'}</span>
            </div>
            <div class="achievement-item ${starDetails.codeOptimized ? 'done' : 'pending'}">
                <span class="ach-icon">${optIcon}</span>
                <span class="ach-label">${starDetails.codeOptimized ? `Código enxuto (${linesCount} comandos ≤ meta de ${optimalLines}) (+1 estrela)` : `Código longo (${linesCount} comandos > meta de ${optimalLines} comandos)`}</span>
            </div>
        </div>
    `;

    elements.modalStarsContainer.innerHTML = starsHtml;
    elements.modalScoreBreakdown.innerHTML = breakdownHtml;
}

export function hideMessageBox() {
    if (elements.messageBox) {
        elements.messageBox.classList.remove('visible');
    }
}

export function showHint(hintMessage) {
    if (elements.hintText && elements.hintBox) {
        sound.playTone(440, 'sine', 0.15, 0.1);
        elements.hintText.textContent = hintMessage;
        elements.hintBox.classList.add('visible');
    }
}

export function hideHint() {
    if (elements.hintBox) {
        elements.hintBox.classList.remove('visible');
    }
}
