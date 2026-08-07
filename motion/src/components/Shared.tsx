import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";

export const BarberPoleStripe: React.FC<{
  width?: number | string;
  height?: number;
  style?: React.CSSProperties;
}> = ({ width = "100%", height = 6, style }) => (
  <div
    style={{
      width,
      height,
      borderRadius: 999,
      background: `repeating-linear-gradient(
        45deg,
        ${COLORS.barberRed},
        ${COLORS.barberRed} 8px,
        #ffffff 8px,
        #ffffff 16px,
        ${COLORS.barberBlue} 16px,
        ${COLORS.barberBlue} 24px
      )`,
      ...style,
    }}
  />
);

export const BarberPoleIcon: React.FC<{ size?: number; style?: React.CSSProperties }> = ({
  size = 48,
  style,
}) => (
  <div
    style={{
      width: size * 0.42,
      height: size,
      borderRadius: size * 0.2,
      boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
      background: `repeating-linear-gradient(
        45deg,
        ${COLORS.barberRed},
        ${COLORS.barberRed} 7px,
        #ffffff 7px,
        #ffffff 14px,
        ${COLORS.barberBlue} 14px,
        ${COLORS.barberBlue} 21px
      )`,
      ...style,
    }}
  />
);

export const Caption: React.FC<{
  children: React.ReactNode;
  variant?: "dark" | "light";
  delay?: number;
}> = ({ children, variant = "dark", delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 120 } });
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const y = interpolate(enter, [0, 1], [28, 0]);

  const dark = variant === "dark";
  return (
    <div
      style={{
        position: "absolute",
        left: 64,
        right: 64,
        bottom: 96,
        opacity,
        transform: `translateY(${y}px)`,
        background: dark ? "rgba(31,31,31,0.95)" : COLORS.paper,
        color: dark ? COLORS.text : COLORS.ink,
        border: `1px solid ${dark ? COLORS.border : "rgba(44,36,22,0.12)"}`,
        borderRadius: 18,
        padding: "22px 28px",
        fontFamily: "Inter, sans-serif",
        fontSize: 28,
        lineHeight: 1.35,
        fontWeight: 500,
        textAlign: "center",
        boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
      }}
    >
      {children}
    </div>
  );
};

export const SceneTitle: React.FC<{
  children: React.ReactNode;
  delay?: number;
  gold?: boolean;
  size?: number;
}> = ({ children, delay = 0, gold = false, size = 72 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - delay, fps, config: { damping: 16, stiffness: 100 } });
  return (
    <div
      style={{
        opacity: enter,
        transform: `translateY(${interpolate(enter, [0, 1], [40, 0])}px) scale(${interpolate(enter, [0, 1], [0.94, 1])})`,
        fontFamily: "Bebas Neue, sans-serif",
        fontSize: size,
        letterSpacing: "0.04em",
        lineHeight: 0.95,
        color: gold ? COLORS.gold : COLORS.text,
        textAlign: "center",
        textShadow: gold ? "0 0 60px rgba(202,162,40,0.25)" : undefined,
      }}
    >
      {children}
    </div>
  );
};

export const PhoneFrame: React.FC<{
  children: React.ReactNode;
  scale?: number;
  rotateY?: number;
  rotateX?: number;
  style?: React.CSSProperties;
  light?: boolean;
}> = ({ children, scale = 1, rotateY = 0, rotateX = 0, style, light = false }) => (
  <div
    style={{
      width: 520,
      height: 980,
      borderRadius: 48,
      border: "3px solid #111",
      background: light ? COLORS.paper : COLORS.bg,
      boxShadow: "0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)",
      overflow: "hidden",
      position: "relative",
      transform: `scale(${scale}) perspective(1200px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
      transformStyle: "preserve-3d",
      ...style,
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 14,
        left: "50%",
        transform: "translateX(-50%)",
        width: 120,
        height: 28,
        borderRadius: 20,
        background: "#0a0a0a",
        zIndex: 5,
      }}
    />
    <div style={{ position: "absolute", inset: 0, paddingTop: 52 }}>{children}</div>
  </div>
);

export const SurfaceCard: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      background: COLORS.surface,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 16,
      padding: 18,
      ...style,
    }}
  >
    {children}
  </div>
);

export const FadeScene: React.FC<{
  children: React.ReactNode;
  fadeIn?: number;
  fadeOut?: number;
  durationInFrames: number;
}> = ({ children, fadeIn = 12, fadeOut = 12, durationInFrames }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, fadeIn, durationInFrames - fadeOut, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

export const AmbientBg: React.FC<{ intensity?: number }> = ({ intensity = 1 }) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 45) * 20;
  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(202,162,40,${0.12 * intensity}) 0%, transparent 70%)`,
          top: 180 + drift,
          left: -120,
          filter: "blur(8px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(202,162,40,${0.08 * intensity}) 0%, transparent 70%)`,
          bottom: 200 - drift,
          right: -100,
          filter: "blur(10px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.035) 0.8px, transparent 0.8px)",
          backgroundSize: "4px 4px",
          opacity: 0.5,
        }}
      />
    </AbsoluteFill>
  );
};

export function useCountUp(target: number, startFrame: number, duration = 28) {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // easeOutCubic
  const eased = 1 - Math.pow(1 - progress, 3);
  return Math.round(target * eased);
}

export function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
