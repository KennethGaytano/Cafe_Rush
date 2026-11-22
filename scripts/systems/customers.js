import { config } from "../config/constants.js";
import { dom } from "../core/dom.js";
import { state } from "../core/state.js";

// Choose a different customer type from the one who just finished.
// Applies difficulty progression by reducing starting patience as the shift advances.
export function pickRandomCustomer() {
  const customerKeys = Object.keys(config.customerTypes).filter(
    (customerKey) => customerKey !== state.currentCustomerType,
  );
  state.currentCustomerType =
    customerKeys[Math.floor(Math.random() * customerKeys.length)];
  const customerConfig = config.customerTypes[state.currentCustomerType];

  // Difficulty progression: reduce starting patience as round progresses.
  const progress = (config.roundLength - state.remainingSeconds) / config.roundLength;
  const patienceReduction = Math.round(customerConfig.patience * 0.3 * progress);
  state.currentCustomerPatience = Math.max(10, customerConfig.patience - patienceReduction);

  dom.customerSprite.src = customerConfig.sprite;
  dom.customerSprite.alt = `A ${customerConfig.name.toLowerCase()} customer waiting for an order`;
}

// Convert patience seconds into a bar percentage and warning color.
// Also returns the effective patience for use by the timer.
export function updatePatience() {
  // Compare remaining patience with a shift-progress baseline for the bar percentage.
  const typeMaxPatience = state.currentCustomerType ? config.customerTypes[state.currentCustomerType].patience : config.startingPatience;
  const patienceRange = typeMaxPatience - 20;
  const progress = (config.roundLength - state.remainingSeconds) / config.roundLength;
  // The target floor gradually lowers as the 90-second shift progresses.
  const minPatience = Math.max(20, Math.round(typeMaxPatience - patienceRange * progress));

  const percent = Math.ceil((state.patienceSeconds / minPatience) * 100);
  dom.patienceValue.textContent = `${percent}%`;
  dom.patienceTrack.setAttribute("aria-valuenow", String(percent));
  dom.patienceFill.style.width = `${percent}%`;
  dom.patienceFill.dataset.level =
    percent <= 25 ? "danger" : percent <= 50 ? "warning" : "normal";

  // Return the effective minimum patience for the timer to use.
  return minPatience;
}
