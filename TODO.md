# TODO

## Features
- [ ] Connect "Number of lines" setting to game logic (currently saved in menu.js but MAX_TRIES in game.js stays at 10)
- [ ] Connect "Number of colors" setting to game logic (currently saved in menu.js but COLORS array in game.js stays at 5)
- [ ] Implement score system (score display exists but always shows 0)
- [ ] Robot opponent mode (player creates a combination, robot tries to guess)
- [ ] Sound effects / voice countdown

- [ ] Add multi-language support (FR/EN) with language switch in menu

## Testing
- [ ] Set up Vitest for unit tests
- [ ] Write tests for game.js (generateSecret, compareGuess, isWin)
- [ ] Write tests for timer.js

## Cleanup
- [ ] Remove unused startCountdown() function in timer.js
- [ ] Remove unused curtain HTML element and CSS
- [ ] Remove unused CSS for .lang-switch, .lang-btn, .lang-sep, .color-palette, .palette-shortcuts
