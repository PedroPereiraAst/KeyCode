// =============================================================================
// KEYCODE - MOTOR DE JOGO 2D & INTERPRETADOR DIDÁTICO
// Inclui validação de sintaxe amigável (BNCC), suporte a laços repetir(n),
// controle de velocidade, efeitos sonoros (Web Audio) e gamificação (3 estrelas).
// =============================================================================

import { levels } from './levels.js';
import { elements, showMessageBox, showSyntaxError, clearSyntaxError, updateHUD, updateActiveExecutionLine } from './ui.js';
import { sound } from './audio.js';
import { calculateResult, recordLevelVictory, recordLevelAttempt, isLevelUnlocked } from './storage.js';
import { Icons } from './icons.js';

let currentLevel = 0;
let activeEnemies = [];
let robotState = {};
let goalState = {};
let robotElement = null;
let goalElement = null;

// Controle de execução
let executionSpeed = 'normal'; // 'normal' (380ms), 'fast' (180ms), 'step' (manual)
let isRunning = false;
let executionTimeout = null;
let usedHintInCurrentAttempt = false;
let pendingStepCallback = null;

export function getCurrentLevel() {
    return currentLevel;
}

export function setCurrentLevel(level) {
    currentLevel = Math.max(0, Math.min(level, levels.length - 1));
}

export function getExecutionSpeed() {
    return executionSpeed;
}

export function setExecutionSpeed(speed) {
    executionSpeed = speed;
}

export function markHintUsed() {
    usedHintInCurrentAttempt = true;
}

export function hasUsedHint() {
    return usedHintInCurrentAttempt;
}

export function nextLevel() {
    if (currentLevel < levels.length - 1) {
        currentLevel++;
    } else {
        currentLevel = 0;
    }
}

/**
 * Monta o nível no grid e desenha paredes, inimigos e robô.
 */
export function setupLevel(levelIndex) {
    if (executionTimeout) {
        clearTimeout(executionTimeout);
        executionTimeout = null;
    }
    isRunning = false;
    pendingStepCallback = null;

    currentLevel = levelIndex;
    const level = levels[currentLevel];

    elements.levelTitle.textContent = level.title;
    robotState = { ...level.robot };
    goalState = { ...level.goal };
    activeEnemies = level.enemies ? JSON.parse(JSON.stringify(level.enemies)) : [];

    // Limpa erros visuais de sintaxe
    clearSyntaxError();
    updateActiveExecutionLine(null);

    // Limpa o grid e recria as células dinamicamente
    elements.gridContainer.innerHTML = '';
    elements.gridContainer.style.gridTemplateColumns = `repeat(${level.gridSize}, 1fr)`;
    elements.gridContainer.style.gridTemplateRows = `repeat(${level.gridSize}, 1fr)`;

    const totalCells = level.gridSize * level.gridSize;
    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.dataset.index = i;
        elements.gridContainer.appendChild(cell);
    }

    // Desenha as paredes
    if (level.walls) {
        level.walls.forEach(wall => {
            const wallEl = createCharacter('wall', wall.x, wall.y);
            const cellIndex = wall.y * level.gridSize + wall.x;
            if (elements.gridContainer.children[cellIndex]) {
                elements.gridContainer.children[cellIndex].appendChild(wallEl);
            }
        });
    }

    // Desenha os inimigos
    activeEnemies.forEach(enemy => {
        const enemyEl = createCharacter('enemy', enemy.x, enemy.y);
        const cellIndex = enemy.y * level.gridSize + enemy.x;
        if (elements.gridContainer.children[cellIndex]) {
            elements.gridContainer.children[cellIndex].appendChild(enemyEl);
        }
    });

    // Cria elementos do robô e da estrela
    robotElement = createCharacter('robot', robotState.x, robotState.y);
    goalElement = createCharacter('goal', goalState.x, goalState.y);

    render();
    updateHUD();
}

/**
 * Cria elementos SVG dos componentes do tabuleiro.
 */
function createCharacter(type, x, y) {
    const el = document.createElement('div');
    el.classList.add(type);
    if (x !== undefined) el.dataset.x = x;
    if (y !== undefined) el.dataset.y = y;

    switch (type) {
        case 'robot':
            el.id = 'robot';
            el.innerHTML = Icons.robot;
            break;
        case 'goal':
            el.id = 'goal';
            el.innerHTML = Icons.goal;
            break;
        case 'wall':
            el.innerHTML = Icons.wall;
            break;
        case 'enemy':
            el.innerHTML = Icons.enemy;
            break;
    }
    return el;
}

