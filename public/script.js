const root = document.documentElement;
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
let animationFrame = null;
let pointerX = window.innerWidth / 2;
let pointerY = window.innerHeight / 2;

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

syncPointerTracking();
reduceMotionQuery.addEventListener("change", syncPointerTracking);
