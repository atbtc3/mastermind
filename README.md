# Mastermind

> **Early Alpha** — This project is still in early development. Features may change or break.

**Author:** Viki

A digital version of the classic board game [Mastermind](https://en.wikipedia.org/wiki/Mastermind_(board_game)), built with vanilla HTML, CSS, and JavaScript.

## How to Play

1. The robot picks a secret combination of **4 colors** (from 5 available)
2. Click on the circles to choose your colors, then press **Go**
3. After each guess, feedback dots appear:
   - **Gold** — right color, right position
   - **Cyan** — right color, wrong position
4. You have **10 tries** and a countdown timer per line to find the secret combination

## Features

- Dark and light mode
- Configurable timer (10–70 seconds per line)
- Reset button to restart without leaving the game
- Main menu with Rules, Settings, and Info

## Run Locally

No build step required. Just open `index.html` in a browser, or serve with any static file server:

```bash
npx serve .
```

## Deploy

The project is designed for static hosting on [GitHub Pages](https://pages.github.com/). Push to the `main` branch and enable Pages in the repository settings.

## Tech Stack

- HTML / CSS / JavaScript (no frameworks, no dependencies)
