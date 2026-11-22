import { dom } from "../core/dom.js";
import { state } from "../core/state.js";

export function updateLives() {
  dom.livesDisplay.replaceChildren();
  for (let life = 0; life < state.currentLives; life += 1) {
    const icon = document.createElement("img");
    icon.src = "assets/ui/life.png";
    icon.alt = "";
    dom.livesDisplay.append(icon);
  }
  dom.livesDisplay.setAttribute(
    "aria-label",
    `${state.currentLives} ${state.currentLives === 1 ? "life" : "lives"}`,
  );
}


// Keep the HUD and final-round totals in sync with the current game state.
export function updateScoreboard() {
  dom.scoreDisplay.textContent = String(state.currentScore);
  dom.moneyDisplay.textContent = `$${state.currentTips}`;
  dom.servedDisplay.textContent = String(state.servedCount);
  dom.comboDisplay.textContent = `×${state.currentCombo}`;
}
