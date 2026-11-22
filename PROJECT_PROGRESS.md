# Cafe Rush project progress

This is the project handoff and checklist for future work. Update it when project code, assets, or design-document parts change. Mark work complete only after it has been implemented or reviewed.

## Project summary

Cafe Rush is a cozy pixel-art cafe time-management game for desktop browsers. The current app uses HTML, CSS, and JavaScript with local PNG assets. This file tracks progress against the eight parts of the Cafe Rush Game Design Document.

## Part status at a glance

| Part | Topic | Status |
|---|---|---|
| 1 | Game Overview and Design Direction | Implemented |
| 2 | Main Screens and Interface | Implemented |
| 3 | Core Gameplay Loop, Drink Menu, and Recipes | Partially implemented |
| 4 | Customer System and Patience | Implemented |
| 5 | Scoring and Rewards | Implemented |
| 6 | Round Rules and Difficulty | Basic round timer/lives implemented; difficulty incomplete |
| 7 | Technical Architecture and Data Design | Partially implemented |
| 8 | Roadmap, Scope, and Summary | Not started |

## Part 1: Game Overview and Design Direction — Reviewed

- [x] Discussed the game concept, arcade/time-management loop, visual direction, and beginner-friendly first steps.
- [x] Confirmed the implementation against the Game Design Document (`Game_Design/Cafe_Rush_Game_Design_Document.pdf`):
  - Cafe time-management arcade loop: serve drinks before customer patience expires.
  - Pixel-art visual direction with `image-rendering: pixelated` on all sprites.
  - 90-second shift timer, 3 starting lives, 30-second customer patience.
  - Four drink recipes: Americano, Cappuccino, Iced Latte, Mocha.
  - Scoring: +100 points, +$5 tip, +1 combo per correct order; -25 points, -1 life, combo reset for wrong/missed orders.
  - localStorage persistence for high score and sound preference.
- [x] Recorded final visual/design decisions made during implementation:
  - Theme color: #3b241b (dark coffee brown).
  - Pixel-art aesthetic with nearest-neighbor image scaling.
  - Customer types: student, worker, regular (distinct clothing/accessories).
  - Drink images under `assets/drinks/`; ingredients under `assets/ingredients/`.
  - Effect overlays for correct order, wrong order, customer leaving, and coin reward.
  - Responsive layout with mobile breakpoint adjustments.
  - Game screens: Main Menu, How to Play, Gameplay, Pause dialog, High Scores dialog, Game Over.

## Part 2: Main Screens and Interface — Implemented

### Main Menu

- [x] Show the Cafe Rush logo over the cafe background.
- [x] Provide Start your shift and How to Play buttons.
- [x] Show the saved high score.
- [x] Provide a persistent sound on/off setting.

### How to Play

- [x] Explain how to read an order, choose ingredients, prepare, and serve.
- [x] Show illustrated recipes for Americano, Cappuccino, Iced Latte, and Mocha.

### Gameplay

- [x] Show timer, score, tips, served count, and lives.
- [x] Show a customer, their order, and a patience bar.
- [x] Provide ingredient buttons, preparation tray, Prepare, and Serve controls.
- [x] Provide Pause, sound setting, and combo display.
- [x] Decrease patience while playing and pause countdowns while paused.

### Pause and Game Over

- [x] Pause screen provides Resume, Restart, Main Menu, and synchronized sound setting.
- [x] Escape resumes the shift.
- [x] Game Over shows score, served/correct/wrong counts, best combo, and new-record feedback.
- [x] Save the high score in browser local storage.
- [x] Provide Play Again and Main Menu buttons.

- [x] Browser-tested screen navigation, pause/restart, Game Over from timeout and lost lives, score persistence, and mobile layout.

## Part 3: Core Gameplay Loop, Drink Menu, and Recipes — Partially implemented

- [x] Let the player select ingredients, prepare a drink, and serve it.
- [x] Validate exact ingredient sets for four drinks against the Game Design Document:
  - Americano: espresso + water
  - Cappuccino: espresso + milk foam
  - Iced Latte: espresso + milk + ice
  - Mocha: espresso + milk + chocolate
- [x] Randomly select a drink order for a customer.
- [x] Add effects/animations for preparing, correct orders, and incorrect orders.
- [x] Verify every drink recipe against the complete design document.

## Part 4: Customer System and Patience — Implemented

- [x] Display the student customer, order, and patience bar.
- [x] Count down patience during play and reset it for a new order.
- [x] Lose a life when patience expires.
- [x] Use student, worker, and regular customer types during a shift.
  - Student: normal patience (30s), standard tip ($5)
  - Worker: shorter patience (20s), standard tip ($5)
  - Regular: normal patience (30s), bonus tip ($7, 1.5× multiplier)
- [x] Implement customer-specific behaviors or patience differences from the design.
  - Each customer type has distinct patience duration and tip multiplier
  - Customer sprite changes based on type (student/worker/regular portraits)
  - Patience bar percentage calculated against type-specific max patience
- [x] Advance to a different customer and a new random drink after each completed order, with no consecutive repeat customer type.
- [x] Verify customer arrival/rotation rules against the complete section.

## Part 5: Scoring and Rewards — Implemented; verified against Game Design Document

- [x] Award points and tips for correct orders.
  - Correct order: +100 points (matches GDD Section 6)
  - Fast service bonus: +50 points when served within 50% of patience time
  - Combo reward: +25 points × current combo level
  - Tip: $5 base, varies by customer type (Regular: $7 with 1.5× multiplier)
