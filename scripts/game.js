import { initIntro } from "./core/intro.js";
import { loadSavedSettings } from "./systems/settings.js";
import { bindGameEvents } from "./ui/events.js";

loadSavedSettings();
bindGameEvents();
initIntro();
