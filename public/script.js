const root = document.documentElement;
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const projects = window.PORTFOLIO_PROJECTS ?? [];
const defaultTheme = {
  ink: "#171b2a",
  muted: "#73788a",
  canvas: "#f3f4f8",
  glass: "rgba(255, 255, 255, 0.46)",
  glassStrong: "rgba(255, 255, 255, 0.68)",
  accent: "#5b627b",
  accentSoft: "rgba(255, 118, 109, 0.12)",
  glowOne: "#dfe4f1",
  glowTwo: "#ffffff",
  grid: "rgba(32, 36, 55, 0.045)",
};

let activeProject = null;
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

const createPrincipleChip = (principle) => {
  const chip = document.createElement("span");
  chip.textContent = principle;
  return chip;
};

const syncPressedCards = () => {
  document.querySelectorAll(".project-card").forEach((card) => {
    card.setAttribute("aria-pressed", String(card.dataset.slug === activeProject?.slug));
  });
};

const renderDetail = (project) => {
  const detail = document.querySelector("[data-project-detail]");

  if (!detail || !project) return;

  detail.querySelector("[data-detail-kicker]").textContent = project.kicker;
  detail.querySelector("[data-detail-title]").textContent = project.title;
  detail.querySelector("[data-detail-summary]").textContent = project.summary;
  detail.querySelector("[data-detail-status]").textContent = project.status;
  detail.querySelector("[data-detail-path]").textContent = project.assetsPath;

  const principleList = detail.querySelector("[data-detail-principles]");
  principleList.replaceChildren(...project.principles.map(createPrincipleChip));
};

const activateProject = (project, shouldScroll = false) => {
  activeProject = project;
  applyTheme(project.theme);
  renderDetail(project);
  syncPressedCards();

  if (shouldScroll) {
    document.querySelector("[data-project-detail]")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const renderProjectCards = () => {
  const grid = document.querySelector("[data-project-grid]");

  if (!grid || projects.length === 0) return;

  const cards = projects.map((project, index) => {
    const card = document.createElement("button");
    card.className = "project-card";
    card.type = "button";
    card.dataset.slug = project.slug;
    card.setAttribute("aria-pressed", "false");
    card.style.setProperty("--card-accent", project.theme.accent);
    card.style.setProperty("--card-canvas", project.theme.canvas);
    card.style.setProperty("--card-glow", project.theme.glowOne);

    const number = String(index + 1).padStart(2, "0");
    card.innerHTML = `
      <span class="project-kicker">${number} · ${project.kicker}</span>
      <div class="project-card-content">
        <h3>${project.title}</h3>
        <p>${project.summary}</p>
        <span class="project-status">${project.status}</span>
      </div>
    `;

    card.addEventListener("mouseenter", () => applyTheme(project.theme));
    card.addEventListener("focus", () => applyTheme(project.theme));
    card.addEventListener("mouseleave", () => applyTheme(activeProject?.theme ?? defaultTheme));
    card.addEventListener("blur", () => applyTheme(activeProject?.theme ?? defaultTheme));
    card.addEventListener("click", () => activateProject(project, true));

    return card;
  });

  grid.replaceChildren(...cards);
  activateProject(projects[0]);
};

syncPointerTracking();
renderProjectCards();
reduceMotionQuery.addEventListener("change", syncPointerTracking);
