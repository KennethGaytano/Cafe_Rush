import { config } from "../config/constants.js";
import { dom } from "../core/dom.js";
import { state } from "../core/state.js";
import * as sound from "./audio.js";
import { updatePatience } from "./customers.js";
import { showEffect } from "./effects.js";
import { updateLives, updateScoreboard } from "./hud.js";
import { clearTray, setServiceEnabled } from "./ingredients.js";
import { pickRandomDrink } from "./orders.js";
import { formatTime, startTimer, stopTimer } from "./timer.js";
import { showScreen } from "../ui/screens.js";
export function startGameTimer() {
  startTimer({
    onPatienceExpired: () => missOrder("The customer ran out of patience. One life was lost.", config.customerLeavePenalty),
    onTimeExpired: (message) => endShift(message),
  });
}



// Freeze the shift, save a new high score if needed, and show the final results.
export function endShift(message) {
  stopTimer();
  setServiceEnabled(false);
  dom.pauseButton.disabled = true;
  dom.gameOverTitle.textContent = state.currentLives === 0 ? "Shift over!" : "Time's up!";
  dom.gameOverLead.textContent = message;
  dom.finalScoreDisplay.textContent = String(state.currentScore);
  dom.finalServedDisplay.textContent = String(state.servedCount);
  dom.finalCorrectDisplay.textContent = String(state.correctOrderCount);
  dom.finalWrongDisplay.textContent = String(state.wrongOrderCount);
  dom.finalComboDisplay.textContent = `×${state.bestCombo}`;
  dom.newRecordMessage.hidden = true;
  dom.gameOverStorageNotice.textContent = "";

  if (state.currentScore > state.highScore) {
    // Keep the best score in this browser so it survives a page reload.
    state.highScore = state.currentScore;
    dom.newRecordMessage.hidden = false;
    try {
      window.localStorage.setItem(config.storageKeys.highScore, String(state.highScore));
    } catch (error) {
      console.error("Could not save Cafe Rush high score.", error);
      dom.gameOverStorageNotice.textContent =
        "New score reached, but this browser could not save it.";
    }
  }

  dom.finalHighScoreDisplay.textContent = String(state.highScore);
  dom.menuHighScore.textContent = String(state.highScore);
  sound.shiftOverSound.play();
  showScreen("game-over");
}

export function missOrder(message, penalty = config.incorrectOrderPenalty) {
  showEffect("effect-leaving");
  // Both wrong recipes and expired patience cost a life and break the combo.
  state.currentLives = Math.max(0, state.currentLives - 1);
  state.wrongOrderCount += 1;
  state.currentScore = Math.max(0, state.currentScore - penalty);
  state.currentCombo = 0;
  updateLives();
  updateScoreboard();
  clearTray();

  if (state.currentLives === 0) {
    endShift(
      `${message} No lives left. Shift over! Final score: ${state.currentScore}.`,
    );
    return;
  }

  pickRandomDrink();
  state.patienceSeconds = state.currentCustomerPatience;
  updatePatience();
  setServiceEnabled(true);
  dom.gameMessage.textContent = `${message} The next customer is waiting.`;
}

export function resetShift() {
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
  dom.timerDisplay.textContent = formatTime(state.remainingSeconds);
  updateScoreboard();
  updateLives();
  dom.pauseButton.disabled = false;
  pickRandomDrink();
  state.patienceSeconds = state.currentCustomerPatience;
  updatePatience();
  clearTray();
  setServiceEnabled(true);
  dom.gameMessage.textContent = `A customer is waiting for their ${state.currentOrderDrink}.`;
}


// Button and keyboard event handlers
// A new shift resets all round state, shows gameplay, and starts the clock.
export function beginShift() {
  sound.clickSound.currentTime = 0;
  sound.clickSound.play();
  resetShift();
  showScreen("gameplay");
  startGameTimer();
  // Start background music if sound is enabled
  if (state.soundEnabled && sound.backgroundMusic) {
    sound.backgroundMusic.play().catch(() => {
      // Autoplay policy may prevent playback until user interaction
    });
  }
}

export function pauseShift() {
  if (state.remainingSeconds === 0) {
    return;
  }
  sound.clickSound.currentTime = 0;
  sound.clickSound.play();
  stopTimer();
  dom.pauseDialog.showModal();
  dom.resumeButton.focus();
}

export function resumeShift() {
  sound.clickSound.currentTime = 0;
  sound.clickSound.play();
  if (dom.pauseDialog.open) {
    dom.pauseDialog.close();
  }
  if (state.remainingSeconds > 0 && dom.gameplayScreen.hidden === false) {
    startGameTimer();
  }
  dom.pauseButton.focus();
}
