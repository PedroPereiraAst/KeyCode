// --- CONFIGURAÇÃO DOS NÍVEIS ---
export const levels = [
    { // Nível 1
        title: "Nível 1: Primeiros Passos",
        gridSize: 5,
        robot: { x: 0, y: 4, dir: 0 },
        goal: { x: 0, y: 0 },
        hint: "O robô precisa se mover 4 casas para frente. Que tal usar mover(4) para fazer isso de uma só vez?"
    },
    { // Nível 2
        title: "Nível 2: Cuidado com as Paredes",
        gridSize: 5,
        robot: { x: 0, y: 4, dir: 0 },
        goal: { x: 4, y: 4 },
        walls: [{x: 2, y: 4}, {x: 2, y: 3}, {x: 2, y: 2}],
        hint: "Há uma parede no meio do caminho! Você precisa contorná-la para chegar ao seu destino."
    },
    { // Nível 3
        title: "Nível 3: O labirinto",
        gridSize: 5,
        robot: { x: 0, y: 4, dir: 0 },
        goal: { x: 4, y: 0 },
        walls: [
            {x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3},
            {x: 3, y: 1}, {x: 3, y: 2}, {x: 3, y: 3}, {x: 3, y: 4},
        ],
        hint: "Este parece um labirinto. Planeje seus movimentos com cuidado para não bater nas paredes."
    },
    { // Nível 4
        title: "Nível 4: Atirar ou desviar?",
        gridSize: 5,
        robot: { x: 0, y: 4, dir: 0 },
        goal: { x: 4, y: 4 },
        enemies: [{x: 2, y: 2}],
        walls: [{x: 2, y: 1}, {x: 2, y: 3}, {x: 2, y: 4}],
        hint: "Um inimigo bloqueia o caminho mais curto! Você pode usar atirarNaFrente() para eliminá-lo ou dar a volta. Quando o assunto e programação, sempre há mais de uma solução!"
    },
    { // Nível 5
        title: "Nível 5: Inimigo a frente!",
        gridSize: 5,
        robot: { x: 0, y: 4, dir: 0 },
        goal: { x: 4, y: 0 },
        enemies: [{x: 1, y: 0},{x: 3, y: 4}],
        walls: [{x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 1, y: 4},{x: 3, y: 0}, {x: 3, y: 1}, {x: 3, y: 2}, {x: 3, y: 3}],
        hint: "Voce tera que juntar todos seu conhecimentos para conseguir passar por esse nivel. Use o atirarNaFrente() para eliminar os inimigos, mas cuidado com as paredes!"
    }
];
