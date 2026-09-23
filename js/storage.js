// =============================================================================
// KEYCODE - GERENCIADOR DE PERSISTÊNCIA, GAMIFICAÇÃO & PONTUAÇÃO (localStorage)
// Armazena estrelas, recordes por nível, desbloqueio progressivo e métricas
// pedagógicas úteis para o relatório do IFSP (CTDPEX1).
// =============================================================================

const STORAGE_KEY = 'keycode_game_progress_v2';

// Estado inicial padrão
function getDefaultProgress() {
    return {
        unlockedLevel: 0,
        levelData: {},
        totalScore: 0,
        totalStars: 0,
        lastPlayed: null
    };
}

/**
 * Carrega o progresso salvo no navegador.
 */
export function loadProgress() {
    try {
        if (typeof localStorage === 'undefined') return getDefaultProgress();
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return getDefaultProgress();
        const parsed = JSON.parse(raw);
        return {
            unlockedLevel: parsed.unlockedLevel ?? 0,
            levelData: parsed.levelData || {},
            totalScore: parsed.totalScore ?? 0,
            totalStars: parsed.totalStars ?? 0,
            lastPlayed: parsed.lastPlayed || null
        };
    } catch (e) {
        console.warn('Erro ao carregar progresso do KeyCode:', e);
        return getDefaultProgress();
    }
}

/**
 * Salva o progresso no localStorage.
 */
export function saveProgress(progress) {
    try {
        if (typeof localStorage === 'undefined') return;
        progress.lastPlayed = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
        console.warn('Erro ao salvar progresso do KeyCode:', e);
    }
}

/**
 * Verifica se um nível está desbloqueado para o jogador.
 */
export function isLevelUnlocked(levelIndex) {
    const progress = loadProgress();
    return levelIndex <= progress.unlockedLevel;
}

/**
 * Retorna os dados registrados de um nível específico.
 */
export function getLevelData(levelIndex) {
    const progress = loadProgress();
    return progress.levelData[levelIndex] || null;
}

/**
 * Calcula estrelas e pontuação com base no desempenho do aluno.
 * Regras didáticas:
 * - 1 Estrela: Chegou ao objetivo.
 * - 2 Estrelas: Concluiu sem consultar a dica.
 * - 3 Estrelas: Concluiu com código enxuto (linhas/comandos <= meta ideal do nível).
 */
export function calculateResult(levelIndex, { linesCount, usedHint, optimalLines = 5 }) {
    let stars = 1; // 1 estrela garantida por vencer

    const starDetails = {
        goalReached: true,
        noHints: !usedHint,
        codeOptimized: linesCount <= optimalLines
    };

    if (starDetails.noHints) stars++;
    if (starDetails.codeOptimized) stars++;

    // Cálculo da pontuação da rodada
    const BASE_SCORE = 1000;
    let score = BASE_SCORE;

    if (stars === 3) {
        score += 500; // Bônus perfeito
    } else if (stars === 2) {
        score += 200; // Bônus bom
    }

    // Bônus de eficiência se escreveu menos linhas que a meta
    if (linesCount < optimalLines) {
        score += (optimalLines - linesCount) * 100;
    }

    // Penalidade pelo uso de dica
    if (usedHint) {
        score = Math.max(300, score - 250);
    }

    return {
        stars,
        score,
        starDetails,
        linesCount,
        optimalLines
    };
}

/**
 * Registra a vitória no nível e atualiza o desbloqueio sequencial.
 */
export function recordLevelVictory(levelIndex, resultData, totalLevelsCount) {
    const progress = loadProgress();
    const existing = progress.levelData[levelIndex] || {
        completed: false,
        stars: 0,
        bestScore: 0,
        attempts: 0,
        usedHint: false
    };

    existing.completed = true;
    existing.attempts = (existing.attempts || 0) + 1;
    existing.stars = Math.max(existing.stars || 0, resultData.stars);
    existing.bestScore = Math.max(existing.bestScore || 0, resultData.score);
    existing.lastLines = resultData.linesCount;

    progress.levelData[levelIndex] = existing;

    // Desbloqueia o próximo nível sequencialmente
    if (levelIndex === progress.unlockedLevel && levelIndex + 1 < totalLevelsCount) {
        progress.unlockedLevel = levelIndex + 1;
    }

    // Recalcula totais gerais
    let totalStars = 0;
    let totalScore = 0;
    for (const key in progress.levelData) {
        const lvl = progress.levelData[key];
        totalStars += lvl.stars || 0;
        totalScore += lvl.bestScore || 0;
    }
    progress.totalStars = totalStars;
    progress.totalScore = totalScore;

    saveProgress(progress);
    return progress;
}

/**
 * Incrementa contador de tentativas com erro (colisão/não alcance).
 */
export function recordLevelAttempt(levelIndex) {
    const progress = loadProgress();
    const existing = progress.levelData[levelIndex] || {
        completed: false,
        stars: 0,
        bestScore: 0,
        attempts: 0
    };
    existing.attempts = (existing.attempts || 0) + 1;
    progress.levelData[levelIndex] = existing;
    saveProgress(progress);
}

/**
 * Reinicia todo o progresso do jogo (útil para testes ou novo aluno).
 */
export function resetAllProgress() {
    const fresh = getDefaultProgress();
    saveProgress(fresh);
    return fresh;
}

/**
 * Gera um relatório consolidado com métricas de aprendizagem (para o CTDPEX1).
 */
export function exportMetricsReport() {
    const progress = loadProgress();
    return {
        exportDate: new Date().toISOString(),
        unlockedLevel: progress.unlockedLevel,
        totalScore: progress.totalScore,
        totalStars: progress.totalStars,
        levels: progress.levelData
    };
}
