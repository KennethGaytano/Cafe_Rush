const menuScreen = document.querySelector("#menu-screen");
const howToScreen = document.querySelector("#how-to-screen");
const gameplayScreen = document.querySelector("#gameplay-screen");
const gameOverScreen = document.querySelector("#game-over-screen");
const playButton = document.querySelector("#play-button");
const howToButton = document.querySelector("#how-to-button");
const backButton = document.querySelector("#back-button");
const guideDoneButton = document.querySelector("#guide-done-button");
const highScoresButton = document.querySelector("#high-scores-button");
const menuSoundButton = document.querySelector("#menu-sound-button");
const pauseSoundButton = document.querySelector("#pause-sound-button");
const highScoresDialog = document.querySelector("#high-scores-dialog");
const closeHighScoresButton = document.querySelector(
  "#close-high-scores-button",
);
const menuHighScore = document.querySelector("#menu-high-score");
const menuStatus = document.querySelector("#menu-status");
const pauseButton = document.querySelector("#pause-button");
const pauseDialog = document.querySelector("#pause-dialog");
const resumeButton = document.querySelector("#resume-button");
const restartButton = document.querySelector("#restart-button");
const exitGameButton = document.querySelector("#exit-game-button");
const soundButton = document.querySelector("#sound-button");
const ingredientButtons = [...document.querySelectorAll(".ingredient-button")];
const trayItems = document.querySelector("#tray-items");
const trayEmpty = document.querySelector("#tray-empty");
const prepareButton = document.querySelector("#prepare-button");
const clearButton = document.querySelector("#clear-button");
const serveButton = document.querySelector("#serve-button");
const gameMessage = document.querySelector("#game-message");
const timerDisplay = document.querySelector("#timer-display");
const scoreDisplay = document.querySelector("#score-display");
const moneyDisplay = document.querySelector("#money-display");
const servedDisplay = document.querySelector("#served-display");
const comboDisplay = document.querySelector("#combo-display");
const gameOverTitle = document.querySelector("#game-over-title");
const gameOverLead = document.querySelector("#game-over-lead");
const newRecordMessage = document.querySelector("#new-record");
const finalScoreDisplay = document.querySelector("#final-score");
const finalServedDisplay = document.querySelector("#final-served");
const finalCorrectDisplay = document.querySelector("#final-correct");
const finalWrongDisplay = document.querySelector("#final-wrong");
const finalComboDisplay = document.querySelector("#final-combo");
const finalHighScoreDisplay = document.querySelector("#final-high-score");
const gameOverStorageNotice = document.querySelector(
  "#game-over-storage-notice",
);
const highScoreStorageNotice = document.querySelector(
  "#high-score-storage-notice",
);
const playAgainButton = document.querySelector("#play-again-button");
const gameOverMenuButton = document.querySelector("#game-over-menu-button");

const roundLength = 90;
const startingLives = 3;
const startingPatience = 30;
const correctOrderPoints = 100;
const correctOrderTip = 5;
const incorrectOrderPenalty = 25;
let remainingSeconds = roundLength;
let timerInterval = null;
let selectedIngredients = new Set();
let drinkPrepared = false;
let soundEnabled = false;
let servedCount = 0;
let currentScore = 0;
let currentTips = 0;
let currentCombo = 0;
let bestCombo = 0;
let correctOrderCount = 0;
let wrongOrderCount = 0;
let currentLives = startingLives;
let patienceSeconds = startingPatience;
let highScore = 0;

const patienceValue = document.querySelector("#patience-value");
const patienceTrack = document.querySelector(".patience-track");
const patienceFill = document.querySelector("#patience-fill");
const livesDisplay = document.querySelector("#lives-display");
const soundButtons = [menuSoundButton, soundButton, pauseSoundButton];

const storageKeys = {
  soundEnabled: "cafeRush.soundEnabled",
  highScore: "cafeRush.highScore",
};

const recipes = {
  "Iced Latte": new Set(["espresso", "milk", "ice"]),
};

