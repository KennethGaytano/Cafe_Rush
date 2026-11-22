import { config } from "../config/constants.js";
import { dom } from "../core/dom.js";
import { state } from "../core/state.js";
import * as sound from "./audio.js";
import { updatePatience } from "./customers.js";
import { showEffect } from "./effects.js";
import { updateScoreboard } from "./hud.js";
import { clearTray, setServiceEnabled } from "./ingredients.js";
import { pickRandomDrink } from "./orders.js";
import { missOrder } from "./shift.js";

export function serveCurrentOrder() {
  sound.clickSound.currentTime = 0;
  sound.clickSound.play();
  if (!state.drinkPrepared || state.remainingSeconds === 0) {
    return;
  }

  // A correct serve must contain every required ingredient and no extras.
  const recipe = config.recipes[state.currentOrderDrink];
  // Exact set matching rejects both missing and extra ingredients.
  const isCorrect =
    state.selectedIngredients.size === recipe.size &&
    [...recipe].every((ingredient) => state.selectedIngredients.has(ingredient));

  if (!isCorrect) {
    showEffect("effect-wrong");
    sound.incorrectOrderSound.play();
    missOrder(
      "That recipe was incorrect. One life was lost and the combo ended.",
    );
    return;
  }

  // Award base points and customer-specific tips, then apply speed and combo bonuses.
  const tipAmount = Math.floor(config.correctOrderTip * config.customerTypes[state.currentCustomerType].tipMultiplier);
  const secondsTaken = state.orderStartRemainingSeconds - state.remainingSeconds;
  const fastServiceAllowed = config.startingPatience * config.fastServiceThreshold;
  const isFastService = secondsTaken <= fastServiceAllowed;

  state.currentScore += config.correctOrderPoints;
  state.currentTips += tipAmount;

  if (isFastService) {
    state.currentScore += config.fastServiceBonus;
    showEffect("effect-correct");
  }

  // A correct serve earns base points and a customer-specific tip. Fast service
  // and a clean streak add separate score bonuses.
  sound.correctServeSound.play();

  const comboBonus = config.comboRewardPoints * state.currentCombo;
  state.currentScore += comboBonus;

  if (comboBonus > 0) {
    sound.comboMilestoneSound.play();
  }

  state.currentCombo += 1;
  state.bestCombo = Math.max(state.bestCombo, state.currentCombo);
  state.correctOrderCount += 1;
  state.servedCount += 1;
  updateScoreboard();
  pickRandomDrink();
  state.patienceSeconds = state.currentCustomerPatience;
  updatePatience();

  let message = `Correct order! +${config.correctOrderPoints} points`;
  if (isFastService) {
    message += `, +${config.fastServiceBonus} fast service`;
  }
  if (comboBonus > 0) {
    message += `, +${comboBonus} combo`;
  }
  message += ` and $${tipAmount} tip. Combo ×${state.currentCombo}!`;
  dom.gameMessage.textContent = message;
  showEffect("effect-correct");
  showEffect("effect-coin");
  clearTray();
  setServiceEnabled(true);
}
