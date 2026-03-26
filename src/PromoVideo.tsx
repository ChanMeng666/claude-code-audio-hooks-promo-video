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
import { AdvancedFeatures } from "./sections/AdvancedFeatures";
import { DemoShowcase } from "./sections/DemoShowcase";
import { Ecosystem } from "./sections/Ecosystem";
import { CrossPlatform } from "./sections/CrossPlatform";
import { CallToAction } from "./sections/CallToAction";

/*
 * ── Global timeline (effective frame positions with transition overlaps) ──
 *
 * Section 1 (Intro):             0 –  149
 * Section 2 (Problem):         130 –  339
 * Section 3 (Solution):        320 –  519
 * Section 4 (Features):        500 –  979
 *   4A QuickSetup:             500 –  619
 *   4B HookTypes:              620 –  739
 *   4C AudioSets:              740 –  859
 *   4D OpenSource:             860 –  979
 * Section 5 (AdvancedFeatures):960 – 1259
 *   5A FocusFlow:              960 – 1109
 *   5B Webhooks:              1110 – 1259
 * Section 6 (Demo):          1240 – 1539
 * Section 7 (Ecosystem):     1520 – 1729
 * Section 8 (CrossPlatform): 1710 – 1919
 * Section 9 (CTA):           1900 – 2169
 */

/**
 * Background music with auto fade-in/out and ducking.
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

  // Duck during demo video (section 6: 1240-1539)
  const demoDuck = interpolate(
    frame,
    [1225, 1240, 1539, 1555],
    [1, 0.12, 0.12, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Duck during VO reveal (solution section, global ~355)
  const voRevealDuck = interpolate(
    frame,
    [345, 355, 445, 455],
    [1, 0.25, 0.25, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Duck during VO features (advanced features section, global ~1010)
  const voFeaturesDuck = interpolate(
    frame,
    [1000, 1010, 1090, 1100],
    [1, 0.25, 0.25, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Duck during CTA voiceover (global ~2020)
  const voCtaDuck = interpolate(
    frame,
    [2010, 2020, 2135, 2145],
    [1, 0.25, 0.25, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const volume = 0.3 * fadeIn * fadeOut * demoDuck * voRevealDuck * voFeaturesDuck * voCtaDuck;

  return <Audio src={staticFile("bgm.mp3")} volume={volume} />;
};

export const PromoVideo: React.FC = () => {
  return (
    <>
      {/* ── Audio Layer ── */}
      <BackgroundMusic />

      {/* SFX: Intro scan line (Section 1, local frame 15) */}
      <Sequence from={15} durationInFrames={60}>
        <Audio src={staticFile("sfx-scan.mp3")} volume={0.5} />
      </Sequence>

      {/* SFX: Transition 1 whoosh (Intro→Problem, ~frame 130) */}
      <Sequence from={125} durationInFrames={30}>
        <Audio src={staticFile("sfx-whoosh.mp3")} volume={0.35} />
      </Sequence>

      {/* SFX: Transition 2 whoosh (Problem→Solution, ~frame 320) */}
      <Sequence from={315} durationInFrames={30}>
        <Audio src={staticFile("sfx-whoosh.mp3")} volume={0.35} />
      </Sequence>

      {/* SFX: Solution reveal dramatic impact */}
      <Sequence from={335} durationInFrames={75}>
        <Audio src={staticFile("sfx-reveal.mp3")} volume={0.6} />
      </Sequence>

      {/* VO: Solution reveal narration */}
      <Sequence from={355} durationInFrames={120}>
        <Audio src={staticFile("vo-reveal.mp3")} volume={0.85} />
      </Sequence>

      {/* SFX: Transition 3 whoosh (Solution→Features, ~frame 500) */}
      <Sequence from={495} durationInFrames={30}>
        <Audio src={staticFile("sfx-whoosh.mp3")} volume={0.3} />
      </Sequence>

      {/* SFX: Notification chime (Section 4C AudioSets, global ~755) */}
      <Sequence from={755} durationInFrames={45}>
        <Audio src={staticFile("sfx-notification.mp3")} volume={0.45} />
      </Sequence>

      {/* SFX: Transition 4 whoosh (Features→AdvancedFeatures, ~frame 960) */}
      <Sequence from={955} durationInFrames={30}>
        <Audio src={staticFile("sfx-whoosh.mp3")} volume={0.3} />
      </Sequence>

      {/* SFX: Breathe ambient (Focus Flow sub-scene, global ~975) */}
      <Sequence from={975} durationInFrames={120}>
        <Audio src={staticFile("sfx-breathe.mp3")} volume={0.35} />
      </Sequence>

      {/* VO: Features narration (AdvancedFeatures section, global ~1010) */}
      <Sequence from={1010} durationInFrames={100}>
        <Audio src={staticFile("vo-features.mp3")} volume={0.85} />
      </Sequence>

      {/* SFX: Transition 5 whoosh (AdvancedFeatures→Demo, ~frame 1240) */}
      <Sequence from={1235} durationInFrames={30}>
        <Audio src={staticFile("sfx-whoosh.mp3")} volume={0.3} />
      </Sequence>

      {/* Demo video section has its own audio (Section 6) */}

      {/* SFX: Transition 6 whoosh (Demo→Ecosystem, ~frame 1520) */}
      <Sequence from={1515} durationInFrames={30}>
        <Audio src={staticFile("sfx-whoosh.mp3")} volume={0.3} />
      </Sequence>

      {/* SFX: Transition 7 whoosh (Ecosystem→CrossPlatform, ~frame 1710) */}
      <Sequence from={1705} durationInFrames={30}>
        <Audio src={staticFile("sfx-whoosh.mp3")} volume={0.3} />
      </Sequence>

      {/* SFX: Success chime (Section 8 CrossPlatform, local frame 60 → global 1770) */}
      <Sequence from={1770} durationInFrames={45}>
        <Audio src={staticFile("sfx-success.mp3")} volume={0.4} />
      </Sequence>

      {/* SFX: Transition 8 whoosh (CrossPlatform→CTA, ~frame 1900) */}
      <Sequence from={1895} durationInFrames={30}>
        <Audio src={staticFile("sfx-whoosh.mp3")} volume={0.3} />
      </Sequence>

      {/* VO: CTA narration (Section 9, local ~frame 120 → global 2020) */}
      <Sequence from={2020} durationInFrames={150}>
        <Audio src={staticFile("vo-cta.mp3")} volume={0.9} />
      </Sequence>

      {/* ── Visual Layer ── */}
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

        {/* Section 5: Advanced Features (Focus Flow + Webhooks) */}
        <TransitionSeries.Sequence durationInFrames={DURATIONS.advancedFeatures}>
          <AdvancedFeatures />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: DURATIONS.transition5 })}
        />

        {/* Section 6: Demo Showcase */}
        <TransitionSeries.Sequence durationInFrames={DURATIONS.demo}>
          <DemoShowcase />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-top" })}
          timing={linearTiming({ durationInFrames: DURATIONS.transition6 })}
        />

        {/* Section 7: Ecosystem (Smart Matchers + Async + Snooze) */}
        <TransitionSeries.Sequence durationInFrames={DURATIONS.ecosystem}>
          <Ecosystem />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: DURATIONS.transition7 })}
        />

        {/* Section 8: Cross-Platform & Stats */}
        <TransitionSeries.Sequence durationInFrames={DURATIONS.crossPlatform}>
          <CrossPlatform />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: DURATIONS.transition8 })}
        />

        {/* Section 9: Call to Action / Outro */}
        <TransitionSeries.Sequence durationInFrames={DURATIONS.callToAction}>
          <CallToAction />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};