function showScreen(screenName) {
  const screens = {
    menu: menuScreen,
    "how-to": howToScreen,
    gameplay: gameplayScreen,
    "game-over": gameOverScreen,
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
    howToScreen.querySelector("h1").focus();
  } else if (screenName === "gameplay") {
    pauseButton.focus();
  } else if (screenName === "game-over") {
    gameOverTitle.focus();
  } else {
    playButton.focus();
  }
}

function setSoundEnabled(enabled) {
  soundEnabled = enabled;
  soundButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(soundEnabled));
    button.lastChild.textContent = soundEnabled ? " Sound: On" : " Sound: Off";
  });

  try {
    window.localStorage.setItem(storageKeys.soundEnabled, String(soundEnabled));
    menuStatus.textContent = "";
  } catch (error) {
    console.error("Could not save Cafe Rush sound preference.", error);
    const message = "Sound preference could not be saved in this browser.";
    menuStatus.textContent = message;
    highScoreStorageNotice.textContent = message;
  }
}

function loadSavedSettings() {
  try {
    soundEnabled =
      window.localStorage.getItem(storageKeys.soundEnabled) === "true";
    const storedScore = Number(
      window.localStorage.getItem(storageKeys.highScore),
    );
    highScore =
      Number.isFinite(storedScore) && storedScore > 0 ? storedScore : 0;
  } catch (error) {
    console.error("Could not load Cafe Rush saved settings.", error);
    menuStatus.textContent =
      "Saved settings could not be loaded in this browser.";
    highScoreStorageNotice.textContent =
      "Saved high score could not be loaded in this browser.";
  }

  soundButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(soundEnabled));
    button.lastChild.textContent = soundEnabled ? " Sound: On" : " Sound: Off";
  });
  menuHighScore.textContent = String(highScore);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainder = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

function stopTimer() {
  if (timerInterval !== null) {
    window.clearInterval(timerInterval);
    timerInterval = null;
  }
}

function startTimer() {
  stopTimer();

  timerInterval = window.setInterval(() => {
    remainingSeconds = Math.max(0, remainingSeconds - 1);
    timerDisplay.textContent = formatTime(remainingSeconds);
    patienceSeconds = Math.max(0, patienceSeconds - 1);
    updatePatience();

    if (patienceSeconds === 0 && remainingSeconds > 0) {
      missOrder("The customer ran out of patience. One life was lost.");
    }

    if (remainingSeconds === 0 && currentLives > 0) {
      endShift(`Shift complete! Final score: ${currentScore}.`);
    }
  }, 1000);
}

function setServiceEnabled(isEnabled) {
  ingredientButtons.forEach((button) => {
    button.disabled = !isEnabled;
  });
  prepareButton.disabled =
    !isEnabled || selectedIngredients.size === 0 || drinkPrepared;
  clearButton.disabled = !isEnabled || selectedIngredients.size === 0;
  serveButton.disabled = !isEnabled || !drinkPrepared;
}

function updateTray() {
  trayItems.replaceChildren();

  selectedIngredients.forEach((ingredient) => {
    const button = ingredientButtons.find(
      (item) => item.dataset.ingredient === ingredient,
    );
    const item = document.createElement("li");
    const image = document.createElement("img");
    const label = document.createElement("span");

    image.src = button.querySelector("img").src;
    image.alt = "";
    label.textContent = button.querySelector("span").textContent;
    item.append(image, label);
    trayItems.append(item);
  });

  trayEmpty.hidden = selectedIngredients.size > 0;
  prepareButton.disabled =
    selectedIngredients.size === 0 || drinkPrepared || remainingSeconds === 0;
  clearButton.disabled =
    selectedIngredients.size === 0 || remainingSeconds === 0;
}

function clearTray() {
  selectedIngredients.clear();
  drinkPrepared = false;
  ingredientButtons.forEach((button) =>
    button.setAttribute("aria-pressed", "false"),
  );
  updateTray();
  serveButton.disabled = true;
}

