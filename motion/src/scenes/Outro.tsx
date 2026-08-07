import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  AmbientBg,
  BarberPoleIcon,
  BarberPoleStripe,
  FadeScene,
} from "../components/Shared";
import { COLORS } from "../theme";

export const OutroScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logo = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const line1 = spring({ frame: frame - 18, fps, config: { damping: 16, stiffness: 100 } });
  const line2 = spring({ frame: frame - 34, fps, config: { damping: 16, stiffness: 100 } });
  const cta = spring({ frame: frame - 55, fps, config: { damping: 14, stiffness: 110 } });
  const poleW = interpolate(frame, [10, 40], [0, 240], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glow = 0.35 + 0.15 * Math.sin(frame / 12);

  return (
    <FadeScene durationInFrames={durationInFrames} fadeIn={12} fadeOut={18}>
      <AmbientBg intensity={1 + glow} />
      <AbsoluteFill
        style={{
          top: 0,
          height: 8,
        }}
      >
        <BarberPoleStripe height={8} />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            opacity: logo,
            transform: `scale(${interpolate(logo, [0, 1], [0.75, 1])})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <BarberPoleIcon size={56} />
          <div
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: 150,
              letterSpacing: "0.08em",
              color: COLORS.text,
              lineHeight: 1,
              textShadow: `0 0 ${40 + glow * 40}px rgba(202,162,40,${glow * 0.5})`,
            }}
          >
            FIND
          </div>
        </div>

        <div style={{ width: poleW, marginTop: 6 }}>
          <BarberPoleStripe height={5} />
        </div>

        <div
          style={{
            marginTop: 36,
            textAlign: "center",
          }}
        >
          <div
            style={{
              opacity: line1,
              transform: `translateY(${interpolate(line1, [0, 1], [24, 0])}px)`,
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: 52,
              color: COLORS.text,
              letterSpacing: "0.04em",
            }}
          >
            Sua barbearia.
          </div>
          <div
            style={{
              opacity: line2,
              transform: `translateY(${interpolate(line2, [0, 1], [24, 0])}px)`,
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: 64,
              color: COLORS.gold,
              letterSpacing: "0.04em",
              marginTop: 8,
              textShadow: "0 0 50px rgba(202,162,40,0.3)",
            }}
          >
            Sob controle.
          </div>
        </div>

        <div
          style={{
            marginTop: 56,
            opacity: cta,
            transform: `translateY(${interpolate(cta, [0, 1], [20, 0])}px) scale(${interpolate(cta, [0, 1], [0.92, 1])})`,
            background: COLORS.gold,
            color: COLORS.bg,
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            padding: "18px 36px",
            borderRadius: 12,
            boxShadow: "0 14px 40px rgba(202,162,40,0.35)",
          }}
        >
          30 dias grátis — teste agora
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};
