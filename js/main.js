// =============================================================================
// KEYCODE - PONTO DE ENTRADA PRINCIPAL (Bootstrap & Event Listeners)
// Conecta os motores de execução, áudio, persistência e interface do usuário.
// =============================================================================

import { levels } from './levels.js';
import { 
    elements, 
    refreshElements,
    hideMessageBox, 
    showHint, 
    hideHint, 
    updateHUD, 
    insertCommandAtCursor 
} from './ui.js';
import { sound } from './audio.js';
import { resetAllProgress, loadProgress } from './storage.js';
import { 
    getCurrentLevel, 
    setCurrentLevel, 
    nextLevel, 
    setupLevel, 
    resetLevel, 
    parseAndRunCommands,
    markHintUsed,
    setExecutionSpeed,
    stepForward
} from './engine.js';

function init() {
    // Garante que todas as referências do DOM estejam mapeadas
    refreshElements();

    // Botão Executar Código
    if (elements.runButton) {
        elements.runButton.addEventListener('click', () => {
            sound.initContext();
            parseAndRunCommands();
        });
    }

    // Botão Limpar / Resetar Nível
    if (elements.resetButton) {
        elements.resetButton.addEventListener('click', () => {
            sound.playClick();
            resetLevel();
        });
    }

    // Botão Tentar Novamente no Modal
    if (elements.tryAgainButton) {
        elements.tryAgainButton.addEventListener('click', () => {
            sound.playClick();
            hideMessageBox();
            setupLevel(getCurrentLevel());
        });
    }

    // Botão Próximo Nível no Modal
    if (elements.nextLevelButton) {
        elements.nextLevelButton.addEventListener('click', () => {
            sound.playClick();
            hideMessageBox();
            nextLevel();
            resetLevel();
            updateHUD(getCurrentLevel());
        });
    }

    // Botão Pegar Dica (registra uso para a 2ª estrela)
    if (elements.hintButton) {
        elements.hintButton.addEventListener('click', () => {
            markHintUsed();
            const currentLvl = getCurrentLevel();
            const hintMsg = levels[currentLvl].hint;
            showHint(hintMsg);
        });
    }

    // Botão Fechar Dica
    if (elements.closeHintButton) {
        elements.closeHintButton.addEventListener('click', () => {
            sound.playClick();
            hideHint();
        });
    }

    // Seletor de Níveis com validação de desbloqueio
    if (elements.levelSelector) {
        elements.levelSelector.addEventListener('change', (e) => {
            sound.playClick();
            const selectedLevel = parseInt(e.target.value, 10);
            setCurrentLevel(selectedLevel);
            resetLevel();
            updateHUD(selectedLevel);
        });
    }

    // Botão Ligar/Desligar Áudio
    if (elements.soundToggleBtn) {
        elements.soundToggleBtn.addEventListener('click', () => {
            sound.toggleMute();
            updateHUD(getCurrentLevel());
        });
    }

    // Botão Reiniciar Dados de Progresso (Zerar localStorage)
    if (elements.resetProgressBtn) {
        elements.resetProgressBtn.addEventListener('click', () => {
            const confirmed = window.confirm('Deseja realmente reiniciar todo o histórico de estrelas e pontuação?');
            if (confirmed) {
                resetAllProgress();
                setCurrentLevel(0);
                resetLevel();
                updateHUD(0);
            }
        });
    }

    // Chips de Inserção Rápida de Comandos
    if (elements.quickChips && elements.quickChips.length > 0) {
        elements.quickChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const commandText = chip.getAttribute('data-insert');
                if (commandText) {
                    insertCommandAtCursor(commandText);
                }
            });
        });
    }

    // Botões de Seleção de Velocidade (1x, 2x, Passo a Passo)
    if (elements.speedButtons && elements.speedButtons.length > 0) {
        elements.speedButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                elements.speedButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const speed = btn.getAttribute('data-speed');
                setExecutionSpeed(speed);
                sound.playClick();
            });
        });
    }

    // Botão Avançar Passo no modo Passo a Passo
    if (elements.stepButton) {
        elements.stepButton.addEventListener('click', () => {
            stepForward();
        });
    }

    // Carrega o progresso salvo e define a fase inicial
    const progress = loadProgress();
    const initialLevel = Math.min(progress.unlockedLevel || 0, levels.length - 1);

    setCurrentLevel(initialLevel);
    setupLevel(initialLevel);
    updateHUD(initialLevel);

    // Pré-ativação do motor de som no primeiro clique em qualquer lugar da tela
    const primeAudio = () => {
        sound.initContext();
        window.removeEventListener('click', primeAudio);
        window.removeEventListener('keydown', primeAudio);
    };
    window.addEventListener('click', primeAudio, { once: true });
    window.addEventListener('keydown', primeAudio, { once: true });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
