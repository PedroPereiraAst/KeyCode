// =============================================================================
// KEYCODE - SISTEMA VISUAL DE ÍCONES VETORIAIS (Modern EdTech Gamer Design)
// Design contemporâneo: linhas limpas, iluminação neon sutil, contraste elegante,
// geometria moderna e estética gamer de tecnologia educacional (sem emojis e sem skeuomorfismo datado).
// =============================================================================

export const Icons = {
    /**
     * Logotipo do KeyCode: Escudo moderno com o robô protagonista caçando a estrela dourada na diagonal.
     */
    logo: `
        <svg class="kc-icon kc-logo" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="kcModernGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#00F5FF" />
                    <stop offset="100%" stop-color="#28C76F" />
                </linearGradient>
                <linearGradient id="botChassisLogo" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#2B3746" />
                    <stop offset="100%" stop-color="#18222E" />
                </linearGradient>
                <linearGradient id="starGoldLogo" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#FFF176" />
                    <stop offset="50%" stop-color="#FFC107" />
                    <stop offset="100%" stop-color="#FF8F00" />
                </linearGradient>
                <filter id="starGlowLogo" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="0" stdDeviation="1" flood-color="#FFC107" flood-opacity="0.9"/>
                </filter>
            </defs>

            <!-- Base Squircle Dark Slate com Borda Neon Ciano/Verde -->
            <rect x="2.5" y="2.5" width="27" height="27" rx="7.5" fill="#1E232D" stroke="url(#kcModernGrad)" stroke-width="1.75"/>

            <!-- Trilha tática de mira e perseguição na diagonal -->
            <path d="M 13.5 17.5 L 19.5 11.5" stroke="#00F5FF" stroke-width="1.6" stroke-dasharray="2 2" stroke-linecap="round" stroke-opacity="0.8"/>

            <!-- Jatos de Propulsão Neon atrás do robô -->
            <line x1="4.8" y1="26.5" x2="3.2" y2="28.2" stroke="#00F5FF" stroke-width="1.8" stroke-linecap="round"/>
            <line x1="7.2" y1="28.8" x2="5.8" y2="30.2" stroke="#28C76F" stroke-width="1.5" stroke-linecap="round"/>

            <!-- Robô Protagonista (angulado na diagonal ~25° caçando a estrela) -->
            <g transform="translate(10.5, 20.5) rotate(-24) translate(-10.5, -20.5)">
                <!-- Antena cyber com emissor -->
                <line x1="10.5" y1="9.8" x2="10.5" y2="12.8" stroke="#00F5FF" stroke-width="1.6" stroke-linecap="round"/>
                <circle cx="10.5" cy="9.2" r="1.5" fill="#00F5FF"/>

                <!-- Atuadores / Braços laterais -->
                <rect x="2.8" y="16.5" width="2.4" height="6.5" rx="1.2" fill="#00F5FF"/>
                <rect x="15.8" y="16.5" width="2.4" height="6.5" rx="1.2" fill="#00F5FF"/>

                <!-- Chassi principal da cabeça -->
                <rect x="5.2" y="12.5" width="10.6" height="12.5" rx="3.5" fill="url(#botChassisLogo)" stroke="#00F5FF" stroke-width="1.5"/>

                <!-- Visor panorâmico escuro -->
                <rect x="6.5" y="14.8" width="8" height="4.8" rx="2.4" fill="#090E17"/>

                <!-- Olhos de LED Ciano (focados no canto superior direito) -->
                <circle cx="8.6" cy="17.2" r="1.3" fill="#00F5FF"/>
                <circle cx="12.4" cy="17.2" r="1.3" fill="#00F5FF"/>
                <circle cx="9" cy="16.7" r="0.5" fill="#ffffff"/>
                <circle cx="12.8" cy="16.7" r="0.5" fill="#ffffff"/>

                <!-- Núcleo Reator de Energia Peitoral -->
                <rect x="8.2" y="21.8" width="4.6" height="1.8" rx="0.9" fill="#00F5FF"/>
            </g>

            <!-- Estrela Dourada Conquistável (limpa, nítida e radiante) -->
            <g filter="url(#starGlowLogo)">
                <path d="M 23 3.8 L 24.8 8.4 L 29.6 9 L 26 12.5 L 27 17.2 L 23 14.8 L 19 17.2 L 20 12.5 L 16.4 9 L 21.2 8.4 Z" fill="url(#starGoldLogo)" stroke="#FFFDE7" stroke-width="0.9" stroke-linejoin="round"/>
                <!-- Brilho facetado suave no topo -->
                <path d="M 23 3.8 L 23 14.8 L 19 17.2 L 20 12.5 L 16.4 9 L 21.2 8.4 Z" fill="#ffffff" fill-opacity="0.3"/>
            </g>
            <circle cx="28.8" cy="4.8" r="0.8" fill="#FFF176"/>
        </svg>
    `,

    /**
     * Estrela gamer para HUD e pontuação (Preenchida dourada moderna)
     */
    star: `
        <svg class="kc-icon kc-star" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="hudStarModern" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#FFD54F" />
                    <stop offset="100%" stop-color="#FFB300" />
                </linearGradient>
            </defs>
            <path d="M12 2.5L14.9 8.6L21.6 9.5L16.7 14.2L17.9 20.9L12 17.7L6.1 20.9L7.3 14.2L2.4 9.5L9.1 8.6L12 2.5Z" fill="url(#hudStarModern)" stroke="#FFE082" stroke-width="1.2" stroke-linejoin="round"/>
        </svg>
    `,

    /**
     * Troféu de pontuação e recordes (Design moderno com brilho sutil)
     */
    trophy: `
        <svg class="kc-icon kc-trophy" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="trophyModern" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#FFD54F" />
                    <stop offset="100%" stop-color="#FF9800" />
                </linearGradient>
            </defs>
            <path d="M6 3H18V9.5C18 12.8 15.3 15.5 12 15.5C8.7 15.5 6 12.8 6 9.5V3Z" fill="url(#trophyModern)" stroke="#FFE082" stroke-width="1.2"/>
            <path d="M6 4.5H3.5C2.7 4.5 2 5.2 2 6V8C2 9.7 3.3 11 5 11H6.3" stroke="#FFB300" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M18 4.5H20.5C21.3 4.5 22 5.2 22 6V8C22 9.7 20.7 11 19 11H17.7" stroke="#FFB300" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M12 15.5V18.5M8 21.5H16M9 18.5H15" stroke="#FFB300" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
    `,

    /**
     * Alto-falante ativo (Áudio On)
     */
    soundOn: `
        <svg class="kc-icon kc-sound-on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" fill-opacity="0.3"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
        </svg>
    `,

    /**
     * Alto-falante mudo (Áudio Off)
     */
    soundOff: `
        <svg class="kc-icon kc-sound-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" fill-opacity="0.15"/>
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
     * Livro do Guia de Comandos
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
        <svg class="kc-icon kc-play" viewBox="0 0 24 24" fill="currentColor" stroke="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="6 4 20 12 6 20"/>
        </svg>
    `,

    /**
     * Avançar passo no modo Passo a Passo
     */
    stepForward: `
        <svg class="kc-icon kc-step" viewBox="0 0 24 24" fill="currentColor" stroke="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="4 5 12 12 4 19"/>
            <polygon points="12 5 20 12 12 19"/>
        </svg>
    `,

    /**
     * Limpar editor de código (Lixeira clean)
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
     * Seta para próximo nível
     */
    arrowRight: `
        <svg class="kc-icon kc-arrow-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
        </svg>
    `,

    /**
     * Chapéu de formatura (Conclusão do curso)
     */
    graduation: `
        <svg class="kc-icon kc-graduation" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
            <path d="M6 12v5c3 3 9 3 12 0v-5"/>
        </svg>
    `,

    /**
     * Conquista concluída (Círculo verde com checkmark)
     */
    checkCircle: `
        <svg class="kc-icon kc-check" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#28C76F" fill-opacity="0.2" stroke="#28C76F" stroke-width="2"/>
            <polyline points="8 12 11 15 16 9" stroke="#28C76F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `,

    /**
     * Conquista pendente (Círculo tracejado)
     */
    pendingCircle: `
        <svg class="kc-icon kc-pending" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#64748b" stroke-width="2" stroke-dasharray="3 3"/>
        </svg>
    `,

    /**
     * Conquista de código otimizado
     */
    docCode: `
        <svg class="kc-icon kc-doc-badge" viewBox="0 0 24 24" fill="none" stroke="#00F5FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <path d="M10 13l-2 2 2 2M14 13l2 2-2 2"/>
        </svg>
    `,

    /**
     * Conquista de sem dicas
     */
    targetBadge: `
        <svg class="kc-icon kc-target-badge" viewBox="0 0 24 24" fill="none" stroke="#FFC107" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="6"/>
            <circle cx="12" cy="12" r="2"/>
        </svg>
    `,

    /**
     * Cabeçalho do modal de vitória (Brasão moderno de conclusão)
     */
    victory: `
        <svg class="kc-modal-icon kc-icon-victory" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="vicGradModern" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#28C76F"/>
                    <stop offset="100%" stop-color="#1ea85b"/>
                </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="22" fill="#28C76F" fill-opacity="0.15" stroke="url(#vicGradModern)" stroke-width="2.5"/>
            <path d="M12 21L17 33H31L36 21L28 25L24 15L20 25L12 21Z" fill="url(#vicGradModern)" stroke="#28C76F" stroke-width="1.5" stroke-linejoin="round"/>
            <circle cx="12" cy="20" r="2" fill="#FFC107"/>
            <circle cx="24" cy="14" r="2" fill="#FFC107"/>
            <circle cx="36" cy="20" r="2" fill="#FFC107"/>
            <circle cx="24" cy="35" r="2.5" fill="#FFC107"/>
        </svg>
    `,

    /**
     * Cabeçalho do modal "Quase lá!" (Radar de aproximação tático)
     */
    target: `
        <svg class="kc-modal-icon kc-icon-target" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="targetGradModern" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#f87171"/>
                    <stop offset="100%" stop-color="#EA5455"/>
                </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="22" fill="#EA5455" fill-opacity="0.12" stroke="url(#targetGradModern)" stroke-width="2.5"/>
            <circle cx="24" cy="24" r="14" stroke="#EA5455" stroke-width="2" stroke-dasharray="4 2"/>
            <circle cx="24" cy="24" r="6" fill="#EA5455"/>
            <line x1="24" y1="4" x2="24" y2="10" stroke="#EA5455" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="24" y1="38" x2="24" y2="44" stroke="#EA5455" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="4" y1="24" x2="10" y2="24" stroke="#EA5455" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="38" y1="24" x2="44" y2="24" stroke="#EA5455" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
    `,

    /**
     * Cabeçalho do modal de colisão (Escudo com aviso de alerta)
     */
    collision: `
        <svg class="kc-modal-icon kc-icon-collision" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="collGradModern" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fb923c"/>
                    <stop offset="100%" stop-color="#EA5455"/>
                </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="22" fill="#EA5455" fill-opacity="0.15" stroke="url(#collGradModern)" stroke-width="2.5"/>
            <path d="M24 8L36 13V23C36 30.5 30.9 37.5 24 40C17.1 37.5 12 30.5 12 23V13L24 8Z" fill="#EA5455" fill-opacity="0.25" stroke="#EA5455" stroke-width="2" stroke-linejoin="round"/>
            <path d="M24 16V26M24 31V32" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
        </svg>
    `,

    /**
     * Ícone de aviso de erro de sintaxe
     */
    alertTriangle: `
        <svg class="kc-banner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
    `,

    /**
     * Ícone do cursor de linha em execução
     */
    codeCursor: `
        <svg class="kc-exec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <polyline points="9 18 15 12 9 6"/>
        </svg>
    `,

    /**
     * Estrela conquistada moderna (Modal de vitória)
     */
    modalStarEarned: `
        <svg class="kc-star-svg earned" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="starGoldModalModern" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#FFE082"/>
                    <stop offset="50%" stop-color="#FFC107"/>
                    <stop offset="100%" stop-color="#FF9800"/>
                </linearGradient>
            </defs>
            <path d="M24 3L29.8 16L44 17.8L33.4 27.5L36.3 41.5L24 34.5L11.7 41.5L14.6 27.5L4 17.8L18.2 16L24 3Z" fill="url(#starGoldModalModern)" stroke="#FFF9C4" stroke-width="1.8" stroke-linejoin="round"/>
            <circle cx="24" cy="18" r="4" fill="#ffffff" fill-opacity="0.5"/>
        </svg>
    `,

    /**
     * Estrela não conquistada (Modal de vitória)
     */
    modalStarEmpty: `
        <svg class="kc-star-svg empty" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 3L29.8 16L44 17.8L33.4 27.5L36.3 41.5L24 34.5L11.7 41.5L14.6 27.5L4 17.8L18.2 16L24 3Z" fill="#1E232D" stroke="#475569" stroke-width="2" stroke-linejoin="round"/>
        </svg>
    `,

    /**
     * Robô jogador no tabuleiro (Modern Cyber Robot Protagonist):
     * Robô tecnológico contemporâneo: chassi geométrico em titânio e azul cyber,
     * visor panorâmico escuro com olhos expressivos em LED ciano brilhante,
     * antena transmissora e detalhes modernos de alta precisão.
     */
    robot: `
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="botChassis" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#2B3643" />
                    <stop offset="100%" stop-color="#1E232D" />
                </linearGradient>
                <linearGradient id="botCyanTrim" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#00F5FF" />
                    <stop offset="100%" stop-color="#0284c7" />
                </linearGradient>
                <filter id="botEyeGlowModern" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#00F5FF" flood-opacity="0.9"/>
                </filter>
            </defs>
            <!-- Sombra de contato -->
            <ellipse cx="18" cy="33.5" rx="10" ry="2" fill="rgba(0, 0, 0, 0.45)"/>
            
            <!-- Antena cyber com emissor neon -->
            <path d="M18 2V6M15 2H21" stroke="#00F5FF" stroke-width="1.8" stroke-linecap="round"/>
            <circle cx="18" cy="2.2" r="1.8" fill="#00F5FF"/>
            
            <!-- Braços / Atuadores laterais -->
            <rect x="3" y="14" width="4" height="11" rx="2" fill="#2B3643" stroke="#00F5FF" stroke-width="1.2"/>
            <rect x="29" y="14" width="4" height="11" rx="2" fill="#2B3643" stroke="#00F5FF" stroke-width="1.2"/>
            
            <!-- Cabeça / Chassi principal com cantos chanfrados -->
            <rect x="7" y="6" width="22" height="22" rx="6" fill="url(#botChassis)" stroke="url(#botCyanTrim)" stroke-width="1.8"/>
            
            <!-- Visor escuro de alta tecnologia -->
            <rect x="9.5" y="10.5" width="17" height="9" rx="4.5" fill="#0f172a" stroke="#00F5FF" stroke-width="1"/>
            
            <!-- Olhos ópticos em LED ciano com glow -->
            <g filter="url(#botEyeGlowModern)">
                <ellipse cx="13.8" cy="15" rx="2.2" ry="2.2" fill="#00F5FF"/>
                <ellipse cx="22.2" cy="15" rx="2.2" ry="2.2" fill="#00F5FF"/>
                <circle cx="14.5" cy="14.2" r="0.7" fill="#ffffff"/>
                <circle cx="22.9" cy="14.2" r="0.7" fill="#ffffff"/>
            </g>
            
            <!-- Núcleo central peitoral de energia -->
            <rect x="14" y="22" width="8" height="3" rx="1.5" fill="#00F5FF" fill-opacity="0.85"/>
            <circle cx="18" cy="23.5" r="0.8" fill="#ffffff"/>
        </svg>
    `,

    /**
     * Objetivo / Estrela dourada no tabuleiro (Modern Clean Star):
     * Estrela dourada contemporânea com aura luminosa sutil e facetas geométricas limpas.
     */
    goal: `
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="goalStarModern" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#FFE082" />
                    <stop offset="40%" stop-color="#FFC107" />
                    <stop offset="100%" stop-color="#FF9800" />
                </linearGradient>
                <filter id="goalStarGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="2.5" flood-color="#FFC107" flood-opacity="0.6"/>
                </filter>
            </defs>
            <!-- Sombra de contato -->
            <ellipse cx="18" cy="33" rx="9" ry="2" fill="rgba(0, 0, 0, 0.35)"/>
            
            <!-- Estrela dourada geométrica moderna com glow -->
            <g filter="url(#goalStarGlow)">
                <path d="M18 3L22.5 12.2L33 13.5L25.2 20.8L27.4 31.2L18 26L8.6 31.2L10.8 20.8L3 13.5L13.5 12.2L18 3Z" fill="url(#goalStarModern)" stroke="#FFF9C4" stroke-width="1.4" stroke-linejoin="round"/>
                <!-- Faceta de luz lateral moderna -->
                <path d="M18 3L18 26L8.6 31.2L10.8 20.8L3 13.5L13.5 12.2L18 3Z" fill="#ffffff" fill-opacity="0.25"/>
            </g>
            
            <!-- Faísca de brilho contemporânea -->
            <circle cx="18" cy="15" r="2" fill="#ffffff" fill-opacity="0.8"/>
        </svg>
    `,

    /**
     * Bloco de parede (Modern Cyber Barrier Block):
     * Módulo de barreira tecnológica com chassi em grafite/slate,
     * circuitos em neon ciano e reforço modular de segurança.
     */
    wall: `
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="wallPlate" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#334155" />
                    <stop offset="100%" stop-color="#1E232D" />
                </linearGradient>
            </defs>
            <!-- Chassi do bloco -->
            <rect x="3.5" y="3.5" width="29" height="29" rx="6" fill="url(#wallPlate)" stroke="#475569" stroke-width="1.8"/>
            
            <!-- Linhas de circuito tecnológico em ciano sutil -->
            <line x1="3.5" y1="18" x2="32.5" y2="18" stroke="#00F5FF" stroke-opacity="0.4" stroke-width="1.4"/>
            <line x1="18" y1="3.5" x2="18" y2="32.5" stroke="#00F5FF" stroke-opacity="0.4" stroke-width="1.4"/>
            
            <!-- Núcleo central de segurança -->
            <rect x="12" y="12" width="12" height="12" rx="3" fill="#1E232D" stroke="#00F5FF" stroke-opacity="0.6" stroke-width="1.2"/>
            <circle cx="18" cy="18" r="2" fill="#00F5FF" fill-opacity="0.75"/>
            
            <!-- Rebites modernos nos cantos -->
            <circle cx="8" cy="8" r="1.5" fill="#64748b"/>
            <circle cx="28" cy="8" r="1.5" fill="#64748b"/>
            <circle cx="8" cy="28" r="1.5" fill="#64748b"/>
            <circle cx="28" cy="28" r="1.5" fill="#64748b"/>
        </svg>
    `,

    /**
     * Drone inimigo cibernético (Modern Crimson Sentinel Drone):
     * Drone moderno com asas geométricas angulares, chassi dark slate e sensor laser carmesim.
     */
    enemy: `
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="enemyDroneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#2B3643" />
                    <stop offset="100%" stop-color="#1E232D" />
                </linearGradient>
                <filter id="enemySensorGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="2" flood-color="#EA5455" flood-opacity="0.85"/>
                </filter>
            </defs>
            <!-- Sombra de contato -->
            <ellipse cx="18" cy="33" rx="9" ry="2" fill="rgba(0, 0, 0, 0.4)"/>
            
            <!-- Aletas aerodinâmicas afiadas -->
            <path d="M6 12L2 9M30 12L34 9M6 24L2 27M30 24L34 27" stroke="#EA5455" stroke-width="2" stroke-linecap="round"/>
            
            <!-- Corpo do drone em diamante geométrico moderno -->
            <path d="M18 4L31 18L18 32L5 18L18 4Z" fill="url(#enemyDroneGrad)" stroke="#EA5455" stroke-width="1.8" stroke-linejoin="round"/>
            
            <!-- Sensor laser central carmesim com glow -->
            <g filter="url(#enemySensorGlow)">
                <circle cx="18" cy="18" r="6" fill="#1E232D" stroke="#EA5455" stroke-width="1.5"/>
                <circle cx="18" cy="18" r="3.5" fill="#EA5455"/>
                <circle cx="17" cy="17" r="1" fill="#ffffff"/>
            </g>
        </svg>
    `
};
