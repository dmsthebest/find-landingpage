import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { loadFont as loadBebas } from "@remotion/google-fonts/BebasNeue";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";
import { DURATION_IN_FRAMES, FPS } from "./theme";
import { IntroScene } from "./scenes/Intro";
import { BookingsScene } from "./scenes/Bookings";
import { ClientsRoutineScene } from "./scenes/ClientsRoutine";
import { EvolutionScene } from "./scenes/Evolution";
import { GrandeUpdateScene } from "./scenes/GrandeUpdate";
import { CashControlScene } from "./scenes/CashControl";
import { FinancialScene } from "./scenes/Financial";
import { EcosystemScene } from "./scenes/Ecosystem";
import { OutroScene } from "./scenes/Outro";

loadBebas();
loadInter();
loadMono();

/**
 * Timeline synced to narration (pt-BR Francisca):
 * 0.0–2.5s   silence / logo
 * 2.5–7.3s   "Gerenciar uma barbearia..."
 * 8.7–11.4s  "Por isso, o FIND evoluiu."
 * 13.4–20.1s "Agora você controla..."
 * 21.5–28.2s controle de caixa
 * 29.2–35.6s visão financeira
 * 37.0–43.7s mais organização...
 * 44.7–49.3s FIND. Sua barbearia. Sob controle.
 */
const S = {
  intro: { from: 0, dur: 135 }, // 0–4.5s
  bookings: { from: 120, dur: 150 }, // 4–9s
  evolution: { from: 255, dur: 135 }, // 8.5–13s
  routine: { from: 375, dur: 165 }, // 12.5–18s
  grande: { from: 525, dur: 135 }, // 17.5–22s
  cash: { from: 645, dur: 210 }, // 21.5–28.5s
  financial: { from: 840, dur: 210 }, // 28–35s
  ecosystem: { from: 1035, dur: 240 }, // 34.5–42.5s
  outro: { from: 1245, dur: DURATION_IN_FRAMES - 1245 }, // ~41.5–52s
} as const;

const Vignette: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20, DURATION_IN_FRAMES - 20, DURATION_IN_FRAMES], [0, 1, 1, 0]);
  return (
    <AbsoluteFill
      style={{
        opacity: opacity * 0.55,
        background:
          "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)",
        pointerEvents: "none",
      }}
    />
  );
};

export const FindMotionV2: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#1A1A1A" }}>
      <Audio src={staticFile("narration.mp3")} volume={1} />
      <Audio src={staticFile("ambient.mp3")} volume={0.12} />

      <Sequence from={S.intro.from} durationInFrames={S.intro.dur}>
        <IntroScene />
      </Sequence>

      <Sequence from={S.bookings.from} durationInFrames={S.bookings.dur}>
        <BookingsScene durationInFrames={S.bookings.dur} />
      </Sequence>

      <Sequence from={S.evolution.from} durationInFrames={S.evolution.dur}>
        <EvolutionScene durationInFrames={S.evolution.dur} />
      </Sequence>

      <Sequence from={S.routine.from} durationInFrames={S.routine.dur}>
        <ClientsRoutineScene durationInFrames={S.routine.dur} />
      </Sequence>

      <Sequence from={S.grande.from} durationInFrames={S.grande.dur}>
        <GrandeUpdateScene durationInFrames={S.grande.dur} />
      </Sequence>

      <Sequence from={S.cash.from} durationInFrames={S.cash.dur}>
        <CashControlScene durationInFrames={S.cash.dur} />
      </Sequence>

      <Sequence from={S.financial.from} durationInFrames={S.financial.dur}>
        <FinancialScene durationInFrames={S.financial.dur} />
      </Sequence>

      <Sequence from={S.ecosystem.from} durationInFrames={S.ecosystem.dur}>
        <EcosystemScene durationInFrames={S.ecosystem.dur} />
      </Sequence>

      <Sequence from={S.outro.from} durationInFrames={S.outro.dur}>
        <OutroScene durationInFrames={S.outro.dur} />
      </Sequence>

      <Vignette />
    </AbsoluteFill>
  );
};

export const findMotionV2Meta = {
  id: "FindMotionV2",
  component: FindMotionV2,
  durationInFrames: DURATION_IN_FRAMES,
  fps: FPS,
  width: 1080,
  height: 1920,
};
