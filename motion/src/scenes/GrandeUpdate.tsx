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
  FadeScene,
  formatBRL,
  SceneTitle,
  SurfaceCard,
  useCountUp,
} from "../components/Shared";
import { COLORS } from "../theme";

export const GrandeUpdateScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = spring({ frame: frame - 8, fps, config: { damping: 14, stiffness: 85 } });
  const dash = spring({ frame: frame - 28, fps, config: { damping: 16, stiffness: 90 } });
  const zoom = interpolate(frame, [0, durationInFrames], [0.96, 1.05], {
    extrapolateRight: "clamp",
  });

  const appointments = useCountUp(18, 40, 30);
  const revenue = useCountUp(4850, 45, 35);
  const clients = useCountUp(142, 50, 30);

  return (
    <FadeScene durationInFrames={durationInFrames} fadeIn={10} fadeOut={12}>
      <AmbientBg intensity={1.4} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
          transform: `scale(${zoom})`,
        }}
      >
        <div
          style={{
            opacity: title,
            transform: `translateY(${interpolate(title, [0, 1], [50, 0])}px)`,
            textAlign: "center",
            padding: "0 48px",
          }}
        >
          <SceneTitle size={78} gold delay={0}>
            AGORA, SUA BARBEARIA
            <br />
            SOB CONTROLE.
          </SceneTitle>
        </div>

        <div
          style={{
            opacity: dash,
            transform: `translateY(${interpolate(dash, [0, 1], [60, 0])}px)`,
            width: 860,
          }}
        >
          <SurfaceCard
            style={{
              padding: 28,
              background: "rgba(31,31,31,0.95)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(202,162,40,0.2)",
            }}
          >
            <div
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: 32,
                color: COLORS.gold,
                marginBottom: 22,
                letterSpacing: "0.04em",
              }}
            >
              Dashboard · Barbearia Clássica
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
              {[
                { label: "Hoje", value: String(appointments), sub: "agendamentos" },
                { label: "Faturamento", value: formatBRL(revenue), sub: "este mês" },
                { label: "Clientes", value: String(clients), sub: "ativos" },
              ].map((card, i) => {
                const enter = spring({
                  frame: frame - 35 - i * 6,
                  fps,
                  config: { damping: 14, stiffness: 120 },
                });
                return (
                  <div
                    key={card.label}
                    style={{
                      background: COLORS.bg,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 14,
                      padding: 18,
                      opacity: enter,
                      transform: `translateY(${interpolate(enter, [0, 1], [20, 0])}px)`,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 14,
                        color: COLORS.textSecondary,
                        marginBottom: 8,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {card.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: 28,
                        color: COLORS.gold,
                        fontWeight: 600,
                      }}
                    >
                      {card.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 14,
                        color: COLORS.textSecondary,
                        marginTop: 6,
                      }}
                    >
                      {card.sub}
                    </div>
                  </div>
                );
              })}
            </div>
          </SurfaceCard>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};