function updatePatience() {
  const percent = Math.ceil((patienceSeconds / startingPatience) * 100);
  patienceValue.textContent = `${percent}%`;
  patienceTrack.setAttribute("aria-valuenow", String(percent));
  patienceFill.style.width = `${percent}%`;
  patienceFill.dataset.level =
    percent <= 25 ? "danger" : percent <= 50 ? "warning" : "normal";
}

function updateLives() {
  livesDisplay.replaceChildren();
  for (let life = 0; life < currentLives; life += 1) {
    const icon = document.createElement("img");
    icon.src = "assets/ui/life.png";
    icon.alt = "";
    livesDisplay.append(icon);
  }
  livesDisplay.setAttribute(
    "aria-label",
    `${currentLives} ${currentLives === 1 ? "life" : "lives"}`,
  );
}

function updateScoreboard() {
  scoreDisplay.textContent = String(currentScore);
  moneyDisplay.textContent = `$${currentTips}`;
  servedDisplay.textContent = String(servedCount);
  comboDisplay.textContent = `×${currentCombo}`;
}

function endShift(message) {
  stopTimer();
  setServiceEnabled(false);
  pauseButton.disabled = true;
  gameOverTitle.textContent = currentLives === 0 ? "Shift over!" : "Time's up!";
  gameOverLead.textContent = message;
  finalScoreDisplay.textContent = String(currentScore);
  finalServedDisplay.textContent = String(servedCount);
  finalCorrectDisplay.textContent = String(correctOrderCount);
  finalWrongDisplay.textContent = String(wrongOrderCount);
  finalComboDisplay.textContent = `×${bestCombo}`;
  newRecordMessage.hidden = true;
  gameOverStorageNotice.textContent = "";

  if (currentScore > highScore) {
    highScore = currentScore;
    newRecordMessage.hidden = false;
    try {
      window.localStorage.setItem(storageKeys.highScore, String(highScore));
    } catch (error) {
      console.error("Could not save Cafe Rush high score.", error);
      gameOverStorageNotice.textContent =
        "New score reached, but this browser could not save it.";
    }
  }

  finalHighScoreDisplay.textContent = String(highScore);
  menuHighScore.textContent = String(highScore);
  showScreen("game-over");
}

function missOrder(message) {
  currentLives = Math.max(0, currentLives - 1);
  wrongOrderCount += 1;
  currentScore = Math.max(0, currentScore - incorrectOrderPenalty);
  currentCombo = 0;
  patienceSeconds = startingPatience;
  updateLives();
  updateScoreboard();
  updatePatience();
  clearTray();

  if (currentLives === 0) {
    endShift(
      `${message} No lives left. Shift over! Final score: ${currentScore}.`,
    );
    return;
  }

  setServiceEnabled(true);
  gameMessage.textContent = `${message} The next customer is waiting.`;
}

function resetShift() {
  stopTimer();
  remainingSeconds = roundLength;
  patienceSeconds = startingPatience;
  servedCount = 0;
  currentScore = 0;
  currentTips = 0;
  currentCombo = 0;
  bestCombo = 0;
  correctOrderCount = 0;
  wrongOrderCount = 0;
  currentLives = startingLives;
  timerDisplay.textContent = formatTime(remainingSeconds);
  updateScoreboard();
  updateLives();
  updatePatience();
  pauseButton.disabled = false;
  clearTray();
  setServiceEnabled(true);
  gameMessage.textContent = "A customer is waiting for their Iced Latte.";
}

function beginShift() {
  resetShift();
  showScreen("gameplay");
  startTimer();
}

function pauseShift() {
  if (remainingSeconds === 0) {
    return;
  }
  stopTimer();
  pauseDialog.showModal();
  resumeButton.focus();
}

function resumeShift() {
  if (pauseDialog.open) {
    pauseDialog.close();
  }
  if (remainingSeconds > 0 && gameplayScreen.hidden === false) {
    startTimer();
  }
  pauseButton.focus();
}

