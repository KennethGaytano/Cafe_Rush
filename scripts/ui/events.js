import { config } from "../config/constants.js";
import { dom } from "../core/dom.js";
import { state } from "../core/state.js";
import * as sound from "../systems/audio.js";
import {
  clearTray,
  prepareDrink,
  toggleIngredient,
} from "../systems/ingredients.js";
import { serveCurrentOrder } from "../systems/serving.js";
import { adjustBackgroundMusicVolume, adjustClickSoundVolume, setBackgroundMusicVolume, setSoundEnabled } from "../systems/settings.js";
import {
  beginShift,
  pauseShift,
  resetShift,
  resumeShift,
  startGameTimer,
} from "../systems/shift.js";
import { showHighScores, showScreen, showSettings } from "./screens.js";

export function bindGameEvents() {
  // Screen buttons connect player input to the matching game or navigation action.
  dom.playButton.addEventListener("click", () => {
    sound.clickSound.currentTime = 0;
    sound.clickSound.play();
    beginShift();
  });
  dom.howToButton.addEventListener("click", () => showScreen("how-to"));
  dom.menuSettingsButton.addEventListener("click", showSettings);
  dom.gameplaySettingsButton.addEventListener("click", showSettings);
  dom.pauseSettingsButton.addEventListener("click", showSettings);
  dom.closeSettingsButton.addEventListener("click", () => dom.settingsDialog.close());
  dom.backButton.addEventListener("click", () => showScreen("menu"));
  dom.guideDoneButton.addEventListener("click", () => showScreen("menu"));
  dom.highScoresButton.addEventListener("click", showHighScores);
  dom.closeHighScoresButton.addEventListener("click", () => dom.highScoresDialog.close());

  dom.pauseButton.addEventListener("click", pauseShift);
  dom.resumeButton.addEventListener("click", resumeShift);
  dom.playAgainButton.addEventListener("click", beginShift);
  dom.gameOverMenuButton.addEventListener("click", () => showScreen("menu"));

  dom.restartButton.addEventListener("click", () => {
    sound.clickSound.currentTime = 0;
    sound.clickSound.play();
    dom.pauseDialog.close();
    resetShift();
    startGameTimer();
    dom.pauseButton.focus();
  });

  dom.exitGameButton.addEventListener("click", () => {
    sound.clickSound.currentTime = 0;
    sound.clickSound.play();
    dom.pauseDialog.close();
    showScreen("menu");
  });

  dom.pauseDialog.addEventListener("close", () => {
    if (
      state.remainingSeconds > 0 &&
      dom.gameplayScreen.hidden === false &&
      state.timerInterval === null
    ) {
      startGameTimer();
    }
  });

  dom.pauseDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    resumeShift();
  });

  dom.settingsDialog.addEventListener("close", () => {
    if (
      state.remainingSeconds > 0 &&
      dom.gameplayScreen.hidden === false &&
      !dom.pauseDialog.open &&
      state.timerInterval === null
    ) {
      startGameTimer();
    }
    if (state.settingsReturnFocus?.isConnected) {
      state.settingsReturnFocus.focus();
    }
    state.settingsReturnFocus = null;
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dom.pauseDialog.open) {
      event.preventDefault();
      resumeShift();
    }
  });

  dom.ingredientButtons.forEach((button) => {
    button.addEventListener("click", () => {
      sound.clickHoverSound.currentTime = 0;
      sound.clickHoverSound.play();
      toggleIngredient(button);
    });
  });

  dom.clearButton.addEventListener("click", () => {
    sound.clickSound.currentTime = 0;
    sound.clickSound.play();
    clearTray();
    dom.gameMessage.textContent =
      "The tray is clear. Choose the ingredients for the order.";
  });

  dom.prepareButton.addEventListener("click", () => {
    sound.clickSound.currentTime = 0;
    sound.clickSound.play();
    prepareDrink();
  });

  dom.serveButton.addEventListener("click", serveCurrentOrder);
  dom.settingsSoundButton.addEventListener("click", () => {
    sound.clickSound.currentTime = 0;
    sound.clickSound.play();
    setSoundEnabled(!state.soundEnabled);
  });

  dom.backgroundMusicVolumeControls.forEach((control) => {
    control.addEventListener("input", () => {
      setBackgroundMusicVolume(Number(control.value) / 100);
    });
  });

  /* Volume control keyboard shortcuts */
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && sound.backgroundMusic) {
      event.preventDefault();
      state.backgroundMusicVolume = adjustBackgroundMusicVolume(config.volumeStep);
      dom.gameMessage.textContent = `Background music volume: ${Math.round(state.backgroundMusicVolume * 100)}%`;
    } else if (event.key === "ArrowDown" && sound.backgroundMusic) {
      event.preventDefault();
      state.backgroundMusicVolume = adjustBackgroundMusicVolume(-config.volumeStep);
      dom.gameMessage.textContent = `Background music volume: ${Math.round(state.backgroundMusicVolume * 100)}%`;
    } else if (event.key === "PageUp") {
      event.preventDefault();
      state.clickSoundVolume = adjustClickSoundVolume(config.volumeStep);
      dom.gameMessage.textContent = `Click sound volume: ${Math.round(state.clickSoundVolume * 100)}%`;
    } else if (event.key === "PageDown") {
      event.preventDefault();
      state.clickSoundVolume = adjustClickSoundVolume(-config.volumeStep);
      dom.gameMessage.textContent = `Click sound volume: ${Math.round(state.clickSoundVolume * 100)}%`;
    }
  });

  if (dom.highScoresDialog) {
    dom.highScoresDialog.addEventListener("close", () => {
      if (dom.highScoresButton) {
        dom.highScoresButton.focus();
      }
    });
  }
}
