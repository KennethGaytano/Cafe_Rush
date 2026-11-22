const menuScreen = document.querySelector("#menu-screen");
const howToScreen = document.querySelector("#how-to-screen");
const gameplayScreen = document.querySelector("#gameplay-screen");
const gameOverScreen = document.querySelector("#game-over-screen");
const playButton = document.querySelector("#play-button");
const howToButton = document.querySelector("#how-to-button");
const menuSettingsButton = document.querySelector("#menu-settings-button");
const gameplaySettingsButton = document.querySelector(
  "#gameplay-settings-button",
);
const pauseSettingsButton = document.querySelector("#pause-settings-button");
const backButton = document.querySelector("#back-button");
const guideDoneButton = document.querySelector("#guide-done-button");
const highScoresButton = document.querySelector("#high-scores-button");
const settingsSoundButton = document.querySelector("#settings-sound-button");
const backgroundMusicVolumeControls = [
  ...document.querySelectorAll(".background-music-volume"),
];
const backgroundMusicVolumeOutputs = [
  ...document.querySelectorAll(".background-music-volume-output"),
];
const highScoresDialog = document.querySelector("#high-scores-dialog");
const settingsDialog = document.querySelector("#settings-dialog");
const closeSettingsButton = document.querySelector("#close-settings-button");
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
const ingredientButtons = [...document.querySelectorAll(".ingredient-button")];
const trayItems = document.querySelector("#tray-items");
const trayEmpty = document.querySelector("#tray-empty");
const prepareButton = document.querySelector("#prepare-button");
const clearButton = document.querySelector("#clear-button");
const serveButton = document.querySelector("#serve-button");
const customerOrderHeading = document.querySelector(".customer-details h2");
const orderCardImage = document.querySelector(".order-card img");
const orderCardName = document.querySelector(".order-card strong");
const orderCard = document.querySelector(".order-card");
const customerSprite = document.querySelector(".customer-sprite");
const effectOverlay = document.querySelector(".effect-overlay");
const effectImgs = [...document.querySelectorAll(".effect-img")];
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
let settingsReturnFocus = null;

// Sound settings
let clickSoundVolume = 0.5;
let backgroundMusicVolume = 0.5;
const volumeStep = 0.1;

// Sound effects
const clickSound = new Audio("assets/sounds/click.mp3");
clickSound.volume = clickSoundVolume;

const clickHoverSound = new Audio("assets/sounds/click.mp3");
clickHoverSound.volume = clickSoundVolume;

