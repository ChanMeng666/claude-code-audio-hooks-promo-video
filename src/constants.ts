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
  solution: 330,
  transition3: 20,
  features: 600,
  transition4: 20,
  advancedFeatures: 360,
  transition5: 20,
  demo: 360,
  transition6: 20,
  ecosystem: 240,
  transition7: 20,
  crossPlatform: 270,
  transition8: 20,
  callToAction: 300,
} as const;

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

// Sum of sections: 150+210+330+600+360+360+240+270+300 = 2820
// Sum of transitions: 8 * 20 = 160
// Total: 2820 - 160 = 2660 (~88.7 seconds @ 30fps)
export const TOTAL_FRAMES = 2660;
