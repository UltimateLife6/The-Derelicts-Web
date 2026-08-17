export const motionDurations = {
  fast: 0.18,
  base: 0.45,
  slow: 0.8,
} as const;

export const motionEase = [0.22, 1, 0.36, 1] as const;

export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: motionDurations.base, ease: motionEase },
  },
};

export const slideUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDurations.base, ease: motionEase },
  },
};

export const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const reducedMotionFade = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};