const backgroundMusic = new Audio("assets/sounds/background-music.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = backgroundMusicVolume;

function adjustClickSoundVolume(delta) {
  clickSoundVolume = Math.max(0, Math.min(1, clickSoundVolume + delta));
  clickSound.volume = clickSoundVolume;
  clickHoverSound.volume = clickSoundVolume;
  return clickSoundVolume;
}

function adjustBackgroundMusicVolume(delta) {
  setBackgroundMusicVolume(backgroundMusicVolume + delta);
  return backgroundMusicVolume;
}

function updateBackgroundMusicVolumeControls() {
  const percent = Math.round(backgroundMusicVolume * 100);
  backgroundMusicVolumeControls.forEach((control) => {
    control.value = String(percent);
  });
  backgroundMusicVolumeOutputs.forEach((output) => {
    output.value = `${percent}%`;
  });
}

function setBackgroundMusicVolume(volume) {
  backgroundMusicVolume = Math.max(0, Math.min(1, volume));
  backgroundMusic.volume = backgroundMusicVolume;
  updateBackgroundMusicVolumeControls();

  try {
    window.localStorage.setItem(
      storageKeys.backgroundMusicVolume,
      String(backgroundMusicVolume),
    );
  } catch (error) {
    console.error("Could not save Cafe Rush background music volume.", error);
    menuStatus.textContent =
      "Background music volume could not be saved in this browser.";
  }
}

const roundLength = 90;
const startingLives = 3;
const startingPatience = 30;
const correctOrderPoints = 100;
const correctOrderTip = 5;
const incorrectOrderPenalty = 30;
const customerLeavePenalty = 20;
const fastServiceBonus = 50;
const comboRewardPoints = 25;
const fastServiceThreshold = 0.5;
let remainingSeconds = roundLength;
let timerInterval = null;
let selectedIngredients = new Set();
let drinkPrepared = false;
const customerTypes = {
  student: {
    name: "Student",
    patience: startingPatience,
    tipMultiplier: 1.0,
    sprite: "assets/customers/customer-student.png",
  },
  worker: {
    name: "Worker",
    patience: Math.ceil(startingPatience * 2 / 3),
    tipMultiplier: 1.0,
    sprite: "assets/customers/customer-worker.png",
  },
  regular: {
    name: "Regular",
    patience: startingPatience,
    tipMultiplier: 1.5,
    sprite: "assets/customers/customer-regular.png",
  },
};

let currentCustomerType = null;
let currentCustomerPatience = startingPatience;
let currentOrderDrink = null;
let orderStartRemainingSeconds = roundLength;
let shiftStartSeconds = 0;
let difficultyLevel = 1;
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
const soundButtons = [settingsSoundButton];

const storageKeys = {
  soundEnabled: "cafeRush.soundEnabled",
  backgroundMusicVolume: "cafeRush.backgroundMusicVolume",
  highScore: "cafeRush.highScore",
};

const recipes = {
  "Americano": new Set(["espresso", "water"]),
  "Cappuccino": new Set(["espresso", "milk-foam"]),
  "Iced Latte": new Set(["espresso", "milk", "ice"]),
  "Mocha": new Set(["espresso", "milk", "chocolate"]),
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
    gameplayScreen.querySelector("h1").focus();
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
    button.querySelector(".sound-toggle-label").textContent = soundEnabled
      ? "Sound: On"
      : "Sound: Off";
  });

  // Control background music
  if (backgroundMusic) {
    if (enabled) {
      backgroundMusic.play().catch(() => {
        // Autoplay policy may prevent playback until user interaction
      });
    } else {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
    }
  }

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
    const storedMusicVolume = window.localStorage.getItem(
      storageKeys.backgroundMusicVolume,
    );
    if (storedMusicVolume !== null) {
      const parsedMusicVolume = Number(storedMusicVolume);
      if (
        Number.isFinite(parsedMusicVolume) &&
        parsedMusicVolume >= 0 &&
        parsedMusicVolume <= 1
      ) {
        backgroundMusicVolume = parsedMusicVolume;
        backgroundMusic.volume = backgroundMusicVolume;
      }
    }
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
    button.querySelector(".sound-toggle-label").textContent = soundEnabled
      ? "Sound: On"
      : "Sound: Off";
  });
  updateBackgroundMusicVolumeControls();
  menuHighScore.textContent = String(highScore);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainder = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

const introScreen = document.querySelector("#intro-screen");
let introFinished = false;

function finishIntro() {
  if (introFinished) {
    return;
  }
  introFinished = true;
  introScreen.classList.add("hidden");
  menuScreen.hidden = false;
  window.setTimeout(() => {
    introScreen.hidden = true;
    playButton.focus();
  }, 500);
}

function startIntro() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    finishIntro();
    return;
  }
  introScreen.focus();
}

introScreen.addEventListener("click", finishIntro);
document.addEventListener("keydown", (event) => {
  if (!introFinished && event.key === "Enter") {
    event.preventDefault();
    finishIntro();
  }
});
window.addEventListener("load", startIntro, { once: true });

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
      missOrder("The customer ran out of patience. One life was lost.", customerLeavePenalty);
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

function pickRandomDrink() {
  const drinkNames = Object.keys(recipes);
  currentOrderDrink = drinkNames[Math.floor(Math.random() * drinkNames.length)];

  const customerKeys = Object.keys(customerTypes).filter(
    (customerKey) => customerKey !== currentCustomerType,
  );
  currentCustomerType =
    customerKeys[Math.floor(Math.random() * customerKeys.length)];
  const customerConfig = customerTypes[currentCustomerType];
  currentCustomerPatience = customerConfig.patience;

  shiftStartSeconds = shiftStartSeconds || remainingSeconds;
  difficultyLevel = Math.floor((roundLength - remainingSeconds) / 15) + 1;
  difficultyLevel = Math.min(difficultyLevel, 4);

  const drinkImageMap = {
    Americano: "assets/drinks/americano.png",
    Cappuccino: "assets/drinks/cappuccino.png",
    "Iced Latte": "assets/drinks/iced-latte.png",
    Mocha: "assets/drinks/mocha.png",
  };

  customerSprite.src = customerConfig.sprite;
  customerSprite.alt = `A ${currentCustomerType} customer waiting for an order`;
  orderStartRemainingSeconds = remainingSeconds;
  customerOrderHeading.textContent = `One ${currentOrderDrink}, please!`;
  orderCardImage.src = drinkImageMap[currentOrderDrink];
  orderCardName.textContent = currentOrderDrink;
  orderCard.setAttribute("aria-label", `Drink order: ${currentOrderDrink}`);
}

