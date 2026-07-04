# Pulse — Landing Page

A responsive, animated landing page for **Pulse**, a fictional real-time
API and infrastructure monitoring product. Built as a standalone
front-end project using only HTML5, CSS3, and vanilla JavaScript.

## Project description

Pulse's landing page introduces the product's core promise — "know the
moment something breaks" — through a dark, glassmorphic UI with a
custom animated waveform, scroll-triggered reveals, and animated
statistics. The page is structured to move a visitor from problem
(unnoticed outages) to solution (real-time monitoring) to action
(start a free trial or contact sales).

## Features

- **Sticky navbar** that gains a blurred background once the page scrolls, plus a mobile hamburger menu
- **Hero section** with a custom SVG "live pulse" waveform that redraws itself on an interval, a live clock, and rotating latency numbers
- **Logo strip**, **features grid**, **animated statistics**, **testimonials**, **pricing tiers**, **FAQ accordion**, and a **contact form** with client-side validation
- **Scroll-reveal animations** powered by `IntersectionObserver` (fade + slide up), so nothing animates until it's in view
- **Animated counters** that count up to their final value once scrolled into view
- **Accordion FAQ** with one panel open at a time
- **Back-to-top button** that appears after scrolling
- Fully **responsive** layout (desktop, tablet, mobile) built with CSS Grid and Flexbox
- Respects `prefers-reduced-motion` for accessibility
- No inline CSS or JavaScript — all styling and behaviour live in `style.css` and `script.js`

## Technologies used

- HTML5 (semantic markup: `<header>`, `<main>`, `<section>`, `<footer>`, `<figure>`)
- CSS3 (custom properties/design tokens, Grid, Flexbox, gradients, `backdrop-filter`, keyframe animations)
- Vanilla JavaScript (ES6+, `IntersectionObserver`, `requestAnimationFrame`, no frameworks or libraries)
- Google Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (data/stats)

## Folder structure

```
PulseLandingPage/
├── index.html
├── style.css
├── script.js
├── assets/
│   └── images/        # placeholder for any custom imagery
└── README.md
```

## Installation / running locally

No build step or dependencies required.

1. Download or clone this folder.
2. Open `index.html` directly in a browser, **or** serve it locally for the best experience with fonts and smooth scrolling:
   ```bash
   npx serve .
   # or
   python3 -m http.server 8000
   ```
3. Visit `http://localhost:8000` (or the URL your server prints).

## Screenshots

_Add screenshots of the hero, pricing, and mobile views here before submission:_

- `assets/images/screenshot-hero.png`
- `assets/images/screenshot-pricing.png`
- `assets/images/screenshot-mobile.png`

## Future improvements

- Connect the contact form to a real backend or form service (e.g. Formspree, a serverless function)
- Add a light theme toggle
- Add real product screenshots/illustrations in place of the abstract waveform
- Internationalisation (i18n) for multi-language support
- Add unit tests for the JavaScript interaction logic
