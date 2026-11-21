# Cafe Rush project progress

This file is the handoff and checklist for future work on Cafe Rush. Update it whenever project code or assets change so another contributor can see what is implemented, what is provisional, and what remains.

## Project summary

Cafe Rush is a cozy, pixel-art cafe time-management game for desktop browsers. The current project uses plain HTML, CSS, and JavaScript with local PNG assets. The game is being developed one section of the Game Design Document at a time.

## Part 2: Main Screens and Interface

### Main menu

- [x] Show the Cafe Rush logo over the cafe background.
- [x] Provide a Start your shift button.
- [x] Provide a How to play button.
- [ ] Add High Scores and a menu sound setting.

### How to Play

- [x] Explain how to read a customer's order.
- [x] Explain ingredient selection.
- [x] Explain preparing and serving.
- [x] Show an illustrated Iced Latte recipe.

### Gameplay screen

- [x] Show timer, score, tips, served count, and lives.
- [x] Show the current customer, drink order, and patience bar.
- [x] Show ingredient buttons, preparation tray, Prepare, and Serve controls.
- [x] Show sound toggle, Pause, and combo.
- [x] Decrease the customer's patience while the shift is running.
- [x] Stop both the shift and patience countdown while paused.
- [x] Award points and tips for correctly serving the Iced Latte recipe.
- [x] Reset the combo and lose a life for a wrong or missed order.
- [x] End the shift when time or lives run out.
- [ ] Add the complete customer/recipe rotation and difficulty behavior from later design sections.

### Current prototype rules

The numeric values below make the current gameplay controls testable. Treat them as prototype defaults and verify or replace them against Section 6 of the Game Design Document before calling the scoring balance final:

- Shift duration: 90 seconds.
- Each customer has 30 seconds of patience.
- A correct Iced Latte (espresso + milk + ice, with no extras) adds 100 points, $5 in tips, one served customer, and one combo.
- A wrong recipe or expired patience removes one of the three lives, subtracts 25 points (score cannot go below zero), and resets the combo.
- A correct or missed order resets patience for the next order. The current build repeats the Iced Latte order.

### Verification

- [x] Browser-tested a correct order: score, tips, served count, and combo update.
- [x] Browser-tested a wrong order: score is reduced without going below zero, one life is removed, and combo resets.
- [x] Browser-tested patience countdown and a missed order.
- [x] Browser-tested pause: both the shift timer and patience stay unchanged while paused.
- [x] Browser-tested that losing all lives stops the shift and disables gameplay controls.
- [x] `node --check script.js` passes.

There is no automated test suite in the project yet.

### Pause screen

- [x] Resume, Restart, and Main Menu buttons.
- [x] Pause and resume the shift and patience timers.
- [x] Escape resumes the shift.
- [ ] Add a pause-menu sound toggle.

### Game Over screen

- [ ] Show final score and customers served.
- [ ] Show correct/wrong orders and best combo.
- [ ] Indicate whether the player earned a new high score.
- [ ] Provide Play Again and Main Menu.

## Earlier project assets

- [x] Minimum asset PNGs exist under `assets/` for customers, UI, and effects.
- [x] Student, worker, and regular customer images have distinct clothing/accessories.
- [ ] Wire the remaining assets and animations into gameplay where appropriate.

## Suggested next steps

1. Implement the remaining Part 2 screens (especially Game Over) and keep this checklist updated.
2. Continue through Parts 3-8 of the Game Design Document in order.
3. Revisit prototype point, tip, patience, and penalty values against the relevant design-document sections.

## Current files

- `index.html`: screen markup.
- `style.css`: responsive visual styling.
- `script.js`: screen navigation, timers, ingredient selection, prototype scoring, and pause behavior.
- `assets/`: game art and sprites.
- `MISSING.md`: status of the originally requested minimum assets.
