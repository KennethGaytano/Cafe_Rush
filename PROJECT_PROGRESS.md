# Cafe Rush project progress

This is the project handoff and checklist for future work. Update it whenever code or assets change so another contributor can see what is implemented, what is provisional, and what remains.

## Project summary

Cafe Rush is a cozy pixel-art cafe time-management game for desktop browsers. It currently uses plain HTML, CSS, and JavaScript with local PNG assets. Development follows the Cafe Rush Game Design Document one part at a time.

## Part 2: Main Screens and Interface

### Main Menu

- [x] Show the Cafe Rush logo over the cafe background.
- [x] Provide a Start your shift button.
- [x] Provide a How to Play button.
- [x] Show the saved High Score.
- [x] Provide a persistent sound on/off setting.

### How to Play

- [x] Explain how to read a customer's order.
- [x] Explain ingredient selection.
- [x] Explain preparing and serving.
- [x] Show an illustrated Iced Latte sample order.

### Gameplay Screen

- [x] Show timer, score, tips, served count, and lives.
- [x] Show the customer, their order, and a patience bar.
- [x] Provide ingredient buttons, a preparation tray, and Prepare/Serve controls.
- [x] Provide Pause, sound setting, and combo display.
- [x] Decrease customer patience during play and pause the timer while paused.
- [x] Award points and tips for correct orders and increase combo.
- [x] Deduct points, lose a life, and reset combo for wrong/missed orders.
- [x] Stop the shift when time or lives run out.
- [ ] Add customer/recipe rotation and difficulty behavior from later design sections.

### Current prototype rules

These values make the current gameplay testable. Verify or replace them against the scoring rules in the Game Design Document before treating balance as final:

- Shift duration: 90 seconds.
- Patience per customer: 30 seconds.
- Correct Iced Latte (espresso + milk + ice only): +100 points, +$5, one customer served, and +1 combo.
- Wrong recipe or expired patience: lose one of 3 lives, subtract 25 points (score cannot go below zero), and reset combo.
- Correct/missed order resets patience for the next order. The current build repeats the Iced Latte.

### Pause Screen

- [x] Provide Resume, Restart, and Main Menu buttons.
- [x] Pause/resume the shift and patience timers.
- [x] Allow Escape to resume.
- [x] Provide a sound toggle synchronized with the menu and gameplay settings.

### Game Over Screen

- [x] Show final score and customers served.
- [x] Show correct/wrong orders and best combo.
- [x] Indicate a new high score.
- [x] Save the high score in browser local storage and show it on the menu.
- [x] Provide Play Again and Main Menu buttons.

Note: sound preference is persisted and synchronized between screens, but actual sound effects have not been added.

## Verification

- [x] Browser-tested correct orders: score, tips, served count, combo, and best combo update.
- [x] Browser-tested wrong orders: score penalty, lost lives, and combo reset.
- [x] Browser-tested patience countdown, patience timeout, and pause/resume.
- [x] Browser-tested zero-lives Game Over and disabled gameplay controls.
- [x] Browser-tested time-expiration Game Over.
- [x] Browser-tested Game Over summary, high-score save, and persistence across reload.
- [x] Browser-tested High Scores and sound setting controls.
- [x] Browser-tested Play Again, Main Menu, and mobile layout without horizontal overflow.
- [x] `node --check script.js` passes.

There is no automated test suite in the project yet.

## Other Project Work

- [x] Minimum customer, UI, and gameplay-effect PNGs exist under `assets/`.
- [x] Student, worker, and regular customer sprites have distinct clothing/accessories.
- [ ] Wire remaining artwork and animations into gameplay where appropriate.

## Suggested Next Steps

1. Verify prototype score, tip, patience, and penalty values against the Game Design Document.
2. Continue through Parts 3-8 of the design document.
3. Add actual sound effects if desired; current sound control stores the on/off preference only.

## Current Files

- `index.html`: screen markup.
- `style.css`: responsive visual styling.
- `script.js`: navigation, timers, ingredient selection, prototype scoring, persistence, and game-over behavior.
- `assets/`: game art and sprites.
- `MISSING.md`: status of the originally requested minimum assets.
- `PROJECT_PROGRESS.md`: this project handoff and checklist.
