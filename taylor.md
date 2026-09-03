# Taylor Designer — Full Site Recreation Spec

**Source:** [https://taylordesigner.framer.website/](https://taylordesigner.framer.website/)  
**Scraped:** 2026-09-03  
**Page type:** Single-page portfolio homepage (Framer)  
**Purpose of this file:** Structured HTML/CSS + animation reference so the homepage can be recreated in any stack.

---

## 0. Limitations (read first)

| Limitation | Detail |
|---|---|
| **Not raw Framer HTML** | Framer emits hashed class names (`framer-xxxxx`) and inline motion runtime. Dumping that DOM is useless for recreation. This file uses **semantic reconstructable HTML/CSS** measured from computed styles. |
| **Scroll timelines are JS** | Most scroll animations are Framer Motion / scroll-linked transforms, not CSS `@keyframes`. Curves below are **observed + approximated**. Exact spring/bezier values are not fully extractable from the published site. |
| **Appear animations already finished** | By scrape time, page-load appear animations had completed (`opacity:1`). Initial “from” states are inferred from `data-framer-appear-id` + `will-change: transform` patterns. |
| **Hover micro-interactions** | Fully enumerating every hover (link underline, image scale, button fill) would need exhaustive interaction recording. Documented where observed; some may be incomplete. |
| **CDN assets** | Images are hosted on `framerusercontent.com`. For production recreation, re-host assets you have rights to use. |
| **Homepage only** | This scrape covers the **homepage sections**. Routes `/work`, `/about`, `/blog`, `/contact` and case studies were **not** fully scraped. |
| **Stats mid-animation** | Counter targets confirmed after settle: **47+**, **$1.0m**, **98%**, **10+**. |
| **Live clock** | `NY : HH:MM AM/PM` is a live timezone clock (America/New_York), not static text. |

### Questions for you (please answer when ready)

1. **Stack target?** Plain HTML/CSS/JS, Next.js, Framer rebuild, Webflow, or something else?
2. **Scope?** Homepage only, or also Work / About / Blog / Contact + case study pages?
3. **Assets?** Reuse Framer CDN URLs for prototyping, or replace with your own photography/brand?
4. **Fidelity?** Pixel-close clone, or “same structure/feel” redesign with your content?
5. **Should I start implementing** from this spec into working code next?

---

## 1. Design system

### 1.1 Color tokens (from Framer CSS vars + computed styles)

| Token / role | Value | Usage |
|---|---|---|
| `--token-a087…` / page bg | `#FFFFFF` | Body, light sections |
| `--token-234bf…` / text | `#000000` | Primary text |
| `--token-137d2a…` | `#000000` | Black UI |
| `--token-5f72bc…` | `#111111` | Near-black |
| `--token-f8c6fc…` | `#111112` | Footer / dark surfaces |
| `--token-bc650f…` | `#696969` | Muted meta text |
| `--token-edd876…` | `#F7F7F7` | Soft gray surfaces |
| Services / dark section | `#000000` | Full black section bg |
| Hero overlay gradient | `transparent → #000` | Bottom fade on hero image |ou 
| Hero photo dominant | Saturated red (~`#C41E1E`–`#E31C1C` in image) | In photo, not a CSS fill |
| CTA overlay | `rgba(18,18,18,0.5)` | Semi-transparent dark over footer image |
| Nav on hero | `#FFFFFF` | White links/logo |
| Nav on light sections | `#000000` | Black links/logo |

### 1.2 Typography

| Family | Weights / styles | Role |
|---|---|---|
| **Inter Display** | 400, 500, 600, 700; italic 600/700 | Display + UI text (primary) |
| **Inter** | 400 | Fallback / body support |

**Letter-spacing pattern:** typically `-0.03em` (Framer `--framer-letter-spacing: -.03em`). Large display: ~`-3%` of font size (e.g. 84px → `-2.52px`, 90–160px → `-2.7px`+).

### 1.3 Spacing rhythm

| Token | Value | Where |
|---|---|---|
| Page horizontal pad (desktop ≥1200) | `40px` | Most sections |
| Page horizontal pad (≤809 / tablet) | `16px` | Mobile + tablet |
| Section top pad | `80px` (many sections) | Intro, Services, Process |
| Section bottom pad | `120px` | Most content sections |
| Section internal gap | `64px` or `32px` | Intro/Works/Services vs Stats/Blogs |
| Nav height | `60px` | `padding: 18px 40px` |
| Hairline / divider | ~`1–3px` black line | Under section headers |

### 1.4 Radii & controls

| Element | Radius |
|---|---|
| Primary buttons (`Dark` / read-more style) | `4px` |
| Article cards / images | ~`12–16px` (visually rounded) |
| Generic | Mostly `0` (sharp editorial look) |

### 1.5 Global CSS baseline (recreate)

```css
:root {
  --bg: #ffffff;
  --fg: #000000;
  --muted: #696969;
  --dark: #000000;
  --dark-soft: #111112;
  --surface: #f7f7f7;
  --pad-x: 40px;
  --pad-section-y-top: 80px;
  --pad-section-y-bottom: 120px;
  --nav-h: 60px;
  --font: "Inter Display", Inter, sans-serif;
  --ls: -0.03em;
}

@media (max-width: 809px) {
  :root { --pad-x: 16px; }
}

html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }

*, *::before, *::after { box-sizing: border-box; }
html, body {
  margin: 0;
  padding: 0;
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font);
  -webkit-font-smoothing: antialiased;
}

img { display: block; max-width: 100%; height: auto; object-fit: cover; }
a { color: inherit; text-decoration: none; }
```

---

## 2. Breakpoints (from Framer media queries)

| Name | Range | Nav variant | Typical pad-x |
|---|---|---|---|
| **Desktop** | `min-width: 1200px` | `Desktop - White` + desktop links + NY clock | `40px` |
| **Tablet** | `810px` – `1199px` | `Menu` (hamburger text) | `16px` |
| **Mobile** | `max-width: 809px` | `Menu` | `16px` |

Observed viewports measured:

| Viewport | Hero h | Art Director size | Intro H1 | Notes |
|---|---|---|---|---|
| **1440×900** | 900 | **160px** | **84px** | Full desktop; title can clip/overflow intentionally |
| **~977×954** | 859 | **90px** | ~scaled | Mid desktop / large laptop |
| **768×1024** | 922 | **52px** | **44px** | Tablet layout; hero text reflow |
| **390×844** | 760 | **52px** | **44px** | Mobile; stacked overlays |

---

## 3. Page architecture

### 3.1 Section order (homepage)

| # | Framer name | Public label | BG |
|---|---|---|---|
| 00 | `Desktop - White` / `Mobile - White` | Sticky nav | Transparent → adapts |
| 01 | `Hero` | Hero | Full-bleed photo + noise |
| 02 | `Introduction` | About Us | White |
| 03 | `Works` | Selected Works | White |
| 04 | `Services` | Services | Black |
| 05 | `Process` | Process | White |
| 06 | `Testimonials` | Testimonials | Transparent / white context |
| 07 | `Statistics` | Stats & Facts | Transparent / white |
| 08 | `Blogs` | Articles | White |
| 09 | CTA + Footer | “Let’s make something…” | Photo + dark overlay |

Total scroll height (approx): **~10,100px** at 1440; **~13,800px** at mobile.

### 3.2 Repeated section chrome (header row)

Every numbered section uses the same meta row:

```
[ NN ] -------------------- [ ( Section Name ) ] -------- [ © 2026 ]
```

- Font: Inter Display, **16px / 600**, letter-spacing `-0.48px`, line-height `16px`
- Thin black horizontal rule beneath
- On Services (black bg): meta text + line invert to **white** (`White Line`)

---

## 4. Animation catalog (site-wide)

### A1. Lenis smooth scroll (global)

- `html` classes: `lenis lenis-smooth`
- Replaces native scroll with inertia/smooth scrolling
- Recreate with [Lenis](https://github.com/darkroomengineering/lenis) or similar

```js
// conceptual
const lenis = new Lenis({ lerp: 0.1 /* approx */ });
function raf(t){ lenis.raf(t); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
```

### A2. Page-load appear (Framer Appear)

Elements with `data-framer-appear-id` + `will-change: transform`:

| Layer | Likely appear |
|---|---|
| Hero `BG Image` | Fade / subtle scale in |
| Hero service list `Text` | Fade + rise |
| `Art Director` | Fade + rise (transform) |
| `+ Designer` | Fade + rise (transform) |
| Intro `Light` / buttons | Fade |

**Approx recreate:**

```css
@keyframes rise-fade {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: none; }
}
.appear {
  animation: rise-fade 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.appear-d1 { animation-delay: 0.1s; }
.appear-d2 { animation-delay: 0.2s; }
.appear-d3 { animation-delay: 0.35s; }
```

### A3. Sticky hero exit (section → section)

- `Hero` is `position: sticky; top: 0; will-change: transform`
- As user scrolls into Introduction, hero stays pinned while white Intro **covers** it
- Additional scroll-linked `transform: translateY(-0.2 * scrollY)` observed while sticky is active (parallax-ish exit speed)

**Observed samples:**

| scrollY | Hero transform |
|---|---|
| 0 | `none` |
| 200 | `translateY(-40)` |
| 400 | `translateY(-80)` |
| 700 | `translateY(-140)` |

→ roughly **translateY = -0.2 × scrollY** during early scroll.

**Recreate pattern:** sticky hero + next section `position:relative; z-index:2; background:#fff`.

### A4. Works grid scroll-scale (signature)

`Items` container animates from scaled-down → full size as it enters viewport:

| State | transform |
|---|---|
| Far / early | `scale(0.7) translateY(50px)` |
| Mid | `scale(0.76…0.94)` with reducing Y |
| Settled | `scale(1)` / `none` |

**Recreate (scroll-linked):**

```js
// progress 0→1 while Items intersects viewport
const scale = 0.7 + 0.3 * progress;
const y = 50 * (1 - progress);
el.style.transform = `translateY(${y}px) scale(${scale})`;
```

### A5. Footer / CTA background scale

Second `BG Image` (CTA photo):

| Off-screen / early | `scale(1.2)` |
| Mid enter | `scale(1.11…)` |
| Settled | `scale(1)` |

Classic “image settles on scroll” effect.

### A6. Stats count-up

On enter viewport, numbers animate **0 → target**:

| Metric | Target |
|---|---|
| projects delivered | **47+** |
| raised by clients | **$1.0m** |
| client satisfaction | **98%** |
| years of experience | **10+** |

Duration ~1.5–2.5s ease-out (observed mid values then settle).

### A7. Noise overlay (static texture, not animated)

- Layer `Noise`, `pointer-events: none`, absolute, high coverage
- Background image: `https://framerusercontent.com/images/WXwwArEbCEXxVkbbiaI5FD2o.png` (150×150 tile)
- Gives film-grain over hero (and possibly global)

### A8. Mix-blend hero titles

Containers `Art Director` and `+ Designer` use **`mix-blend-mode: difference`** so large type interacts with the photo (white type becomes “reactive”).

### A9. Testimonial carousel

- Controls: Framer layers `Previous` / `Next` (display:block)
- Quote + attribution swap on click (same visual template)
- Likely fade or crossfade between slides (exact timing not instrumented)

### A10. Nav theme swap

- On hero: white logo/links over image
- After scrolling onto light sections: black logo/links (`Desktop - White` variant naming)
- Mobile: `Menu` text button replaces link row

### A11. Live NY clock

Text node updates every minute/second: `NY : 6:04 AM` style.

### A12. Button / link transitions

Many named layers have `transition: all` (Framer default). Expect:

- Opacity hover on nav links (~0.6–1)
- Button fill invert on hover for black “Read more” / “All works”
- Image slight scale or overlay on work/blog cards (typical; confirm in build)

### A13. CSS keyframes present in runtime

Only explicit stylesheet keyframe found: `__framer-loading-spin` (loader). Real motion is mostly **Motion/transform**, not CSS animations.

---

## 5. Sections — detailed specs

---

### SECTION 00 — Navigation

**Framer names:** `Desktop - White`, `Logo`, `Taylor ®`, `NY : …`, `Desktop Links`, `Contact`, `Menu` (tablet/mobile)

#### Content
- Brand: `Taylor ®` → `/`
- Clock: `NY : {time}`
- Links: Works, About, Blog, Contact
- Mobile/Tablet: `Taylor ®` + `Menu`

#### Layout

```
Desktop (≥1200):
[ Taylor ® ]  [ NY : time ]          [ Works  About  Blog ]  [ Contact ]
height: 60px; padding: 18px 40px; width: 100%;
position: fixed/sticky over content; z-index high

≤1199:
[ Taylor ® ]                              [ Menu ]
```

#### HTML (recreate)

```html
<header class="nav" data-theme="light-on-dark">
  <a class="nav__logo" href="/">Taylor ®</a>
  <div class="nav__clock" aria-live="polite">NY : <span id="ny-time"></span></div>
  <nav class="nav__links" aria-label="Primary">
    <a href="#works">Works</a>
    <a href="/about">About</a>
    <a href="/blog">Blog</a>
  </nav>
  <a class="nav__contact" href="/contact">Contact</a>
  <button class="nav__menu" type="button" hidden>Menu</button>
</header>
```

#### CSS (recreate)

```css
.nav {
  position: fixed; inset: 0 0 auto 0; height: var(--nav-h);
  display: flex; align-items: center; gap: 24px;
  padding: 18px var(--pad-x); z-index: 100;
  color: #fff; /* on hero */
  mix-blend-mode: normal;
  transition: color 0.25s ease, background 0.25s ease;
}
.nav.is-solid { color: #000; background: rgba(255,255,255,0.9); backdrop-filter: blur(8px); }
.nav__logo { font-weight: 600; font-size: 16px; letter-spacing: var(--ls); }
.nav__links { margin-left: auto; display: flex; gap: 28px; }
.nav__links a, .nav__contact, .nav__clock { font-size: 14px; font-weight: 500; }
.nav__menu { margin-left: auto; background: none; border: 0; color: inherit; font: inherit; }

@media (max-width: 1199px) {
  .nav__links, .nav__contact, .nav__clock { display: none; }
  .nav__menu { display: inline; }
}
@media (min-width: 1200px) {
  .nav__menu { display: none; }
}
```

#### Animations
- A10 nav theme swap
- A11 clock tick
- Link hover opacity

---

### SECTION 01 — Hero

**Framer names:** `Hero`, `BG Image`, `Overlay`, `Noise`, `Top`, `Text`, `Bottom`, `Art Director`, `+ Designer`

#### Content
- Left (desktop) / right (mobile):  
  `Brand Design` / `Web Design` / `Graphic Design`
- Right (desktop) / left-lower (mobile):  
  `Designing bold, clean thoughtful experiences that elevate brands and turn ideas into impactful visuals.`
- Bottom display:  
  `ART DIRECTOR` (left)  
  `+ DESIGNER` (right-aligned)

#### Visuals
- Full-bleed image:  
  `https://framerusercontent.com/images/Ngp46Al0G5CMdaGWyMnjewOlT0A.png`
- Bottom gradient overlay:  
  `linear-gradient(rgba(0,0,0,0) 0%, rgb(0,0,0) 100%)` height ~491px anchored bottom
- Noise tile over hero

#### Layout by breakpoint

**Desktop 1440**
- Hero ≈ full viewport height (`900`)
- padding: `0 40px 10px`
- Service list mid-left; bio mid-right; giant type bottom
- Art Director font **160px / 700 / uppercase / lh tight / ls negative**

**Tablet/Mobile**
- padding `0`
- Services **right-aligned** mid
- Bio **left**, above title
- Art Director / + Designer **52px**, stacked full width
- Nav: logo + Menu

#### HTML (recreate)

```html
<section class="hero" aria-label="Hero">
  <div class="hero__media">
    <img src="https://framerusercontent.com/images/Ngp46Al0G5CMdaGWyMnjewOlT0A.png" alt="" />
    <div class="hero__gradient" aria-hidden="true"></div>
    <div class="hero__noise" aria-hidden="true"></div>
  </div>

  <div class="hero__content">
    <ul class="hero__services appear appear-d1">
      <li>Brand Design</li>
      <li>Web Design</li>
      <li>Graphic Design</li>
    </ul>
    <p class="hero__blurb appear appear-d2">
      Designing bold, clean thoughtful experiences that elevate brands and turn ideas into impactful visuals.
    </p>
    <div class="hero__title appear appear-d3">
      <p class="hero__title-line hero__title-line--left">Art Director</p>
      <p class="hero__title-line hero__title-line--right">+ Designer</p>
    </div>
  </div>
</section>
```

#### CSS (recreate)

```css
.hero {
  position: sticky; top: 0; z-index: 1;
  min-height: 100vh;
  display: flex; flex-direction: column; justify-content: flex-end;
  padding: 0 var(--pad-x) 10px;
  color: #fff; overflow: clip;
  will-change: transform;
}
.hero__media { position: absolute; inset: 0; z-index: 0; }
.hero__media img { width: 100%; height: 100%; object-fit: cover; }
.hero__gradient {
  position: absolute; left: 0; right: 0; bottom: 0; height: 55%;
  background: linear-gradient(rgba(0,0,0,0), #000);
}
.hero__noise {
  position: absolute; inset: -10% 0;
  background: url("https://framerusercontent.com/images/WXwwArEbCEXxVkbbiaI5FD2o.png") repeat;
  opacity: 0.45; pointer-events: none; mix-blend-mode: overlay;
}
.hero__content {
  position: relative; z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 24px;
  padding-bottom: 8px;
}
.hero__services {
  list-style: none; margin: 0; padding: 0;
  align-self: end; font-size: 16px; font-weight: 500; line-height: 1.25;
}
.hero__blurb {
  margin: 0; max-width: 28ch; justify-self: end; align-self: end;
  text-align: right; font-size: 16px; font-weight: 500; line-height: 1.25;
}
.hero__title {
  grid-column: 1 / -1;
  mix-blend-mode: difference;
}
.hero__title-line {
  margin: 0; text-transform: uppercase;
  font-size: clamp(52px, 11vw, 160px);
  font-weight: 700; line-height: 0.9; letter-spacing: -0.03em;
  color: #fff;
}
.hero__title-line--right { text-align: right; }

@media (max-width: 1199px) {
  .hero { padding: 0; min-height: 100svh; }
  .hero__content {
    grid-template-columns: 1fr;
    padding: 0 16px 24px;
  }
  .hero__services { text-align: right; justify-self: end; }
  .hero__blurb { text-align: left; justify-self: start; max-width: 34ch; }
}
```

#### Animations on this section
- A2 appear
- A3 sticky cover by Intro
- A7 noise
- A8 mix-blend titles
- Optional subtle parallax on `BG Image` (will-change present)

---

### SECTION 02 — Introduction (About Us)

**Label:** `02 ( About Us ) © 2026`  
**Framer:** `Introduction`, `Header`, portrait `Variant 1`, `Button` / `Read more`

#### Content
- H1: `I create thoughtful, high-impact visuals and structured digital experiences built to leave a lasting impression.`
- Body L: `I’m Taylor, a creative focused on shaping bold visuals and purposeful digital experiences. My work sits at the intersection of clarity and expression—where strong ideas meet clean execution.`
- Body R/below: `I approach every project with intention, crafting solutions that not only look refined but communicate effectively and leave a lasting impression.`
- Portrait: `https://framerusercontent.com/images/uwPmCBJ07EBXYM4euDaXCTYD5c.png`
- CTA: `Read more` → `/about`

#### Layout
- BG `#fff`
- Desktop pad: `80px 40px 120px`, gap `64px`
- H1 desktop: **84px / 600**, lh `75.6px`, ls `-2.52px`
- Tablet/mobile H1: **44px**
- Two-column copy + square portrait (~210×210 desktop)
- Full-width black button row bottom (`border-radius: 4px`, h ~55)

#### HTML

```html
<section class="intro" id="about">
  <div class="section-meta">
    <span>02</span>
    <span>( About Us )</span>
    <span>© 2026</span>
  </div>
  <hr class="section-rule" />

  <h1 class="intro__headline">
    I create thoughtful, high-impact visuals and structured digital experiences built to leave a lasting impression.
  </h1>

  <div class="intro__grid">
    <p>I’m Taylor, a creative focused on shaping bold visuals and purposeful digital experiences. My work sits at the intersection of clarity and expression—where strong ideas meet clean execution.</p>
    <img class="intro__portrait" src="https://framerusercontent.com/images/uwPmCBJ07EBXYM4euDaXCTYD5c.png" alt="Taylor portrait" />
    <p>I approach every project with intention, crafting solutions that not only look refined but communicate effectively and leave a lasting impression.</p>
  </div>

  <a class="btn btn--block btn--dark" href="/about">Read more <span aria-hidden="true">→</span></a>
</section>
```

#### CSS

```css
.section-meta {
  display: grid; grid-template-columns: auto 1fr auto;
  align-items: center; gap: 16px;
  font-size: 16px; font-weight: 600; letter-spacing: -0.48px; line-height: 16px;
}
.section-rule { border: 0; border-top: 1px solid #000; margin: 12px 0 0; }
.intro {
  position: relative; z-index: 2;
  background: #fff;
  padding: var(--pad-section-y-top) var(--pad-x) var(--pad-section-y-bottom);
  display: flex; flex-direction: column; gap: 64px;
}
.intro__headline {
  margin: 0; font-size: clamp(44px, 5.8vw, 84px);
  font-weight: 600; line-height: 0.9; letter-spacing: -0.03em;
  max-width: 18ch; /* visually wide on desktop — adjust to match */
}
.intro__grid {
  display: grid;
  grid-template-columns: 1fr 210px 1fr;
  gap: 32px; align-items: start;
}
.intro__grid p { margin: 0; font-size: 16px; line-height: 1.4; font-weight: 500; }
.intro__portrait { width: 210px; height: 210px; object-fit: cover; border-radius: 4px; }
.btn--dark {
  display: flex; align-items: center; justify-content: space-between;
  height: 55px; padding: 0 20px; border-radius: 4px;
  background: #000; color: #fff; font-weight: 600;
}
.btn--block { width: 100%; }

@media (max-width: 809px) {
  .intro__grid { grid-template-columns: 1fr; }
  .intro__portrait { width: 100%; max-width: 280px; height: auto; aspect-ratio: 1; }
}
```

#### Animations
- Covers sticky hero (A3)
- Optional fade-up of headline/copy on enter
- Button hover invert

---

### SECTION 03 — Selected Works

**Label:** `03 ( Selected Works )`  
**Framer:** `Works`, `Items`, project rows `1–4`, `Dark` button `All works`

#### Projects (order)

| Name | Tags | URL | Image(s) |
|---|---|---|---|
| BRAVEN | BRAND / WEB | `/work/braven` | `CAN9PHdASNma7CJYzTNbxruDWI.jpg` |
| LUMINA | BRAND / WEB | `/work/lumina` | `Leb3O5uU3RnwMnpbg7dhTLW92y8.jpg` |
| GOLDIE | BRAND / WEB | `/work/goldie` | `5vlIf4i2WSxepjiGKiKbsxVimY.jpg` |
| SOPHIA | BRAND / WEB | `/work/sophia` | `qA0wPQk6BcL1aflpa8yglw1jl4w.jpg` |
| ZOLLY | BRAND / WEB | `/work/zolly` | `fH5vANvbQe6CygkZPuccQudtJys.jpg` |
| FLORA | BRAND / WEB | `/work/flora` | `GHxPfVRGzd31817k26SURNx7oo.jpg` (+ extra set `8Kgnj…`, `7Gesy…`, `7DIfh…`) |

Base CDN: `https://framerusercontent.com/images/{id}`

#### Layout
- White section, pad `0 40px 120px` (desktop), gap `64px`
- Project grid: asymmetric image rows (pairs / full-width), titles overlaid or beside images
- Desktop item row width ~1080 within content; image heights ~266–372
- Mobile: stacked `Mobile` variants
- CTA: full-width black `All works` button

#### HTML

```html
<section class="works" id="works">
  <div class="section-meta">
    <span>03</span><span>( Selected Works )</span><span>© 2026</span>
  </div>
  <hr class="section-rule" />

  <div class="works__items" data-scroll-scale>
    <!-- repeat project cards -->
    <a class="work-card" href="/work/braven">
      <img src="https://framerusercontent.com/images/CAN9PHdASNma7CJYzTNbxruDWI.jpg" alt="" />
      <div class="work-card__meta">
        <h3>BRAVEN</h3>
        <p>BRAND</p>
        <p>WEB</p>
      </div>
    </a>
    <!-- LUMINA, GOLDIE, SOPHIA, ZOLLY, FLORA ... -->
  </div>

  <a class="btn btn--block btn--dark" href="/work">All works</a>
</section>
```

#### CSS

```css
.works {
  background: #fff;
  padding: 0 var(--pad-x) var(--pad-section-y-bottom);
  display: flex; flex-direction: column; gap: 64px;
}
.works__items {
  display: grid; gap: 16px;
  transform-origin: center top;
  will-change: transform;
}
.work-card {
  position: relative; display: block; overflow: hidden;
  min-height: 280px; background: #111;
}
.work-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
.work-card:hover img { transform: scale(1.04); }
.work-card__meta {
  position: absolute; left: 16px; bottom: 16px; color: #fff;
  font-weight: 600; letter-spacing: var(--ls);
}
.work-card__meta h3 { margin: 0 0 8px; font-size: 20px; }
.work-card__meta p { margin: 0; font-size: 12px; opacity: 0.85; }

/* Desktop: denser mosaic — approximate 2-up rows */
@media (min-width: 1200px) {
  .works__items { grid-template-columns: 1fr 1fr; }
  .work-card:nth-child(3),
  .work-card:nth-child(6) { grid-column: 1 / -1; }
}
```

#### Animations
- **A4 scroll-scale** on `.works__items` (0.7→1) — primary section transition effect
- Image hover scale
- Optional per-card fade as they enter

---

### SECTION 04 — Services

**Label:** `04 ( Services )` — **black background**  
**Framer:** `Services`, service blocks, white meta/line

#### Content
- Intro H1: `Thoughtful, high-impact visuals and structured digital experiences built for your brand` (72px / 600 / white @1440)
- Items:

| # | Title | Body |
|---|---|---|
| 01 | Art Direction | We craft compelling visual stories that align with your vision and speak directly to your audience. From concept to execution, every detail is thoughtfully directed to ensure consistency, emotion, and impact across all touchpoints. |
| 02 | Brand Identity | We develop cohesive brand systems that go beyond logos—defining how your brand looks, feels, and communicates. The result is a distinct, memorable identity that builds trust and stands out in a crowded market. |
| 03 | Web Design | We design intuitive, visually engaging websites that balance aesthetics with functionality. Every experience is tailored to guide users effortlessly while reinforcing your brand and driving meaningful interaction. |

#### Layout
- BG `#000`, text `#fff`
- Pad `80px 40px 120px`, gap `64px`
- Each service: number + title (~48px) + description; separated by white hairlines
- Stacks vertically on all breakpoints (taller on mobile ~2300px)

#### HTML

```html
<section class="services" id="services">
  <div class="section-meta section-meta--on-dark">
    <span>04</span><span>( Services )</span><span>© 2026</span>
  </div>
  <hr class="section-rule section-rule--light" />

  <h2 class="services__lead">
    Thoughtful, high-impact visuals and structured digital experiences built for your brand
  </h2>

  <article class="service">
    <h3><span>01</span> Art Direction</h3>
    <p>We craft compelling visual stories…</p>
  </article>
  <hr class="section-rule section-rule--light" />
  <!-- 02 Brand Identity, 03 Web Design -->
</section>
```

#### CSS

```css
.services {
  background: #000; color: #fff;
  padding: var(--pad-section-y-top) var(--pad-x) var(--pad-section-y-bottom);
  display: flex; flex-direction: column; gap: 64px;
}
.section-meta--on-dark, .services { color: #fff; }
.section-rule--light { border-top-color: #fff; }
.services__lead {
  margin: 0; font-size: clamp(36px, 5vw, 72px);
  font-weight: 600; line-height: 0.95; letter-spacing: -0.03em; max-width: 18ch;
}
.service h3 {
  display: flex; gap: 24px; align-items: baseline;
  margin: 0 0 16px; font-size: clamp(28px, 3.3vw, 48px); font-weight: 600;
}
.service p { margin: 0; max-width: 52ch; color: rgba(255,255,255,0.85); font-size: 16px; line-height: 1.45; }
```

#### Animations
- Staggered fade/slide of service rows on scroll enter
- Strong contrast cut from white Works → black Services (hard section transition)

---

### SECTION 05 — Process

**Label:** `05 ( Process )`  
**Framer:** `Process`, step rows `Desktop` / mobile variants

#### Steps

| # | Title | Body |
|---|---|---|
| (01) | Discovery | We take time to understand your brand, objectives, and audience, gathering the insights needed to inform a clear and thoughtful direction. |
| (02) | Strategy | We shape a focused plan that aligns ideas, messaging, and structure, ensuring every creative decision is intentional and effective. |
| (03) | Design | We translate strategy into strong visual outcomes, crafting work that is both engaging and purposeful across every touchpoint. |
| (04) | Delivery | We prepare and launch with care, delivering polished assets that are consistent, functional, and ready to perform in the real world. |

#### Layout
- White bg
- Desktop: horizontal-ish row per step: `(01)` | `Discovery` | description (pad bottom 40px)
- Mobile: stacked; section pad `16px`
- Desktop height ~750; mobile ~882

#### HTML

```html
<section class="process" id="process">
  <div class="section-meta"><span>05</span><span>( Process )</span><span>© 2026</span></div>
  <hr class="section-rule" />
  <ol class="process__list">
    <li>
      <span class="process__num">(01)</span>
      <h3>Discovery</h3>
      <p>We take time to understand your brand…</p>
    </li>
    <!-- 02–04 -->
  </ol>
</section>
```

#### CSS

```css
.process { background:#fff; padding: var(--pad-section-y-top) var(--pad-x) var(--pad-section-y-bottom); }
.process__list { list-style:none; margin:32px 0 0; padding:0; }
.process__list li {
  display: grid; grid-template-columns: 72px 180px 1fr;
  gap: 24px; padding: 0 0 40px; align-items: start;
  border-bottom: 1px solid #000;
}
.process__list h3 { margin:0; font-size:20px; font-weight:600; }
.process__list p { margin:0; max-width: 42ch; color:#111; }
@media (max-width: 809px) {
  .process__list li { grid-template-columns: 1fr; gap: 8px; padding: 24px 0; }
}
```

#### Animations
- Row reveal on scroll (opacity + slight Y)
- Optional active-step highlight while scrolling through list

---

### SECTION 06 — Testimonials

**Label:** `06 ( Testimonials )`  
**Framer:** `Testimonials`, quote, `Aisha Okafor`, `Founder`, `Previous`, `Next`, portrait variant

#### Content (slide 1 observed)
- Quote: `“Working with them was seamless from start to finish. They understood our vision, elevated it with thoughtful design, and delivered results that truly set our brand apart.”`
- Name: `Aisha Okafor`
- Role: `Founder`
- Portrait asset also used: `antmDkZCNxxn6lFKhbu3P1xtumY.png`

#### Layout
- Large quote typography left; portrait right (desktop)
- Prev/Next controls for carousel
- Mobile: stacked, taller section

#### HTML

```html
<section class="testimonials" id="testimonials">
  <div class="section-meta"><span>06</span><span>( Testimonials )</span><span>© 2026</span></div>
  <hr class="section-rule" />
  <div class="testimonials__slide">
    <blockquote>
      <p>“Working with them was seamless from start to finish…”</p>
      <footer>
        <cite>Aisha Okafor</cite>
        <span>Founder</span>
      </footer>
    </blockquote>
    <img src="https://framerusercontent.com/images/antmDkZCNxxn6lFKhbu3P1xtumY.png" alt="" />
  </div>
  <div class="testimonials__nav">
    <button type="button" aria-label="Previous">Previous</button>
    <button type="button" aria-label="Next">Next</button>
  </div>
</section>
```

#### CSS

```css
.testimonials { padding: 0 var(--pad-x) var(--pad-section-y-bottom); }
.testimonials__slide {
  display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 40px; align-items: end;
  min-height: 460px;
}
.testimonials blockquote p {
  margin: 0; font-size: clamp(28px, 3vw, 48px);
  font-weight: 600; line-height: 1.15; letter-spacing: -0.03em;
}
.testimonials cite { font-style: normal; font-weight: 600; display:block; margin-top: 24px; }
@media (max-width: 809px) {
  .testimonials__slide { grid-template-columns: 1fr; }
}
```

#### Animations
- A9 carousel crossfade / slide
- Quote text appear on change

---

### SECTION 07 — Stats & Facts

**Label:** `07 ( Stats & Facts )`  
**Framer:** `Statistics`, `Projects completed`, etc.

#### Final values (after count-up)

| Display | Label | Supporting copy |
|---|---|---|
| **47+** | projects delivered | Delivering thoughtful, high-quality work across a wide range of industries and clients. |
| **$1.0m** | raised by clients | Supporting brands and products that have successfully secured funding and growth. |
| **98%** | client satisfaction | Long-term partnerships built on trust, clarity, and results. |
| **10+** | years of experience | A proven track record of crafting impactful design solutions over time. |

#### Layout
- Desktop: **4 columns** (or 3 visible + 4th wrapping — measured as multi-column row; at 1440 four metrics fit in one band ~391px tall)
- Mobile: stacked (~910px tall), pad `0 16px 120px`
- Giant numbers, bold labels, muted body

#### HTML

```html
<section class="stats" id="stats">
  <div class="section-meta"><span>07</span><span>( Stats & Facts )</span><span>© 2026</span></div>
  <hr class="section-rule" />
  <div class="stats__grid">
    <article>
      <p class="stats__num" data-count="47" data-suffix="+">0+</p>
      <h3>projects delivered</h3>
      <p>Delivering thoughtful, high-quality work…</p>
    </article>
    <article>
      <p class="stats__num" data-count="1.0" data-prefix="$" data-suffix="m">$0.0m</p>
      <h3>raised by clients</h3>
      <p>Supporting brands and products…</p>
    </article>
    <article>
      <p class="stats__num" data-count="98" data-suffix="%">0%</p>
      <h3>client satisfaction</h3>
      <p>Long-term partnerships…</p>
    </article>
    <article>
      <p class="stats__num" data-count="10" data-suffix="+">0+</p>
      <h3>years of experience</h3>
      <p>A proven track record…</p>
    </article>
  </div>
</section>
```

#### CSS

```css
.stats { padding: 0 var(--pad-x) var(--pad-section-y-bottom); }
.stats__grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-top: 32px;
}
.stats__num {
  margin: 0; font-size: clamp(48px, 6vw, 96px);
  font-weight: 700; letter-spacing: -0.04em; line-height: 1;
}
.stats h3 { margin: 8px 0; font-size: 18px; font-weight: 600; }
.stats article > p:last-child { margin: 0; color: #696969; font-size: 14px; line-height: 1.4; }
@media (max-width: 809px) {
  .stats__grid { grid-template-columns: 1fr; }
}
```

#### Animations
- **A6 count-up** when section intersects (~50% viewport)
- Number formatting for `$1.0m`

---

### SECTION 08 — Articles (Blogs)

**Label:** `08 ( Articles )`  
**Framer:** `Blogs`

#### Posts

| Date | Title | Image | URL |
|---|---|---|---|
| Jan 12, 2026 | Creating Seamless Digital Experiences That Convert | `8FIoQdZKgNwDDhfRMNRQEkK3dJE.png` | `/blog/creating-seamless-digital-experiences-that-convert` |
| Feb 18, 2026 | Building Brands That Stand Out in a Crowded Market | `PDVTGgOOmeW5a8YnLLTp1RyC1xg.png` | `/blog/building-brands-that-stand-out-in-a-crowded-market` |
| Mar 24, 2026 | Why Strong Identity Is the Foundation of Growth | `8vEcbr13XA8UqEzxmpiOczUxYa0.png` | `/blog/why-strong-identity-is-the-foundation-of-growth` |
| Apr 2, 2026 | Design Systems That Scale With Your Business | `v73IG4PG4VZx7C5gItrVPR41E.png` | `/blog/design-systems-that-scale-with-your-business` |

Meta line style: `Design / {date}` in `#696969`, title in black 24px/600.

#### Layout
- Desktop: 4-up horizontal cards, rounded images (~439×368 @ ~977w)
- Mobile: stacked vertical list
- Pad `0 40px 120px` / `0 16px 120px`

#### HTML

```html
<section class="articles" id="articles">
  <div class="section-meta"><span>08</span><span>( Articles )</span><span>© 2026</span></div>
  <hr class="section-rule" />
  <div class="articles__grid">
    <a class="article-card" href="/blog/creating-seamless-digital-experiences-that-convert">
      <img src="https://framerusercontent.com/images/8FIoQdZKgNwDDhfRMNRQEkK3dJE.png" alt="" />
      <p class="article-card__meta"><span>Design</span> / <time>Jan 12, 2026</time></p>
      <h3>Creating Seamless Digital Experiences That Convert</h3>
    </a>
    <!-- 3 more -->
  </div>
</section>
```

#### CSS

```css
.articles { background:#fff; padding: 0 var(--pad-x) var(--pad-section-y-bottom); display:flex; flex-direction:column; gap:32px; }
.articles__grid { display:grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.article-card img { width:100%; aspect-ratio: 4/3; object-fit:cover; border-radius: 14px; }
.article-card__meta { color:#696969; font-size:16px; font-weight:600; margin: 12px 0 8px; }
.article-card h3 { margin:0; font-size:24px; font-weight:600; letter-spacing:-0.72px; line-height:24px; }
@media (max-width: 1199px) { .articles__grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 809px) { .articles__grid { grid-template-columns: 1fr; } }
```

#### Animations
- Card hover: image scale / slight lift
- Staggered reveal on scroll

---

### SECTION 09 — CTA + Footer

**Framer:** `BG Colour`, `BG Image` (footer), `Let’s make something amazing together.`, `CONTACT`, `Links`, `Links 1`, `Links 2`, `Back to top`

#### Content
- Headline: `LET’S MAKE SOMETHING` / `AMAZING TOGETHER.`
- CTA: `CONTACT` → `/contact`
- Brand: `Taylor ®`
- Credit: `Akin X Ed © 2026`
- Site links: Home, Work, About, Blog, Contact
- Social: Behance, Linkedin, X(Twitter)
- `Back to top`

#### Visuals
- Background photo: `https://framerusercontent.com/images/Sf0yUVCuc4acAxJSFRbZYrXDlk.png`
- Overlay: `rgba(18,18,18,0.5)`
- Scroll scale A5 on photo (`1.2 → 1`)

#### HTML

```html
<section class="cta">
  <div class="cta__media">
    <img src="https://framerusercontent.com/images/Sf0yUVCuc4acAxJSFRbZYrXDlk.png" alt="" data-scroll-scale-bg />
    <div class="cta__dim"></div>
  </div>
  <div class="cta__content">
    <h2>Let’s make something<br />amazing together.</h2>
    <a class="btn btn--light" href="/contact">CONTACT</a>
  </div>
</section>

<footer class="footer">
  <a class="footer__logo" href="/">Taylor ®</a>
  <p class="footer__credit">Akin X Ed © 2026</p>
  <nav>
    <a href="/">Home</a><a href="/work">Work</a><a href="/about">About</a>
    <a href="/blog">Blog</a><a href="/contact">Contact</a>
  </nav>
  <nav>
    <a href="https://www.behance.net/">Behance</a>
    <a href="https://www.linkedin.com/">Linkedin</a>
    <a href="https://www.x.com/">X(Twitter)</a>
  </nav>
  <a href="#top">Back to top</a>
</footer>
```

#### CSS

```css
.cta {
  position: relative; min-height: 80vh; color: #fff;
  display: grid; place-items: center; text-align: center; overflow: clip;
}
.cta__media { position:absolute; inset:0; }
.cta__media img { width:100%; height:100%; object-fit:cover; transform: scale(1.2); will-change: transform; }
.cta__dim { position:absolute; inset:0; background: rgba(18,18,18,0.5); }
.cta__content { position:relative; z-index:1; padding: var(--pad-x); }
.cta h2 {
  margin: 0 0 24px; text-transform: uppercase;
  font-size: clamp(32px, 5vw, 80px); font-weight: 700; letter-spacing: -0.03em; line-height: 1;
}
.btn--light {
  display:inline-flex; align-items:center; justify-content:center;
  min-width: 160px; height: 48px; border: 1px solid #fff; color:#fff; border-radius: 4px;
  font-weight: 600; letter-spacing: var(--ls);
}
.footer {
  background: #111112; color: #fff;
  display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 32px;
  padding: 64px var(--pad-x) 80px;
}
@media (max-width: 809px) {
  .footer { grid-template-columns: 1fr; }
}
```

#### Animations
- A5 background scale settle
- CTA text appear
- Back to top smooth scroll (Lenis)

---

## 6. Shared components

### 6.1 Section meta row

```html
<div class="section-meta">
  <span class="section-meta__num">0N</span>
  <span class="section-meta__title">( Name )</span>
  <span class="section-meta__year">© 2026</span>
</div>
<hr class="section-rule" />
```

### 6.2 Primary block button

```css
.btn--dark {
  height: 55px; width: 100%; border-radius: 4px;
  background: #000; color: #fff;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 20px; font-weight: 600; transition: background 0.25s, color 0.25s;
}
.btn--dark:hover { background: #111; }
```

---

## 7. Asset inventory (homepage)

| Role | URL |
|---|---|
| Hero portrait | `https://framerusercontent.com/images/Ngp46Al0G5CMdaGWyMnjewOlT0A.png` |
| Noise tile | `https://framerusercontent.com/images/WXwwArEbCEXxVkbbiaI5FD2o.png` |
| Intro portrait | `https://framerusercontent.com/images/uwPmCBJ07EBXYM4euDaXCTYD5c.png` |
| Work — Braven | `https://framerusercontent.com/images/CAN9PHdASNma7CJYzTNbxruDWI.jpg` |
| Work — Lumina | `https://framerusercontent.com/images/Leb3O5uU3RnwMnpbg7dhTLW92y8.jpg` |
| Work — Goldie | `https://framerusercontent.com/images/5vlIf4i2WSxepjiGKiKbsxVimY.jpg` |
| Work — Sophia | `https://framerusercontent.com/images/qA0wPQk6BcL1aflpa8yglw1jl4w.jpg` |
| Work — Zolly | `https://framerusercontent.com/images/fH5vANvbQe6CygkZPuccQudtJys.jpg` |
| Work — Flora | `https://framerusercontent.com/images/GHxPfVRGzd31817k26SURNx7oo.jpg` |
| Work extras | `8Kgnj2B02ZS9M01jS4lX36NQkk8.jpg`, `7Gesy3VaRWe8ljg66Bb5qEAV40.jpg`, `7DIfhZDmkJ98MvJ5Ci9uxLdqqE.jpg` |
| Testimonial | `https://framerusercontent.com/images/antmDkZCNxxn6lFKhbu3P1xtumY.png` |
| Article 1–4 | `8FIoQd…`, `PDVTGg…`, `8vEcbr…`, `v73IG4…` (png) |
| CTA / footer bg | `https://framerusercontent.com/images/Sf0yUVCuc4acAxJSFRbZYrXDlk.png` |
| Inter / Inter Display | Framer `@font-face` woff2 under `https://framerusercontent.com/assets/…` |

---

## 8. Scroll choreography (section → section)

```
[Nav fixed]
   │
   ▼
HERO (sticky, full viewport, grain, blend titles)
   │  scroll: hero translates up ~0.2× scroll; Intro rises over it
   ▼
INTRODUCTION (white, z-index above hero) —— hard cover transition
   │  soft fade-ups
   ▼
WORKS —— Items scale 0.7→1 while pinning into view (signature move)
   │
   ▼
SERVICES (black) —— abrupt color inversion transition
   │
   ▼
PROCESS —— list reveals
   │
   ▼
TESTIMONIALS —— optional carousel interaction
   │
   ▼
STATS —— count-up triggers on enter
   │
   ▼
ARTICLES —— card grid
   │
   ▼
CTA (photo scale 1.2→1) + FOOTER
```

Lenis wraps the entire timeline for inertia.

---

## 9. Implementation checklist (when you say go)

1. Set up tokens + Inter Display  
2. Build sticky nav + Lenis  
3. Hero sticky + noise + blend titles + appear  
4. Intro cover transition  
5. Works mosaic + scroll-scale  
6. Services dark band  
7. Process / Testimonials / Stats counters / Articles  
8. CTA scale + footer  
9. Pass breakpoints 1200 / 810 / 390  
10. Re-check motion timings against live site side-by-side  

---

## 10. Source credit

Template/site credited on page as **Akin X Ed © 2026**, built with Framer.  
Live reference: [taylordesigner.framer.website](https://taylordesigner.framer.website/)

---

*End of `taylor.md` — homepage recreation spec.*
