/* =========================================================
   PULSE — Landing Page Behaviour
   Organised by feature. No inline handlers; everything is
   wired up here after DOMContentLoaded.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initScrollReveal();
  initPulseWaveform();
  initClock();
  initCounters();
  initAccordion();
  initContactForm();
  initBackToTop();
  document.getElementById("year").textContent = new Date().getFullYear();
});

/* ---------------------------------------------------------
   1. Navbar: background on scroll + mobile menu toggle
   --------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");

  const onScroll = () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  navToggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close mobile menu after tapping a link
  document.querySelectorAll(".nav-links a, .navbar__actions a").forEach((link) => {
    link.addEventListener("click", () => {
      navbar.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------------------------------------------------------
   2. Scroll reveal: fade + slide up elements into view
      using IntersectionObserver (no scroll-jank listeners)
   --------------------------------------------------------- */
function initScrollReveal() {
  const targets = document.querySelectorAll("[data-reveal]");

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------
   3. Hero signature element: animated live waveform.
      Draws a smooth SVG path and redraws it on an interval
      to feel like a live monitoring pulse.
   --------------------------------------------------------- */
function initPulseWaveform() {
  const path = document.getElementById("pulsePath");
  const latencyEl = document.getElementById("latencyValue");
  if (!path) return;

  const width = 560;
  const height = 140;
  const midline = height / 2;
  const points = 28;

  function buildPath() {
    let d = `M 0 ${midline}`;
    for (let i = 1; i <= points; i++) {
      const x = (width / points) * i;
      // Occasionally spike to mimic a heartbeat / request pulse
      const isSpike = i === Math.floor(points * 0.55);
      const isDip = i === Math.floor(points * 0.7);
      let y = midline + (Math.random() - 0.5) * 10;
      if (isSpike) y = midline - 46;
      if (isDip) y = midline + 34;
      d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    return d;
  }

  function render() {
    path.setAttribute("d", buildPath());
    if (latencyEl) {
      const latency = 96 + Math.floor(Math.random() * 55);
      latencyEl.textContent = `${latency} ms`;
    }
  }

  render();
  setInterval(render, 2200);
}

/* ---------------------------------------------------------
   4. Live clock in the hero panel header
   --------------------------------------------------------- */
function initClock() {
  const clockEl = document.getElementById("clock");
  if (!clockEl) return;

  function tick() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    clockEl.textContent = `${hh}:${mm}:${ss}`;
  }

  tick();
  setInterval(tick, 1000);
}

/* ---------------------------------------------------------
   5. Animated stat counters, triggered once each stat
      scrolls into view.
   --------------------------------------------------------- */
function initCounters() {
  const stats = document.querySelectorAll(".stat__value");
  if (!stats.length) return;

  const animateValue = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const isDecimal = String(target).includes(".");
    const duration = 1400;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out for a natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = (isDecimal ? current.toFixed(2) : Math.floor(current)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateValue(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------
   6. FAQ accordion — one panel open at a time
   --------------------------------------------------------- */
function initAccordion() {
  const triggers = document.querySelectorAll(".accordion__trigger");

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const panel = trigger.nextElementSibling;
      const isOpen = trigger.getAttribute("aria-expanded") === "true";

      // Close any other open item
      triggers.forEach((other) => {
        if (other !== trigger) {
          other.setAttribute("aria-expanded", "false");
          other.nextElementSibling.style.maxHeight = null;
        }
      });

      trigger.setAttribute("aria-expanded", String(!isOpen));
      panel.style.maxHeight = isOpen ? null : `${panel.scrollHeight}px`;
    });
  });
}

/* ---------------------------------------------------------
   7. Contact form — lightweight client-side validation
      and a simulated submit (no backend in this project).
   --------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      status.textContent = "Please fill in every field with a valid email.";
      status.style.color = "#ff6b6b";
      return;
    }

    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    // Simulated network delay — replace with a real request when
    // wiring this up to a backend or form service.
    setTimeout(() => {
      status.style.color = "";
      status.textContent = "Thanks! We'll get back to you within a few hours.";
      submitBtn.disabled = false;
      submitBtn.textContent = "Send message";
      form.reset();
    }, 900);
  });
}

/* ---------------------------------------------------------
   8. Back-to-top button
   --------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener(
    "scroll",
    () => {
      btn.classList.toggle("is-visible", window.scrollY > 600);
    },
    { passive: true }
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
