// Game Manager - controls menu, playing, paused, and game-over states.
// Coordinates the overall shift lifecycle.
import { config } from "../config/constants.js";
import { dom } from "../core/dom.js";
import { state } from "../core/state.js";
import { startGameTimer, stopTimer, endShift, missOrder, beginShift, pauseShift, resumeShift } from "./systems/shift.js";

// Public API
export const GameManager = {
  // Start a new shift
  startShift() {
    beginShift();
  },

  // Pause the current shift
  pauseShift() {
    pauseShift();
  },

  // Resume a paused shift
  resumeShift() {
    resumeShift();
  },

  // End the current shift (game over)
  endShift() {
    endShift("Shift over!");
  },

  // Handle a missed order (patience expired or wrong recipe)
  handleMissOrder(message = "Missed order") {
    missOrder(message);
  },

  // Get current game state
  getState() {
    return { ...state };
  },

  // Reset all shift state
  resetShift() {
    stopTimer();
    state.remainingSeconds = config.roundLength;
    state.servedCount = 0;
    state.currentScore = 0;
    state.currentTips = 0;
    state.currentCombo = 0;
    state.bestCombo = 0;
    state.correctOrderCount = 0;
    state.wrongOrderCount = 0;
    state.currentLives = config.startingLives;
    state.currentCustomerType = null;
    state.currentCustomerPatience = config.startingPatience;
    state.currentOrderDrink = null;
    state.orderStartRemainingSeconds = config.roundLength;
    state.patienceSeconds = config.startingPatience;
    state.settingsReturnFocus = null;
    dom.timerDisplay.textContent = formatTime(state.remainingSeconds);
    updateScoreboard();
    updateLives();
    dom.pauseButton.disabled = false;
    dom.gameMessage.textContent = `A customer is waiting for their ${state.currentOrderDrink}.`;
    dom.gameOverStorageNotice.textContent = "";
    dom.newRecordMessage.hidden = true;
    clearTray();
    setServiceEnabled(true);
  },
};

// Keep backward compatibility - re-export commonly used functions
export { startTimer, stopTimer, formatTime } from "./systems/timer.js";
export { updatePatience, pickRandomCustomer } from "./systems/customers.js";
export { pickRandomDrink } from "./systems/orders.js";
export { updateScoreboard, updateLives } from "./systems/hud.js";
export { showEffect } from "./systems/effects.js";