# CAFE RUSH | GAME DESIGN DOCUMENT

**2D Pixel-Art Arcade • Fast-Paced Café Management**

A browser-based arcade game where players take customer orders, prepare drinks, and serve them before their patience runs out.

**PROJECT BLUEPRINT**
HTML • CSS • JavaScript • HTML Canvas • localStorage

*Prepared as a development guide for the Cafe Rush school project.*

---

## 1. Game Overview

- **Game title:** Cafe Rush
- **Genre:** 2D Arcade / Time Management
- **Visual style:** Pixel art with a warm, cozy coffee-shop theme
- **Platform:** Desktop browser, with responsive layout support
- **Controls:** Mouse and touch for selecting ingredients and serving orders
- **Technology:** HTML, CSS, JavaScript, HTML Canvas, and localStorage
- **Core objective:** Serve as many customers as possible before the round ends. Prepare the correct drinks quickly, maintain customer patience, and achieve the highest score without losing all lives.

### Design Direction

The game should look like a warm, inviting café while the actual gameplay feels quick and energetic. Use clear order cards, readable timers, simple ingredient icons, and visible feedback for correct and incorrect actions.

### Suggested Color Palette

| Color | Hex | Suggested use |
|---|---|---|
| Coffee Brown | #3B241B | Main headings, dark panels |
| Espresso | #754C35 | Buttons, borders, secondary surfaces |
| Caramel | #C99B69 | Highlights, timers, rewards |
| Cream | #F3E6D0 | Backgrounds and cards |
| Sage | #A7B58B | Success states and accents |

---

## 2. Main Screens and Interface

The game should contain five main screens. Each screen has a specific purpose and should be easy to navigate.

### A. Main Menu

Display the Cafe Rush title and café background. Include Play, How to Play, High Scores, and Sound Settings. The Play button starts a new round.

### B. How to Play

Explain the basic sequence: wait for a customer, read the order, select the correct ingredients, prepare the drink, and serve it before patience reaches zero. Include a short sample order.

### C. Gameplay Screen

This is the main screen and should be divided into four areas:

| Area | Contents and purpose |
|---|---|
| Top bar | Round timer, money, score, customers served, and lives. |
| Customer area | Visible customers, their requested drinks, and patience bars. |
| Preparation area | Ingredient buttons, preparation tray, and Prepare action. |
| Bottom controls | Serve Order, Pause, sound toggle, and current combo. |

### D. Pause Screen

Provide Resume, Restart, Sound On/Off, and Main Menu options. The game timer and customer patience timers should stop while paused.

### E. Game Over Screen

Show final score, customers served, correct orders, wrong orders, best combo, and whether a new high score was achieved. Include Play Again and Main Menu actions.

---

## 3. Core Gameplay Loop

| Step | Gameplay action |
|---|---|
| 1. Customer arrives | A customer appears in the waiting area. |
| 2. Order is shown | The customer requests one drink from the available menu. |
| 3. Prepare drink | The player selects the ingredients listed in the recipe. |
| 4. Check recipe | The game checks whether the selected ingredients match the order. |
| 5. Serve customer | A correct drink earns points and money. The customer leaves. |
| 6. Continue | Another customer arrives. The game becomes harder as time passes. |

---

## 4. Drink Menu and Recipes

Start with four drinks. Keep recipes fixed in the first version so players can learn the ingredient combinations.

| Drink | Required ingredients | Reward |
|---|---|---|
| Iced Latte | Espresso + Milk + Ice | ■50 |
| Cappuccino | Espresso + Milk Foam | ■55 |
| Mocha | Espresso + Milk + Chocolate | ■65 |
| Americano | Espresso + Water | ■45 |

### Preparation Interaction

The player clicks ingredients to add them to a preparation tray. The player then clicks Prepare. The game compares the selected ingredients with the requested recipe. If they match, the drink becomes ready to serve. If they do not match, the player receives a mistake penalty.

> **Implementation note:** Ingredient order should not matter unless the project later introduces drink-making steps. Compare ingredient sets so the same recipe is accepted regardless of click order.

---

## 5. Customer System

Customers appear at random intervals. Each customer has a drink order and a patience timer. The first version should use one standard customer type. Additional customer types can be added after the core loop works.

| Customer type | Behavior (optional later feature) |
|---|---|
| Regular | Normal patience and standard reward. |
| Impatient | Shorter waiting time. |
| Generous | Provides a bonus reward when served. |
| VIP | Higher reward and a more demanding order. |

### Patience Indicator

Use a bar above or beside each customer. Green indicates comfortable waiting time, yellow indicates impatience, and red indicates the customer is close to leaving. When patience reaches zero, the customer leaves.

---

## 6. Scoring and Rewards

| Action | Score effect |
|---|---|
| Correct order | +100 points |
| Fast service bonus | +50 points |
| Combo reward | +25 points |
| Wrong preparation | −30 points |
| Customer leaves | −20 points and lose one life |

A combo is a streak of consecutive correct orders. A wrong preparation or a customer leaving resets the combo. The exact bonus rules can be adjusted during playtesting.

---

## 7. Round Rules and Difficulty

