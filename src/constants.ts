import { loadFont } from "@remotion/google-fonts/Inter";

export const { fontFamily } = loadFont();

export const COLORS = {
  green: "#16F800",
  black: "#000000",
  darkGray: "#111111",
  mediumGray: "#1a1a1a",
  lightGray: "#333333",
  white: "#ffffff",
  red: "#ff4444",
  greenGlow: "0 0 20px #16F800, 0 0 40px #16F80066",
  greenGlowSm: "0 0 10px #16F800, 0 0 20px #16F80044",
} as const;

export const DURATIONS = {
  intro: 150,
  transition1: 20,
  problem: 210,
  transition2: 20,
  solution: 200,
  transition3: 20,
  features: 480,
  transition4: 20,
  demo: 300,
  transition5: 20,
  crossPlatform: 210,
  transition6: 20,
  callToAction: 270,
} as const;

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const TOTAL_FRAMES = 1700;