function showEffect(effectClass, durationMs = 550) {
  effectImgs.forEach((img) => {
    if (img.classList.contains(effectClass)) {
      img.classList.remove("show");
      // Force reflow to restart animation
      void img.offsetWidth;
      img.classList.add("show");
      setTimeout(() => img.classList.remove("show"), durationMs);
    }
  });
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
  // Difficulty: patience reduces from type-specific max to 20s over the 90-second shift
  const typeMaxPatience = currentCustomerType ? customerTypes[currentCustomerType].patience : startingPatience;
  const patienceRange = typeMaxPatience - 20;
  const progress = (roundLength - remainingSeconds) / roundLength;
  const minPatience = Math.max(20, Math.round(typeMaxPatience - patienceRange * progress));

  const percent = Math.ceil((patienceSeconds / minPatience) * 100);
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

function missOrder(message, penalty = incorrectOrderPenalty) {
  showEffect("effect-leaving");
  currentLives = Math.max(0, currentLives - 1);
  wrongOrderCount += 1;
  currentScore = Math.max(0, currentScore - penalty);
  currentCombo = 0;
  updateLives();
  updateScoreboard();
  clearTray();

  if (currentLives === 0) {
    endShift(
      `${message} No lives left. Shift over! Final score: ${currentScore}.`,
    );
    return;
  }

  pickRandomDrink();
  patienceSeconds = currentCustomerPatience;
  updatePatience();
  setServiceEnabled(true);
  gameMessage.textContent = `${message} The next customer is waiting.`;
}

function resetShift() {
  stopTimer();
  remainingSeconds = roundLength;
  servedCount = 0;
  currentScore = 0;
  currentTips = 0;
  currentCombo = 0;
  bestCombo = 0;
  correctOrderCount = 0;
  wrongOrderCount = 0;
  currentLives = startingLives;
  currentCustomerType = null;
  timerDisplay.textContent = formatTime(remainingSeconds);
  updateScoreboard();
  updateLives();
  pauseButton.disabled = false;
  pickRandomDrink();
  patienceSeconds = currentCustomerPatience;
  updatePatience();
  clearTray();
  setServiceEnabled(true);
  gameMessage.textContent = `A customer is waiting for their ${currentOrderDrink}.`;
}

function beginShift() {
  clickSound.currentTime = 0;
  clickSound.play();
  resetShift();
  showScreen("gameplay");
  startTimer();
  // Start background music if sound is enabled
  if (soundEnabled && backgroundMusic) {
    backgroundMusic.play().catch(() => {
      // Autoplay policy may prevent playback until user interaction
    });
  }
}

function pauseShift() {
  if (remainingSeconds === 0) {
    return;
  }
  clickSound.currentTime = 0;
  clickSound.play();
  stopTimer();
  pauseDialog.showModal();
  resumeButton.focus();
}

function resumeShift() {
  clickSound.currentTime = 0;
  clickSound.play();
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

function showSettings(event) {
  settingsReturnFocus = event.currentTarget;
  if (settingsReturnFocus === gameplaySettingsButton) {
    stopTimer();
  }
  settingsDialog.showModal();
  settingsSoundButton.focus();
}

playButton.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();
  beginShift();
});
howToButton.addEventListener("click", () => showScreen("how-to"));
menuSettingsButton.addEventListener("click", showSettings);
gameplaySettingsButton.addEventListener("click", showSettings);
pauseSettingsButton.addEventListener("click", showSettings);
closeSettingsButton.addEventListener("click", () => settingsDialog.close());
backButton.addEventListener("click", () => showScreen("menu"));
guideDoneButton.addEventListener("click", () => showScreen("menu"));
highScoresButton.addEventListener("click", showHighScores);
closeHighScoresButton.addEventListener("click", () => highScoresDialog.close());

pauseButton.addEventListener("click", pauseShift);
resumeButton.addEventListener("click", resumeShift);
playAgainButton.addEventListener("click", beginShift);
gameOverMenuButton.addEventListener("click", () => showScreen("menu"));

