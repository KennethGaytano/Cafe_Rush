import { dom } from "../core/dom.js";
import { state } from "../core/state.js";
import * as sound from "./audio.js";
import { updatePatience } from "./customers.js";

export function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainder = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

export function stopTimer() {
  if (state.timerInterval !== null) {
    window.clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
}

export function startTimer({ onPatienceExpired, onTimeExpired }) {
  stopTimer();

  state.timerInterval = window.setInterval(() => {
    state.remainingSeconds = Math.max(0, state.remainingSeconds - 1);
    dom.timerDisplay.textContent = formatTime(state.remainingSeconds);
    // The shift clock and the active customer's patience advance together.
    // Use the progressive minPatience from updatePatience() to shorten the timer.
    const effectiveMinPatience = updatePatience();
    state.patienceSeconds = Math.max(0, state.patienceSeconds - 1);
    // If patience reaches 0 before the timer, trigger expiration.
    // But also ensure it doesn't go below the effective minimum smoothly.

    if (state.patienceSeconds <= 0 && state.remainingSeconds > 0) {
      sound.timerWarningSound.play();
      onPatienceExpired();
    }

    if (state.remainingSeconds === 0 && state.currentLives > 0) {
      onTimeExpired(`Shift complete! Final score: ${state.currentScore}.`);
    }
  }, 1000);
}
