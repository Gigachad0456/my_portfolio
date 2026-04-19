const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const root = document.documentElement;
const themeStorageKey = "isaac-theme-preference";
const themeSelects = document.querySelectorAll("[data-theme-select]");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

const storage = {
  get(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      return null;
    }
  },
  remove(key) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      return null;
    }
  },
};

const projects = [
  {
    title: "Reang Translator Web App",
    description:
      "A full-stack web application built to preserve and translate the Reang language with real-time translation, custom dictionary handling, and a scalable backend architecture.",
    category: "Full Stack",
    image: "/img/project-1.png",
    imageAlt: "Preview of the Reang Translator web application",
    tags: ["Flask", "Python", "PostgreSQL", "JS API"],
    demoUrl: "https://kaubru-translator-5.onrender.com/",
    demoLabel: "Live Demo",
    repoPrivate: true,
  },
  {
    title: "Nova Agency Landing Page",
    description:
      "A modern, high-converting landing page with smooth animations and responsive design focused on clean UI, speed, and polish.",
    category: "Frontend",
    image: "/img/project-2.png",
    imageAlt: "Preview of the Nova Agency landing page project",
    tags: ["HTML", "Tailwind", "JavaScript"],
    demoUrl: "https://nova-agency-landing-page.netlify.app/",
    demoLabel: "View Project",
  },
  {
    title: "GitHub User Search",
    description:
      "A dynamic interface that fetches and displays GitHub user data using public APIs with real-time search and clean results presentation.",
    category: "API",
    image: "/img/project-3.png",
    imageAlt: "Preview of the GitHub User Search project",
    tags: ["JavaScript", "API", "CSS"],
    demoUrl: "https://ephemeral-meerkat-defa4a.netlify.app/",
    demoLabel: "Open App",
  },
  {
    title: "Health Tool Calculator",
    description:
      "A simple health utility that gives users quick calculations through a clean, minimal, and easy-to-use interface.",
    category: "Utilities",
    image: "/img/project-4.png",
    imageAlt: "Preview of the Health Tool Calculator project",
    tags: ["JavaScript", "UI"],
    demoUrl: "https://health-tool-calculator.netlify.app/",
    demoLabel: "Open Tool",
  },
];

const heroRotator = document.getElementById("hero-rotator");
const projectFilters = document.getElementById("project-filters");
const featuredProject = document.getElementById("featured-project");
const projectGrid = document.getElementById("project-grid");
const projectEmptyState = document.getElementById("project-empty-state");
const contactForm = document.getElementById("contact-form");
const contactSubmit = document.getElementById("contact-submit");
const formStatus = document.getElementById("form-status");
const copyrightYear = document.getElementById("copyright-year");

const heroPhrases = [
  "modern brands",
  "growing startups",
  "local communities",
  "product teams",
];

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
      storage.remove(themeStorageKey);
    } else {
      storage.set(themeStorageKey, theme);
    }
  }

  updateThemeColor();
};

const savedTheme = storage.get(themeStorageKey) || "default";
applyTheme(savedTheme);

themeSelects.forEach((select) => {
  select.addEventListener("change", (event) => {
    applyTheme(event.target.value, true);
  });
});

prefersDarkScheme.addEventListener("change", () => {
  if (!storage.get(themeStorageKey)) {
    applyTheme("default");
  }
});

if (copyrightYear) {
  copyrightYear.textContent = new Date().getFullYear();
}

if (heroRotator) {
  let heroIndex = 0;
  heroRotator.textContent = heroPhrases[heroIndex];

  if (!prefersReducedMotion.matches) {
    window.setInterval(() => {
      heroIndex = (heroIndex + 1) % heroPhrases.length;
      heroRotator.classList.add("is-changing");

      window.setTimeout(() => {
        heroRotator.textContent = heroPhrases[heroIndex];
        heroRotator.classList.remove("is-changing");
      }, 180);
    }, 2600);
  }
}

const createTagMarkup = (tags, compact = false) =>
  tags
    .map((tag) => {
      const classes = compact
        ? "text-[10px] bg-surface p-1 px-2 rounded uppercase text-outline"
        : "text-xs font-label text-primary-fixed border border-primary/20 px-3 py-1 rounded-lg";

      return `<span class="${classes}">${tag}</span>`;
    })
    .join("");

const createProjectActionMarkup = (project) => {
  const demoMarkup = `
    <a
      class="flex items-center gap-2 font-bold text-primary hover:underline"
      href="${project.demoUrl}"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open ${project.title} in a new tab"
    >
      <span class="material-symbols-outlined" aria-hidden="true">arrow_outward</span>
      ${project.demoLabel}
    </a>
  `;

  if (project.repoPrivate) {
    return `${demoMarkup}
      <span
        class="flex items-center gap-2 font-bold text-on-surface-variant/70 cursor-not-allowed"
        aria-label="Source code is not publicly available"
      >
        <span class="material-symbols-outlined" aria-hidden="true">lock</span>
        Private Repository
      </span>
    `;
  }

  return demoMarkup;
};

