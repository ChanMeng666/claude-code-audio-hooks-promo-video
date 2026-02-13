import React from "react";
import {
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { slide } from "@remotion/transitions/slide";
import { DURATIONS, TOTAL_FRAMES } from "./constants";
import { IntroLogoReveal } from "./sections/IntroLogoReveal";
import { ProblemStatement } from "./sections/ProblemStatement";
import { SolutionReveal } from "./sections/SolutionReveal";
import { FeatureHighlights } from "./sections/FeatureHighlights";
import { DemoShowcase } from "./sections/DemoShowcase";
import { CrossPlatform } from "./sections/CrossPlatform";
import { CallToAction } from "./sections/CallToAction";

/*
 * ── Global timeline (effective frame positions with transition overlaps) ──
 *
 * Section 1 (Intro):          0 – 149
 * Section 2 (Problem):      130 – 339
 * Section 3 (Solution):     320 – 519
 * Section 4 (Features):     500 – 979
 *   4A QuickSetup:          500 – 619
 *   4B HookTypes:           620 – 739
 *   4C AudioSets:           740 – 859
 *   4D OpenSource:          860 – 979
 * Section 5 (Demo):         960 – 1259
 * Section 6 (CrossPlatform):1240 – 1449
 * Section 7 (CTA):         1430 – 1699
 */

/**
 * Background music with auto fade-in/out and ducking during demo section.
 * Requires public/bgm.mp3 - uncomment <BackgroundMusic /> below after placing file.
 */
const BackgroundMusic: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [TOTAL_FRAMES - 45, TOTAL_FRAMES],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Duck during demo video (section 5: 960-1259)
  const demoDuck = interpolate(
    frame,
    [945, 960, 1259, 1275],
    [1, 0.12, 0.12, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Duck during voiceover in solution reveal (VO at global 355)
  const voRevealDuck = interpolate(
    frame,
    [345, 355, 445, 455],
    [1, 0.25, 0.25, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Duck during CTA voiceover (VO at global 1550)
  const voCtaDuck = interpolate(
    frame,
    [1540, 1550, 1665, 1675],
    [1, 0.25, 0.25, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const volume = 0.3 * fadeIn * fadeOut * demoDuck * voRevealDuck * voCtaDuck;

  return <Audio src={staticFile("bgm.mp3")} volume={volume} />;
};

export const PromoVideo: React.FC = () => {
  return (
    <>
      {/*
       * ── Audio Layer ──────────────────────────────────
       * Uncomment <BackgroundMusic /> after placing bgm.mp3 in public/
       */}
      <BackgroundMusic />

      {/* ── SFX: Intro scan line (Section 1, local frame 15) ── */}
      <Sequence from={15} durationInFrames={60}>
        <Audio src={staticFile("sfx-scan.mp3")} volume={0.5} />
      </Sequence>

      {/* ── SFX: Transition 1 whoosh (Intro→Problem, ~frame 130) ── */}
      <Sequence from={125} durationInFrames={30}>
        <Audio src={staticFile("sfx-whoosh.mp3")} volume={0.35} />
      </Sequence>

      {/* ── SFX: Transition 2 whoosh (Problem→Solution, ~frame 320) ── */}
      <Sequence from={315} durationInFrames={30}>
        <Audio src={staticFile("sfx-whoosh.mp3")} volume={0.35} />
      </Sequence>

      {/* ── SFX: Solution reveal dramatic impact (Section 3, local frame 15) ── */}
      <Sequence from={335} durationInFrames={75}>
        <Audio src={staticFile("sfx-reveal.mp3")} volume={0.6} />
      </Sequence>

      {/* ── VO: Solution reveal narration (Section 3, local ~frame 35) ── */}
      <Sequence from={355} durationInFrames={120}>
        <Audio src={staticFile("vo-reveal.mp3")} volume={0.85} />
      </Sequence>

      {/* ── SFX: Transition 3 whoosh (Solution→Features, ~frame 500) ── */}
      <Sequence from={495} durationInFrames={30}>
        <Audio src={staticFile("sfx-whoosh.mp3")} volume={0.3} />
      </Sequence>

      {/* ── SFX: Notification chime (Section 4C AudioSets, local ~frame 15) ── */}
      <Sequence from={755} durationInFrames={45}>
        <Audio src={staticFile("sfx-notification.mp3")} volume={0.45} />
      </Sequence>

      {/* ── SFX: Transition 4 whoosh (Features→Demo, ~frame 960) ── */}
      <Sequence from={955} durationInFrames={30}>
        <Audio src={staticFile("sfx-whoosh.mp3")} volume={0.3} />
      </Sequence>

      {/* ── Demo video section has its own audio (Section 5) ── */}

      {/* ── SFX: Transition 5 whoosh (Demo→CrossPlatform, ~frame 1240) ── */}
      <Sequence from={1235} durationInFrames={30}>
        <Audio src={staticFile("sfx-whoosh.mp3")} volume={0.3} />
      </Sequence>

      {/* ── SFX: Success chime (Section 6, local frame 60) ── */}
      <Sequence from={1300} durationInFrames={45}>
        <Audio src={staticFile("sfx-success.mp3")} volume={0.4} />
      </Sequence>

      {/* ── SFX: Transition 6 whoosh (CrossPlatform→CTA, ~frame 1430) ── */}
      <Sequence from={1425} durationInFrames={30}>
        <Audio src={staticFile("sfx-whoosh.mp3")} volume={0.3} />
      </Sequence>

      {/* ── VO: CTA narration (Section 7, local ~frame 120) ── */}
      <Sequence from={1550} durationInFrames={150}>
        <Audio src={staticFile("vo-cta.mp3")} volume={0.9} />
      </Sequence>

      {/*
       * ── Visual Layer ─────────────────────────────────
       */}
      <TransitionSeries>
        {/* Section 1: Intro / Logo Reveal */}
        <TransitionSeries.Sequence durationInFrames={DURATIONS.intro}>
          <IntroLogoReveal />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: DURATIONS.transition1 })}
        />

        {/* Section 2: Problem Statement */}
        <TransitionSeries.Sequence durationInFrames={DURATIONS.problem}>
          <ProblemStatement />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: DURATIONS.transition2 })}
        />

        {/* Section 3: Solution Reveal */}
        <TransitionSeries.Sequence durationInFrames={DURATIONS.solution}>
          <SolutionReveal />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: DURATIONS.transition3 })}
        />

        {/* Section 4: Feature Highlights */}
        <TransitionSeries.Sequence durationInFrames={DURATIONS.features}>
          <FeatureHighlights />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: DURATIONS.transition4 })}
        />

        {/* Section 5: Demo Showcase */}
        <TransitionSeries.Sequence durationInFrames={DURATIONS.demo}>
          <DemoShowcase />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-top" })}
          timing={linearTiming({ durationInFrames: DURATIONS.transition5 })}
        />

        {/* Section 6: Cross-Platform & Stats */}
        <TransitionSeries.Sequence durationInFrames={DURATIONS.crossPlatform}>
          <CrossPlatform />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: DURATIONS.transition6 })}
        />

        {/* Section 7: Call to Action / Outro */}
        <TransitionSeries.Sequence durationInFrames={DURATIONS.callToAction}>
          <CallToAction />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};
