import { onScroll } from "../core/scroll.js";

/**
 * Sticky hero exit: translateY ≈ -0.2 × scrollY while pinned.
 */
export function initHeroParallax(lenis) {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  onScroll(lenis, ({ scrollY }) => {
    const heroHeight = hero.offsetHeight;
    if (scrollY > heroHeight) {
      hero.style.transform = `translateY(${-0.2 * heroHeight}px)`;
      return;
    }
    hero.style.transform = `translateY(${-0.2 * scrollY}px)`;
  });
}
