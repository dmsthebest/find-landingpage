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
  Caption,
  FadeScene,
  SurfaceCard,
} from "../components/Shared";
import { COLORS } from "../theme";

const MODULES = [
  { title: "Agendamentos", x: -280, y: -320, delay: 0 },
  { title: "Clientes", x: 280, y: -300, delay: 4 },
  { title: "Serviços", x: -300, y: -40, delay: 8 },
  { title: "Barbeiros", x: 300, y: -20, delay: 12 },
  { title: "Caixa", x: -260, y: 260, delay: 16 },
  { title: "Financeiro", x: 270, y: 280, delay: 20 },
  { title: "Dashboard", x: 0, y: 0, delay: 6, center: true },
];

export const EcosystemScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const orbit = frame * 0.35;
  const scale = interpolate(frame, [0, 30, durationInFrames], [0.9, 1, 1.04], {
    extrapolateRight: "clamp",
  });

  return (
    <FadeScene durationInFrames={durationInFrames}>
      <AmbientBg intensity={1.1} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "relative", width: 900, height: 900, transform: `scale(${scale})` }}>
          {/* connection lines */}
          <svg
            width={900}
            height={900}
            style={{ position: "absolute", inset: 0, opacity: 0.35 }}
          >
            {MODULES.filter((m) => !m.center).map((m, i) => {
              const opacity = interpolate(frame, [20 + i * 4, 40 + i * 4], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <line
                  key={m.title}
                  x1={450}
                  y1={450}
                  x2={450 + m.x}
                  y2={450 + m.y}
                  stroke={COLORS.gold}
                  strokeWidth={2}
                  strokeDasharray="6 8"
                  opacity={opacity}
                />
              );
            })}
          </svg>

          {MODULES.map((m) => {
            const enter = spring({
              frame: frame - 8 - m.delay,
              fps,
              config: { damping: 14, stiffness: 100 },
            });
            const float = Math.sin((frame + m.delay * 3) / 18) * 6;
            const isCenter = Boolean(m.center);
            return (
              <div
                key={m.title}
                style={{
                  position: "absolute",
                  left: 450 + m.x,
                  top: 450 + m.y + float,
                  transform: `translate(-50%, -50%) scale(${interpolate(enter, [0, 1], [0.6, 1])}) rotate(${isCenter ? 0 : orbit * 0.02}deg)`,
                  opacity: enter,
                  zIndex: isCenter ? 2 : 1,
                }}
              >
                <SurfaceCard
                  style={{
                    minWidth: isCenter ? 220 : 170,
                    padding: isCenter ? 28 : 18,
                    textAlign: "center",
                    background: isCenter ? "rgba(202,162,40,0.12)" : COLORS.surface,
                    borderColor: isCenter ? COLORS.gold : COLORS.border,
                    boxShadow: isCenter
                      ? "0 20px 50px rgba(202,162,40,0.25)"
                      : "0 14px 36px rgba(0,0,0,0.35)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Bebas Neue, sans-serif",
                      fontSize: isCenter ? 36 : 26,
                      color: isCenter ? COLORS.gold : COLORS.text,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {m.title}
                  </div>
                  {isCenter && (
                    <div
                      style={{
                        marginTop: 8,
                        fontFamily: "Inter, sans-serif",
                        fontSize: 14,
                        color: COLORS.textSecondary,
                      }}
                    >
                      Operação completa
                    </div>
                  )}
                </SurfaceCard>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <Caption delay={20}>Agora o FIND cuida da operação da barbearia.</Caption>
    </FadeScene>
  );
};
