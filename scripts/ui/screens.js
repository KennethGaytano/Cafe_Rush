import { dom } from "../core/dom.js";
import { state } from "../core/state.js";
import { stopTimer } from "../systems/timer.js";


// Show one of the app's main screens and move keyboard focus to its heading.
export function showScreen(screenName) {
  const screens = {
    menu: dom.menuScreen,
    "how-to": dom.howToScreen,
    gameplay: dom.gameplayScreen,
    "game-over": dom.gameOverScreen,
  };
  const activeScreen = screens[screenName];

  if (!activeScreen) {
    throw new Error(`Unknown screen: ${screenName}`);
  }

  if (screenName !== "gameplay") {
    stopTimer();
  }

  Object.entries(screens).forEach(([name, screen]) => {
    screen.hidden = name !== screenName;
  });

  if (screenName === "how-to") {
    dom.howToScreen.querySelector("h1").focus();
  } else if (screenName === "gameplay") {
    dom.gameplayScreen.querySelector("h1").focus();
  } else if (screenName === "game-over") {
    dom.gameOverTitle.focus();
  } else {
    dom.playButton.focus();
  }
}

export function showHighScores() {
  dom.menuHighScore.textContent = String(state.highScore);
  dom.highScoresDialog.showModal();
  dom.closeHighScoresButton.focus();
}

export function showSettings(event) {
  state.settingsReturnFocus = event.currentTarget;
  dom.settingsDialog.showModal();
  dom.settingsSoundButton.focus();
}
