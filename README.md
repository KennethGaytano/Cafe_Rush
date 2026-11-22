# Cafe Rush

[Play Cafe Rush](https://kennethgaytano.github.io/Cafe_Rush/)

Cafe Rush is a browser-based cafe time-management game built with plain HTML,
CSS, and JavaScript. Serve the requested drink before the customer's patience
runs out. The game has four recipes, three customer types, a 90-second shift,
and locally saved sound preferences and high score.

## Run the game locally

No package installation or build step is required.

1. Open a terminal in the project folder.
2. Run `python -m http.server 8000`.
3. Visit `http://localhost:8000` in a browser.

You can also open `index.html` directly, but a local web server gives browser
storage and asset loading a more consistent environment.

## Project structure

```text
Cafe_Rush/
├── index.html                    # Game screens and accessible controls
├── styles/
│   ├── main.css                  # Imports stylesheets in cascade order
│   ├── base.css                  # Theme tokens and document defaults
│   ├── components.css            # Buttons and shared controls
│   ├── menu.css                  # Main menu
│   ├── guide.css                 # How-to-play screen
│   ├── dialogs.css               # Pause, settings, scores, and game-over screens
│   ├── gameplay.css              # HUD, customer area, and workstation
│   ├── responsive.css             # Tablet and phone layouts
│   └── intro.css                 # Opening screen and reduced-motion behavior
├── scripts/
│   ├── game.js                   # ES-module entry point
│   ├── config/constants.js       # Recipes, customer types, and game tuning
│   ├── core/                     # Shared DOM references, state, and intro
│   ├── systems/                  # Audio, settings, customers, orders, timing, scoring
│   └── ui/                       # Screen actions and event listeners
├── README.md                     # Setup and project guide
├── PROJECT_PROGRESS.md           # Implementation checklist and handoff notes
├── cafe_rush_game_design_document.md
└── assets/
    ├── background/               # Menu and gameplay cafe backdrops
    ├── customers/                # Student, worker, and regular portraits
    ├── drinks/                   # Drink illustrations
    ├── effects/                  # Correct, incorrect, leaving, and coin feedback
    ├── ingredients/              # Ingredient illustrations
    ├── sounds/                   # Available music and sound effects
    └── ui/                       # Logo, favicon variants, lives, and interface art
```

The app is intentionally organized as a small static website: `index.html`
provides the screens, `styles/main.css` loads focused stylesheets, and
`scripts/game.js` starts the ES-module game. Shared state and DOM references
live under `scripts/core/`; gameplay systems and UI interactions are grouped
under their respective folders. Runtime images and sounds remain under
`assets/` by purpose. Browser icon alternatives are included for different
browsers and devices.

## Quick checks

- Check the module entry syntax with `node --check scripts/game.js`.
- Use `PROJECT_PROGRESS.md` for implemented features, known gaps, and manual
  browser verification notes.
