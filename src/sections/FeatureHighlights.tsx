import React from "react";
import { Sequence } from "remotion";
import { QuickSetup } from "./features/QuickSetup";
import { HookTypes } from "./features/HookTypes";
import { AudioSets } from "./features/AudioSets";
import { OpenSource } from "./features/OpenSource";

const SUB_SCENE_DURATION = 120;

export const FeatureHighlights: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <Sequence from={0} durationInFrames={SUB_SCENE_DURATION}>
        <QuickSetup />
      </Sequence>
      <Sequence from={SUB_SCENE_DURATION} durationInFrames={SUB_SCENE_DURATION}>
        <HookTypes />
      </Sequence>
      <Sequence from={SUB_SCENE_DURATION * 2} durationInFrames={SUB_SCENE_DURATION}>
        <AudioSets />
      </Sequence>
      <Sequence from={SUB_SCENE_DURATION * 3} durationInFrames={SUB_SCENE_DURATION}>
        <OpenSource />
      </Sequence>
    </div>
  );
};
