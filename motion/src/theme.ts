export const COLORS = {
  gold: "#CAA228",
  goldLight: "#E0C04A",
  bg: "#1A1A1A",
  surface: "#1F1F1F",
  surfaceElevated: "#252525",
  text: "#FFFFFF",
  textSecondary: "#A0A0A0",
  border: "#2B2B2B",
  paper: "#F5F0E8",
  paperDark: "#E8E0D4",
  ink: "#2C2416",
  success: "#3D8B5F",
  danger: "#C45C5C",
  barberRed: "#C41E3A",
  barberBlue: "#1E3A8A",
} as const;

export const WIDTH = 1080;
export const HEIGHT = 1920;
export const FPS = 30;

/** Total composition length — matches narration + end hold */
export const DURATION_IN_FRAMES = 1560; // 52s

export const FONT = {
  display: "Bebas Neue",
  body: "Inter",
  mono: "JetBrains Mono",
} as const;
