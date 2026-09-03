export function initNav(lenis) {
  const nav = document.querySelector(".nav");
  const hero = document.querySelector(".hero");
  const menuBtn = document.querySelector(".nav__menu");
  const drawer = document.querySelector(".nav__drawer");
  const closeBtn = document.querySelector(".nav__drawer-close");
  const drawerLinks = drawer?.querySelectorAll("a") ?? [];
  const darkSections = document.querySelectorAll(
    ".services, .cta, .footer"
  );

  if (!nav || !hero) return;

  const isOverDarkSurface = () => {
    const navMid = nav.offsetHeight / 2;
    const sampleX = Math.min(120, window.innerWidth / 2);

    for (const section of darkSections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= navMid && rect.bottom >= navMid) {
        return true;
      }
    }

    const heroBottom = hero.getBoundingClientRect().bottom;
    if (heroBottom > nav.offsetHeight + 8) {
      return true;
    }

    // Fallback: sample a point under the nav
    const el = document.elementFromPoint(sampleX, navMid);
    if (!el) return false;
    let node = el;
    while (node && node !== document.body) {
      if (
        node.classList?.contains("services") ||
        node.classList?.contains("cta") ||
        node.classList?.contains("footer") ||
        node.classList?.contains("hero")
      ) {
        return true;
      }
      node = node.parentElement;
    }
    return false;
  };

  const updateTheme = () => {
    const onDark = isOverDarkSurface();
    nav.classList.toggle("is-dark", !onDark);
  };

  const openDrawer = () => {
    drawer?.classList.add("is-open");
    drawer?.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("lenis-stopped");
    lenis?.stop();
  };

  const closeDrawer = () => {
    drawer?.classList.remove("is-open");
    drawer?.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("lenis-stopped");
    lenis?.start();
  };

  menuBtn?.addEventListener("click", openDrawer);
  closeBtn?.addEventListener("click", closeDrawer);
  drawerLinks.forEach((link) => link.addEventListener("click", closeDrawer));

  if (lenis) {
    lenis.on("scroll", updateTheme);
  } else {
    window.addEventListener("scroll", updateTheme, { passive: true });
  }

  window.addEventListener("resize", updateTheme, { passive: true });
  updateTheme();
}
