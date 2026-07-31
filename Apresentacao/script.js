/* ============================================================
   KeyCode — Apresentação Web | Navegação & Animações
   ============================================================ */

(function () {
  'use strict';

  // ——— State ———
  let currentSlide = 0;
  const totalSlides = 8;
  const slides = document.querySelectorAll('.slide');
  const progressBar = document.getElementById('progressBar');
  const slideNum = document.getElementById('slideNum');
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');

  // Track which slide animations have already played
  const animatedSlides = new Set();

  // ——— Navigation ———
  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;

    const prevSlide = slides[currentSlide];
    const nextSlide = slides[index];
    const goingForward = index > currentSlide;

    // Remove classes from previous slide
    prevSlide.classList.remove('active', 'prev');
    if (goingForward) {
      prevSlide.classList.add('prev');
    } else {
      prevSlide.style.transform = 'translateX(60px)';
    }

    // Activate next slide
    nextSlide.classList.remove('prev');
    nextSlide.style.transform = '';
    if (!goingForward) {
      nextSlide.classList.add('prev');
      // Force reflow for transition
      void nextSlide.offsetWidth;
      nextSlide.classList.remove('prev');
    }
    nextSlide.classList.add('active');

    currentSlide = index;

    // Update UI
    progressBar.style.width = ((currentSlide + 1) / totalSlides * 100) + '%';
    slideNum.textContent = String(currentSlide + 1).padStart(2, '0');
    btnPrev.disabled = currentSlide === 0;
    btnNext.disabled = currentSlide === totalSlides - 1;

    // Trigger animations for the new slide
    triggerSlideAnimations(currentSlide);
  }

  btnPrev.addEventListener('click', () => goToSlide(currentSlide - 1));
  btnNext.addEventListener('click', () => goToSlide(currentSlide + 1));

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      goToSlide(currentSlide + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToSlide(currentSlide - 1);
    }
  });

  // Touch swipe
  let touchStartX = 0;
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goToSlide(currentSlide + 1);
      else goToSlide(currentSlide - 1);
    }
  }, { passive: true });

  // ——— Animation Dispatcher ———
  function triggerSlideAnimations(index) {
    if (animatedSlides.has(index)) return;
    animatedSlides.add(index);

    switch (index) {
      case 0: animateTerminal(); break;
      case 1: animateCards('#slide-2 .info-card'); break;
      case 2: animateSplitScreen(); break;
      case 3: animateCards('#slide-4 .tech-card'); break;
      case 4: animateTimeline(); break;
      case 5: animateProfiles(); break;
      case 6: animateDashboards(); break;
      case 7: animateQuote(); break;
    }
  }

  // ——— SLIDE 1 — Terminal Typing ———
  function animateTerminal() {
    const lines = [
      document.getElementById('tl-1'),
      document.getElementById('tl-2'),
      document.getElementById('tl-3'),
      document.getElementById('tl-4')
    ];
    const cursor = document.getElementById('terminalCursor');

    // Hide cursor initially, we'll move it per line
    cursor.style.display = 'none';

    lines.forEach((line, i) => {
      setTimeout(() => {
        line.classList.add('visible');
        line.style.animation = 'fadeSlideIn 0.4s ease forwards';

        if (i === lines.length - 1) {
          setTimeout(() => {
            cursor.style.display = 'inline-block';
          }, 300);
        }
      }, 600 + i * 700);
    });
  }

  // ——— Shared: Animate Cards ———
  function animateCards(selector) {
    const cards = document.querySelectorAll(selector);
    cards.forEach((card, i) => {
      const delay = parseInt(card.dataset.delay || 0);
      setTimeout(() => {
        card.classList.add('animate-in');
      }, 300 + delay);
    });
  }

  // ——— SLIDE 3 — Split Screen ———
  function animateSplitScreen() {
    const lines = [
      document.getElementById('el-1'),
      document.getElementById('el-2'),
      document.getElementById('el-3')
    ];

    // Typing animation for editor lines
    lines.forEach((line, i) => {
      setTimeout(() => {
        line.classList.add('visible');
        line.style.animation = 'fadeSlideIn 0.4s ease forwards';
      }, 500 + i * 800);
    });

    // Build the game grid
    buildGrid();

    // Animate robot after code is typed
    setTimeout(() => {
      animateRobot();
    }, 500 + lines.length * 800 + 400);
  }

  // Grid configuration
  const GRID_SIZE = 5;
  const walls = [
    [1, 1], [1, 2], [3, 1], [3, 3], [2, 3]
  ];
  const starPos = { row: 0, col: 4 };
  let robotPos = { row: 0, col: 0 };
  let robotDir = 0; // 0=right, 1=down, 2=left, 3=up

  function buildGrid() {
    const grid = document.getElementById('gameGrid');
    grid.innerHTML = '';

    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.id = `cell-${r}-${c}`;

        // Check if wall
        if (walls.some(([wr, wc]) => wr === r && wc === c)) {
          cell.classList.add('wall');
        }

        // Star
        if (r === starPos.row && c === starPos.col) {
          cell.innerHTML = '<span class="star-icon">⭐</span>';
        }

        grid.appendChild(cell);
      }
    }

    // Place robot at starting position
    placeRobot(0, 0);
  }

  function placeRobot(row, col) {
    // Remove existing robot
    const existing = document.querySelector('.robot');
    if (existing) existing.remove();

    const cell = document.getElementById(`cell-${row}-${col}`);
    if (!cell) return;

    const robot = document.createElement('div');
    robot.classList.add('robot');
    robot.textContent = '🤖';
    cell.appendChild(robot);
    robotPos = { row, col };
  }

  function animateRobot() {
    // Sequence: mover(4) → right 4 cells, virarDireita (no-op visually since already at edge concept), mover() → 1 cell
    // Adjusted for 5×5: start at (0,0), move right 4 to (0,4)
    const moves = [
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 0, col: 3 },
      { row: 0, col: 4 }
    ];

    moves.forEach((pos, i) => {
      setTimeout(() => {
        placeRobot(pos.row, pos.col);

        // If reached star
        if (pos.row === starPos.row && pos.col === starPos.col) {
          const robot = document.querySelector('.robot');
          if (robot) {
            robot.style.boxShadow = '0 0 30px rgba(255, 193, 7, 0.6)';
            robot.style.background = 'linear-gradient(135deg, var(--brand-cyan), var(--accent-yellow))';
          }
        }
      }, i * 500);
    });
  }

  // ——— SLIDE 5 — Timeline ———
  function animateTimeline() {
    const items = document.querySelectorAll('#timeline .timeline-item');
    const fill = document.getElementById('timelineFill');
    const total = document.getElementById('hoursTotal');

    items.forEach((item, i) => {
      const delay = parseInt(item.dataset.delay || 0);
      setTimeout(() => {
        item.classList.add('animate-in');
      }, 300 + delay);
    });

    // Fill the line (2 of 5 done = 40%)
    setTimeout(() => {
      fill.style.height = '40%';
    }, 400);

    // Show total
    setTimeout(() => {
      total.classList.add('animate-in');
    }, 1200);
  }

  // ——— SLIDE 6 — Profiles + Architecture ———
  function animateProfiles() {
    const cards = document.querySelectorAll('#slide-6 .profile-card');
    cards.forEach((card, i) => {
      const delay = parseInt(card.dataset.delay || 0);
      setTimeout(() => {
        card.classList.add('animate-in');
      }, 300 + delay);
    });

    // Architecture diagram
    setTimeout(() => {
      document.getElementById('archDiagram').classList.add('animate-in');
    }, 700);
  }

  // ——— SLIDE 7 — Dashboards ———
  function animateDashboards() {
    const cards = document.querySelectorAll('#slide-7 .dashboard-card');
    const circumference = 314.16; // 2 * PI * 50

    cards.forEach((card, i) => {
      const delay = parseInt(card.dataset.delay || 0);

      setTimeout(() => {
        card.classList.add('animate-in');

        const value = parseInt(card.dataset.value);
        const suffix = card.dataset.suffix || '';
        const prefix = card.dataset.prefix || '';
        const ringId = `ring-${i + 1}`;
        const dvId = `dv-${i + 1}`;
        const ring = document.getElementById(ringId);
        const dv = document.getElementById(dvId);

        if (value > 0) {
          // Animate ring
          const offset = circumference - (value / 100) * circumference;
          setTimeout(() => {
            ring.style.strokeDashoffset = offset;
          }, 100);

          // Animate counter
          animateCounter(dv, 0, value, 1200, prefix, suffix);
        } else {
          // TMF special case — animate ring to ~65%
          setTimeout(() => {
            ring.style.strokeDashoffset = circumference * 0.35;
          }, 100);
        }
      }, 400 + delay);
    });
  }

  function animateCounter(element, start, end, duration, prefix, suffix) {
    const startTime = performance.now();
    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);
      element.textContent = prefix + current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // ——— SLIDE 8 — Quote ———
  function animateQuote() {
    setTimeout(() => {
      document.getElementById('quoteBlock').classList.add('animate-in');
    }, 300);
  }

  // ——— CSS Keyframes injection ———
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeSlideIn {
      from {
        opacity: 0;
        transform: translateY(12px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);

  // ——— Initial Animation (Slide 1) ———
  triggerSlideAnimations(0);

})();
