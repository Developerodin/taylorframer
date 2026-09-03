const SLIDES = [
  {
    quote:
      "Working with them was seamless from start to finish. They understood our vision, elevated it with thoughtful design, and delivered results that truly set our brand apart.",
    name: "Aisha Okafor",
    role: "Founder",
    image:
      "https://framerusercontent.com/images/antmDkZCNxxn6lFKhbu3P1xtumY.png",
  },
  {
    quote:
      "They brought clarity to a messy brief and turned it into a brand system we still use every day. The process felt collaborative without losing creative direction.",
    name: "Marcus Chen",
    role: "CEO",
    image:
      "https://framerusercontent.com/images/antmDkZCNxxn6lFKhbu3P1xtumY.png",
  },
  {
    quote:
      "From first concepts to final delivery, every detail felt intentional. Our site finally looks as sharp as the product we ship.",
    name: "Elena Rossi",
    role: "Product Lead",
    image:
      "https://framerusercontent.com/images/antmDkZCNxxn6lFKhbu3P1xtumY.png",
  },
];

export function initTestimonials() {
  const root = document.querySelector(".testimonials");
  if (!root) return;

  const quoteEl = root.querySelector("[data-testimonial-quote]");
  const nameEl = root.querySelector("[data-testimonial-name]");
  const roleEl = root.querySelector("[data-testimonial-role]");
  const imgEl = root.querySelector("[data-testimonial-image]");
  const prevBtn = root.querySelector('[data-testimonial-nav="prev"]');
  const nextBtn = root.querySelector('[data-testimonial-nav="next"]');
  const slide = root.querySelector(".testimonials__slide");

  if (!quoteEl || !nameEl || !roleEl || !imgEl || !slide) return;

  let index = 0;
  let locked = false;

  const render = (nextIndex) => {
    if (locked) return;
    locked = true;
    slide.classList.add("is-fading");

    window.setTimeout(() => {
      const item = SLIDES[nextIndex];
      quoteEl.textContent = `“${item.quote}”`;
      nameEl.textContent = item.name;
      roleEl.textContent = item.role;
      imgEl.src = item.image;
      imgEl.alt = item.name;
      index = nextIndex;
      slide.classList.remove("is-fading");
      locked = false;
    }, 280);
  };

  prevBtn?.addEventListener("click", () => {
    render((index - 1 + SLIDES.length) % SLIDES.length);
  });

  nextBtn?.addEventListener("click", () => {
    render((index + 1) % SLIDES.length);
  });
}
