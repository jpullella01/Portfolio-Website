const root = document.documentElement;
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const projects = window.PORTFOLIO_PROJECTS ?? [];
const sitePages = window.SITE_PAGES ?? {};
const defaultTheme = {
  ink: "#55585B",
  muted: "#6a645f",
  canvas: "#F2EFEA",
  glass: "rgba(242, 239, 234, 0.56)",
  glassStrong: "rgba(242, 239, 234, 0.78)",
  accent: "#B88467",
  accentSoft: "rgba(184, 132, 103, 0.15)",
  glowOne: "#7E9986",
  glowTwo: "#A98363",
  grid: "rgba(85, 88, 91, 0.06)",
};

let activeProject = projects[0] ?? null;
let animationFrame = null;
let pointerX = window.innerWidth / 2;
let pointerY = window.innerHeight / 2;

const themePropertyMap = {
  ink: "--ink",
  muted: "--muted",
  canvas: "--canvas",
  glass: "--glass",
  glassStrong: "--glass-strong",
  accent: "--accent",
  accentSoft: "--accent-soft",
  glowOne: "--glow-one",
  glowTwo: "--glow-two",
  grid: "--grid-line",
};

const projectRoute = (slug) => (slug === "paintings" ? "/paintings" : `/projects/${slug}`);

const applyTheme = (theme = defaultTheme) => {
  Object.entries(themePropertyMap).forEach(([key, property]) => {
    root.style.setProperty(property, theme[key] ?? defaultTheme[key]);
  });
};

const updateCursorGlow = () => {
  root.style.setProperty("--cursor-x", `${pointerX}px`);
  root.style.setProperty("--cursor-y", `${pointerY}px`);
  animationFrame = null;
};

const handlePointerMove = (event) => {
  pointerX = event.clientX;
  pointerY = event.clientY;

  if (animationFrame === null) {
    animationFrame = window.requestAnimationFrame(updateCursorGlow);
  }
};

const syncPointerTracking = () => {
  window.removeEventListener("pointermove", handlePointerMove);

  if (animationFrame !== null) {
    window.cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }

  if (!reduceMotionQuery.matches) {
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
  }
};

const createChip = (text) => {
  const chip = document.createElement("span");
  chip.textContent = text;
  return chip;
};

const showView = (viewName) => {
  document.querySelectorAll("[data-view]").forEach((view) => {
    view.hidden = view.dataset.view !== viewName;
  });
};

const getProjectFromPath = (path = window.location.pathname) => {
  const slug = path.match(/^\/projects\/([^/]+)\/?$/)?.[1];
  return projects.find((project) => project.slug === slug) ?? null;
};

const syncActiveNav = () => {
  const path = window.location.pathname;

  document.querySelectorAll("[data-route]").forEach((link) => {
    const href = link.getAttribute("href");
    const isActive = href === path || (href === "/projects" && path.startsWith("/projects"));
    link.toggleAttribute("aria-current", isActive);
  });
};

const syncPressedCards = () => {
  document.querySelectorAll(".project-card").forEach((card) => {
    card.setAttribute("aria-pressed", String(card.dataset.slug === activeProject?.slug));
  });
};

const replaceChips = (selector, items) => {
  const node = document.querySelector(selector);
  node?.replaceChildren(...items.map(createChip));
};

const renderProjectDetail = (project) => {
  const detail = document.querySelector("[data-project-detail]");

  if (!detail || !project) return;

  detail.querySelector("[data-detail-category]").textContent = `${project.category} · ${project.year}`;
  detail.querySelector("[data-detail-title]").textContent = project.title;
  detail.querySelector("[data-detail-summary]").textContent = project.summary;
  detail.querySelector("[data-detail-path]").textContent = project.heroImage || `${project.assetsPath}hero/`;
  detail.querySelector("[data-detail-role]").textContent = project.role;
  detail.querySelector("[data-detail-timeline]").textContent = project.timeline;
  detail.querySelector("[data-detail-year]").textContent = project.year;
  detail.querySelector("[data-detail-deliverables]").textContent = project.deliverables.join(" · ");
  detail.querySelector("[data-detail-problem]").textContent = project.sections.problem;
  detail.querySelector("[data-detail-outcome]").textContent = project.sections.outcome;
  const hero = detail.querySelector("[data-detail-hero]");
  hero.style.setProperty("--placeholder-label", `"${project.title}"`);
  hero.style.setProperty("--project-hero-image", project.heroImage ? `url("${project.heroImage}")` : "none");
  hero.toggleAttribute("data-has-image", Boolean(project.heroImage));

  replaceChips("[data-detail-research]", project.sections.research);
  replaceChips("[data-detail-process]", project.sections.process);
  replaceChips("[data-detail-cmf]", project.sections.cmf);

  const stats = project.outcomeStats.map((stat) => {
    const block = document.createElement("div");
    block.className = "stat-block";
    block.innerHTML = `<strong>${stat}</strong><span>${project.themeDirection}</span>`;
    return block;
  });
  detail.querySelector("[data-detail-stats]").replaceChildren(...stats);

  const galleryItems = project.galleryImages.map((folder) => {
    const tile = document.createElement("div");
    tile.className = "gallery-tile";
    tile.innerHTML = `<span>${folder}</span><strong>${project.assetsPath}${folder}/</strong>`;
    return tile;
  });
  detail.querySelector("[data-detail-gallery]").replaceChildren(...galleryItems);
};