| Rule | Initial setting |
|---|---|
| Round duration | 90 seconds |
| Starting lives | 3 |
| Maximum waiting customers | 3 |
| Available drinks | 4 |
| Correct order | +100 points |
| Wrong preparation | −30 points |
| Customer leaves | −1 life |
| High score | Saved using localStorage |

### Game Over Conditions

The round ends when the 90-second timer reaches zero or when the player loses all three lives.

### Difficulty Progression

| Elapsed time | Difficulty | Suggested change |
|---|---|---|
| 0–20 seconds | Easy | Longer customer arrival intervals and patience. |
| 21–40 seconds | Normal | Customers arrive more often. |
| 41–60 seconds | Hard | Shorter patience and more active orders. |
| 61–90 seconds | Expert | Fast arrivals and less time to serve. |

Difficulty should increase gradually. Avoid making the game unfair by spawning more customers than the interface can display or the player can reasonably serve.

---

## 8. Suggested Technical Architecture

The project can run entirely in the browser. No backend or database server is required for the first version.

| Technology | Responsibility |
|---|---|
| HTML | Page structure and screen containers. |
| CSS | Layout, styling, responsive design, and interface feedback. |
| JavaScript | Game state, customer logic, orders, recipes, timers, and scoring. |
| HTML Canvas | Rendering the café environment, customers, and simple animations. |
| localStorage | Saving the player's best score on the same browser. |

### Recommended Hybrid Interface

Use HTML and CSS for menus, buttons, order cards, statistics, and ingredient controls. Use Canvas for the café environment, customer sprites, character movement, and visual effects. This keeps the interface accessible and easier to update than drawing every element inside Canvas.

### Suggested Project Structure

```
cafe-rush/
├── index.html
├── styles/
│   ├── main.css
│   ├── base.css
│   ├── menu.css
│   ├── gameplay.css
│   └── responsive.css
├── scripts/
│   ├── game.js
│   ├── config/
│   ├── core/
│   ├── systems/
│   └── ui/
└── assets/
    ├── background/
    ├── customers/
    ├── drinks/
    └── sounds/
```

### Suggested JavaScript Modules

| System | Responsibility |
|---|---|
| Game Manager | Controls menu, playing, paused, and game-over states. |
| Customer Manager | Creates, updates, and removes customers. |
| Order Manager | Creates random drink orders. |
| Recipe Manager | Checks ingredient combinations. |
| Timer Manager | Controls round and patience timers. |
| Score Manager | Calculates points, money, and combos. |
| Storage Manager | Reads and writes the high score using localStorage. |

---

## 9. JavaScript Data Design

A recipe object can store each drink and its required ingredients. This makes it easy to add new drinks later.

```javascript
const recipes = {
  latte: ["espresso", "milk", "ice"],
  cappuccino: ["espresso", "milk_foam"],
  mocha: ["espresso", "milk", "chocolate"],
  americano: ["espresso", "water"]
};
```

Other useful data objects include:

| Data | Example properties |
|---|---|
| Customer | id, name, order, patience, patienceMax, status |
| Order | drinkId, requiredIngredients, reward |
| Game state | screen, timeRemaining, score, money, lives, combo |
| Player record | highScore, totalCustomersServed |

---

## 10. Development Roadmap

| Phase | Tasks | Completion goal |
|---|---|---|
| 1. Foundation | Build menu and gameplay layout; add start, pause, restart, and round timer. | The game starts, pauses, and ends correctly. |
| 2. Core gameplay | Generate customers and orders; add ingredient selection, recipe checking, and serving. | A complete customer order can be processed. |
| 3. Arcade systems | Add patience, score, combos, lives, penalties, and difficulty progression. | The game has a complete challenge and scoring loop. |
| 4. Polish | Add pixel-art assets, animations, sounds, high-score saving, and responsive layout. | The game looks and feels finished. |

### Recommended First Milestone

Build one customer, four recipes, ingredient selection, and a working Serve button. Confirm that a correct order is accepted and an incorrect order is rejected. Add multiple customers, timers, and scoring only after this small gameplay loop works reliably.

---

## 11. Scope and Features

Build the required gameplay first. Treat customer variety, café upgrades, unlockable drinks, and advanced animations as optional extensions rather than requirements for the first playable version.

| Core version | Optional extensions |
|---|---|
| Main menu and instructions | Additional customer appearances |
| Four drink recipes | More drinks and special recipes |
| Customer orders and patience | Different customer personalities |
| Ingredient selection and serving | Café upgrades and unlocks |
| Timer, lives, and score | Achievements and daily challenges |
| Game-over and restart | Soundtrack and extra visual effects |
| High score in localStorage | Additional statistics |

---

## 12. Final Game Summary

Cafe Rush is a browser-based 2D arcade game about managing a busy coffee shop. Players receive customer orders, select the correct ingredients, prepare drinks, and serve customers before their patience runs out. The game uses a 90-second round, three lives, four initial drink recipes, score bonuses, and gradually increasing difficulty. Its first version can be built with HTML, CSS, JavaScript, Canvas, and localStorage.

The best development approach is to complete a small, working order-management loop first, then add the timer, customer queue, scoring, difficulty, and visual polish in stages.
