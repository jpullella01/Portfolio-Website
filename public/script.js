const projects = {
  "bloom-lamp": {
    title: "Bloom Lamp",
    kicker: "Lighting design · 2026",
    description: "A sculptural table lamp that layers translucent petal-like forms around a warm central glow, bringing soft ambient light and an expressive floral silhouette into everyday spaces.",
    image: "/assets/work/bloom-lamp.png",
  },
  tongo: {
    title: "Tongo",
    kicker: "Product design · 2025",
    description: "A playful sculptural seating concept shaped around softness, tactility, and an inviting visual character.",
    image: "/assets/work/tongo.png",
  },
  dega: {
    title: "Dega",
    kicker: "Furniture design · 2024",
    description: "A flat-pack furniture study that explores manufacturing logic, warm natural material, and expressive joinery.",
    image: "/assets/work/dega.jpg",
  },
  sprout: {
    title: "Sprout",
    kicker: "Sport product · 2024",
    description: "A snowboard concept inspired by natural growth systems, with sustainable material thinking and a flexible visual identity.",
    image: "/assets/work/sprout.png",
  },
  unlocked: {
    title: "Unlocked",
    kicker: "Outdoor product · 2024",
    description: "A modular outdoor pack developed around organization, access, durability, and the needs of active users.",
    image: "/assets/work/unlocked.jpg",
  },
  sportrock: {
    title: "Sportrock",
    kicker: "Apparel graphics · 2024",
    description: "An expressive graphic system for climbing apparel, balancing bold forms, regional storytelling, and wearable composition.",
    image: "/assets/work/sportrock.png",
  },
  "trade-stacks": {
    title: "Trade Stacks",
    kicker: "Industrial systems · 2024",
    description: "A research-led storage system that responds to the different ways tradespeople organize, move, and access their tools.",
    image: "/assets/work/trade-stacks.png",
  },
};

const dialog = document.querySelector(".project-dialog");
const title = document.querySelector("#dialog-title");
const kicker = document.querySelector("#dialog-kicker");
const description = document.querySelector("#dialog-description");
const image = document.querySelector("#dialog-image");

document.querySelectorAll(".project-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const project = projects[trigger.dataset.project];
    if (!project) return;

    title.textContent = project.title;
    kicker.textContent = project.kicker;
    description.textContent = project.description;
    image.src = project.image;
    image.alt = `${project.title} project image`;
    dialog.showModal();
  });
});

document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 },
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const header = document.querySelector(".site-header");
const statement = document.querySelector(".statement");
const headerObserver = new IntersectionObserver(
  ([entry]) => header.classList.toggle("is-hidden", entry.intersectionRatio > 0.35),
  { threshold: [0.35] },
);

headerObserver.observe(statement);