/**
 * Posiciona visualmente o robô e o objetivo no grid.
 */
function render() {
    const gridSize = levels[currentLevel].gridSize;
    const robotCellIndex = robotState.y * gridSize + robotState.x;

    if (elements.gridContainer.children[robotCellIndex]) {
        elements.gridContainer.children[robotCellIndex].appendChild(robotElement);
    }
    robotElement.style.transform = `rotate(${robotState.dir * 90}deg)`;

    const goalCellIndex = goalState.y * gridSize + goalState.x;
    if (elements.gridContainer.children[goalCellIndex] && !elements.gridContainer.children[goalCellIndex].contains(goalElement)) {
        elements.gridContainer.children[goalCellIndex].appendChild(goalElement);
    }
}

/**
 * Reseta o nível atual, limpando o editor e redefinindo estados.
 */
export function resetLevel() {
    usedHintInCurrentAttempt = false;
    elements.codeEditor.value = '';
    setupLevel(currentLevel);
}

// =============================================================================
// PARSER DIDÁTICO E VALIDADOR DE SINTAXE
// Fornece mensagens claras e acolhedoras para alunos do ensino médio.
// Suporta comandos simples e blocos repetir(n) { ... }.
// =============================================================================

const KNOWN_COMMANDS = ['mover', 'virardireita', 'viraresquerda', 'atirarnafrente', 'repetir'];

/**
 * Sugestões ortográficas para erros comuns de digitação.
 */
function getSuggestionForTypo(word) {
    const w = word.toLowerCase();
    if (['movr', 'mova', 'andar', 'avancar', 'moove', 'move'].includes(w)) return 'mover';
    if (['direita', 'viradireita', 'virardireta', 'girardireita'].includes(w)) return 'virarDireita';
    if (['esquerda', 'viraresquerd', 'giraresquerda'].includes(w)) return 'virarEsquerda';
    if (['atirar', 'tiro', 'disparar', 'atira'].includes(w)) return 'atirarNaFrente';
    if (['repete', 'repeti', 'loop', 'for'].includes(w)) return 'repetir';
    return null;
}

/**
 * Tokenizador léxico para o código do KeyCode.
 * Preserva números de linha, remove comentários e suporta blocos e comandos em linha única.
 */
