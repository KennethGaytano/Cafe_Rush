import { config } from "../config/constants.js";
import { dom } from "../core/dom.js";
import { state } from "../core/state.js";
import { pickRandomCustomer } from "./customers.js";

// Pair a random recipe with the next customer and update the order card.
export function pickRandomDrink() {
  const drinkNames = Object.keys(config.recipes);
  state.currentOrderDrink = drinkNames[Math.floor(Math.random() * drinkNames.length)];
  pickRandomCustomer();

  const drinkImageMap = {
    Americano: "assets/drinks/americano.png",
    Cappuccino: "assets/drinks/cappuccino.png",
    "Iced Latte": "assets/drinks/iced-latte.png",
    Mocha: "assets/drinks/mocha.png",
  };

  state.orderStartRemainingSeconds = state.remainingSeconds;
  dom.customerOrderHeading.textContent = `One ${state.currentOrderDrink}, please!`;
  dom.orderCardImage.src = drinkImageMap[state.currentOrderDrink];
  dom.orderCardName.textContent = state.currentOrderDrink;
  dom.orderCard.setAttribute("aria-label", `Drink order: ${state.currentOrderDrink}`);
}
