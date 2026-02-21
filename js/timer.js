// === Timers du jeu ===

let gameTimerInterval = null;
let gameSeconds = 0;
const ROUND_TIME = 40; // 40 secondes par ligne

// Callback quand le temps est ecoule
let _timerCallback = null;

// Compte a rebours 3, 2, 1 sur le rideau (juste au dessus des ronds secrets)
function startCountdown(onFinished) {
  const curtain = document.getElementById('curtain');
  const curtainTimer = curtain.querySelector('.curtain-timer');

  curtain.classList.remove('hidden');
  curtainTimer.textContent = '3';

  let count = 3;
  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      curtainTimer.textContent = count;
    } else {
      clearInterval(interval);
      curtainTimer.textContent = 'GO!';
      setTimeout(() => {
        curtain.classList.add('hidden');
        onFinished();
      }, 500);
    }
  }, 1000);
}

// Timer du jeu (compte a rebours de 60 secondes)
function startRoundTimer(callback) {
  gameSeconds = ROUND_TIME;
  _timerCallback = callback;
  updateTimerDisplay();
  gameTimerInterval = setInterval(() => {
    gameSeconds--;
    updateTimerDisplay();
    if (gameSeconds <= 0) {
      clearInterval(gameTimerInterval);
      gameTimerInterval = null;
      if (_timerCallback) _timerCallback();
    }
  }, 1000);
}

function stopRoundTimer() {
  clearInterval(gameTimerInterval);
  gameTimerInterval = null;
  _timerCallback = null;
}

function resetRoundTimer(callback) {
  stopRoundTimer();
  startRoundTimer(callback);
}

function updateTimerDisplay() {
  const minutes = String(Math.floor(gameSeconds / 60)).padStart(2, '0');
  const seconds = String(gameSeconds % 60).padStart(2, '0');
  const timerEl = document.getElementById('game-timer');
  timerEl.textContent = '⏱ ' + minutes + ':' + seconds;

  // Rouge clignotant quand il reste moins de 10 secondes
  if (gameSeconds <= 10 && gameSeconds > 0) {
    timerEl.classList.add('warning');
  } else {
    timerEl.classList.remove('warning');
  }
}
