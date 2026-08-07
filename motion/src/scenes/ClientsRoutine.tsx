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
  PhoneFrame,
  SurfaceCard,
} from "../components/Shared";
import { COLORS } from "../theme";

const clients = [
  { name: "Lucas Oliveira", last: "Corte · hoje 10:00" },
  { name: "Rafael Santos", last: "Barba · ontem" },
  { name: "Pedro Lima", last: "Combo · seg 15:00" },
];

const services = [
  { name: "Corte de Cabelo", price: "R$ 50", dur: "30 min" },
  { name: "Barba", price: "R$ 35", dur: "20 min" },
  { name: "Corte + Barba", price: "R$ 75", dur: "45 min" },
];

export const ClientsRoutineScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showServices = frame > 55;
  const cam = interpolate(frame, [0, durationInFrames], [1, 1.06], {
    extrapolateRight: "clamp",
  });

  return (
    <FadeScene durationInFrames={durationInFrames}>
      <AmbientBg intensity={0.5} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ transform: `scale(${cam})`, display: "flex", gap: 28 }}>
          {/* Clients phone */}
          <div
            style={{
              opacity: spring({ frame, fps, config: { damping: 16, stiffness: 90 } }),
              transform: `translateX(${interpolate(
                spring({ frame, fps, config: { damping: 16, stiffness: 90 } }),
                [0, 1],
                [-60, 0]
              )}px) rotateY(${interpolate(frame, [0, 40], [12, 0], { extrapolateRight: "clamp" })}deg)`,
            }}
          >
            <PhoneFrame
              scale={0.78}
              style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}
            >
              <div style={{ padding: "4px 22px 22px" }}>
                <div
                  style={{
                    fontFamily: "Bebas Neue, sans-serif",
                    fontSize: 34,
                    color: COLORS.gold,
                    marginBottom: 16,
                  }}
                >
                  Clientes
                </div>
                {clients.map((c, i) => {
                  const enter = spring({
                    frame: frame - 10 - i * 6,
                    fps,
                    config: { damping: 14, stiffness: 120 },
                  });
                  return (
                    <SurfaceCard
                      key={c.name}
                      style={{
                        marginBottom: 10,
                        opacity: enter,
                        transform: `translateY(${interpolate(enter, [0, 1], [24, 0])}px)`,
                      }}
                    >
                      <div style={{ fontFamily: "Inter, sans-serif", color: COLORS.text, fontWeight: 600, fontSize: 20 }}>
                        {c.name}
                      </div>
                      <div style={{ fontFamily: "Inter, sans-serif", color: COLORS.textSecondary, fontSize: 15, marginTop: 4 }}>
                        {c.last}
                      </div>
                    </SurfaceCard>
                  );
                })}
              </div>
            </PhoneFrame>
          </div>

          {/* Services phone */}
          <div
            style={{
              opacity: spring({
                frame: frame - 20,
                fps,
                config: { damping: 16, stiffness: 90 },
              }),
              transform: `translateX(${interpolate(
                spring({ frame: frame - 20, fps, config: { damping: 16, stiffness: 90 } }),
                [0, 1],
                [60, 0]
              )}px) rotateY(${interpolate(frame, [20, 60], [-12, 0], { extrapolateRight: "clamp" })}deg)`,
            }}
          >
            <PhoneFrame scale={0.78}>
              <div style={{ padding: "4px 22px 22px" }}>
                <div
                  style={{
                    fontFamily: "Bebas Neue, sans-serif",
                    fontSize: 34,
                    color: COLORS.gold,
                    marginBottom: 16,
                  }}
                >
                  Serviços
                </div>
                {services.map((s, i) => {
                  const enter = spring({
                    frame: frame - 28 - i * 6,
                    fps,
                    config: { damping: 14, stiffness: 120 },
                  });
                  return (
                    <SurfaceCard
                      key={s.name}
                      style={{
                        marginBottom: 10,
                        opacity: enter,
                        transform: `translateY(${interpolate(enter, [0, 1], [24, 0])}px)`,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div style={{ fontFamily: "Inter, sans-serif", color: COLORS.text, fontWeight: 600, fontSize: 18 }}>
                          {s.name}
                        </div>
                        <div style={{ fontFamily: "Inter, sans-serif", color: COLORS.textSecondary, fontSize: 14, marginTop: 3 }}>
                          {s.dur}
                        </div>
                      </div>
                      <div
                        style={{
                          fontFamily: "JetBrains Mono, monospace",
                          color: COLORS.gold,
                          fontWeight: 600,
                          fontSize: 18,
                        }}
                      >
                        {s.price}
                      </div>
                    </SurfaceCard>
                  );
                })}

                {showServices && (
                  <div
                    style={{
                      marginTop: 18,
                      opacity: interpolate(frame, [55, 70], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }),
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Bebas Neue, sans-serif",
                        fontSize: 28,
                        color: COLORS.gold,
                        marginBottom: 10,
                      }}
                    >
                      Equipe
                    </div>
                    {["Carlos", "Miguel", "André"].map((name, i) => (
                      <SurfaceCard
                        key={name}
                        style={{
                          marginBottom: 8,
                          padding: 12,
                          opacity: spring({
                            frame: frame - 58 - i * 4,
                            fps,
                            config: { damping: 14, stiffness: 140 },
                          }),
                        }}
                      >
                        <div style={{ color: COLORS.text, fontFamily: "Inter, sans-serif", fontSize: 17 }}>
                          {name}
                        </div>
                      </SurfaceCard>
                    ))}
                  </div>
                )}
              </div>
            </PhoneFrame>
          </div>
        </div>
      </AbsoluteFill>
      <Caption delay={12}>Tudo em um só lugar.</Caption>
    </FadeScene>
  );
};
