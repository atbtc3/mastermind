// === Logique du jeu Mastermind ===

const COLORS = ['red', 'blue', 'yellow', 'green', 'purple'];
const COMBO_LENGTH = 4;
const MAX_TRIES = 10;

// Generer une combinaison aleatoire de 4 couleurs (doublons possibles)
function generateSecret() {
  const secret = [];
  for (let i = 0; i < COMBO_LENGTH; i++) {
    const randomIndex = Math.floor(Math.random() * COLORS.length);
    secret.push(COLORS[randomIndex]);
  }
  return secret;
}

// Comparer une tentative avec la combinaison secrete
// Retourne { exact: N, misplaced: N }
function compareGuess(secret, guess) {
  let exact = 0;
  let misplaced = 0;

  // Copier les tableaux pour ne pas les modifier
  const secretCopy = [...secret];
  const guessCopy = [...guess];

  // Premier passage : trouver les exacts (bonne couleur, bon endroit)
  for (let i = 0; i < COMBO_LENGTH; i++) {
    if (guessCopy[i] !== null && guessCopy[i] === secretCopy[i]) {
      exact++;
      secretCopy[i] = null;
      guessCopy[i] = null;
    }
  }

  // Deuxieme passage : trouver les mal places (bonne couleur, mauvais endroit)
  for (let i = 0; i < COMBO_LENGTH; i++) {
    if (guessCopy[i] === null) continue;
    const index = secretCopy.indexOf(guessCopy[i]);
    if (index !== -1) {
      misplaced++;
      secretCopy[index] = null;
    }
  }

  return { exact, misplaced };
}

// Verifier si le joueur a gagne
function isWin(result) {
  return result.exact === COMBO_LENGTH;
}
