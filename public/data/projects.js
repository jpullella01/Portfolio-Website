const themes = {
  tongo: {
    ink: "#241816",
    muted: "#7f6b61",
    canvas: "#f6eee7",
    glass: "rgba(255, 248, 240, 0.58)",
    glassStrong: "rgba(255, 252, 246, 0.8)",
    accent: "#e36a5c",
    accentSoft: "rgba(227, 106, 92, 0.16)",
    glowOne: "#f2ded6",
    glowTwo: "#fff8f1",
    grid: "rgba(102, 62, 45, 0.06)"
  },
  dega: {
    ink: "#211a15",
    muted: "#776b5c",
    canvas: "#f1e5d8",
    glass: "rgba(250, 242, 232, 0.58)",
    glassStrong: "rgba(255, 250, 244, 0.8)",
    accent: "#b9794e",
    accentSoft: "rgba(185, 121, 78, 0.17)",
    glowOne: "#e7c9ae",
    glowTwo: "#fff6ed",
    grid: "rgba(83, 57, 37, 0.06)"
  },
  sprout: {
    ink: "#10231d",
    muted: "#5e746e",
    canvas: "#edf5ef",
    glass: "rgba(244, 252, 246, 0.56)",
    glassStrong: "rgba(252, 255, 252, 0.8)",
    accent: "#3f9e6b",
    accentSoft: "rgba(63, 158, 107, 0.16)",
    glowOne: "#c9ead5",
    glowTwo: "#f8fff9",
    grid: "rgba(27, 89, 57, 0.06)"
  },
  utility: {
    ink: "#18191a",
    muted: "#6d706c",
    canvas: "#e9e4db",
    glass: "rgba(246, 241, 236, 0.5)",
    glassStrong: "rgba(255, 252, 247, 0.78)",
    accent: "#4b5146",
    accentSoft: "rgba(75, 81, 70, 0.18)",
    glowOne: "#c9c1b1",
    glowTwo: "#fff8ef",
    grid: "rgba(33, 35, 31, 0.07)"
  },
  editorial: {
    ink: "#171a22",
    muted: "#676d78",
    canvas: "#f2f3f1",
    glass: "rgba(255, 255, 255, 0.52)",
    glassStrong: "rgba(255, 255, 255, 0.78)",
    accent: "#53627f",
    accentSoft: "rgba(83, 98, 127, 0.16)",
    glowOne: "#d5d9e2",
    glowTwo: "#ffffff",
    grid: "rgba(31, 40, 63, 0.055)"
  },
  coral: {
    ink: "#1e1e1e",
    muted: "#6e675f",
    canvas: "#f0e4d6",
    glass: "rgba(246, 241, 236, 0.5)",
    glassStrong: "rgba(255, 250, 244, 0.78)",
    accent: "#c85c3f",
    accentSoft: "rgba(200, 92, 63, 0.16)",
    glowOne: "#e4b08c",
    glowTwo: "#fff7ea",
    grid: "rgba(59, 47, 36, 0.07)"
  }
};

const project = ({ theme, ...details }) => ({
  heroImage: "",
  assetsPath: `/assets/projects/${details.slug}/`,
  accentTheme: themes[theme],
  ...details,
});

