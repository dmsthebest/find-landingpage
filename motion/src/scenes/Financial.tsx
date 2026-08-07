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
  formatBRL,
  SurfaceCard,
  useCountUp,
} from "../components/Shared";
import { COLORS } from "../theme";

export const FinancialScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const revenue = useCountUp(4850, 18, 36);
  const expenses = useCountUp(1240, 28, 34);
  const profit = useCountUp(3610, 40, 36);

  const cam = interpolate(frame, [0, durationInFrames], [0.97, 1.04], {
    extrapolateRight: "clamp",
  });

  const bars = [
    { label: "Seg", v: 0.55 },
    { label: "Ter", v: 0.7 },
    { label: "Qua", v: 0.48 },
    { label: "Qui", v: 0.82 },
    { label: "Sex", v: 0.95 },
    { label: "Sáb", v: 1 },
    { label: "Dom", v: 0.35 },
  ];

  return (
    <FadeScene durationInFrames={durationInFrames}>
      <AmbientBg intensity={0.9} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${cam})`,
        }}
      >
        <div
          style={{
            width: 900,
            opacity: spring({ frame, fps, config: { damping: 16, stiffness: 90 } }),
            transform: `translateY(${interpolate(
              spring({ frame, fps, config: { damping: 16, stiffness: 90 } }),
              [0, 1],
              [50, 0]
            )}px)`,
          }}
        >
          <div
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: 48,
              color: COLORS.gold,
              marginBottom: 24,
              letterSpacing: "0.04em",
            }}
          >
            Visão financeira
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
            {[
              { label: "Faturamento", value: revenue, color: COLORS.gold },
              { label: "Despesas", value: expenses, color: COLORS.danger },
              { label: "Lucro", value: profit, color: COLORS.success },
            ].map((item, i) => {
              const enter = spring({
                frame: frame - 10 - i * 8,
                fps,
                config: { damping: 14, stiffness: 110 },
              });
              return (
                <SurfaceCard
                  key={item.label}
                  style={{
                    opacity: enter,
                    transform: `translateY(${interpolate(enter, [0, 1], [30, 0])}px)`,
                    padding: 22,
                    boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 15,
                      color: COLORS.textSecondary,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: 10,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 32,
                      color: item.color,
                      fontWeight: 600,
                    }}
                  >
                    {formatBRL(item.value)}
                  </div>
                </SurfaceCard>
              );
            })}
          </div>

          <SurfaceCard style={{ padding: 24 }}>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 15,
                color: COLORS.textSecondary,
                marginBottom: 18,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Semana
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                height: 200,
                gap: 14,
              }}
            >
              {bars.map((b, i) => {
                const p = interpolate(frame, [50 + i * 4, 78 + i * 4], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                });
                const h = b.v * 180 * (1 - Math.pow(1 - p, 3));
                return (
                  <div
                    key={b.label}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: h,
                        borderRadius: 10,
                        background:
                          i === 5
                            ? `linear-gradient(180deg, ${COLORS.goldLight}, ${COLORS.gold})`
                            : "rgba(202,162,40,0.28)",
                        boxShadow: i === 5 ? "0 8px 24px rgba(202,162,40,0.35)" : undefined,
                      }}
                    />
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 14,
                        color: COLORS.textSecondary,
                      }}
                    >
                      {b.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </SurfaceCard>
        </div>
      </AbsoluteFill>
      <Caption delay={16}>Entenda para onde seu dinheiro está indo.</Caption>
    </FadeScene>
  );
};
