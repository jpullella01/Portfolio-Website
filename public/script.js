const root = document.documentElement;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
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

const themeProperties = {
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

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const routeFor = ({ slug }) => (slug === "paintings" ? "/paintings" : `/projects/${slug}`);
const makeNode = (tag, className = "", text) => {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};
const chip = (text) => makeNode("span", "", text);

let activeProject = projects[0] ?? null;
let cursorFrame = null;
let cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

const applyTheme = (theme = defaultTheme) => {
  Object.entries(themeProperties).forEach(([key, property]) => root.style.setProperty(property, theme[key] ?? defaultTheme[key]));
};

const updateCursorGlow = () => {
  root.style.setProperty("--cursor-x", `${cursor.x}px`);
  root.style.setProperty("--cursor-y", `${cursor.y}px`);
  cursorFrame = null;
};

const trackPointer = ({ clientX, clientY }) => {
  cursor = { x: clientX, y: clientY };
  cursorFrame ??= window.requestAnimationFrame(updateCursorGlow);
};

const syncPointerTracking = () => {
  window.removeEventListener("pointermove", trackPointer);
  if (cursorFrame) window.cancelAnimationFrame(cursorFrame);
  cursorFrame = null;
  if (!prefersReducedMotion.matches) window.addEventListener("pointermove", trackPointer, { passive: true });
};

const projectFromPath = (path = window.location.pathname) => {
  const slug = path.match(/^\/projects\/([^/]+)\/?$/)?.[1];
  return projects.find((project) => project.slug === slug) ?? null;
};

const showView = (name) => $$('[data-view]').forEach((view) => (view.hidden = view.dataset.view !== name));

const syncActiveNav = () => {
  const path = window.location.pathname;
  $$('[data-route]').forEach((link) => {
    const href = link.getAttribute("href");
    link.toggleAttribute("aria-current", href === path || (href === "/projects" && path.startsWith("/projects")));
  });
};

const syncProjectCards = () => {
  $$(".project-card").forEach((card) => card.setAttribute("aria-pressed", String(card.dataset.slug === activeProject?.slug)));
};

const replaceChips = (selector, items = []) => $(selector)?.replaceChildren(...items.map(chip));

const renderProjectDetail = (project) => {
  const detail = $("[data-project-detail]");
  if (!detail || !project) return;

  Object.entries({
    "[data-detail-category]": `${project.category} · ${project.year}`,
    "[data-detail-title]": project.title,
    "[data-detail-summary]": project.summary,
    "[data-detail-path]": `${project.assetsPath}hero/`,
    "[data-detail-role]": project.role,
    "[data-detail-timeline]": project.timeline,
    "[data-detail-year]": project.year,
    "[data-detail-deliverables]": project.deliverables.join(" · "),
    "[data-detail-problem]": project.sections.problem,
    "[data-detail-outcome]": project.sections.outcome,
  }).forEach(([selector, text]) => ($(selector, detail).textContent = text));

  $("[data-detail-hero]", detail).style.setProperty("--placeholder-label", `"${project.title}"`);
  replaceChips("[data-detail-research]", project.sections.research);
  replaceChips("[data-detail-process]", project.sections.process);
  replaceChips("[data-detail-cmf]", project.sections.cmf);

  $("[data-detail-stats]", detail).replaceChildren(
    ...project.outcomeStats.map((stat) => {
      const block = makeNode("div", "stat-block");
      block.replaceChildren(makeNode("strong", "", stat), makeNode("span", "", project.themeDirection));
      return block;
    }),
  );

  $("[data-detail-gallery]", detail).replaceChildren(
    ...project.galleryImages.map((folder) => {
      const tile = makeNode("div", "gallery-tile");
      tile.replaceChildren(makeNode("span", "", folder), makeNode("strong", "", `${project.assetsPath}${folder}/`));
      return tile;
    }),
  );
};

const activateProject = (project) => {
  if (!project) return;
  activeProject = project;
  applyTheme(project.accentTheme);
  renderProjectDetail(project);
  syncProjectCards();
};

const renderProjectCards = () => {
  const grid = $("[data-project-grid]");
  if (!grid) return;

  grid.replaceChildren(
    ...projects.map((project) => {
      const card = makeNode("a", "project-card");
      card.href = routeFor(project);
      card.dataset.route = "";
      card.dataset.slug = project.slug;
      card.setAttribute("aria-pressed", "false");
      Object.entries({
        "--card-accent": project.accentTheme.accent,
        "--card-canvas": project.accentTheme.canvas,
        "--card-glow": project.accentTheme.glowOne,
      }).forEach(([property, value]) => card.style.setProperty(property, value));

      const meta = makeNode("div", "project-card-meta");
      meta.replaceChildren(makeNode("h3", "", project.title), makeNode("p", "project-year", project.year));
      card.replaceChildren(makeNode("div", "project-card-image"), meta);

      ["mouseenter", "focus"].forEach((eventName) => card.addEventListener(eventName, () => applyTheme(project.accentTheme)));
      ["mouseleave", "blur"].forEach((eventName) => card.addEventListener(eventName, () => applyTheme(activeProject?.accentTheme)));
      return card;
    }),
  );
};

const renderAbout = () => replaceChips("[data-about-groups]", sitePages.about?.groups ?? []);

const routeTo = (path = "/", shouldPush = true) => {
  const cleanPath = path || "/";
  const project = projectFromPath(cleanPath);
  const route = project ? "project-detail" : cleanPath.startsWith("/projects") ? "projects" : cleanPath.startsWith("/paintings") ? "paintings" : cleanPath.startsWith("/about") ? "about" : cleanPath.startsWith("/contact") ? "contact" : "home";

  if (shouldPush && cleanPath !== window.location.pathname) window.history.pushState({}, "", cleanPath);
  project ? activateProject(project) : route === "projects" ? activateProject(activeProject ?? projects[0]) : applyTheme(defaultTheme);
  showView(route);
  syncActiveNav();
  window.scrollTo({ top: 0, behavior: shouldPush && !prefersReducedMotion.matches ? "smooth" : "auto" });
};

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-route]");
  if (!link || link.origin !== window.location.origin) return;
  event.preventDefault();
  routeTo(link.pathname);
});

window.addEventListener("popstate", () => routeTo(window.location.pathname, false));
prefersReducedMotion.addEventListener("change", syncPointerTracking);

syncPointerTracking();
renderProjectCards();
renderAbout();
routeTo(window.location.pathname, false);
