(function () {
  /* ------------------------------------------------------------------
     SCROLL TUNING: change these to adjust feel without hunting through code
     ------------------------------------------------------------------ */
  var USE_LENIS = false;          // false = native browser scroll (fastest, keeps trackpad momentum)
                                  // true  = Lenis smooth scroll (adds lag on trackpads; only helps some mouse wheels)
  var LENIS_WHEEL_MULTIPLIER = 2.5; // only used if USE_LENIS = true; higher = faster per wheel notch
  var LENIS_LERP = 0.25;            // only used if USE_LENIS = true; higher = snappier
  var HERO_PIN = true;            // false = hero scrolls away normally (smoothest, no pin)
  var HERO_PIN_LENGTH = "+=40%";  // how long the hero stays pinned (shorter = faster)
  var PROJECT_PARALLAX = true;    // false = project headers scroll normally

  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canAnimate = !reduce && window.gsap;

  var header = document.getElementById("site-header");
  var toggle = document.querySelector(".nav-toggle");
  var overlay = document.getElementById("nav-overlay");
  var lastY = 0;

  function closeMenu() {
    if (!overlay || !toggle) return;
    overlay.classList.remove("is-open");
    overlay.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("is-nav-open");
  }

  function openMenu() {
    overlay.classList.add("is-open");
    overlay.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    document.body.classList.add("is-nav-open");
  }

  if (toggle && overlay) {
    toggle.addEventListener("click", function () {
      if (overlay.classList.contains("is-open")) closeMenu();
      else openMenu();
    });
    overlay.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* Lenis is OFF by default. Native scrolling keeps the OS's own momentum,
     which is what lets one flick travel the whole page. */
  var lenis = null;
  if (USE_LENIS && canAnimate && window.Lenis) {
    lenis = new window.Lenis({
      lerp: LENIS_LERP,
      wheelMultiplier: LENIS_WHEEL_MULTIPLIER,
      smoothWheel: true,
      syncTouch: false
    });
    if (window.ScrollTrigger) {
      lenis.on("scroll", window.ScrollTrigger.update);
    }
    window.gsap.ticker.add(function (time) {
      lenis.raf(time * 1000);
    });
    window.gsap.ticker.lagSmoothing(0);
  }
  window.siteLenis = lenis;

  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href");
    if (!id || id === "#") return;
    var target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { duration: 0.8 });
    else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  });

  var navTicking = false;
  function updateNav() {
    if (!header) return;
    var y = window.scrollY || 0;
    header.classList.toggle("is-scrolled", y > 40);
    if (document.body.classList.contains("is-nav-open")) {
      header.classList.remove("is-hidden");
      lastY = y;
      return;
    }
    if (y > lastY && y > 80) header.classList.add("is-hidden");
    else header.classList.remove("is-hidden");
    lastY = y;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (navTicking) return;
      navTicking = true;
      requestAnimationFrame(function () {
        navTicking = false;
        updateNav();
      });
    },
    { passive: true }
  );

  if (!canAnimate) return;

  document.documentElement.classList.add("js-anim");
  var gsap = window.gsap;
  if (window.ScrollTrigger) {
    gsap.registerPlugin(window.ScrollTrigger);
    // Don't let ScrollTrigger recalculate when mobile browser bars show/hide (causes jumps)
    window.ScrollTrigger.config({ ignoreMobileResize: true });
  }

  function reveal() {
    gsap.utils.toArray("[data-reveal]").forEach(function (el) {
      var delay = parseFloat(el.getAttribute("data-reveal-delay") || "0");
      gsap.fromTo(
        el,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          delay: delay,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true }
        }
      );
    });

    gsap.utils.toArray("[data-reveal-stagger]").forEach(function (parent) {
      var kids = parent.children;
      var n = kids.length;
      var stagger = n > 1 ? Math.min(0.05, 0.3 / (n - 1)) : 0;
      gsap.fromTo(
        kids,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: stagger,
          ease: "power2.out",
          scrollTrigger: { trigger: parent, start: "top 92%", once: true }
        }
      );
    });
  }

  function counters() {
    gsap.utils.toArray("[data-count]").forEach(function (el) {
      var end = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
      var obj = { n: 0 };
      gsap.to(obj, {
        n: end,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
        onUpdate: function () {
          el.textContent = obj.n.toFixed(decimals) + suffix;
        }
      });
    });
  }

  function heroPin() {
    var hero = document.querySelector("[data-hero]");
    if (!hero || !window.ScrollTrigger) return;
    var visual = hero.querySelector(".hero-visual");
    var title = hero.querySelector("h1");
    var sub = hero.querySelector(".hero-tagline");
    var actions = hero.querySelector(".hero-actions");
    var indicator = hero.querySelector(".scroll-indicator");
    var mobile = window.matchMedia("(max-width: 767px)").matches;

    // Mobile, or pin turned off: no pin, light fade as the hero scrolls away.
    if (mobile || !HERO_PIN) {
      gsap.to([title, sub, actions].filter(Boolean), {
        y: -16,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
      return;
    }

    var tl = gsap.timeline({
      defaults: { ease: "none", force3D: true },
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: HERO_PIN_LENGTH,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: true
      }
    });
    // Opacity + translate only on text; scale only on the visual (all GPU-friendly)
    if (visual) tl.fromTo(visual, { scale: 1, opacity: 1 }, { scale: 1.1, opacity: 0.3 }, 0);
    if (title) tl.to(title, { y: -60, opacity: 0 }, 0);
    if (sub) tl.to(sub, { opacity: 0, y: -30 }, 0.1);
    if (actions) tl.to(actions, { opacity: 0, y: -20 }, 0.15);
    if (indicator) tl.to(indicator, { opacity: 0 }, 0);
  }

  function projectHeader() {
    if (!PROJECT_PARALLAX) return;
    var head = document.querySelector("[data-project-header]");
    if (!head || !window.ScrollTrigger) return;
    var media = head.querySelector(".project-header-media");
    var content = head.querySelector(".project-header-content");
    if (media) {
      // Scale removed: scaling a large image every frame is a common source of lag.
      gsap.to(media, {
        yPercent: 10,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: head,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }
    if (content) {
      gsap.to(content, {
        opacity: 0.15,
        y: -30,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: head,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }
  }

  function timeline() {
    var line = document.querySelector("[data-timeline-line]");
    if (!line || !window.ScrollTrigger) return;
    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: line.parentElement,
          start: "top 70%",
          end: "bottom 75%",
          scrub: true
        }
      }
    );
    gsap.utils.toArray(".timeline-item").forEach(function (item) {
      window.ScrollTrigger.create({
        trigger: item,
        start: "top 75%",
        once: true,
        onEnter: function () {
          item.classList.add("is-active");
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    reveal();
    counters();
    heroPin();
    projectHeader();
    timeline();
  });

  window.addEventListener("load", function () {
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  });

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    }, 200);
  });
})();
