import { state } from "../core/state.js";

// Sound effects and the music player share the volume settings below.
export const clickSound = new Audio("assets/sounds/click.mp3");
clickSound.volume = state.clickSoundVolume;

export const clickHoverSound = new Audio("assets/sounds/click.mp3");
clickHoverSound.volume = state.clickSoundVolume;

export const backgroundMusic = new Audio("assets/sounds/background-music.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = state.backgroundMusicVolume;

// These sounds are present in assets/sounds and are played by game events.
export const correctServeSound = new Audio("assets/sounds/correct-serve.mp3");
export const comboMilestoneSound = new Audio("assets/sounds/combo-milestone.mp3");
export const incorrectOrderSound = new Audio("assets/sounds/incorrect-order.mp3");
export const timerWarningSound = new Audio("assets/sounds/timer-warning.mp3");
export const shiftOverSound = new Audio("assets/sounds/shift-over.mp3");