const activateProject = (project) => {
  if (!project) return;

  activeProject = project;
  applyTheme(project.accentTheme);
  renderProjectDetail(project);
  syncPressedCards();
};

const renderProjectCards = () => {
  const grid = document.querySelector("[data-project-grid]");

  if (!grid || projects.length === 0) return;

  const cards = projects.map((project) => {
    const card = document.createElement("a");
    card.className = "project-card";
    card.href = projectRoute(project.slug);
    card.dataset.route = "";
    card.dataset.slug = project.slug;
    card.setAttribute("aria-pressed", "false");
    card.style.setProperty("--card-accent", project.accentTheme.accent);
    card.style.setProperty("--card-canvas", project.accentTheme.canvas);
    card.style.setProperty("--card-glow", project.accentTheme.glowOne);
    if (project.heroImage) {
      card.style.setProperty("--card-image", `url("${project.heroImage}")`);
      card.dataset.hasImage = "true";
    }

    const yearLabel = project.year || "2020";

    card.innerHTML = `
      <div class="project-card-image" aria-hidden="true"></div>
      <div class="project-card-meta">
        <h3>Project</h3>
        <p class="project-year">${yearLabel}</p>
      </div>
      <span class="visually-hidden">${project.title}</span>
    `;

    card.addEventListener("mouseenter", () => applyTheme(project.accentTheme));
    card.addEventListener("focus", () => applyTheme(project.accentTheme));
    card.addEventListener("mouseleave", () => applyTheme(activeProject?.accentTheme ?? defaultTheme));
    card.addEventListener("blur", () => applyTheme(activeProject?.accentTheme ?? defaultTheme));

    return card;
  });

  grid.replaceChildren(...cards);
};

const renderAbout = () => {
  const groups = sitePages.about?.groups ?? ["Bio", "Education", "Experience", "Awards", "Skills"];
  document.querySelector("[data-about-groups]")?.replaceChildren(...groups.map(createChip));
};

const routeTo = (path, shouldPush = true) => {
  const cleanPath = path === "" ? "/" : path;
  const project = getProjectFromPath(cleanPath);

  if (shouldPush && cleanPath !== window.location.pathname) {
    window.history.pushState({}, "", cleanPath);
  }

  if (project) {
    activateProject(project);
    showView("project-detail");
  } else if (cleanPath.startsWith("/projects")) {
    activateProject(activeProject ?? projects[0]);
    showView("projects");
  } else if (cleanPath.startsWith("/paintings")) {
    applyTheme(defaultTheme);
    showView("paintings");
  } else if (cleanPath.startsWith("/about")) {
    applyTheme(defaultTheme);
    showView("about");
  } else if (cleanPath.startsWith("/contact")) {
    applyTheme(defaultTheme);
    showView("contact");
  } else {
    applyTheme(defaultTheme);
    showView("home");
  }

  syncActiveNav();
  window.scrollTo({ top: 0, behavior: shouldPush && !reduceMotionQuery.matches ? "smooth" : "auto" });
};

const bindRoutes = () => {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-route]");

    if (!link || link.origin !== window.location.origin) return;

    event.preventDefault();
    routeTo(link.pathname);
  });

  window.addEventListener("popstate", () => routeTo(window.location.pathname, false));
};

syncPointerTracking();
renderProjectCards();
renderAbout();
bindRoutes();
routeTo(window.location.pathname, false);
reduceMotionQuery.addEventListener("change", syncPointerTracking);