const renderFeaturedProject = (project) => {
  if (!featuredProject) {
    return;
  }

  if (!project) {
    featuredProject.innerHTML = "";
    return;
  }

  featuredProject.innerHTML = `
    <article class="project-feature group relative overflow-hidden rounded-2xl bg-surface-container h-[500px] lg:col-span-12">
      <img
        loading="lazy"
        alt="${project.imageAlt}"
        class="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
        src="${project.image}"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent flex flex-col justify-end p-12">
        <div class="max-w-2xl">
          <span class="px-4 py-1 bg-primary text-on-primary text-xs font-bold rounded-full uppercase tracking-wider mb-4 inline-block">
            ${project.category} Highlight
          </span>
          <h3 class="text-4xl font-headline font-extrabold mb-4">${project.title}</h3>
          <p class="text-lg text-on-surface-variant mb-6">${project.description}</p>
          <div class="flex flex-wrap gap-3 mb-8">
            ${createTagMarkup(project.tags)}
          </div>
          <div class="flex flex-wrap gap-4">
            ${createProjectActionMarkup(project)}
          </div>
        </div>
      </div>
    </article>
  `;
};

const renderProjectCards = (projectList) => {
  if (!projectGrid) {
    return;
  }

  projectGrid.innerHTML = projectList
    .map(
      (project) => `
        <article class="project-card lg:col-span-6 bg-surface-container-high rounded-2xl overflow-hidden group border border-outline-variant/10">
          <div class="h-64 overflow-hidden relative">
            <img
              loading="lazy"
              alt="${project.imageAlt}"
              class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
              src="${project.image}"
            />
            <div class="absolute inset-0 bg-surface/20 group-hover:bg-transparent transition-colors"></div>
          </div>
          <div class="p-8">
            <div class="flex items-start justify-between gap-4 mb-4">
              <div>
                <p class="project-card-category">${project.category}</p>
                <h3 class="text-2xl font-bold">${project.title}</h3>
              </div>
              <a
                class="project-card-link"
                href="${project.demoUrl}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open ${project.title} in a new tab"
              >
                <span class="material-symbols-outlined text-outline group-hover:text-primary transition-colors" aria-hidden="true">
                  arrow_outward
                </span>
              </a>
            </div>
            <p class="text-on-surface-variant mb-6">${project.description}</p>
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex flex-wrap gap-2">
                ${createTagMarkup(project.tags, true)}
              </div>
              <a
                class="text-sm font-semibold text-primary hover:underline"
                href="${project.demoUrl}"
                target="_blank"
                rel="noopener noreferrer"
              >
                ${project.demoLabel}
              </a>
            </div>
          </div>
        </article>
      `
    )
    .join("");
};

const projectCategories = ["All", ...new Set(projects.map((project) => project.category))];
let activeProjectFilter = "All";

const renderProjectFilters = () => {
  if (!projectFilters) {
    return;
  }

  projectFilters.innerHTML = projectCategories
    .map(
      (category) => `
        <button
          type="button"
          class="project-filter-button ${category === activeProjectFilter ? "is-active" : ""}"
          data-project-filter="${category}"
        >
          ${category}
        </button>
      `
    )
    .join("");

  projectFilters.querySelectorAll("[data-project-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeProjectFilter = button.dataset.projectFilter;
      updateProjectsUI();
    });
  });
};

const updateProjectsUI = () => {
  const filteredProjects =
    activeProjectFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeProjectFilter);

  renderProjectFilters();
  renderFeaturedProject(filteredProjects[0] || null);
  renderProjectCards(filteredProjects.slice(1));

  if (projectEmptyState) {
    const shouldShowEmpty = filteredProjects.length === 0;
    projectEmptyState.classList.toggle("hidden", !shouldShowEmpty);
  }
};

updateProjectsUI();

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

    window.requestAnimationFrame(() => {
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

const sectionLinks = [...document.querySelectorAll('a[href^="#"]')].filter((link) => {
  const targetId = link.getAttribute("href");
  return targetId && targetId.length > 1 && document.querySelector(targetId);
});

const observedSections = [...new Set(sectionLinks.map((link) => link.getAttribute("href")))]
  .map((selector) => document.querySelector(selector))
  .filter(Boolean);

if (observedSections.length > 0) {
  const activateLinks = (activeId) => {
    sectionLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${activeId}`);
    });
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)[0];

      if (visibleEntry?.target?.id) {
        activateLinks(visibleEntry.target.id);
      }
    },
    {
      threshold: [0.25, 0.5, 0.75],
      rootMargin: "-20% 0px -35% 0px",
    }
  );

  observedSections.forEach((section) => sectionObserver.observe(section));
}

if (contactForm && contactSubmit && formStatus) {
  const defaultButtonMarkup = contactSubmit.innerHTML;

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    contactSubmit.disabled = true;
    contactSubmit.innerHTML = "Sending...";
    formStatus.textContent = "Sending your message...";
    formStatus.classList.remove("form-status-error", "form-status-success");

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      contactForm.reset();
      formStatus.textContent = "Message sent successfully. I'll get back to you soon.";
      formStatus.classList.add("form-status-success");
    } catch {
      formStatus.textContent =
        "Something went wrong while sending your message. Please try again or email me directly.";
      formStatus.classList.add("form-status-error");
    } finally {
      contactSubmit.disabled = false;
      contactSubmit.innerHTML = defaultButtonMarkup;
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
