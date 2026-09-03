import { clamp } from "../core/scroll.js";

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function formatValue(el, value) {
  const prefix = el.dataset.prefix ?? "";
  const suffix = el.dataset.suffix ?? "";
  const decimals = Number(el.dataset.decimals ?? 0);

  if (decimals > 0) {
    return `${prefix}${value.toFixed(decimals)}${suffix}`;
  }

  return `${prefix}${Math.round(value)}${suffix}`;
}

export function initStatsCountUp() {
  const section = document.querySelector(".stats");
  if (!section) return;

  const nums = section.querySelectorAll(".stats__num");
  let started = false;

  const animate = () => {
    if (started) return;
    started = true;

    const duration = 2000;
    const start = performance.now();

    const targets = Array.from(nums).map((el) => ({
      el,
      target: Number(el.dataset.count),
    }));

    const frame = (now) => {
      const t = clamp((now - start) / duration);
      const eased = easeOutCubic(t);

      targets.forEach(({ el, target }) => {
        el.textContent = formatValue(el, target * eased);
      });

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        targets.forEach(({ el, target }) => {
          el.textContent = formatValue(el, target);
        });
      }
    };

    requestAnimationFrame(frame);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          animate();
          observer.disconnect();
        }
      });
    },
    { threshold: [0.35, 0.5] }
  );

  observer.observe(section);
}
