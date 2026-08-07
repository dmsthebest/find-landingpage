import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AmbientBg, FadeScene, PhoneFrame, SceneTitle } from "../components/Shared";
import { COLORS } from "../theme";

/** Transition: interface pulls back, scale shifts — "Mas o FIND evoluiu." */
export const EvolutionScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pullBack = interpolate(frame, [0, 50], [1, 0.55], {
    extrapolateRight: "clamp",
  });
  const blur = interpolate(frame, [30, 70], [0, 8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phonesOpacity = interpolate(frame, [0, 20, 70, 90], [1, 1, 0.25, 0], {
    extrapolateRight: "clamp",
  });
  const textEnter = spring({
    frame: frame - 18,
    fps,
    config: { damping: 14, stiffness: 90 },
  });
  const goldPulse = 0.5 + 0.5 * Math.sin(frame / 10);

  return (
    <FadeScene durationInFrames={durationInFrames} fadeIn={8} fadeOut={10}>
      <AmbientBg intensity={0.7 + goldPulse * 0.3} />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: phonesOpacity,
          filter: `blur(${blur}px)`,
          transform: `scale(${pullBack})`,
        }}
      >
        <div style={{ display: "flex", gap: 20 }}>
          {[0, 1, 2].map((i) => (
            <PhoneFrame
              key={i}
              scale={0.55}
              rotateY={(i - 1) * 18}
              style={{ opacity: 0.9 }}
            >
              <div
                style={{
                  padding: 20,
                  color: COLORS.textSecondary,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 16,
                }}
              >
                {i === 0 && "Agenda"}
                {i === 1 && "Clientes"}
                {i === 2 && "Serviços"}
                <div
                  style={{
                    marginTop: 16,
                    height: 120,
                    borderRadius: 12,
                    background: COLORS.surface,
                    border: `1px solid ${COLORS.border}`,
                  }}
                />
                <div
                  style={{
                    marginTop: 10,
                    height: 80,
                    borderRadius: 12,
                    background: COLORS.surface,
                    border: `1px solid ${COLORS.border}`,
                  }}
                />
              </div>
            </PhoneFrame>
          ))}
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: textEnter,
          transform: `scale(${interpolate(textEnter, [0, 1], [0.9, 1])})`,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 20,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: COLORS.gold,
              marginBottom: 22,
              fontWeight: 600,
            }}
          >
            Grande atualização
          </div>
          <SceneTitle size={88} gold>
            Mas o FIND
            <br />
            evoluiu.
          </SceneTitle>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};
