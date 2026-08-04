export const easeCinematic = [0.16, 1, 0.3, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeCinematic } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1, ease: easeCinematic } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: easeCinematic } },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeCinematic } },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeCinematic } },
};

export const staggerContainer = (stagger = 0.12, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const cardHover = {
  rest: { y: 0 },
  hover: { y: -6, transition: { duration: 0.4, ease: easeCinematic } },
};

export const buttonHover = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.3, ease: easeCinematic } },
  tap: { scale: 0.97 },
};

export const menuReveal = {
  hidden: { opacity: 0, height: 0 },
  show: { opacity: 1, height: "auto", transition: { duration: 0.5, ease: easeCinematic } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.35, ease: easeCinematic } },
};

export const viewportOnce = { once: true, margin: "-80px" };