function tokenize(code) {
    const tokens = [];
    const lines = code.split('\n');

    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
        const lineNum = lineIdx + 1;
        let line = lines[lineIdx];

        // Remove comentários de linha (// ou #)
        const commentIdx = line.search(/(\/\/|#)/);
        if (commentIdx !== -1) {
            line = line.substring(0, commentIdx);
        }

        let col = 0;
        while (col < line.length) {
            const ch = line[col];

            // Ignora espaços e tabs
            if (/\s/.test(ch)) {
                col++;
                continue;
            }

            // Símbolos estruturais
            if (ch === '(') { tokens.push({ type: 'LPAREN', value: '(', lineNum, col, rawLine: lines[lineIdx].trim() }); col++; continue; }
            if (ch === ')') { tokens.push({ type: 'RPAREN', value: ')', lineNum, col, rawLine: lines[lineIdx].trim() }); col++; continue; }
            if (ch === '{') { tokens.push({ type: 'LBRACE', value: '{', lineNum, col, rawLine: lines[lineIdx].trim() }); col++; continue; }
            if (ch === '}') { tokens.push({ type: 'RBRACE', value: '}', lineNum, col, rawLine: lines[lineIdx].trim() }); col++; continue; }
            if (ch === ';') { tokens.push({ type: 'SEMICOLON', value: ';', lineNum, col, rawLine: lines[lineIdx].trim() }); col++; continue; }

            // Números (incluindo negativos)
            if (ch === '-' && col + 1 < line.length && /\d/.test(line[col + 1])) {
                let numStr = '-';
                col++;
                const startCol = col - 1;
                while (col < line.length && /\d/.test(line[col])) {
                    numStr += line[col];
                    col++;
                }
                tokens.push({ type: 'NUMBER', value: parseInt(numStr, 10), raw: numStr, lineNum, col: startCol, rawLine: lines[lineIdx].trim() });
                continue;
            }

            if (/\d/.test(ch)) {
                let numStr = '';
                const startCol = col;
                while (col < line.length && /\d/.test(line[col])) {
                    numStr += line[col];
                    col++;
                }
                tokens.push({ type: 'NUMBER', value: parseInt(numStr, 10), raw: numStr, lineNum, col: startCol, rawLine: lines[lineIdx].trim() });
                continue;
            }

            // Identificadores de comando (mover, virarDireita, repetir, etc.)
            if (/[a-zA-Z_]/.test(ch)) {
                let idStr = '';
                const startCol = col;
                while (col < line.length && /[a-zA-Z0-9_]/.test(line[col])) {
                    idStr += line[col];
                    col++;
                }
                tokens.push({ type: 'IDENT', value: idStr, lineNum, col: startCol, rawLine: lines[lineIdx].trim() });
                continue;
            }

            // Caractere desconhecido
            tokens.push({ type: 'UNKNOWN', value: ch, lineNum, col, rawLine: lines[lineIdx].trim() });
            col++;
        }
    }

    tokens.push({ type: 'EOF', value: '', lineNum: lines.length, col: 0, rawLine: '' });
    return { tokens, lines };
}

/**
 * Valida o código do aluno e extrai a lista ordenada de instruções executáveis.
 * Suporta blocos: repetir(n) { ... }, tanto em linhas separadas quanto inline.
 */
export function parseCode(code) {
    const rawLines = code.split('\n');
    let validLineCount = 0;

    for (let idx = 0; idx < rawLines.length; idx++) {
        const text = rawLines[idx].trim();
        if (text !== '' && !text.startsWith('//') && !text.startsWith('#')) {
            validLineCount++;
        }
    }

    if (validLineCount === 0) {
        return { error: 'O editor está vazio! Escreva comandos como mover(4) para iniciar.' };
    }

    const { tokens } = tokenize(code);
    let pos = 0;

    function peek() {
        return tokens[pos];
    }

    function next() {
        return tokens[pos++];
    }

    function parseBlockOrStatements(isBlock = false) {
        const actions = [];

        while (peek().type !== 'EOF') {
            if (isBlock && peek().type === 'RBRACE') {
                break;
            }

            if (peek().type === 'SEMICOLON') {
                next();
                continue;
            }

            if (peek().type === 'RBRACE') {
                const token = next();
                return { error: `Linha ${token.lineNum}: Chave de fechamento '}' encontrada sem um bloco correspondente.` };
            }

            if (peek().type === 'UNKNOWN') {
                const token = next();
                return { error: `Linha ${token.lineNum}: Caractere inesperado '${token.value}'.` };
            }

            if (peek().type !== 'IDENT') {
                const token = next();
                return { error: `Linha ${token.lineNum}: Formato inválido em "${token.rawLine}". Escreva os comandos no padrão: comando() ou comando(número).` };
            }

            const identToken = next();
            const cmdName = identToken.value.toLowerCase();

            // Bloco de Repetição: repetir(n) { ... }
            if (cmdName === 'repetir') {
                if (peek().type !== 'LPAREN') {
                    return { error: `Linha ${identToken.lineNum}: Faltam parênteses no comando "repetir". O formato correto é "repetir(n) { ... }".` };
                }
                next(); // '('

                if (peek().type !== 'NUMBER') {
                    return { error: `Linha ${identToken.lineNum}: Você precisa informar quantas vezes repetir dentro dos parênteses. Exemplo: repetir(3) { mover() }` };
                }
                const countToken = next();
                const count = countToken.value;

                if (count <= 0 || count > 50) {
                    return { error: `Linha ${countToken.lineNum}: O número de repetições deve ser entre 1 e 50.` };
                }

                if (peek().type !== 'RPAREN') {
                    return { error: `Linha ${countToken.lineNum}: Faltou fechar o parêntese ")" após o número de repetições.` };
                }
                next(); // ')'

                if (peek().type !== 'LBRACE') {
                    return { error: `Linha ${identToken.lineNum}: O comando repetir(...) precisa de um bloco com chaves { }. Exemplo: repetir(${count}) { mover() }` };
                }
                next(); // '{'

                const innerResult = parseBlockOrStatements(true);
                if (innerResult.error) return innerResult;

                if (peek().type !== 'RBRACE') {
                    return { error: `Linha ${identToken.lineNum}: Bloco repetir(...) não foi fechado com '}'. Lembre-se de fechar a chave!` };
                }
                next(); // '}'

                if (peek().type === 'SEMICOLON') {
                    next();
                }

                // Replica as ações n vezes
                for (let c = 0; c < count; c++) {
                    for (const act of innerResult.actions) {
                        actions.push({ ...act, sourceLine: identToken.lineNum });
                    }
                }
                continue;
            }

            // Comandos atômicos
            if (peek().type !== 'LPAREN') {
                const suggestion = getSuggestionForTypo(identToken.value) || identToken.value;
                return {
                    error: `Linha ${identToken.lineNum}: Faltam parênteses no comando "${identToken.rawLine}". O formato correto é "${suggestion}()" ou "${suggestion}(n)".`
                };
            }
            next(); // '('

            let count = 1;
            let countStr = '';
            if (peek().type === 'NUMBER') {
                const numToken = next();
                count = numToken.value;
                countStr = numToken.raw;
                if (count < 1 || count > 20) {
                    return { error: `Linha ${numToken.lineNum}: O valor "${numToken.raw}" é inválido. Utilize um número de 1 a 20.` };
                }
            } else if (peek().type !== 'RPAREN') {
                return { error: `Linha ${identToken.lineNum}: O valor dentro dos parênteses deve ser um número de 1 a 20.` };
            }

            if (peek().type !== 'RPAREN') {
                return { error: `Linha ${identToken.lineNum}: Formato inválido em "${identToken.rawLine}". Escreva os comandos no padrão: comando() ou comando(número).` };
            }
            next(); // ')'

            if (peek().type === 'SEMICOLON') {
                next();
            }

            if (!KNOWN_COMMANDS.includes(cmdName)) {
                const suggestion = getSuggestionForTypo(identToken.value);
                if (suggestion) {
                    return { error: `Linha ${identToken.lineNum}: Comando "${identToken.value}" não existe. Você quis dizer "${suggestion}()"?` };
                }
                return { error: `Linha ${identToken.lineNum}: Comando "${identToken.value}" não reconhecido. Consulte os comandos válidos no painel lateral.` };
            }

            let actionType = null;
            if (cmdName === 'mover') actionType = 'move';
            if (cmdName === 'virardireita') actionType = 'right';
            if (cmdName === 'viraresquerda') actionType = 'left';
            if (cmdName === 'atirarnafrente') actionType = 'shoot';

            for (let k = 0; k < count; k++) {
                actions.push({
                    type: actionType,
                    label: `${identToken.value}(${countStr})`,
                    lineNum: identToken.lineNum
                });
            }
        }

        return { actions };
    }

    const parseResult = parseBlockOrStatements(false);
    if (parseResult.error) return parseResult;

    return {
        commands: parseResult.actions,
        totalLinesWritten: validLineCount
    };
}

// =============================================================================
// EXECUÇÃO DO CÓDIGO & MOTOR DE ANIMAÇÃO
// =============================================================================

export function parseAndRunCommands() {
    if (isRunning) return;

    sound.initContext();
    clearSyntaxError();

    const code = elements.codeEditor.value;
    const parseResult = parseCode(code);

    if (parseResult.error) {
        sound.playError();
        showSyntaxError(parseResult.error);
        return;
    }

    const commands = parseResult.commands;
    const totalLinesWritten = parseResult.totalLinesWritten;

    if (commands.length === 0) {
        sound.playError();
        showSyntaxError('Nenhum comando executável foi encontrado no editor.');
        return;
    }

    // Configura o tabuleiro no estado inicial antes de rodar
    setupLevel(currentLevel);

    isRunning = true;
    elements.runButton.disabled = true;
    elements.resetButton.disabled = true;

    // Atualiza botão do modo passo a passo se necessário
    if (elements.stepButton) elements.stepButton.disabled = false;

    let cmdIndex = 0;

    function getDelay() {
        if (executionSpeed === 'fast') return 160;
        return 380; // normal
    }

    function executeNext() {
        if (!isRunning) return;

        if (cmdIndex >= commands.length) {
            isRunning = false;
            updateActiveExecutionLine(null);
            elements.runButton.disabled = false;
            elements.resetButton.disabled = false;
            if (elements.stepButton) elements.stepButton.disabled = true;
            checkWinCondition(totalLinesWritten);
            return;
        }

        const cmd = commands[cmdIndex];
        updateActiveExecutionLine(cmd.lineNum, cmd.label);

        let hitObstacle = false;
        let targetX = robotState.x;
        let targetY = robotState.y;

        // 0: Cima, 1: Direita, 2: Baixo, 3: Esquerda
        if (robotState.dir === 0) targetY--;
        if (robotState.dir === 1) targetX++;
        if (robotState.dir === 2) targetY++;
        if (robotState.dir === 3) targetX--;

        const gridSize = levels[currentLevel].gridSize;

        switch (cmd.type) {
            case 'move':
                const walls = levels[currentLevel].walls || [];
                const isWall = walls.some(w => w.x === targetX && w.y === targetY);
                const isEnemy = activeEnemies.some(e => e.x === targetX && e.y === targetY);
                const isOutOfBounds = targetX < 0 || targetX >= gridSize || targetY < 0 || targetY >= gridSize;

                if (isWall || isEnemy || isOutOfBounds) {
                    hitObstacle = true;
                } else {
                    robotState.x = targetX;
                    robotState.y = targetY;
                    sound.playMove();
                }
                break;

            case 'shoot':
                sound.playShoot();
                triggerLaserEffect(robotState.x, robotState.y, targetX, targetY);

                const enemyIdx = activeEnemies.findIndex(e => e.x === targetX && e.y === targetY);
                if (enemyIdx > -1) {
                    activeEnemies.splice(enemyIdx, 1);
                    const enemyEl = document.querySelector(`.enemy[data-x='${targetX}'][data-y='${targetY}']`);
                    if (enemyEl) {
                        enemyEl.style.transition = 'all 0.3s ease-out';
                        enemyEl.style.transform = 'scale(1.4) rotate(45deg)';
                        enemyEl.style.opacity = '0';
                        setTimeout(() => enemyEl.remove(), 320);
                    }
                }
                break;

            case 'right':
                robotState.dir = (robotState.dir + 1) % 4;
                sound.playTurn();
                break;

            case 'left':
                robotState.dir = (robotState.dir + 3) % 4;
                sound.playTurn();
                break;
        }

        render();

        if (hitObstacle) {
            isRunning = false;
            sound.playHit();
            triggerCollisionEffect();
            recordLevelAttempt(currentLevel);
            updateActiveExecutionLine(null);
            elements.runButton.disabled = false;
            elements.resetButton.disabled = false;
            if (elements.stepButton) elements.stepButton.disabled = true;

            setTimeout(() => {
                showMessageBox('wall');
            }, 300);
            return;
        }

        cmdIndex++;

        // Modo Passo a Passo ou Temporizador Automático
        if (executionSpeed === 'step') {
            pendingStepCallback = executeNext;
        } else {
            executionTimeout = setTimeout(executeNext, getDelay());
        }
    }

    executeNext();
}

/**
 * Avança exatamente um passo quando o jogador estiver no modo 'Passo a Passo'.
 */
export function stepForward() {
    if (pendingStepCallback) {
        const cb = pendingStepCallback;
        pendingStepCallback = null;
        cb();
    }
}

/**
 * Efeito visual de feixe de laser ao atirar.
 */
function triggerLaserEffect(fromX, fromY, toX, toY) {
    const gridSize = levels[currentLevel].gridSize;
    const targetCellIndex = toY * gridSize + toX;
    const targetCell = elements.gridContainer.children[targetCellIndex];

    if (targetCell) {
        targetCell.classList.add('laser-flash');
        setTimeout(() => targetCell.classList.remove('laser-flash'), 300);
    }
}

/**
 * Efeito visual de impacto / vibração ao colidir.
 */
function triggerCollisionEffect() {
    if (robotElement) {
        robotElement.classList.add('robot-collision-shake');
        setTimeout(() => robotElement.classList.remove('robot-collision-shake'), 400);
    }
}

/**
 * Avalia se o robô chegou na estrela (condição de vitória).
 */
function checkWinCondition(linesCount) {
    const isAtGoal = robotState.x === goalState.x && robotState.y === goalState.y;
    const isLastLevel = currentLevel >= levels.length - 1;

    if (isAtGoal) {
        sound.playSuccess();
        const levelConfig = levels[currentLevel];
        const result = calculateResult(currentLevel, {
            linesCount,
            usedHint: usedHintInCurrentAttempt,
            optimalLines: levelConfig.optimalLines || 5
        });

        // Salva vitória no localStorage
        recordLevelVictory(currentLevel, result, levels.length);
        updateHUD();

        showMessageBox('success', isLastLevel, result);
    } else {
        sound.playHit();
        recordLevelAttempt(currentLevel);
        showMessageBox('fail', isLastLevel);
    }
}
