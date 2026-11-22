import { dom } from "../core/dom.js";
import { state } from "../core/state.js";
import * as sound from "../systems/audio.js";

// Intro and shift timer
// The splash accepts Enter or a tap/click; reduced-motion users go straight to the menu.

export function finishIntro() {
  if (state.introFinished) {
    return;
  }
  state.introFinished = true;
  dom.introScreen.classList.add("hidden");
  dom.menuScreen.hidden = false;
  window.setTimeout(() => {
    dom.introScreen.hidden = true;
    dom.playButton.focus();
  }, 500);
  // Start background music after intro, respecting user's sound preference
  if (state.soundEnabled && sound.backgroundMusic) {
    sound.backgroundMusic.play().catch(() => {
      // Autoplay policy may prevent playback until user interaction
      // The music will start when the shift begins instead
    });
  }
}

export function startIntro() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    finishIntro();
    return;
  }
  dom.introScreen.focus();
}

export function initIntro() {
  dom.introScreen.addEventListener("click", finishIntro);
  document.addEventListener("keydown", (event) => {
    if (!state.introFinished && event.key === "Enter") {
      event.preventDefault();
      finishIntro();
    }
  });
  window.addEventListener("load", startIntro, { once: true });
}