function showHighScores() {
  menuHighScore.textContent = String(highScore);
  highScoresDialog.showModal();
  closeHighScoresButton.focus();
}

playButton.addEventListener("click", beginShift);
howToButton.addEventListener("click", () => showScreen("how-to"));
backButton.addEventListener("click", () => showScreen("menu"));
guideDoneButton.addEventListener("click", () => showScreen("menu"));
highScoresButton.addEventListener("click", showHighScores);
closeHighScoresButton.addEventListener("click", () => highScoresDialog.close());

pauseButton.addEventListener("click", pauseShift);
resumeButton.addEventListener("click", resumeShift);
playAgainButton.addEventListener("click", beginShift);
gameOverMenuButton.addEventListener("click", () => showScreen("menu"));

restartButton.addEventListener("click", () => {
  pauseDialog.close();
  resetShift();
  startTimer();
  pauseButton.focus();
});

exitGameButton.addEventListener("click", () => {
  pauseDialog.close();
  showScreen("menu");
});

pauseDialog.addEventListener("close", () => {
  if (
    remainingSeconds > 0 &&
    gameplayScreen.hidden === false &&
    timerInterval === null
  ) {
    startTimer();
  }
});

pauseDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  resumeShift();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && pauseDialog.open) {
    event.preventDefault();
    resumeShift();
  }
});

ingredientButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (remainingSeconds === 0 || drinkPrepared) {
      return;
    }

    const ingredient = button.dataset.ingredient;
    if (selectedIngredients.has(ingredient)) {
      selectedIngredients.delete(ingredient);
      button.setAttribute("aria-pressed", "false");
    } else {
      selectedIngredients.add(ingredient);
      button.setAttribute("aria-pressed", "true");
    }
    updateTray();
    gameMessage.textContent = `${selectedIngredients.size} ingredient${selectedIngredients.size === 1 ? "" : "s"} in the tray.`;
  });
});

clearButton.addEventListener("click", () => {
  clearTray();
  gameMessage.textContent =
    "The tray is clear. Choose the ingredients for the order.";
});

prepareButton.addEventListener("click", () => {
  if (selectedIngredients.size === 0 || remainingSeconds === 0) {
    return;
  }

  drinkPrepared = true;
  prepareButton.disabled = true;
  clearButton.disabled = true;
  ingredientButtons.forEach((button) => {
    button.disabled = true;
  });
  serveButton.disabled = false;
  gameMessage.textContent = "Drink prepared! Serve it to your customer.";
});

serveButton.addEventListener("click", () => {
  if (!drinkPrepared || remainingSeconds === 0) {
    return;
  }

  const recipe = recipes["Iced Latte"];
  const isCorrect =
    selectedIngredients.size === recipe.size &&
    [...recipe].every((ingredient) => selectedIngredients.has(ingredient));

  if (!isCorrect) {
    missOrder(
      "That recipe was incorrect. One life was lost and the combo ended.",
    );
    return;
  }

  currentScore += correctOrderPoints;
  currentTips += correctOrderTip;
  currentCombo += 1;
  bestCombo = Math.max(bestCombo, currentCombo);
  correctOrderCount += 1;
  servedCount += 1;
  updateScoreboard();
  patienceSeconds = startingPatience;
  updatePatience();
  gameMessage.textContent = `Correct order! +${correctOrderPoints} points and $${correctOrderTip} tip. Combo ×${currentCombo}!`;
  clearTray();
  setServiceEnabled(true);
});

soundButton.addEventListener("click", () => {
  setSoundEnabled(!soundEnabled);
  gameMessage.textContent = soundEnabled
    ? "Sound setting is on. Sound effects are not added yet."
    : "Sound setting is off.";
});

menuSoundButton.addEventListener("click", () => setSoundEnabled(!soundEnabled));
pauseSoundButton.addEventListener("click", () =>
  setSoundEnabled(!soundEnabled),
);

highScoresDialog.addEventListener("close", () => highScoresButton.focus());

loadSavedSettings();
