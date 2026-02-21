// === Menu principal ===

let currentLang = 'fr';

// === Bouton Jouer ===
document.getElementById('btn-play').addEventListener('click', () => {
  document.getElementById('menu').classList.add('hidden');
  document.querySelector('.game-container').classList.remove('hidden');
  startGame();
});

// === Ouvrir les modals ===
document.getElementById('btn-rules').addEventListener('click', () => {
  document.getElementById('modal-rules').classList.remove('hidden');
});

document.getElementById('btn-settings').addEventListener('click', () => {
  document.getElementById('modal-settings').classList.remove('hidden');
});

document.getElementById('btn-info').addEventListener('click', () => {
  document.getElementById('modal-info').classList.remove('hidden');
});

// === Fermer les modals ===
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.modal').classList.add('hidden');
  });
});

// Fermer en cliquant sur le fond
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
});

// === Changement de langue ===
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentLang = btn.dataset.lang;
    updateLanguage();
  });
});

function updateLanguage() {
  document.querySelectorAll('[data-' + currentLang + ']').forEach(el => {
    el.textContent = el.getAttribute('data-' + currentLang);
  });
}

// === Reglages ===
let settingTime = 40;
let settingLines = 10;
let settingColors = 5;

document.querySelectorAll('.setting-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const setting = btn.dataset.setting;
    const action = btn.dataset.action;

    if (setting === 'time') {
      if (action === 'plus' && settingTime < 70) settingTime += 5;
      if (action === 'minus' && settingTime > 5) settingTime -= 5;
      document.getElementById('setting-time').textContent = settingTime + 's';
    }

    if (setting === 'lines') {
      if (action === 'plus' && settingLines < 20) settingLines++;
      if (action === 'minus' && settingLines > 4) settingLines--;
      document.getElementById('setting-lines').textContent = settingLines;
    }

    if (setting === 'colors') {
      if (action === 'plus' && settingColors < 8) settingColors++;
      if (action === 'minus' && settingColors > 3) settingColors--;
      document.getElementById('setting-colors').textContent = settingColors;
    }
  });
});

// === Theme toggle du menu ===
document.getElementById('menu-theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('light');
});
