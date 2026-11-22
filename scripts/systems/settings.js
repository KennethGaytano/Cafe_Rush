import { config } from "../config/constants.js";
import { dom } from "../core/dom.js";
import { state } from "../core/state.js";
import * as sound from "./audio.js";
const soundButtons = [dom.settingsSoundButton];

export function adjustClickSoundVolume(delta) {
  state.clickSoundVolume = Math.max(0, Math.min(1, state.clickSoundVolume + delta));
  sound.clickSound.volume = state.clickSoundVolume;
  sound.clickHoverSound.volume = state.clickSoundVolume;
  return state.clickSoundVolume;
}

export function adjustBackgroundMusicVolume(delta) {
  setBackgroundMusicVolume(state.backgroundMusicVolume + delta);
  return state.backgroundMusicVolume;
}

export function updateBackgroundMusicVolumeControls() {
  const percent = Math.round(state.backgroundMusicVolume * 100);
  dom.backgroundMusicVolumeControls.forEach((control) => {
    control.value = String(percent);
  });
  dom.backgroundMusicVolumeOutputs.forEach((output) => {
    output.value = `${percent}%`;
  });
}

export function updateClickSoundVolumeControls() {
  const percent = Math.round(state.clickSoundVolume * 100);
  document.querySelectorAll(".click-sound-volume").forEach((control) => {
    control.value = String(percent);
  });
  document.querySelectorAll(".click-sound-volume-output").forEach((output) => {
    output.value = `${percent}%`;
  });
}

export function setBackgroundMusicVolume(volume) {
  state.backgroundMusicVolume = Math.max(0, Math.min(1, volume));
  sound.backgroundMusic.volume = state.backgroundMusicVolume;
  updateBackgroundMusicVolumeControls();

  try {
    window.localStorage.setItem(
      config.storageKeys.backgroundMusicVolume,
      String(state.backgroundMusicVolume),
    );
  } catch (error) {
    console.error("Could not save Cafe Rush background music volume.", error);
    dom.menuStatus.textContent =
      "Background music volume could not be saved in this browser.";
    dom.highScoreStorageNotice.textContent =
      "Background music volume could not be saved in this browser.";
  }
}

export function setClickSoundVolume(volume) {
  state.clickSoundVolume = Math.max(0, Math.min(1, volume));
  sound.clickSound.volume = state.clickSoundVolume;
  sound.clickHoverSound.volume = state.clickSoundVolume;
  updateClickSoundVolumeControls();

  try {
    window.localStorage.setItem(
      config.storageKeys.clickSoundVolume,
      String(state.clickSoundVolume),
    );
  } catch (error) {
    console.error("Could not save Cafe Rush click sound volume.", error);
  }
}

export function setSoundEnabled(enabled) {
  state.soundEnabled = enabled;
  soundButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(state.soundEnabled));
    button.querySelector(".sound-toggle-label").textContent = state.soundEnabled
      ? "Sound: On"
      : "Sound: Off";
  });

  // Control background music
  if (sound.backgroundMusic) {
    if (enabled) {
      sound.backgroundMusic.play().catch(() => {
        // Autoplay policy may prevent playback until user interaction
      });
    } else {
      sound.backgroundMusic.pause();
      sound.backgroundMusic.currentTime = 0;
    }
  }

  try {
    window.localStorage.setItem(config.storageKeys.soundEnabled, String(state.soundEnabled));
    dom.menuStatus.textContent = "";
  } catch (error) {
    console.error("Could not save Cafe Rush sound preference.", error);
    const message = "Sound preference could not be saved in this browser.";
    dom.menuStatus.textContent = message;
    dom.highScoreStorageNotice.textContent = message;
  }
}


// Restore saved preferences and the best score, then sync controls to them.
export function loadSavedSettings() {
  try {
    state.soundEnabled =
      window.localStorage.getItem(config.storageKeys.soundEnabled) === "true";
    const storedMusicVolume = window.localStorage.getItem(
      config.storageKeys.backgroundMusicVolume,
    );
    if (storedMusicVolume !== null) {
      const parsedMusicVolume = Number(storedMusicVolume);
      if (
        Number.isFinite(parsedMusicVolume) &&
        parsedMusicVolume >= 0 &&
        parsedMusicVolume <= 1
      ) {
        state.backgroundMusicVolume = parsedMusicVolume;
        sound.backgroundMusic.volume = state.backgroundMusicVolume;
      }
    }
    const storedClickSoundVolume = window.localStorage.getItem(
      config.storageKeys.clickSoundVolume,
    );
    if (storedClickSoundVolume !== null) {
      const parsedClickSoundVolume = Number(storedClickSoundVolume);
      if (
        Number.isFinite(parsedClickSoundVolume) &&
        parsedClickSoundVolume >= 0 &&
        parsedClickSoundVolume <= 1
      ) {
        state.clickSoundVolume = parsedClickSoundVolume;
        sound.clickSound.volume = state.clickSoundVolume;
        sound.clickHoverSound.volume = state.clickSoundVolume;
      }
    }
    const storedScore = Number(
      window.localStorage.getItem(config.storageKeys.highScore),
    );
    state.highScore =
      Number.isFinite(storedScore) && storedScore > 0 ? storedScore : 0;
  } catch (error) {
    console.error("Could not load Cafe Rush saved settings.", error);
    dom.menuStatus.textContent =
      "Saved settings could not be loaded in this browser.";
    dom.highScoreStorageNotice.textContent =
      "Saved high score could not be loaded in this browser.";
  }

  soundButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(state.soundEnabled));
    button.querySelector(".sound-toggle-label").textContent = state.soundEnabled
      ? "Sound: On"
      : "Sound: Off";
  });
  updateBackgroundMusicVolumeControls();
  updateClickSoundVolumeControls();
  dom.menuHighScore.textContent = String(state.highScore);
}
