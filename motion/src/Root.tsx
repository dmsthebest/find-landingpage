import React from "react";
import { Composition } from "remotion";
import { FindMotionV2, findMotionV2Meta } from "./FindMotionV2";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id={findMotionV2Meta.id}
        component={FindMotionV2}
        durationInFrames={findMotionV2Meta.durationInFrames}
        fps={findMotionV2Meta.fps}
        width={findMotionV2Meta.width}
        height={findMotionV2Meta.height}
      />
    </>
  );
};
