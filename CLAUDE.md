# Mastermind Game

## Project Overview
A digital version of the classic board game **Mastermind**, built with vanilla HTML/CSS/JS for static hosting on GitHub Pages. No frameworks, no build step.

## Tech Stack
- **HTML/CSS/JS** (vanilla, no dependencies)
- **Vitest** planned for unit testing (not yet set up)
- Hosted on **GitHub Pages** (static files only)

## File Structure
- `index.html` — Main HTML: menu screen, 3 modals (Rules, Settings, Info), game board with 10 rows of 4 guess slots
- `css/style.css` — All styles: menu, modals, game board, light/dark mode, responsive
- `js/game.js` — Core game logic: `generateSecret()`, `compareGuess()`, `isWin()`
- `js/timer.js` — Countdown timer per round, display updates, warning animation under 10s
- `js/ui.js` — UI controller: game flow, dropdown, Go/Replay button, home/reset buttons, theme toggle
- `js/menu.js` — Menu logic: Play button, modals, settings (time/lines/colors), theme toggle

## Game Rules
- The robot picks a secret combination of 4 colors (from 5 available, duplicates allowed)
- Player has 10 tries to guess it
- Each line has a countdown timer (default 40s, configurable 10-70s in settings)
- Feedback dots: **gold** = right color right position, **diamond/cyan** = right color wrong position
- Win/lose messages with Replay option

## Key Architecture Decisions
- All JS files share the global scope via separate `<script>` tags (no modules)
- Light/dark mode uses `body.light` class prefix — **CSS specificity matters**: color classes on elements (e.g. `.guess-slot.color-red`) must also have `body.light` variants to avoid being overridden
- Constants in `js/game.js`: `COLORS`, `COMBO_LENGTH = 4`, `MAX_TRIES = 10`
- `ROUND_TIME` in `js/timer.js` is `let` (not `const`) so settings can update it

## Language
- Interface is **English only**

## Common Pitfalls
- When adding new colored elements, always add both dark and light mode styles (`body.light .your-class`)
- Variable names in different JS files must not conflict (they share global scope)
- Feedback dot colors: dark mode uses bright/neon, light mode uses vivid but slightly deeper variants

