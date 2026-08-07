import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AmbientBg, BarberPoleIcon, BarberPoleStripe, SceneTitle } from "../components/Shared";
import { COLORS } from "../theme";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logo = spring({ frame, fps, config: { damping: 16, stiffness: 90 } });
  const tag = spring({ frame: frame - 18, fps, config: { damping: 18, stiffness: 100 } });
  const line = spring({ frame: frame - 32, fps, config: { damping: 18, stiffness: 100 } });
  const poleW = interpolate(frame, [20, 45], [0, 280], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <AmbientBg intensity={0.9} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: 18,
        }}
      >
        <div
          style={{
            opacity: logo,
            transform: `translateY(${interpolate(logo, [0, 1], [40, 0])}px) scale(${interpolate(logo, [0, 1], [0.7, 1])})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 22,
          }}
        >
          <BarberPoleIcon size={64} />
          <div
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: 140,
              letterSpacing: "0.08em",
              color: COLORS.text,
              lineHeight: 1,
            }}
          >
            FIND
          </div>
        </div>

        <div style={{ width: poleW, marginTop: 8 }}>
          <BarberPoleStripe height={5} />
        </div>

        <div
          style={{
            opacity: tag,
            transform: `translateY(${interpolate(tag, [0, 1], [20, 0])}px)`,
            marginTop: 18,
            fontFamily: "Inter, sans-serif",
            fontSize: 22,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: COLORS.gold,
            fontWeight: 600,
          }}
        >
          Encontre. Agende. Gerencie.
        </div>

        <div
          style={{
            opacity: line,
            transform: `translateY(${interpolate(line, [0, 1], [24, 0])}px)`,
            marginTop: 48,
            maxWidth: 720,
            textAlign: "center",
          }}
        >
          <SceneTitle size={56} delay={0}>
            Uma nova forma de
            <br />
            gerenciar sua barbearia.
          </SceneTitle>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
