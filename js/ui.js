// === UI uniquement - pas de logique de jeu ===

const dropdown = document.getElementById('color-dropdown');
let activeSlot = null;

// Ouvrir le menu deroulant quand on clique sur un rond de la ligne active
document.querySelectorAll('.row.active .guess-slot').forEach(slot => {
  slot.addEventListener('click', (e) => {
    e.stopPropagation();
    activeSlot = slot;

    // Positionner le dropdown a cote du rond
    const rect = slot.getBoundingClientRect();
    dropdown.style.left = (rect.right + 8) + 'px';
    dropdown.style.top = rect.top + 'px';
    dropdown.classList.remove('hidden');
  });
});

// Choisir une couleur dans le dropdown
document.querySelectorAll('.dropdown-option').forEach(option => {
  option.addEventListener('click', (e) => {
    e.stopPropagation();
    if (activeSlot) {
      const color = option.dataset.color;
      // Enlever les anciennes couleurs
      activeSlot.className = 'guess-slot';
      // Ajouter la nouvelle couleur
      activeSlot.classList.add('color-' + color);
    }
    dropdown.classList.add('hidden');
    activeSlot = null;
  });
});

// Fermer le dropdown si on clique ailleurs
document.addEventListener('click', () => {
  dropdown.classList.add('hidden');
  activeSlot = null;
});

// === Toggle light/dark mode ===
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  // Soleil blanc en dark mode, noir en light mode
  if (document.body.classList.contains('light')) {
    themeToggle.textContent = '☀';
  } else {
    themeToggle.textContent = '☀';
  }
});

// === Demo : montrer/cacher le rideau ===
// Pour tester : ouvrir la console et taper showCurtain() ou hideCurtain()
function showCurtain() {
  document.getElementById('curtain').classList.remove('hidden');
}

function hideCurtain() {
  document.getElementById('curtain').classList.add('hidden');
}