window.PORTFOLIO_PROJECTS = [
  project({
    theme: "tongo",
    slug: "tongo",
    title: "Tongo",
    category: "Product design / playful furniture",
    year: "2024",
    timeline: "12 weeks",
    role: "Industrial design, prototyping, CMF direction",
    deliverables: [
      "Concept development",
      "Prototype plan",
      "CMF palette",
      "Final presentation boards"
    ],
    summary: "A soft, rounded product study that balances playful interaction with clear construction logic and a warm material story.",
    themeDirection: "Soft, rounded, playful, warm",
    sections: {
      problem: "How can a furniture object feel approachable and expressive without losing everyday usability or manufacturable discipline?",
      research: [
        "Mapped soft-form furniture cues",
        "Studied touchpoints and scale",
        "Compared warm material combinations"
      ],
      process: [
        "Sketch proportion studies",
        "Block-model exploration",
        "Edge-radius and joinery iteration",
        "Presentation-board refinement"
      ],
      cmf: [
        "Warm ivory shell",
        "Coral accent details",
        "Soft-touch finishes",
        "Rounded silhouette language"
      ],
      outcome: "A cohesive project language ready for high-resolution hero imagery, process documentation, and final application shots."
    },
    galleryImages: [
      "hero",
      "research",
      "process",
      "cmf",
      "final",
      "gallery"
    ],
    outcomeStats: [
      "6 board-ready sections",
      "1 shared template",
      "Warm playful theme"
    ]
  }),
  project({
    theme: "dega",
    slug: "dega",
    title: "Dega",
    category: "Furniture / material exploration",
    year: "2024",
    timeline: "10 weeks",
    role: "Furniture design, material research, visualization",
    deliverables: [
      "Research boards",
      "Form studies",
      "Material palette",
      "Final render set"
    ],
    summary: "A calm, architectural furniture case study centered on material honesty, softened structure, and restrained detail.",
    themeDirection: "Calm, material-forward, warm, architectural",
    sections: {
      problem: "How can a furniture system communicate craft, balance, and durability through quiet material cues?",
      research: [
        "Reviewed architectural furniture precedents",
        "Studied wood, textile, and neutral finish pairings",
        "Defined calm interaction moments"
      ],
      process: [
        "Proportion studies",
        "Material blocking",
        "Joint and support refinement",
        "Final visualization pass"
      ],
      cmf: [
        "Soft tan base",
        "Natural grain references",
        "Matte warm finish",
        "Subtle shadow reveals"
      ],
      outcome: "A material-forward visual direction that can scale from overview boards into detailed mechanism and CMF pages."
    },
    galleryImages: [
      "hero",
      "materials",
      "process",
      "details",
      "final",
      "gallery"
    ],
    outcomeStats: [
      "Material-first story",
      "Architectural rhythm",
      "Reusable page data"
    ]
  }),
  project({
    theme: "sprout",
    slug: "sprout",
    title: "Sprout",
    category: "Sport product / technical system",
    year: "2024",
    timeline: "14 weeks",
    role: "Product strategy, sketching, testing, development",
    deliverables: [
      "User insights",
      "Technical sketches",
      "Prototype iterations",
      "Final design system"
    ],
    summary: "A clean, motion-driven sport product study with technical hierarchy, crisp contrast, and development-focused storytelling.",
    themeDirection: "Technical, sporty, clean, motion-driven",
    sections: {
      problem: "How can sport-focused design balance technical clarity, movement, and approachable product language?",
      research: [
        "Identified athlete use moments",
        "Benchmarked sporty visual systems",
        "Studied motion and fit cues"
      ],
      process: [
        "Sketch sprints",
        "Prototype feedback loops",
        "Testing notes",
        "Development detail pass"
      ],
      cmf: [
        "Clean green accent",
        "Technical neutrals",
        "Crisp graphic marks",
        "Motion-line details"
      ],
      outcome: "A technical portfolio case-study structure prepared for process-heavy imagery and performance-focused results."
    },
    galleryImages: [
      "hero",
      "research",
      "testing",
      "development",
      "final",
      "gallery"
    ],
    outcomeStats: [
      "Process-led",
      "Sporty accents",
      "Motion ready"
    ]
  }),
  project({
    theme: "utility",
    slug: "unlocked",
    title: "Unlocked",
    category: "Utility product / rugged experience",
    year: "2024",
    timeline: "8 weeks",
    role: "Concept design, utility research, visual system",
    deliverables: [
      "Opportunity map",
      "Use-case studies",
      "Utility details",
      "Final boards"
    ],
    summary: "A rugged, utility-first project direction with darker contrast, practical framing, and durable visual cues.",
    themeDirection: "Rugged, dark, utility-first",
    sections: {
      problem: "How can a utility-first design communicate security, readiness, and durability while staying clear and portfolio-friendly?",
      research: [
        "Mapped rugged product cues",
        "Documented access and carry moments",
        "Studied dark neutral palettes"
      ],
      process: [
        "Use-case sequencing",
        "Functional sketching",
        "Detail refinement",
        "Final utility framing"
      ],
      cmf: [
        "Dark utility accent",
        "Matte surfaces",
        "High-contrast labels",
        "Durable edge treatments"
      ],
      outcome: "A rugged project page system that can foreground mechanisms, constraints, and final utility details."
    },
    galleryImages: [
      "hero",
      "use-cases",
      "process",
      "details",
      "final",
      "gallery"
    ],
    outcomeStats: [
      "Utility-first",
      "Dark accent",
      "Detail focused"
    ]
  }),
  project({
    theme: "editorial",
    slug: "sportrock",
    title: "Sportrock",
    category: "Apparel / merchandising system",
    year: "2024",
    timeline: "6 weeks",
    role: "Merchandising design, visual direction, rollout planning",
    deliverables: [
      "Market scan",
      "Apparel graphics",
      "Rollout plan",
      "Final mockups"
    ],
    summary: "An editorial, apparel-focused project structure for clean merchandise storytelling, visual hierarchy, and rollout assets.",
    themeDirection: "Editorial, apparel-focused, clean",
    sections: {
      problem: "How can apparel and merchandising work feel elevated, organized, and ready for rollout across multiple touchpoints?",
      research: [
        "Reviewed apparel positioning",
        "Audited graphic placement systems",
        "Mapped launch and display needs"
      ],
      process: [
        "Graphic hierarchy studies",
        "Mockup sequencing",
        "Assortment refinement",
        "Rollout board setup"
      ],
      cmf: [
        "Editorial neutrals",
        "Clean apparel frames",
        "Subtle blue-gray accent",
        "Minimal label system"
      ],
      outcome: "A clean case-study framework that can emphasize research, merchandising rollout, and final application shots."
    },
    galleryImages: [
      "hero",
      "research",
      "graphics",
      "mockups",
      "rollout",
      "gallery"
    ],
    outcomeStats: [
      "Editorial system",
      "Rollout ready",
      "Apparel focused"
    ]
  }),
  project({
    theme: "coral",
    slug: "trade-stacks",
    title: "Trade Stacks",
    category: "Industrial system / data-driven design",
    year: "2024",
    timeline: "9 weeks",
    role: "Systems design, information hierarchy, visual strategy",
    deliverables: [
      "System map",
      "Interface logic",
      "Industrial palette",
      "Final case-study boards"
    ],
    summary: "A bold industrial project direction combining structured information, heavier contrast, and data-driven visual details.",
    themeDirection: "Bold, industrial, data-driven",
    sections: {
      problem: "How can a data-driven industrial project feel bold and clear without overwhelming the portfolio experience?",
      research: [
        "Mapped industrial references",
        "Structured information layers",
        "Defined data and hierarchy cues"
      ],
      process: [
        "System diagrams",
        "Stacking logic",
        "Visual hierarchy passes",
        "Final board organization"
      ],
      cmf: [
        "Charcoal type",
        "Coral industrial accent",
        "Warm technical neutrals",
        "Grid and data motifs"
      ],
      outcome: "A scalable case-study page that can handle diagrams, data blocks, process boards, and final industrial visuals."
    },
    galleryImages: [
      "hero",
      "system",
      "process",
      "data",
      "final",
      "gallery"
    ],
    outcomeStats: [
      "Data-ready",
      "Industrial accent",
      "System logic"
    ]
  }),
  project({
    theme: "coral",
    slug: "paintings",
    title: "Paintings",
    category: "",
    year: "",
    timeline: "",
    role: "",
    deliverables: [],
    summary: "",
    themeDirection: "",
    sections: {
      problem: "",
      research: [],
      process: [],
      cmf: [],
      outcome: ""
    },
    galleryImages: [],
    outcomeStats: [],
    assetsPath: ""
  }),
];

window.SITE_PAGES = {
  home: {
    title: "PORTFOLIO",
    kicker: "Industrial design portfolio / clean case-study system",
    summary: "A warm, image-forward portfolio organized around reusable project pages, project-specific accents, and a simple path from featured work to contact."
  },
  about: {
    title: "About",
    kicker: "Bio / education / experience / awards / skills",
    summary: "A dedicated profile page structure for biography, education, experience, awards, and a concise skills system.",
    groups: [
      "Bio",
      "Education",
      "Experience",
      "Awards",
      "Skills"
    ]
  },
  contact: {
    title: "Contact",
    kicker: "Start a conversation",
    summary: "A simple contact page with direct email, project inquiry prompts, and a focused call-to-action."
  }
};
