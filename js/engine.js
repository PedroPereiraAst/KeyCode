import { levels } from './levels.js';
import { elements, showMessageBox } from './ui.js';

let currentLevel = 0;
let activeEnemies = [];
let robotState = {};
let goalState = {};
let robotElement, goalElement;

export function getCurrentLevel() { return currentLevel; }
export function setCurrentLevel(level) { currentLevel = level; }

export function nextLevel() {
    if (currentLevel >= levels.length - 1) {
        currentLevel = 0;
    } else {
        currentLevel++;
    }
}

export function setupLevel(levelIndex) {
    const level = levels[levelIndex];
    elements.levelTitle.textContent = level.title;
    robotState = { ...level.robot };
    goalState = { ...level.goal };
    activeEnemies = level.enemies ? JSON.parse(JSON.stringify(level.enemies)) : [];
    
    // Limpa o grid e o recria com o tamanho certo para o nível.
    elements.gridContainer.innerHTML = '';
    elements.gridContainer.style.gridTemplateColumns = `repeat(${level.gridSize}, 1fr)`;
    elements.gridContainer.style.gridTemplateRows = `repeat(${level.gridSize}, 1fr)`;

    for (let i = 0; i < level.gridSize * level.gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        elements.gridContainer.appendChild(cell);
    }
    
    // Desenha as paredes, se existirem no nível.
    if (level.walls) {
        level.walls.forEach(wall => {
            const wallEl = createCharacter('wall', wall.x, wall.y);
            const cellIndex = wall.y * level.gridSize + wall.x;
            if(elements.gridContainer.children[cellIndex]) elements.gridContainer.children[cellIndex].appendChild(wallEl);
        });
    }
    
    // Desenha os inimigos, se existirem.
    activeEnemies.forEach(enemy => {
        const enemyEl = createCharacter('enemy', enemy.x, enemy.y);
        const cellIndex = enemy.y * level.gridSize + enemy.x;
        if(elements.gridContainer.children[cellIndex]) elements.gridContainer.children[cellIndex].appendChild(enemyEl);
    });

    // Cria os elementos do robô e do objetivo.
    robotElement = createCharacter('robot');
    goalElement = createCharacter('goal');
    
    // Desenha o estado inicial do jogo.
    render();
}

