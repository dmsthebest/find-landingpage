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
  BarberPoleStripe,
  Caption,
  FadeScene,
  PhoneFrame,
  SurfaceCard,
} from "../components/Shared";
import { COLORS } from "../theme";

const TIMES = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

export const BookingsScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneEnter = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 80 },
  });
  const selected = frame > 55;
  const confirmed = frame > 95;
  const zoom = interpolate(frame, [0, 40, 100, durationInFrames], [0.92, 1, 1.04, 1.06], {
    extrapolateRight: "clamp",
  });
  const camY = interpolate(frame, [0, durationInFrames], [30, -10], {
    extrapolateRight: "clamp",
  });

  return (
    <FadeScene durationInFrames={durationInFrames} fadeIn={10} fadeOut={14}>
      <AmbientBg intensity={0.55} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          transform: `translateY(${camY}px)`,
        }}
      >
        <div
          style={{
            opacity: phoneEnter,
            transform: `translateY(${interpolate(phoneEnter, [0, 1], [80, 0])}px) scale(${zoom})`,
          }}
        >
          <PhoneFrame light>
            <div style={{ padding: "8px 28px 28px" }}>
              <div
                style={{
                  fontFamily: "Bebas Neue, sans-serif",
                  fontSize: 42,
                  color: COLORS.ink,
                  letterSpacing: "0.04em",
                  textAlign: "center",
                }}
              >
                FIND
              </div>
              <BarberPoleStripe height={4} style={{ margin: "10px auto 24px", width: 160 }} />

              {!confirmed ? (
                <>
                  <div
                    style={{
                      fontFamily: "Bebas Neue, sans-serif",
                      fontSize: 36,
                      color: COLORS.ink,
                      marginBottom: 18,
                    }}
                  >
                    Escolha o melhor horário
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: 10,
                    }}
                  >
                    {TIMES.map((t, i) => {
                      const appear = spring({
                        frame: frame - 12 - i * 2,
                        fps,
                        config: { damping: 14, stiffness: 140 },
                      });
                      const isSel = selected && t === "10:00";
                      const isBlocked = t === "11:00";
                      return (
                        <div
                          key={t}
                          style={{
                            opacity: appear,
                            transform: `scale(${interpolate(appear, [0, 1], [0.8, 1]) * (isSel ? 1.05 : 1)})`,
                            background: isSel
                              ? COLORS.gold
                              : isBlocked
                                ? "#ddd6c8"
                                : COLORS.paper,
                            border: `1.5px solid ${isSel ? COLORS.gold : COLORS.ink}`,
                            borderRadius: 10,
                            padding: "14px 0",
                            textAlign: "center",
                            fontFamily: "JetBrains Mono, monospace",
                            fontSize: 20,
                            fontWeight: 600,
                            color: isBlocked ? "#9a8f7e" : COLORS.ink,
                            textDecoration: isBlocked ? "line-through" : "none",
                            boxShadow: isSel ? "0 8px 20px rgba(202,162,40,0.4)" : undefined,
                          }}
                        >
                          {t}
                        </div>
                      );
                    })}
                  </div>
                  {selected && (
                    <div
                      style={{
                        marginTop: 22,
                        textAlign: "center",
                        fontFamily: "Inter, sans-serif",
                        fontSize: 18,
                        color: COLORS.ink,
                        opacity: interpolate(frame, [55, 70], [0, 1], {
                          extrapolateLeft: "clamp",
                          extrapolateRight: "clamp",
                        }),
                      }}
                    >
                      10:00 reservado · sem conflitos
                    </div>
                  )}
                </>
              ) : (
                <div
                  style={{
                    marginTop: 80,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 18,
                  }}
                >
                  <div
                    style={{
                      width: 88,
                      height: 88,
                      borderRadius: "50%",
                      background: COLORS.success,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: `scale(${spring({ frame: frame - 95, fps, config: { damping: 12, stiffness: 160 } })})`,
                      boxShadow: "0 12px 30px rgba(61,139,95,0.4)",
                    }}
                  >
                    <span style={{ color: "#fff", fontSize: 44, fontWeight: 700 }}>✓</span>
                  </div>
                  <div
                    style={{
                      fontFamily: "Bebas Neue, sans-serif",
                      fontSize: 40,
                      color: COLORS.ink,
                      textAlign: "center",
                      letterSpacing: "0.03em",
                    }}
                  >
                    Agendamento confirmado
                  </div>
                  <SurfaceCard
                    style={{
                      background: "#fff",
                      borderColor: COLORS.paperDark,
                      width: "100%",
                      marginTop: 12,
                    }}
                  >
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: 18, color: COLORS.ink }}>
                      <div style={{ color: "#8a7d6c", marginBottom: 4 }}>Cliente</div>
                      <div style={{ fontWeight: 600, marginBottom: 12 }}>Lucas Oliveira</div>
                      <div style={{ color: "#8a7d6c", marginBottom: 4 }}>Serviço</div>
                      <div style={{ fontWeight: 600, marginBottom: 12 }}>Corte de Cabelo</div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: COLORS.gold, fontFamily: "JetBrains Mono, monospace", fontWeight: 600 }}>
                          10:00
                        </span>
                        <span style={{ color: COLORS.gold, fontFamily: "JetBrains Mono, monospace", fontWeight: 600 }}>
                          R$ 50
                        </span>
                      </div>
                    </div>
                  </SurfaceCard>
                </div>
              )}
            </div>
          </PhoneFrame>
        </div>
      </AbsoluteFill>
      <Caption delay={18}>Agendamentos organizados.</Caption>
    </FadeScene>
  );
};