restartButton.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();
  pauseDialog.close();
  resetShift();
  startTimer();
  pauseButton.focus();
});

exitGameButton.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();
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

settingsDialog.addEventListener("close", () => {
  if (
    remainingSeconds > 0 &&
    gameplayScreen.hidden === false &&
    !pauseDialog.open &&
    timerInterval === null
  ) {
    startTimer();
  }
  if (settingsReturnFocus?.isConnected) {
    settingsReturnFocus.focus();
  }
  settingsReturnFocus = null;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && pauseDialog.open) {
    event.preventDefault();
    resumeShift();
  }
});

ingredientButtons.forEach((button) => {
  button.addEventListener("click", () => {
    clickHoverSound.currentTime = 0;
    clickHoverSound.play();
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
  clickSound.currentTime = 0;
  clickSound.play();
  clearTray();
  gameMessage.textContent =
    "The tray is clear. Choose the ingredients for the order.";
});

prepareButton.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();
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
  clickSound.currentTime = 0;
  clickSound.play();
  if (!drinkPrepared || remainingSeconds === 0) {
    return;
  }

  const recipe = recipes[currentOrderDrink];
  const isCorrect =
    selectedIngredients.size === recipe.size &&
    [...recipe].every((ingredient) => selectedIngredients.has(ingredient));

  if (!isCorrect) {
    showEffect("effect-wrong");
    missOrder(
      "That recipe was incorrect. One life was lost and the combo ended.",
    );
    return;
  }

  const tipAmount = Math.floor(correctOrderTip * customerTypes[currentCustomerType].tipMultiplier);
  const secondsTaken = orderStartRemainingSeconds - remainingSeconds;
  const fastServiceAllowed = startingPatience * fastServiceThreshold;
  const isFastService = secondsTaken <= fastServiceAllowed;

  currentScore += correctOrderPoints;
  currentTips += tipAmount;

  if (isFastService) {
    currentScore += fastServiceBonus;
  }

  const comboBonus = comboRewardPoints * currentCombo;
  currentScore += comboBonus;

  currentCombo += 1;
  bestCombo = Math.max(bestCombo, currentCombo);
  correctOrderCount += 1;
  servedCount += 1;
  updateScoreboard();
  pickRandomDrink();
  patienceSeconds = currentCustomerPatience;
  updatePatience();

  let message = `Correct order! +${correctOrderPoints} points`;
  if (isFastService) {
    message += `, +${fastServiceBonus} fast service`;
  }
  if (comboBonus > 0) {
    message += `, +${comboBonus} combo`;
  }
  message += ` and $${tipAmount} tip. Combo ×${currentCombo}!`;
  gameMessage.textContent = message;
  showEffect("effect-correct");
  showEffect("effect-coin");
  clearTray();
  setServiceEnabled(true);
});

settingsSoundButton.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();
  setSoundEnabled(!soundEnabled);
});

backgroundMusicVolumeControls.forEach((control) => {
  control.addEventListener("input", () => {
    setBackgroundMusicVolume(Number(control.value) / 100);
  });
});

/* Volume control keyboard shortcuts */
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && backgroundMusic) {
    event.preventDefault();
    backgroundMusicVolume = adjustBackgroundMusicVolume(volumeStep);
    gameMessage.textContent = `Background music volume: ${Math.round(backgroundMusicVolume * 100)}%`;
  } else if (event.key === "ArrowDown" && backgroundMusic) {
    event.preventDefault();
    backgroundMusicVolume = adjustBackgroundMusicVolume(-volumeStep);
    gameMessage.textContent = `Background music volume: ${Math.round(backgroundMusicVolume * 100)}%`;
  } else if (event.key === "PageUp") {
    event.preventDefault();
    clickSoundVolume = adjustClickSoundVolume(volumeStep);
    gameMessage.textContent = `Click sound volume: ${Math.round(clickSoundVolume * 100)}%`;
  } else if (event.key === "PageDown") {
    event.preventDefault();
    clickSoundVolume = adjustClickSoundVolume(-volumeStep);
    gameMessage.textContent = `Click sound volume: ${Math.round(clickSoundVolume * 100)}%`;
  }
});

highScoresDialog.addEventListener("close", () => highScoresButton.focus());

loadSavedSettings();
