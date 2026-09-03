/**
 * Scroll progress helpers shared across motion modules.
 */

export function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * Progress 0→1 of an element crossing the viewport (top enters → bottom leaves).
 */
export function getElementProgress(el, scrollY, viewportH) {
  const rect = el.getBoundingClientRect();
  const top = rect.top + scrollY;
  const height = rect.height;
  const start = top - viewportH;
  const end = top + height;
  return clamp((scrollY - start) / (end - start));
}

/**
 * Progress while element travels through viewport — good for scale-in effects.
 * 0 when bottom of viewport hits top of el; 1 when el top reaches ~20% from top.
 */
export function getEnterProgress(el, viewportH, settleRatio = 0.35) {
  const rect = el.getBoundingClientRect();
  const start = viewportH;
  const end = viewportH * settleRatio;
  const current = rect.top;
  if (current >= start) return 0;
  if (current <= end) return 1;
  return clamp((start - current) / (start - end));
}

export function onScroll(lenis, callback) {
  const run = () => {
    const scrollY = lenis ? lenis.scroll : window.scrollY || window.pageYOffset;
    const viewportH = window.innerHeight;
    callback({ scrollY, viewportH });
  };

  if (lenis) {
    lenis.on("scroll", run);
  } else {
    window.addEventListener("scroll", run, { passive: true });
  }

  window.addEventListener("resize", run, { passive: true });
  run();

  return run;
}
