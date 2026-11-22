import { config } from "../config/constants.js";

// These values drive the HUD and final results while a shift is running.
export const state = {
  settingsReturnFocus: null,
  clickSoundVolume: 0.5,
  backgroundMusicVolume: 0.5,
  remainingSeconds: config.roundLength,
  timerInterval: null,
  selectedIngredients: new Set(),
  drinkPrepared: false,
  currentCustomerType: null,
  currentCustomerPatience: config.startingPatience,
  currentOrderDrink: null,
  orderStartRemainingSeconds: config.roundLength,
  soundEnabled: false,
  servedCount: 0,
  currentScore: 0,
  currentTips: 0,
  currentCombo: 0,
  bestCombo: 0,
  correctOrderCount: 0,
  wrongOrderCount: 0,
  currentLives: config.startingLives,
  patienceSeconds: config.startingPatience,
  highScore: 0,
  introFinished: false,
};
