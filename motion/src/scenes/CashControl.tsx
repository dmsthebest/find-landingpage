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
  PhoneFrame,
  SurfaceCard,
  useCountUp,
} from "../components/Shared";
import { COLORS } from "../theme";

export const CashControlScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entries = useCountUp(250, 25, 32);
  const exits = useCountUp(80, 40, 28);
  const balance = useCountUp(170, 55, 30);

  const showEntry = frame > 20;
  const showExit = frame > 45;
  const cam = interpolate(frame, [0, durationInFrames], [0.95, 1.08], {
    extrapolateRight: "clamp",
  });

  const chartHeights = [42, 68, 55, 82, 70, 95, 78].map((h, i) => {
    const p = interpolate(frame, [70 + i * 3, 95 + i * 3], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return h * (1 - Math.pow(1 - p, 3));
  });

  return (
    <FadeScene durationInFrames={durationInFrames}>
      <AmbientBg intensity={0.85} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            opacity: spring({ frame, fps, config: { damping: 16, stiffness: 85 } }),
            transform: `translateY(${interpolate(
              spring({ frame, fps, config: { damping: 16, stiffness: 85 } }),
              [0, 1],
              [70, 0]
            )}px) scale(${cam})`,
          }}
        >
          <PhoneFrame>
            <div style={{ padding: "4px 24px 24px" }}>
              <div
                style={{
                  fontFamily: "Bebas Neue, sans-serif",
                  fontSize: 38,
                  color: COLORS.gold,
                  letterSpacing: "0.04em",
                }}
              >
                Controle de Caixa
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 15,
                  color: COLORS.textSecondary,
                  marginBottom: 20,
                  marginTop: 4,
                }}
              >
                Hoje · sessão aberta
              </div>

              <SurfaceCard style={{ marginBottom: 12, padding: 20 }}>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    color: COLORS.textSecondary,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  Saldo
                </div>
                <div
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 42,
                    color: COLORS.text,
                    fontWeight: 600,
                  }}
                >
                  {formatBRL(balance)}
                </div>
              </SurfaceCard>

              {showEntry && (
                <SurfaceCard
                  style={{
                    marginBottom: 12,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    opacity: spring({
                      frame: frame - 20,
                      fps,
                      config: { damping: 14, stiffness: 140 },
                    }),
                    borderColor: "rgba(61,139,95,0.35)",
                  }}
                >
                  <div>
                    <div style={{ fontFamily: "Inter, sans-serif", color: COLORS.textSecondary, fontSize: 14 }}>
                      Entrada
                    </div>
                    <div style={{ fontFamily: "Inter, sans-serif", color: COLORS.text, fontSize: 17, marginTop: 4 }}>
                      Corte · Lucas
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      color: COLORS.success,
                      fontSize: 22,
                      fontWeight: 600,
                    }}
                  >
                    + {formatBRL(entries)}
                  </div>
                </SurfaceCard>
              )}

              {showExit && (
                <SurfaceCard
                  style={{
                    marginBottom: 16,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    opacity: spring({
                      frame: frame - 45,
                      fps,
                      config: { damping: 14, stiffness: 140 },
                    }),
                    borderColor: "rgba(196,92,92,0.35)",
                  }}
                >
                  <div>
                    <div style={{ fontFamily: "Inter, sans-serif", color: COLORS.textSecondary, fontSize: 14 }}>
                      Saída
                    </div>
                    <div style={{ fontFamily: "Inter, sans-serif", color: COLORS.text, fontSize: 17, marginTop: 4 }}>
                      Produtos
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      color: COLORS.danger,
                      fontSize: 22,
                      fontWeight: 600,
                    }}
                  >
                    − {formatBRL(exits)}
                  </div>
                </SurfaceCard>
              )}

              <div
                style={{
                  marginTop: 8,
                  height: 120,
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 10,
                  padding: "12px 8px",
                  background: COLORS.surface,
                  borderRadius: 14,
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                {chartHeights.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${h}%`,
                      borderRadius: 6,
                      background:
                        i === chartHeights.length - 1
                          ? COLORS.gold
                          : "rgba(202,162,40,0.35)",
                      minHeight: 4,
                    }}
                  />
                ))}
              </div>
            </div>
          </PhoneFrame>
        </div>
      </AbsoluteFill>
      <Caption delay={14}>Controle seu caixa.</Caption>
    </FadeScene>
  );
};
