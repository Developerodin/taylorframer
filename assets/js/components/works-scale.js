import { getEnterProgress, lerp, onScroll } from "../core/scroll.js";

/**
 * Works grid scroll-scale: scale 0.7→1, translateY 50→0.
 */
export function initWorksScale(lenis) {
  const items = document.querySelector("[data-scroll-scale]");
  if (!items) return;

  onScroll(lenis, ({ viewportH }) => {
    const progress = getEnterProgress(items, viewportH, 0.25);
    const scale = lerp(0.7, 1, progress);
    const y = lerp(50, 0, progress);
    items.style.transform = `translateY(${y}px) scale(${scale})`;
  });
}
