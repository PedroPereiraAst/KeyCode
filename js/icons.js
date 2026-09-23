// =============================================================================
// KEYCODE - SISTEMA VISUAL DE ÍCONES VETORIAIS (Custom SVG Design System)
// Ícones próprios desenvolvidos especificamente para a identidade visual do
// KeyCode, substituindo emojis e dependências externas por vetores escaláveis.
// =============================================================================

export const Icons = {
    /**
     * Logotipo do KeyCode: Escudo tecnológico com chaves de código { } e foguete central.
     */
    logo: `
        <svg class="kc-icon kc-logo" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="kcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#2dd4bf" />
                    <stop offset="100%" stop-color="#38bdf8" />
                </linearGradient>
            </defs>
            <rect x="3" y="3" width="26" height="26" rx="8" fill="#0f172a" stroke="url(#kcGrad)" stroke-width="2"/>
            <path d="M10 11L6.5 16L10 21" stroke="#2dd4bf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22 11L25.5 16L22 21" stroke="#2dd4bf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 8C14.5 10.5 13.5 13.5 13.5 17L16 19L18.5 17C18.5 13.5 17.5 10.5 16 8Z" fill="url(#kcGrad)"/>
            <circle cx="16" cy="13.5" r="1.25" fill="#0f172a"/>
            <path d="M14 20L13 23M18 20L19 23M16 19V24" stroke="#38bdf8" stroke-width="1.75" stroke-linecap="round"/>
        </svg>
    `,

    /**
     * Estrela gamer para HUD e pontuação (Preenchida dourada)
     */
    star: `
        <svg class="kc-icon kc-star" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.5L14.9 8.6L21.6 9.5L16.7 14.2L17.9 20.9L12 17.7L6.1 20.9L7.3 14.2L2.4 9.5L9.1 8.6L12 2.5Z"/>
        </svg>
    `,

    /**
     * Troféu de pontuação e recordes
     */
    trophy: `
        <svg class="kc-icon kc-trophy" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 3H18V9C18 12.3137 15.3137 15 12 15C8.68629 15 6 12.3137 6 9V3Z" fill="#f59e0b" stroke="#fbbf24" stroke-width="1.5"/>
            <path d="M6 5H3C2.44772 5 2 5.44772 2 6V8C2 9.65685 3.34315 11 5 11H6.3" stroke="#fbbf24" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M18 5H21C21.5523 5 22 5.44772 22 6V8C22 9.65685 20.6569 11 19 11H17.7" stroke="#fbbf24" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M12 15V18M8 21H16M9 18H15" stroke="#fbbf24" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M12 7L12.7 8.5L14.3 8.7L13.1 9.8L13.4 11.4L12 10.6L10.6 11.4L10.9 9.8L9.7 8.7L11.3 8.5L12 7Z" fill="#ffffff"/>
        </svg>
    `,

    /**
     * Alto-falante ativo (Áudio On)
     */
    soundOn: `
        <svg class="kc-icon kc-sound-on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" fill-opacity="0.25"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
        </svg>
    `,

    /**
     * Alto-falante mudo (Áudio Off)
     */
    soundOff: `
        <svg class="kc-icon kc-sound-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <line x1="2" y1="2" x2="22" y2="22"/>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" fill-opacity="0.25"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
        </svg>
    `,

    /**
     * Reiniciar / Resetar (Seta circular de recarga)
     */
    reset: `
        <svg class="kc-icon kc-reset" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L2 8"/>
            <polyline points="2 3 2 8 7 8"/>
        </svg>
    `,

    /**
     * Livro / Guia de comandos didático
     */
    book: `
        <svg class="kc-icon kc-book" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            <path d="M9 7h6M9 11h4"/>
        </svg>
    `,

    /**
     * Executar código (Play moderno)
     */
    play: `
        <svg class="kc-icon kc-play" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <polygon points="6 4 20 12 6 20 6 4"/>
        </svg>
    `,

    /**
     * Avançar passo no modo Passo a Passo
     */
    stepForward: `
        <svg class="kc-icon kc-step" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <polygon points="4 5 12 12 4 19 4 5"/>
            <polygon points="12 5 20 12 12 19 12 5"/>
        </svg>
    `,

    /**
     * Limpar editor de código
     */
    clear: `
        <svg class="kc-icon kc-clear" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            <line x1="10" y1="11" x2="10" y2="17"/>
            <line x1="14" y1="11" x2="14" y2="17"/>
        </svg>
    `,

    /**
     * Lâmpada de dica pedagógica
     */
    hint: `
        <svg class="kc-icon kc-hint" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18h6M10 22h4"/>
            <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z"/>
        </svg>
    `,

    /**
     * Alerta / Aviso de erro de sintaxe
     */
    warning: `
        <svg class="kc-icon kc-warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
    `,

    /**
     * Indicador de linha em execução em tempo real
     */
    executing: `
        <svg class="kc-icon kc-executing" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <polyline points="9 18 15 12 9 6"/>
        </svg>
    `,

    /**
     * Conquista concluída (Círculo com checkmark verde)
     */
    checkCircle: `
        <svg class="kc-icon kc-check" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="2"/>
            <polyline points="8 12 11 15 16 9" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `,

    /**
     * Conquista pendente (Círculo tracejado)
     */
    pendingCircle: `
        <svg class="kc-icon kc-pending" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="#94a3b8" stroke-width="2" stroke-dasharray="3 3"/>
        </svg>
    `,

    /**
     * Conquista de código otimizado
     */
    docCode: `
        <svg class="kc-icon kc-doc-badge" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <path d="M10 13l-2 2 2 2M14 13l2 2-2 2"/>
        </svg>
    `,

    /**
     * Badge de dica nas conquistas
     */
    hintBadge: `
        <svg class="kc-icon kc-hint-badge" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18h6M10 22h4"/>
            <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z"/>
        </svg>
    `,

    /**
     * Cabeçalho do modal de vitória (Coroa e brasão de conclusão)
     */
    victory: `
        <svg class="kc-modal-icon kc-icon-victory" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="vicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#34d399"/>
                    <stop offset="100%" stop-color="#059669"/>
                </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="22" fill="url(#vicGrad)" fill-opacity="0.15" stroke="url(#vicGrad)" stroke-width="2.5"/>
            <path d="M12 20L17 32H31L36 20L28 24L24 14L20 24L12 20Z" fill="url(#vicGrad)" stroke="#10b981" stroke-width="1.5" stroke-linejoin="round"/>
            <circle cx="12" cy="19" r="2" fill="#fde047"/>
            <circle cx="24" cy="13" r="2" fill="#fde047"/>
            <circle cx="36" cy="19" r="2" fill="#fde047"/>
            <circle cx="24" cy="35" r="2.5" fill="#fde047"/>
        </svg>
    `,

    /**
     * Cabeçalho do modal "Quase lá!" (Radar de aproximação tático)
     */
    target: `
        <svg class="kc-modal-icon kc-icon-target" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="targetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#f87171"/>
                    <stop offset="100%" stop-color="#dc2626"/>
                </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="22" fill="url(#targetGrad)" fill-opacity="0.12" stroke="url(#targetGrad)" stroke-width="2.5"/>
            <circle cx="24" cy="24" r="14" stroke="#ef4444" stroke-width="2" stroke-dasharray="4 2"/>
            <circle cx="24" cy="24" r="6" fill="#ef4444"/>
            <line x1="24" y1="4" x2="24" y2="10" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="24" y1="38" x2="24" y2="44" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="4" y1="24" x2="10" y2="24" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="38" y1="24" x2="44" y2="24" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
    `,

    /**
     * Cabeçalho do modal de colisão com barreiras
     */
    collision: `
        <svg class="kc-modal-icon kc-icon-collision" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="collGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fb923c"/>
                    <stop offset="100%" stop-color="#ea580c"/>
                </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="22" fill="url(#collGrad)" fill-opacity="0.15" stroke="url(#collGrad)" stroke-width="2.5"/>
            <path d="M24 8L36 13V23C36 30.5 30.9 37.5 24 40C17.1 37.5 12 30.5 12 23V13L24 8Z" fill="#ea580c" fill-opacity="0.25" stroke="#ea580c" stroke-width="2" stroke-linejoin="round"/>
            <path d="M24 16V26M24 31V32" stroke="#ea580c" stroke-width="3" stroke-linecap="round"/>
            <path d="M19 19L15 15M29 19L33 15M17 28L13 30M31 28L35 30" stroke="#f97316" stroke-width="2" stroke-linecap="round"/>
        </svg>
    `,

    /**
     * Conclusão do projeto acadêmico (Chapéu de formatura)
     */
    graduation: `
        <svg class="kc-icon kc-graduation" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
            <path d="M6 12v5c3 3 9 3 12 0v-5"/>
        </svg>
    `,

    /**
     * Seta direcional para o próximo nível
     */
    arrowRight: `
        <svg class="kc-icon kc-arrow-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
        </svg>
    `,

    /**
     * Estrela conquistada com gradiente e facetas (Modal de vitória)
     */
    modalStarEarned: `
        <svg class="kc-star-svg earned" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="starGoldModal" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fde047"/>
                    <stop offset="50%" stop-color="#eab308"/>
                    <stop offset="100%" stop-color="#ca8a04"/>
                </linearGradient>
            </defs>
            <path d="M24 4L29.8 16.5L43.5 18.2L33.3 27.6L36 41.2L24 34.5L12 41.2L14.7 27.6L4.5 18.2L18.2 16.5L24 4Z" fill="url(#starGoldModal)" stroke="#fef08a" stroke-width="1.5" stroke-linejoin="round"/>
            <path d="M24 4L24 34.5L12 41.2L14.7 27.6L4.5 18.2L18.2 16.5L24 4Z" fill="#ffffff" fill-opacity="0.25"/>
        </svg>
    `,

    /**
     * Estrela vazia (Modal de vitória)
     */
    modalStarEmpty: `
        <svg class="kc-star-svg empty" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 4L29.8 16.5L43.5 18.2L33.3 27.6L36 41.2L24 34.5L12 41.2L14.7 27.6L4.5 18.2L18.2 16.5L24 4Z" fill="#334155" fill-opacity="0.2" stroke="#64748b" stroke-width="2" stroke-linejoin="round"/>
        </svg>
    `,

    /**
     * Robô jogador no tabuleiro
     */
    robot: `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2V5M10 2H14" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
            <rect x="5" y="5" width="14" height="10" rx="3" fill="#2563eb" stroke="#60a5fa" stroke-width="1.5"/>
            <rect x="8" y="8" width="8" height="3" rx="1.5" fill="#38bdf8"/>
            <rect x="3" y="14" width="4" height="8" rx="2" fill="#1e40af"/>
            <rect x="17" y="14" width="4" height="8" rx="2" fill="#1e40af"/>
            <rect x="7" y="14" width="10" height="7" rx="2" fill="#1d4ed8" stroke="#3b82f6" stroke-width="1"/>
            <circle cx="12" cy="17.5" r="1.5" fill="#22d3ee"/>
        </svg>
    `,

    /**
     * Objetivo / Estrela dourada no tabuleiro
     */
    goal: `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="goalGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#fef08a"/>
                    <stop offset="60%" stop-color="#facc15"/>
                    <stop offset="100%" stop-color="#ca8a04"/>
                </radialGradient>
            </defs>
            <path d="M12 2L14.9 8.6L21.6 9.5L16.7 14.2L17.9 20.9L12 17.7L6.1 20.9L7.3 14.2L2.4 9.5L9.1 8.6L12 2Z" fill="url(#goalGrad)" stroke="#fef08a" stroke-width="1" stroke-linejoin="round"/>
            <circle cx="12" cy="12" r="3" fill="#ffffff" fill-opacity="0.6"/>
        </svg>
    `,

    /**
     * Bloco de parede cibernética reforçada
     */
    wall: `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="3" fill="#1e293b" stroke="#475569" stroke-width="2"/>
            <line x1="2" y1="9" x2="22" y2="9" stroke="#334155" stroke-width="1.5"/>
            <line x1="2" y1="16" x2="22" y2="16" stroke="#334155" stroke-width="1.5"/>
            <line x1="9" y1="2" x2="9" y2="9" stroke="#334155" stroke-width="1.5"/>
            <line x1="16" y1="2" x2="16" y2="9" stroke="#334155" stroke-width="1.5"/>
            <line x1="12" y1="9" x2="12" y2="16" stroke="#334155" stroke-width="1.5"/>
            <line x1="6" y1="16" x2="6" y2="22" stroke="#334155" stroke-width="1.5"/>
            <line x1="18" y1="16" x2="18" y2="22" stroke="#334155" stroke-width="1.5"/>
            <rect x="5" y="5" width="2" height="2" fill="#64748b"/>
            <rect x="17" y="5" width="2" height="2" fill="#64748b"/>
            <rect x="11" y="12" width="2" height="2" fill="#64748b"/>
        </svg>
    `,

    /**
     * Drone inimigo cibernético com sensor óptico vermelho
     */
    enemy: `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="enemyEye" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#fee2e2"/>
                    <stop offset="40%" stop-color="#ef4444"/>
                    <stop offset="100%" stop-color="#991b1b"/>
                </radialGradient>
            </defs>
            <path d="M12 3L20 8V16L12 21L4 16V8L12 3Z" fill="#7f1d1d" stroke="#ef4444" stroke-width="1.5"/>
            <circle cx="12" cy="12" r="5" fill="url(#enemyEye)"/>
            <circle cx="12" cy="12" r="2" fill="#ffffff"/>
            <path d="M4 8L1 6M20 8L23 6M4 16L1 18M20 16L23 18" stroke="#f87171" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
    `
};
