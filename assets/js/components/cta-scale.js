import { getEnterProgress, lerp, onScroll } from "../core/scroll.js";

/**
 * CTA background scale settle: 1.2 → 1.
 */
export function initCtaScale(lenis) {
  const img = document.querySelector("[data-scroll-scale-bg]");
  if (!img) return;

  onScroll(lenis, ({ viewportH }) => {
    const progress = getEnterProgress(img.parentElement ?? img, viewportH, 0.2);
    const scale = lerp(1.2, 1, progress);
    img.style.transform = `scale(${scale})`;
  });
}
