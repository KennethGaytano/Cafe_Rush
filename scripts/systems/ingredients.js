import { dom } from "../core/dom.js";
import { state } from "../core/state.js";

export function setServiceEnabled(isEnabled) {
  dom.ingredientButtons.forEach((button) => {
    button.disabled = !isEnabled;
  });
  dom.prepareButton.disabled =
    !isEnabled || state.selectedIngredients.size === 0 || state.drinkPrepared;
  dom.clearButton.disabled = !isEnabled || state.selectedIngredients.size === 0;
  dom.serveButton.disabled = !isEnabled || !state.drinkPrepared;
}


// Build the visible tray from the selected ingredient buttons.
export function updateTray() {
  dom.trayItems.replaceChildren();

  state.selectedIngredients.forEach((ingredient) => {
    const button = dom.ingredientButtons.find(
      (item) => item.dataset.ingredient === ingredient,
    );
    const item = document.createElement("li");
    const image = document.createElement("img");
    const label = document.createElement("span");

    image.src = button.querySelector("img").src;
    image.alt = "";
    label.textContent = button.querySelector("span").textContent;
    item.append(image, label);
    dom.trayItems.append(item);
  });

  dom.trayEmpty.hidden = state.selectedIngredients.size > 0;
  dom.prepareButton.disabled =
    state.selectedIngredients.size === 0 || state.drinkPrepared || state.remainingSeconds === 0;
  dom.clearButton.disabled =
    state.selectedIngredients.size === 0 || state.remainingSeconds === 0;
}

export function clearTray() {
  state.selectedIngredients.clear();
  state.drinkPrepared = false;
  dom.ingredientButtons.forEach((button) =>
    button.setAttribute("aria-pressed", "false"),
  );
  updateTray();
  dom.serveButton.disabled = true;
}

export function toggleIngredient(button) {
  if (state.remainingSeconds === 0 || state.drinkPrepared) {
    return;
  }

  const ingredient = button.dataset.ingredient;
  if (state.selectedIngredients.has(ingredient)) {
    state.selectedIngredients.delete(ingredient);
    button.setAttribute("aria-pressed", "false");
  } else {
    state.selectedIngredients.add(ingredient);
    button.setAttribute("aria-pressed", "true");
  }
  updateTray();
  dom.gameMessage.textContent = `${state.selectedIngredients.size} ingredient${state.selectedIngredients.size === 1 ? "" : "s"} in the tray.`;
}

export function prepareDrink() {
  if (state.selectedIngredients.size === 0 || state.remainingSeconds === 0) {
    return;
  }

  state.drinkPrepared = true;
  dom.prepareButton.disabled = true;
  dom.clearButton.disabled = true;
  dom.ingredientButtons.forEach((button) => {
    button.disabled = true;
  });
  dom.serveButton.disabled = false;
  dom.gameMessage.textContent = "Drink prepared! Serve it to your customer.";
}
