// Round length, starting resources, and score rewards are kept together for easy tuning.
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
const volumeStep = 0.1;

// Customer settings control patience, tips, and which portrait is displayed.
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

const storageKeys = {
  soundEnabled: "cafeRush.soundEnabled",
  backgroundMusicVolume: "cafeRush.backgroundMusicVolume",
  highScore: "cafeRush.highScore",
};

// Recipes use Sets so ingredient order does not affect a match.
const recipes = {
  Americano: new Set(["espresso", "water"]),
  Cappuccino: new Set(["espresso", "milk-foam"]),
  "Iced Latte": new Set(["espresso", "milk", "ice"]),
  Mocha: new Set(["espresso", "milk", "chocolate"]),
};

export const config = {
  roundLength,
  startingLives,
  startingPatience,
  correctOrderPoints,
  correctOrderTip,
  incorrectOrderPenalty,
  customerLeavePenalty,
  fastServiceBonus,
  comboRewardPoints,
  fastServiceThreshold,
  volumeStep,
  customerTypes,
  storageKeys,
  recipes,
};