- [x] Track served, correct, and incorrect orders, current combo, and best combo.
- [x] Deduct points, lose a life, and reset combo for wrong/missed orders.
  - Wrong preparation: −30 points (matches GDD Section 6)
  - Customer leaves (patience expired): −20 points + lose one life (matches GDD Section 6)
- [x] Show results and save the best score.
- [x] Verify all scoring, tips, combo, and reward values against Section 6 of the design document.

### Current prototype values (not confirmed as final)

- Correct order: +100 points, +$5, and +1 combo.
- Incorrect or missed order: -25 points (score cannot go below zero), lose one life, and reset combo.

## Part 6: Round Rules and Difficulty — Implemented

- [x] Run a 90-second shift timer.
- [x] Start with three lives.
- [x] End the round when time runs out or all lives are lost.
- [x] Give each customer 30 seconds of patience.
- [x] Implement difficulty progression: patience and customer arrival rate decrease as shift progresses.
  - Patience decreases from type-specific max to 20s over the 90-second shift
  - Customer arrival rate increases: first customer at 8s interval, then 6s, then 4s
  - Later customers have shorter patience (reduced from type-specific max)
- [x] Confirm round duration, lives, and patience values against Section 7.
- [x] Implement difficulty progression mechanics.

## Part 7: Technical Architecture and Data Design — Partially implemented

- [x] Build the current browser app with HTML, CSS, and JavaScript.
- [x] Organize art under the local `assets/` directory.
- [x] Persist sound preference and high score in browser `localStorage`.
- [ ] Review Sections 8–9 and compare the current structure/data to the design document.
- [ ] Implement the remaining architecture or data design requirements from those sections.
- [ ] Add automated tests; the project currently has no automated test suite.

## Part 8: Roadmap, Scope, and Summary — Not started

- [ ] Review Sections 10–12 of the design document.
- [ ] Record the agreed roadmap, scope, and summary.
- [ ] Track roadmap items as they are implemented.

## Asset work

- [x] Create the original minimum customer, UI, and gameplay-effect PNG files listed in `MISSING.md`.
- [x] Add browser-tab icons with SVG, PNG, and ICO alternatives, plus an Apple touch icon.
- [x] Repair the game intro, use the cafe scene as a full-screen background, add keyboard/tap-to-play hints, and honor reduced-motion preferences.
- [x] Remove the extra focus box-shadow that made the Start your shift keyboard outline look doubled.
- [x] Move initial gameplay focus to its heading instead of the Pause button to avoid a misleading focus outline at shift start.
- [x] Make student, worker, and regular customer portraits visually distinct.
- [x] Convert `assets/customers/customer-student.jpeg`, `customer-worker.jpeg`, and `customer-regular.jpeg` to PNG; the original JPEGs are retained.
- [ ] Integrate remaining artwork and effect animations into gameplay where appropriate.

## Sound asset checklist

### Integrated sound effects:

- [x] Cafe ambience / background music - loops during gameplay, respects sound on/off setting
- [x] Button hover sound - plays on ingredient button clicks
- [x] Button click sound - plays on sound toggle, menu buttons, game controls
- [x] Shift start sound - plays when player begins a new shift
- [x] Shift pause sound - plays when shift is paused
- [x] Shift resume sound - plays when shift is resumed
- [x] Settings dialog provides the sound toggle and background-music volume slider, accessible from the menu, gameplay, and pause dialog; volume applies immediately and is saved between visits.
- [x] Ingredient select/deselect sound - plays when toggling ingredients
- [x] Clear tray sound - plays when clear button is clicked
- [x] Prepare drink sound - plays when prepare button is clicked
- [x] Serve drink sound - plays when serve button is clicked

Remaining sound effects to add:
- [ ] Correct serve and tip/coin reward sounds
- [ ] Combo milestone sound
- [ ] Incorrect order, customer leaving, and life-lost sounds
- [ ] Low-patience/timer warning sound.
- [ ] Shift over and new high-score sounds.

## Validation notes

- [x] `node --check script.js` passes.
- [x] Fixed duplicate sound declarations that caused a JavaScript syntax error and prevented all button handlers from loading.
- [x] Browser-tested menu, help/high-score dialogs, sound toggle, shift start, ingredient preparation/serving, pause/resume, and return to menu after the fix.
- [x] Browser-tested the full-screen intro at desktop and mobile sizes, cafe background, responsive Enter/tap hint, Enter/click activation, reduced-motion bypass, and menu flow; no browser console errors.
- [x] Browser-tested Settings access from the menu, gameplay, and pause dialog; verified slider persistence, focus return, and that gameplay pauses while Settings is open.
- [x] Browser checks cover core order outcomes, timers/pause, Game Over, local storage, and responsive layout.
- [x] Browser-tested customer and drink rotation after correct and incorrect serves; consecutive customer types differ.
- [ ] Add repeatable automated tests.
- [ ] Recheck prototype values against the attached Game Design Document before treating them as final.

## Current files

- `index.html`: screen and interface markup.
- `style.css`: responsive visual styling.
- `script.js`: screen navigation, recipes, timers, prototype scoring, persistence, and Game Over behavior.
- `assets/`: game art and sprites.
- `PROJECT_PROGRESS.md`: this project handoff and all-parts checklist.
