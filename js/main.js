// =============================================================================
// KEYCODE - PONTO DE ENTRADA PRINCIPAL (Bootstrap & Event Listeners)
// Conecta os motores de execução, áudio, persistência e interface do usuário.
// Inclui suporte a Mini-IDE com Realce de Sintaxe, Gutter, Persistência Local e Atalhos.
// =============================================================================

import { levels } from './levels.js';
import { 
    elements, 
    refreshElements,
    hideMessageBox, 
    showHint, 
    hideHint, 
    updateHUD, 
    updateEditorUI,
    syncEditorScroll,
    flashSaveStatus
} from './ui.js';
import { sound } from './audio.js';
import { 
    resetAllProgress, 
    loadProgress,
    saveLevelCode,
    loadLevelCode,
    clearLevelCode
} from './storage.js';
import { 
    getCurrentLevel, 
    setCurrentLevel, 
    nextLevel, 
    setupLevel, 
    parseAndRunCommands,
    markHintUsed,
    setExecutionSpeed,
    stepForward
} from './engine.js';

/**
 * Carrega a fase selecionada no tabuleiro e recupera o código digitado pelo aluno (se houver).
 */
function loadLevelIntoUI(levelIndex) {
    setCurrentLevel(levelIndex);
    setupLevel(levelIndex);

    // Memória de código por fase: recupera o código do aluno caso já tenha escrito algo nesta fase
    const savedCode = loadLevelCode(levelIndex);

    if (savedCode !== null && savedCode !== undefined) {
        elements.codeEditor.value = savedCode;
    } else {
        elements.codeEditor.value = '';
    }

    updateEditorUI();
    updateHUD(levelIndex);
}

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

    // Botão Limpar / Resetar Editor
    if (elements.resetButton) {
        elements.resetButton.addEventListener('click', () => {
            sound.playClick();
            const curLvl = getCurrentLevel();
            clearLevelCode(curLvl);
            elements.codeEditor.value = '';
            updateEditorUI();
            setupLevel(curLvl);
            flashSaveStatus('Editor limpo');
        });
    }

    // Botão Copiar Código do Editor
    if (elements.copyCodeBtn) {
        elements.copyCodeBtn.addEventListener('click', async () => {
            sound.playClick();
            const code = elements.codeEditor.value;
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(code);
                } else {
                    elements.codeEditor.select();
                    document.execCommand('copy');
                }
                const originalContent = elements.copyCodeBtn.innerHTML;
                elements.copyCodeBtn.innerHTML = `<span>Copiado! ✓</span>`;
                setTimeout(() => {
                    if (elements.copyCodeBtn) elements.copyCodeBtn.innerHTML = originalContent;
                }, 1600);
            } catch (err) {
                console.warn('Erro ao copiar código:', err);
            }
        });
    }

    // Botão Tentar Novamente no Modal (preserva o código digitado para correção)
    if (elements.tryAgainButton) {
        elements.tryAgainButton.addEventListener('click', () => {
            sound.playClick();
            hideMessageBox();
            setupLevel(getCurrentLevel());
            updateEditorUI();
        });
    }

    // Botão Próximo Nível no Modal
    if (elements.nextLevelButton) {
        elements.nextLevelButton.addEventListener('click', () => {
            sound.playClick();
            hideMessageBox();
            nextLevel();
            loadLevelIntoUI(getCurrentLevel());
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

    // Seletor de Níveis com validação de desbloqueio e persistência
    if (elements.levelSelector) {
        elements.levelSelector.addEventListener('change', (e) => {
            sound.playClick();
            const selectedLevel = parseInt(e.target.value, 10);
            loadLevelIntoUI(selectedLevel);
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
                loadLevelIntoUI(0);
            }
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

    // Sincronização do Editor de Texto (Input, Scroll e Atalhos Ergonômicos)
    if (elements.codeEditor) {
        // Auto-save e sincronização de sintaxe/linhas a cada digitação
        elements.codeEditor.addEventListener('input', () => {
            const curLvl = getCurrentLevel();
            saveLevelCode(curLvl, elements.codeEditor.value);
            updateEditorUI();
            flashSaveStatus('Salvo localmente ✓');
        });

        // Sincronização de scroll com a camada de realce e com o gutter
        elements.codeEditor.addEventListener('scroll', () => {
            syncEditorScroll();
        });

        // Atalhos de Teclado no Editor
        elements.codeEditor.addEventListener('keydown', (e) => {
            // 1. Ctrl + Enter ou Cmd + Enter: Executa o código diretamente
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                if (elements.runButton && !elements.runButton.disabled) {
                    sound.initContext();
                    parseAndRunCommands();
                }
                return;
            }

            // 2. Tecla Tab: Insere 2 espaços de indentação mantendo o foco
            if (e.key === 'Tab') {
                e.preventDefault();
                const textarea = elements.codeEditor;
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const value = textarea.value;

                if (e.shiftKey) {
                    // Shift + Tab: Desindenta até 2 espaços no início da linha atual
                    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
                    if (value.startsWith('  ', lineStart)) {
                        textarea.value = value.substring(0, lineStart) + value.substring(lineStart + 2);
                        textarea.selectionStart = Math.max(lineStart, start - 2);
                        textarea.selectionEnd = Math.max(lineStart, end - 2);
                    } else if (value.startsWith(' ', lineStart)) {
                        textarea.value = value.substring(0, lineStart) + value.substring(lineStart + 1);
                        textarea.selectionStart = Math.max(lineStart, start - 1);
                        textarea.selectionEnd = Math.max(lineStart, end - 1);
                    }
                } else {
                    // Tab: Insere 2 espaços
                    textarea.setRangeText('  ', start, end, 'end');
                }

                textarea.dispatchEvent(new Event('input', { bubbles: true }));
            }
        });
    }

    // Atalhos Globais de Janela
    window.addEventListener('keydown', (e) => {
        // Atalho global Ctrl+Enter / Cmd+Enter para rodar
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            if (elements.runButton && !elements.runButton.disabled) {
                e.preventDefault();
                sound.initContext();
                parseAndRunCommands();
            }
            return;
        }

        // Tecla Espaço para avançar comando no modo Passo a Passo
        if (e.key === ' ' || e.code === 'Space') {
            const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
            if (activeTag === 'textarea' || activeTag === 'input' || activeTag === 'select') {
                return; // Permite digitar espaços normalmente
            }
            if (elements.stepButton && !elements.stepButton.disabled) {
                e.preventDefault();
                stepForward();
            }
        }
    });

    // Carrega o progresso salvo e monta a fase inicial com seu código
    const progress = loadProgress();
    const initialLevel = Math.min(progress.unlockedLevel || 0, levels.length - 1);
    loadLevelIntoUI(initialLevel);

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
