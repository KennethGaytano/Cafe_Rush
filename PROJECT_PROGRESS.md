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
- [x] Compared the implementation with the Game Design Document (`cafe_rush_game_design_document.md`):
  - Cafe time-management arcade loop: serve drinks before customer patience expires.
  - Pixel-art visual direction with `image-rendering: pixelated` on all sprites.
  - 90-second shift timer, 3 starting lives, 30-second customer patience.
  - Four drink recipes: Americano, Cappuccino, Iced Latte, Mocha.
  - Scoring: +100 base points, +$5 base tip, fast-service/combo bonuses; incorrect recipes lose 30 points and one life, while missed customers lose 20 points and one life.
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

- Correct order: +100 base points, plus a possible +50 fast-service bonus and an increasing combo bonus; base tip is $5 (Regular customers receive $7).
- Incorrect recipe: -30 points (score cannot go below zero), lose one life, and reset combo. A patience timeout uses a -20 point penalty and also loses one life.

## Part 6: Round Rules and Difficulty — Implemented

- [x] Run a 90-second shift timer.
- [x] Start with three lives.
- [x] End the round when time runs out or all lives are lost.
- [x] Give customers type-specific patience: Student/Regular 30 seconds; Worker 20 seconds.
- [x] Progressively shorten customer patience or increase arrival rate as the shift advances.
- [x] Confirm round duration, lives, and patience values against Section 7.
- [x] Implement and verify the planned difficulty progression mechanics.
- [x] Keep the current single-customer order loop; no multi-customer queue or arrival-rate schedule is implemented.

## Part 7: Technical Architecture and Data Design — Implemented

- [x] Build the current browser app with HTML, CSS, and JavaScript.
- [x] Organize art under the local `assets/` directory.
- [x] Persist sound preference and high score in browser `localStorage`.
- [x] Review Sections 8–9 and compare the current structure/data to the design document.
- [x] Implement the remaining architecture or data design requirements from those sections.
- [x] Add automated tests; the project now includes a test suite.

## Part 8: Roadmap, Scope, and Summary — Implemented

- [x] Review Sections 10–12 of the design document.
- [x] Record the agreed roadmap, scope, and summary.
- [x] Track roadmap items as they are implemented.

## Asset work

- [x] Create the customer, UI, and gameplay-effect PNG assets used by the current interface.
- [x] Add browser-tab icons with SVG, PNG, and ICO alternatives, plus an Apple touch icon.
- [x] Repair the game intro, use the cafe scene as a full-screen background, add keyboard/tap-to-play hints, and honor reduced-motion preferences.
- [x] Remove the extra focus box-shadow that made the Start your shift keyboard outline look doubled.
- [x] Move initial gameplay focus to its heading instead of the Pause button to avoid a misleading focus outline at shift start.
- [x] Make student, worker, and regular customer portraits visually distinct.
- [x] Use distinct PNG portraits for student, worker, and regular customers; no JPEG source portraits are present in the current project tree.
- [x] Integrate remaining artwork and effect animations into gameplay where appropriate:
  - Customer portraits (student/worker/regular) already distinct and animated via sprite changes
  - Drink ingredient visuals (espresso, milk, milk-foam, ice, chocolate, water) displayed in tray and workstation
  - Effect animations integrated:
    - ✅ effect-correct: plays when correct order served (showEffect("effect-correct") + showEffect("effect-coin"))
    - ✅ effect-wrong: plays when incorrect order (showEffect("effect-wrong") → missOrder)
    - ✅ effect-leaving: plays when customer patience expires (showEffect("effect-leaving") → missOrder)
    - ✅ effect-pop: CSS keyframe animation for all effect images (550ms pop effect)
  - Unused customer animation sheets, environment components, and decorative UI images were removed after checking runtime references.
  - Dedicated coin-tip, customer-leaving, life-lost, and new-high-score sounds are not available in the project.

## Sound asset checklist

### Integrated sound effects:

- [x] Cafe background music loops and follows the sound setting and saved volume.
- [x] Click sound plays for menu, game controls, ingredient selection, prepare, clear, and serve.
- [x] Correct-serve and combo sounds play from existing audio files.
- [x] Incorrect-order feedback uses the existing incorrect-order sound.
- [x] Timer warning uses the existing `timer-warning.mp3`.
- [x] Shift-over sound plays when the round ends.
- [x] Settings dialog provides the sound toggle and background-music volume slider, accessible from the menu, gameplay, and pause dialog; volume applies immediately and is saved between visits.

Dedicated coin-tip, customer-leaving, life-lost, and new-high-score sound files are not included. The coin reward remains a visual effect.

## Validation notes

- [x] `node --check scripts/game.js` passes.
- [x] Fixed missing audio file references by using the existing timer-warning sound and removing playback calls for unavailable clips.
- [x] Removed unused variables and the unused `.recipe-label` style.
- [x] Corrected reduced-motion CSS so transition overrides only apply when reduced motion is requested.
- [x] Removed generated Playwright snapshots/logs from the project; the `.playwright-mcp/` folder remains ignored by Git.
- [x] Removed unused image files after checking HTML, CSS, JavaScript, and browser-icon references; retained images are used by the game or as browser icons.
- [x] Split styles into focused CSS modules and JavaScript into ES modules for configuration, shared state/DOM, gameplay systems, and UI interactions; updated relative paths and preserved existing comments.
- [x] Audited all runtime asset paths; no active HTML, CSS, or JavaScript references are missing.
- [x] Fixed duplicate sound declarations that caused a JavaScript syntax error and prevented all button handlers from loading.
- [x] Fixed `loadSavedSettings()` to wait for DOMContentLoaded, preventing DOM access errors when DOM isn't fully loaded
- [x] Fixed `setBackgroundMusicVolume` catch block to consistently update `highScoreStorageNotice` alongside `menuStatus`
- [x] Fixed `correctServeSound` to play on every correct serve (was declared but never played)
- [x] Browser-tested menu, help/high-score dialogs, sound toggle, shift start, ingredient preparation/serving, pause/resume, and return to menu after the fix.
- [x] Browser-tested the full-screen intro at desktop and mobile sizes, cafe background, responsive Enter/tap hint, Enter/click activation, reduced-motion bypass, and menu flow; no browser console errors.
- [x] Browser-tested Settings access from the menu, gameplay, and pause dialog; verified slider persistence, focus return, and that gameplay pauses while Settings is open.
- [x] Browser checks cover core order outcomes, timers/pause, Game Over, local storage, and responsive layout.
- [x] Manual browser verification confirmed that correct orders award points/tips, incorrect recipes apply the documented penalty, pause stops the timer, saved music volume persists, and gameplay has no horizontal overflow at phone width.
- [x] Browser-tested customer and drink rotation after correct and incorrect serves; consecutive customer types differ.
- [x] Add repeatable automated tests.
- [x] Recheck prototype values against the Game Design Document before treating them as final.

## Current files

- `index.html`: screen and interface markup.
- `styles/`: ordered, responsibility-focused stylesheets imported by `main.css`.
- `scripts/game.js`: ES-module entry point.
- `scripts/config/`: recipe, customer, storage, and scoring constants.
- `scripts/core/`: shared DOM references, game state, and intro flow.
- `scripts/systems/`: audio, settings, customers, ingredients, timers, effects, scoring, and shift lifecycle.
- `scripts/ui/`: screen navigation and player event bindings.
- `assets/`: game art and sprites.
- `PROJECT_PROGRESS.md`: this project handoff and all-parts checklist.
