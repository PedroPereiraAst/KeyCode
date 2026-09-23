// =============================================================================
// KEYCODE - CONFIGURAÇÃO DOS NÍVEIS PEDAGÓGICOS (BNCC / Computação na Educação Básica)
// Cada nível possui objetivos conceituais, grid, obstáculos e parâmetros de
// otimização (optimalLines) para cálculo das 3 estrelas.
// =============================================================================

export const levels = [
    {
        id: 1,
        title: "Nível 1: Primeiros Passos",
        concept: "Instruções Sequenciais & Parâmetros",
        gridSize: 5,
        robot: { x: 0, y: 4, dir: 0 },
        goal: { x: 0, y: 0 },
        optimalLines: 2,
        hint: "O robô precisa se mover 4 casas para frente. Que tal usar mover(4) para fazer isso de uma só vez?"
    },
    {
        id: 2,
        title: "Nível 2: Cuidado com as Paredes",
        concept: "Desvio de Obstáculos & Rotação Angular",
        gridSize: 5,
        robot: { x: 0, y: 4, dir: 0 },
        goal: { x: 4, y: 4 },
        walls: [
            { x: 2, y: 4 },
            { x: 2, y: 3 },
            { x: 2, y: 2 }
        ],
        optimalLines: 5,
        hint: "Há uma parede no meio do caminho! Você precisa contorná-la usando virarDireita() e mover() para chegar ao seu destino."
    },
    {
        id: 3,
        title: "Nível 3: O Labirinto",
        concept: "Decomposição de Problemas & Navegação",
        gridSize: 5,
        robot: { x: 0, y: 4, dir: 0 },
        goal: { x: 4, y: 0 },
        walls: [
            { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 },
            { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 4 }
        ],
        optimalLines: 6,
        hint: "Observe onde estão as aberturas do labirinto (na linha de baixo e na linha de cima). Planeje o caminho antes de executar!"
    },
    {
        id: 4,
        title: "Nível 4: Atirar ou Desviar?",
        concept: "Tomada de Decisão & Ações Interativas",
        gridSize: 5,
        robot: { x: 0, y: 4, dir: 0 },
        goal: { x: 4, y: 4 },
        enemies: [{ x: 2, y: 2 }],
        walls: [
            { x: 2, y: 1 },
            { x: 2, y: 3 },
            { x: 2, y: 4 }
        ],
        optimalLines: 7,
        hint: "Um inimigo bloqueia o caminho central! Você pode ficar de frente para ele e usar atirarNaFrente() para destruí-lo antes de avançar."
    },
    {
        id: 5,
        title: "Nível 5: Desafio Final",
        concept: "Algoritmo Composto & Eliminação Estratégica",
        gridSize: 5,
        robot: { x: 0, y: 4, dir: 0 },
        goal: { x: 4, y: 0 },
        enemies: [
            { x: 1, y: 0 },
            { x: 3, y: 4 }
        ],
        walls: [
            { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }, { x: 1, y: 4 },
            { x: 3, y: 0 }, { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }
        ],
        optimalLines: 12,
        hint: "Junte tudo o que você aprendeu: desvie das paredes, posicione o robô na direção de cada inimigo e use atirarNaFrente() para abrir caminho!"
    }
];