function createCharacter(type, x, y) {
    const el = document.createElement('div');
    el.classList.add(type);
    el.dataset.x = x;
    el.dataset.y = y;

    switch(type) {
        case 'robot':
            el.id = 'robot';
            el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="text-blue-600"><path d="M12 2a2 2 0 0 1 2 2v2h-4V4a2 2 0 0 1 2-2zM6.75 8a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H6.75zM5 12a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-5zm2 0v5h10v-5H7z"/></svg>`;
            break;
        case 'goal':
            el.id = 'goal';
            el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="text-yellow-400"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clip-rule="evenodd" /></svg>`;
            break;
        case 'wall':
            el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9.75l-9-5.25M12 21V11.25" /></svg>`;
            break;
        case 'enemy':
            el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6a.75.75 0 00-1.06 1.06l1.06 1.06a.75.75 0 001.06-1.06l-1.06-1.06zm5.625-.001a.75.75 0 00-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06z" /><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-3.375 6.75a.75.75 0 011.06 0l1.5 1.5a.75.75 0 01-1.06 1.06l-1.5-1.5a.75.75 0 010-1.06zm6.375 0a.75.75 0 00-1.06 0l-1.5 1.5a.75.75 0 001.06 1.06l1.5-1.5a.75.75 0 000-1.06z" clip-rule="evenodd" /></svg>`;
            break;
    }
    return el;
}

function render() {
    const robotCellIndex = robotState.y * levels[currentLevel].gridSize + robotState.x;
    if(elements.gridContainer.children[robotCellIndex]) {
        elements.gridContainer.children[robotCellIndex].appendChild(robotElement);
    }
    robotElement.style.transform = `rotate(${robotState.dir * 90}deg)`;

    const goalCellIndex = goalState.y * levels[currentLevel].gridSize + goalState.x;
     if(elements.gridContainer.children[goalCellIndex] && !elements.gridContainer.children[goalCellIndex].contains(goalElement)) {
        elements.gridContainer.children[goalCellIndex].appendChild(goalElement);
    }
}

export function resetLevel() {
    elements.codeEditor.value = '';
    setupLevel(currentLevel);
}

export function parseAndRunCommands() {
    elements.runButton.disabled = true;
    elements.resetButton.disabled = true;
    setupLevel(currentLevel); // Reseta o nível antes de rodar o código.

    const code = elements.codeEditor.value;
    const lines = code.split('\n');
    const commands = [];
    
    const commandRegex = /(\w+)\s*\(\s*(\d*)\s*\)/;

    for(const line of lines) {
        const cleanedLine = line.trim().toLowerCase();
        if (cleanedLine === '') continue;

        const match = cleanedLine.match(commandRegex);

        if (match) {
            const commandName = match[1];
            const count = parseInt(match[2] || '1', 10);

            let action = null;
            if (commandName === 'mover') action = 'move';
            if (commandName === 'virardireita') action = 'right';
            if (commandName === 'viraresquerda') action = 'left';
            if (commandName === 'atirarnafrente') action = 'shoot';

            if (action) {
                for (let i = 0; i < count; i++) {
                    commands.push(action);
                }
            }
        }
    }

    let i = 0;
    const executeNext = () => {
        if (i >= commands.length) {
            checkWinCondition();
            return;
        }
        const command = commands[i];
        let hitObstacle = false;

        let targetX = robotState.x;
        let targetY = robotState.y;
        if (robotState.dir === 0) targetY--; // Cima
        if (robotState.dir === 1) targetX++; // Direita
        if (robotState.dir === 2) targetY++; // Baixo
        if (robotState.dir === 3) targetX--; // Esquerda

        switch (command) {
            case 'move':
                const walls = levels[currentLevel].walls || [];
                const isBlocked = walls.some(wall => wall.x === targetX && wall.y === targetY) ||
                                activeEnemies.some(enemy => enemy.x === targetX && enemy.y === targetY);
                
                if (isBlocked) {
                    hitObstacle = true;
                    break;
                }
                if (targetX >= 0 && targetX < levels[currentLevel].gridSize && targetY >= 0 && targetY < levels[currentLevel].gridSize) {
                    robotState.x = targetX;
                    robotState.y = targetY;
                }
                break;
            
            case 'shoot':
                const enemyIndex = activeEnemies.findIndex(e => e.x === targetX && e.y === targetY);
                if (enemyIndex > -1) {
                    activeEnemies.splice(enemyIndex, 1);
                    const enemyEl = document.querySelector(`.enemy[data-x='${targetX}'][data-y='${targetY}']`);
                    if (enemyEl) {
                        enemyEl.style.opacity = '0';
                        setTimeout(() => enemyEl.remove(), 300);
                    }
                }
                break;

            case 'right':
                robotState.dir = (robotState.dir + 1) % 4;
                break;
            case 'left':
                robotState.dir = (robotState.dir + 3) % 4;
                break;
        }

        if (hitObstacle) {
            showMessageBox('wall');
            elements.runButton.disabled = false;
            elements.resetButton.disabled = false;
            return;
        }

        render();
        i++;
        setTimeout(executeNext, 400);
    };
    
    executeNext();
}

function checkWinCondition() {
    const isAtGoal = robotState.x === goalState.x && robotState.y === goalState.y;
    const isLastLevel = currentLevel >= levels.length - 1;
    
    if (isAtGoal) {
        showMessageBox('success', isLastLevel);
    } else {
        showMessageBox('fail', isLastLevel);
    }
    elements.runButton.disabled = false;
    elements.resetButton.disabled = false;
}
