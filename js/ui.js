// === UI - Connecte tout ensemble ===

let secret = [];
let currentRow = 1;
let gameOver = false;

const dropdown = document.getElementById('color-dropdown');
const btnGo = document.querySelector('.btn-go');
let activeSlot = null;

// === Demarrer une nouvelle partie ===
function startGame() {
  gameOver = false;
  currentRow = 1;

  // Remettre le bouton Go normal
  btnGo.textContent = 'Go';
  btnGo.classList.remove('replay');

  // Reinitialiser la grille
  document.querySelectorAll('.row').forEach(row => {
    row.classList.remove('active', 'played');
    row.querySelector('.row-indicator').textContent = '';
    row.querySelectorAll('.guess-slot').forEach(slot => {
      slot.className = 'guess-slot';
    });
    row.querySelectorAll('.feedback-dot').forEach(dot => {
      dot.className = 'feedback-dot';
    });
  });

  // Activer la premiere ligne
  const firstRow = document.querySelector('[data-row="1"]');
  firstRow.classList.add('active');
  firstRow.querySelector('.row-indicator').textContent = '▶';

  // Cacher la combinaison secrete
  document.querySelectorAll('.secret-slot').forEach(slot => {
    slot.textContent = '?';
    slot.className = 'secret-slot';
  });

  // Cacher le message
  const msg = document.getElementById('game-message');
  msg.className = 'game-message hidden';
  msg.innerHTML = '';

  // Le robot choisit sa combinaison + compte a rebours 3, 2, 1
  secret = generateSecret();

  startCountdown(() => {
    startRoundTimer(onTimeUp);
  });
}

// === Quand le temps d'une ligne est ecoule (1 minute) ===
function onTimeUp() {
  if (gameOver) return;
  submitCurrentRow();
}

// === Soumettre la ligne actuelle (Go ou temps ecoule) ===
function submitCurrentRow() {
  const row = document.querySelector('[data-row="' + currentRow + '"]');
  const slots = row.querySelectorAll('.guess-slot');

  // Lire les couleurs choisies (les vides comptent comme null)
  const guess = [];
  slots.forEach(slot => {
    const colorClass = Array.from(slot.classList).find(c => c.startsWith('color-'));
    if (colorClass) {
      guess.push(colorClass.replace('color-', ''));
    } else {
      guess.push(null);
    }
  });

  // Comparer avec la combinaison secrete
  const result = compareGuess(secret, guess);

  // Afficher les indices sur les pastilles
  const feedbackDots = row.querySelectorAll('.feedback-dot');
  let dotIndex = 0;

  for (let i = 0; i < result.exact; i++) {
    feedbackDots[dotIndex].classList.add('exact');
    dotIndex++;
  }
  for (let i = 0; i < result.misplaced; i++) {
    feedbackDots[dotIndex].classList.add('misplaced');
    dotIndex++;
  }

  // Marquer la ligne comme jouee
  row.classList.remove('active');
  row.classList.add('played');
  row.querySelector('.row-indicator').textContent = '';

  // Victoire ?
  if (isWin(result)) {
    stopRoundTimer();
    gameOver = true;
    revealSecret();
    showMessage('win', 'Bravo !', 'Trouvé en ' + currentRow + ' essai' + (currentRow > 1 ? 's' : ''));
    showReplay();
    return;
  }

  // Plus d'essais ?
  if (currentRow >= MAX_TRIES) {
    stopRoundTimer();
    gameOver = true;
    revealSecret();
    showMessage('lose', 'Perdu !', '');
    showReplay();
    return;
  }

  // Passer a la ligne suivante + reset timer
  currentRow++;
  const nextRow = document.querySelector('[data-row="' + currentRow + '"]');
  nextRow.classList.add('active');
  nextRow.querySelector('.row-indicator').textContent = '▶';
  resetRoundTimer(onTimeUp);
}

// === Afficher un message victoire/defaite ===
function showMessage(type, text, sub) {
  const msg = document.getElementById('game-message');
  msg.className = 'game-message ' + type;
  msg.innerHTML = text + (sub ? '<div class="sub-message">' + sub + '</div>' : '');
}

// === Passer en mode "Rejouer" ===
function showReplay() {
  btnGo.textContent = 'Rejouer';
  btnGo.classList.add('replay');
}

// === Clic sur un rond de la ligne active ===
document.addEventListener('click', (e) => {
  const slot = e.target.closest('.row.active .guess-slot');
  if (slot && !gameOver) {
    e.stopPropagation();
    activeSlot = slot;

    const rect = slot.getBoundingClientRect();
    dropdown.style.left = (rect.right + 8) + 'px';

    // Si le dropdown risque de sortir en bas, l'ouvrir vers le haut
    const dropdownHeight = 5 * 38; // 5 couleurs * ~38px chacune
    if (rect.bottom + dropdownHeight > window.innerHeight) {
      dropdown.style.top = (rect.bottom - dropdownHeight) + 'px';
    } else {
      dropdown.style.top = rect.top + 'px';
    }

    dropdown.classList.remove('hidden');
    return;
  }

  // Fermer le dropdown si on clique ailleurs
  dropdown.classList.add('hidden');
  activeSlot = null;
});

// === Choisir une couleur dans le dropdown ===
document.querySelectorAll('.dropdown-option').forEach(option => {
  option.addEventListener('click', (e) => {
    e.stopPropagation();
    if (activeSlot) {
      const color = option.dataset.color;
      activeSlot.className = 'guess-slot';
      activeSlot.classList.add('color-' + color);
    }
    dropdown.classList.add('hidden');
    activeSlot = null;
  });
});

// === Bouton Go / Rejouer ===
btnGo.addEventListener('click', () => {
  // Si partie finie, relancer une nouvelle partie
  if (gameOver) {
    startGame();
    return;
  }

  // Verifier que les 4 couleurs sont choisies avant de valider avec Go
  const row = document.querySelector('[data-row="' + currentRow + '"]');
  const slots = row.querySelectorAll('.guess-slot');
  let allFilled = true;
  slots.forEach(slot => {
    if (!Array.from(slot.classList).find(c => c.startsWith('color-'))) {
      allFilled = false;
    }
  });

  if (!allFilled) {
    return; // Ne rien faire si la ligne n'est pas complete
  }

  submitCurrentRow();
});

// === Reveler la combinaison secrete ===
function revealSecret() {
  const secretSlots = document.querySelectorAll('.secret-slot');
  secret.forEach((color, i) => {
    secretSlots[i].textContent = '';
    secretSlots[i].classList.add('color-' + color);
  });
}

// === Bouton maison (retour au menu) ===
document.getElementById('btn-home').addEventListener('click', () => {
  stopRoundTimer();
  gameOver = true;
  document.querySelector('.game-container').classList.add('hidden');
  document.getElementById('menu').classList.remove('hidden');
});

// === Toggle light/dark mode ===
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
});

// Le jeu est lance par le menu (menu.js)
