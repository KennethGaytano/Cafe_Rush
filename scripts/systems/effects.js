import { dom } from "../core/dom.js";

export function showEffect(effectClass, durationMs = 550) {
  dom.effectImgs.forEach((img) => {
    if (img.classList.contains(effectClass)) {
      img.classList.remove("show");
      // Force reflow to restart animation
      void img.offsetWidth;
      img.classList.add("show");
      setTimeout(() => img.classList.remove("show"), durationMs);
    }
  });
}
