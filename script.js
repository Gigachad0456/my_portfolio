const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const root = document.documentElement;
const themeStorageKey = "isaac-theme-preference";
const themeSelects = document.querySelectorAll("[data-theme-select]");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

const updateThemeColor = () => {
  if (!themeColorMeta) {
    return;
  }

  const backgroundValue = getComputedStyle(root)
    .getPropertyValue("--color-background")
    .trim()
    .split(/\s+/)
    .join(", ");

  themeColorMeta.setAttribute("content", `rgb(${backgroundValue})`);
};

const applyTheme = (theme, persistPreference = false) => {
  if (theme === "default") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", theme);
  }

  root.setAttribute("data-theme-preference", theme);
  themeSelects.forEach((select) => {
    select.value = theme;
  });

  if (persistPreference) {
    if (theme === "default") {
      localStorage.removeItem(themeStorageKey);
    } else {
      localStorage.setItem(themeStorageKey, theme);
    }
  }

  updateThemeColor();
};

const savedTheme = localStorage.getItem(themeStorageKey) || "default";
applyTheme(savedTheme);

themeSelects.forEach((select) => {
  select.addEventListener("change", (event) => {
    applyTheme(event.target.value, true);
  });
});

prefersDarkScheme.addEventListener("change", () => {
  if (!localStorage.getItem(themeStorageKey)) {
    applyTheme("default");
  }
});

const fadeInElements = document.querySelectorAll(".fade-in");

if (fadeInElements.length > 0) {
  if (prefersReducedMotion.matches) {
    fadeInElements.forEach((element) => element.classList.add("show"));
  } else {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("show");
          currentObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    fadeInElements.forEach((element) => observer.observe(element));
  }
}

const menuButton = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuButton && mobileMenu) {
  const setMenuState = (isOpen) => {
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    mobileMenu.classList.toggle("hidden", !isOpen);

    requestAnimationFrame(() => {
      mobileMenu.classList.toggle("show", isOpen);
    });
  };

  setMenuState(false);

  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    setMenuState(!isExpanded);
  });

  document.querySelectorAll("#mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      setMenuState(false);
    }
  });
}

if (!prefersReducedMotion.matches) {
  const grid = document.querySelector(".grid-bg");
  const hero = document.querySelector(".hero-content");
  const canvas = document.getElementById("particles");
  const ctx = canvas ? canvas.getContext("2d") : null;
  const mouse = { x: null, y: null };
  let animationFrameId = null;
  let particles = [];

  const updateMotionEffects = (event) => {
    const { clientX, clientY } = event;

    mouse.x = clientX;
    mouse.y = clientY;

    if (grid) {
      grid.style.setProperty("--x", `${clientX}px`);
      grid.style.setProperty("--y", `${clientY}px`);
    }

    if (hero) {
      const rotateX = (clientY - window.innerHeight / 2) / 40;
      const rotateY = (clientX - window.innerWidth / 2) / 40;

      hero.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    }
  };

  const createParticles = () => {
    if (!canvas || !ctx) {
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));
  };

  const animateParticles = () => {
    if (!canvas || !ctx) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > canvas.width) {
        particle.vx *= -1;
      }

      if (particle.y < 0 || particle.y > canvas.height) {
        particle.vy *= -1;
      }

      if (mouse.x !== null && mouse.y !== null) {
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.hypot(dx, dy);

        if (distance < 120) {
          particle.x += dx * 0.02;
          particle.y += dy * 0.02;
        }
      }

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(148,146,255,0.8)";
      ctx.fill();
    });

    animationFrameId = window.requestAnimationFrame(animateParticles);
  };

  document.addEventListener("mousemove", updateMotionEffects, { passive: true });

  if (canvas && ctx && window.innerWidth > 768) {
    createParticles();
    animateParticles();

    window.addEventListener("resize", () => {
      window.cancelAnimationFrame(animationFrameId);
      createParticles();
      animateParticles();
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        window.cancelAnimationFrame(animationFrameId);
        return;
      }

      animateParticles();
    });
  }
}
