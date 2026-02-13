# Claude Code Audio Hooks - Promotional Video

A professional promotional video for [claude-code-audio-hooks](https://github.com/ChanMeng666/claude-code-audio-hooks), built entirely with code using **Remotion**, **Claude Code**, **ElevenLabs**, and **Suno**.

## Video Output

https://github.com/user-attachments/assets/f3c7ad69-f336-400a-bf57-c14943b35a0a

## Overview

| Property | Value |
|----------|-------|
| Resolution | 1920 x 1080 (Full HD) |
| Frame Rate | 30 fps |
| Duration | ~57 seconds (1700 frames) |
| Format | MP4 (H.264) |
| Font | Inter (Google Fonts) |
| Brand Colors | `#16F800` (green), `#000000` (black) |

## Video Structure

The video is composed of 7 sections connected with smooth transitions:

```mermaid
graph LR
    A[Intro<br/>5.0s] -->|wipe| B[Problem<br/>7.0s]
    B -->|fade| C[Solution<br/>6.7s]
    C -->|slide| D[Features<br/>16.0s]
    D -->|fade| E[Demo<br/>10.0s]
    E -->|wipe| F[Cross-Platform<br/>7.0s]
    F -->|fade| G[CTA<br/>9.0s]
```

### Section Timeline

| # | Section | Duration | Description |
|---|---------|----------|-------------|
| 1 | Intro / Logo Reveal | 5.0s | Scan line sweep, logo materialization, particle burst |
| 2 | Problem Statement | 7.0s | Terminal shows missed authorization, red vignette |
| 3 | Solution Reveal | 6.7s | Dramatic circle reveal, floating feature badges |
| 4 | Feature Highlights | 16.0s | 4 sub-scenes (Quick Setup, Hook Types, Audio Sets, Open Source) |
| 5 | Demo Showcase | 10.0s | Real screen recording of the product in action |
| 6 | Cross-Platform | 7.0s | 6 platform icons with animated counters |
| 7 | Call to Action | 9.0s | Install commands, GitHub link, tagline |

### Audio Layer

The video includes a layered audio design with automatic volume ducking:

```mermaid
gantt
    title Audio Timeline (approximate)
    dateFormat X
    axisFormat %s

    section BGM
    Background Music (with ducking) :0, 1700

    section SFX
    Scan Line     :15, 75
    Whoosh T1     :125, 155
    Whoosh T2     :315, 345
    Reveal Impact :335, 410
    Whoosh T3     :495, 525
    Notification  :755, 800
    Whoosh T4     :955, 985
    Whoosh T5     :1235, 1265
    Success Chime :1300, 1345
    Whoosh T6     :1425, 1455

    section Voiceover
    VO Reveal     :355, 475
    VO CTA        :1550, 1700
```

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm

### Install & Preview

```bash
# Clone the repository
git clone <repo-url>
cd my-video

# Install dependencies
npm install

# Start Remotion Studio (live preview)
npm run dev
```

### Render the Video

```bash
# Render to MP4 (output: out/promo-video.mp4)
npm run render
```

## Project Structure

```
my-video/
├── public/                          # Static assets
│   ├── claude-code-audio-hooks-logo.svg
│   ├── demo-task-complete.mp4       # Screen recording
│   ├── bgm.mp3                      # Background music (Suno)
│   ├── vo-reveal.mp3                # Voiceover (ElevenLabs)
│   ├── vo-cta.mp3                   # Voiceover (ElevenLabs)
│   ├── sfx-scan.mp3                 # Sound effect (ElevenLabs)
│   ├── sfx-whoosh.mp3               # Sound effect (ElevenLabs)
│   ├── sfx-reveal.mp3               # Sound effect (ElevenLabs)
│   ├── sfx-notification.mp3         # Sound effect (ElevenLabs)
│   └── sfx-success.mp3              # Sound effect (ElevenLabs)
├── scripts/
│   └── generate-audio.mjs           # ElevenLabs audio generation
├── src/
│   ├── Root.tsx                      # Remotion entry point
│   ├── PromoVideo.tsx                # Main orchestrator (TransitionSeries + Audio)
│   ├── constants.ts                  # Colors, durations, dimensions
│   ├── sections/                     # 7 video sections
│   │   ├── IntroLogoReveal.tsx
│   │   ├── ProblemStatement.tsx
│   │   ├── SolutionReveal.tsx
│   │   ├── FeatureHighlights.tsx     # Sub-scene orchestrator
│   │   ├── features/
│   │   │   ├── QuickSetup.tsx
│   │   │   ├── HookTypes.tsx
│   │   │   ├── AudioSets.tsx
│   │   │   └── OpenSource.tsx
│   │   ├── DemoShowcase.tsx
│   │   ├── CrossPlatform.tsx
│   │   └── CallToAction.tsx
│   └── components/                   # Reusable visual components
│       ├── TypewriterText.tsx        # Typewriter text effect
│       ├── Terminal.tsx              # Terminal window frame
│       ├── SoundWave.tsx             # Animated equalizer bars
│       ├── GreenGrid.tsx             # Animated grid + scan line
│       ├── PlatformIcon.tsx          # Platform icons (react-icons)
│       ├── CounterNumber.tsx         # Animated counting numbers
│       └── GlowText.tsx             # Pulsing green glow text
├── .env.example                      # Environment variable template
├── package.json
├── remotion.config.ts
└── tsconfig.json
```

## Architecture

```mermaid
graph TD
    Root[Root.tsx] --> Comp[Composition: PromoVideo<br/>1920x1080 @ 30fps]
    Comp --> PV[PromoVideo.tsx]

    PV --> AL[Audio Layer]
    PV --> VL[Visual Layer<br/>TransitionSeries]

    AL --> BGM[BackgroundMusic<br/>Volume ducking]
    AL --> SFX[SFX Sequences<br/>scan, whoosh, reveal,<br/>notification, success]
    AL --> VO[Voiceover Sequences<br/>vo-reveal, vo-cta]

    VL --> S1[IntroLogoReveal]
    VL --> S2[ProblemStatement]
    VL --> S3[SolutionReveal]
    VL --> S4[FeatureHighlights]
    VL --> S5[DemoShowcase]
    VL --> S6[CrossPlatform]
    VL --> S7[CallToAction]

    S4 --> F1[QuickSetup]
    S4 --> F2[HookTypes]
    S4 --> F3[AudioSets]
    S4 --> F4[OpenSource]
```

### Key Patterns

- **TransitionSeries**: Sections are connected with `wipe`, `fade`, and `slide` transitions from `@remotion/transitions`. Transitions overlap adjacent sections, so the effective total is less than the sum of all durations.
- **Sequence-based Audio**: Each audio cue is placed at an exact global frame using `<Sequence from={frame}>` with `<Audio>` inside. This allows precise synchronization.
- **Volume Ducking**: The `BackgroundMusic` component uses multiple `interpolate()` calls multiplied together to duck during demo playback and voiceover sections.
- **Sub-scene Orchestration**: `FeatureHighlights` uses nested `<Sequence>` components with `durationInFrames` to reset `useCurrentFrame()` for each sub-scene, so each sub-scene animates from frame 0.

## Audio Generation

### ElevenLabs (Voiceover + Sound Effects)

The `scripts/generate-audio.mjs` script automates audio generation via the ElevenLabs API.

```bash
# 1. Copy the environment template
cp .env.example .env

# 2. Add your ElevenLabs API key to .env
#    ELEVENLABS_API_KEY=sk_your_key_here

# 3. Run the generation script
npm run generate-audio
```

The script generates:

| File | Type | API Endpoint | Description |
|------|------|-------------|-------------|
| `vo-reveal.mp3` | Voiceover | `/text-to-speech` | "Introducing Claude Code Audio Hooks. Never miss a beat." |
| `vo-cta.mp3` | Voiceover | `/text-to-speech` | "Never miss a notification. Never lose your flow." |
| `sfx-scan.mp3` | SFX | `/sound-generation` | Futuristic digital scan line sweep |
| `sfx-whoosh.mp3` | SFX | `/sound-generation` | Cinematic whoosh transition |
| `sfx-reveal.mp3` | SFX | `/sound-generation` | Dramatic reveal impact |
| `sfx-notification.mp3` | SFX | `/sound-generation` | Digital notification chime |
| `sfx-success.mp3` | SFX | `/sound-generation` | Achievement completion chime |
| `bgm.mp3` | Music | `/music` | Background music (requires paid plan) |

> **Note**: ElevenLabs music generation (`/music`) requires a paid plan. If unavailable, use [Suno](https://suno.com) as an alternative (see below).

### Suno (Background Music Alternative)

If ElevenLabs music generation is not available, use this prompt on [Suno](https://suno.com):

```
Dark cinematic electronic ambient instrumental track.
Futuristic, minimal, polished synth soundscape.
Starts with soft digital pulse, builds tension with atmospheric pads,
then opens into a confident mid-tempo electronic groove with clean arpeggiated synths.
Tech product promotional feel. Subtle bass, no vocals, no guitar.
D minor, 100 BPM, 57 seconds.
```

Download the result and save it as `public/bgm.mp3`.

## Production Workflow

This is the end-to-end workflow used to create this video:

```mermaid
flowchart TD
    A[Plan video structure<br/>with Claude Code] --> B[Create Remotion project<br/>+ install dependencies]
    B --> C[Build reusable components<br/>TypewriterText, Terminal, etc.]
    C --> D[Build section components<br/>7 sections + 4 sub-scenes]
    D --> E[Orchestrate with<br/>TransitionSeries + transitions]
    E --> F{Audio generation}

    F --> G[ElevenLabs API<br/>Voiceover + SFX]
    F --> H[Suno<br/>Background music]

    G --> I[Integrate audio<br/>Sequence + ducking]
    H --> I
    I --> J[Record demo video<br/>screen recording]
    J --> K[Preview in<br/>Remotion Studio]
    K --> L{Satisfied?}
    L -->|No| M[Adjust timing,<br/>copy, animations]
    M --> K
    L -->|Yes| N[Render final MP4]
```

### Tips for Adapting This Project

1. **Change the product**: Update text in section components, swap the logo SVG, and replace `demo-task-complete.mp4` with your own screen recording.
2. **Adjust timing**: All durations are centralized in `src/constants.ts`. Modify `DURATIONS` and `TOTAL_FRAMES` to change pacing.
3. **Change brand colors**: Update `COLORS` in `src/constants.ts`. The green/black theme propagates everywhere.
4. **Add/remove sections**: Add a new `<TransitionSeries.Sequence>` + `<TransitionSeries.Transition>` in `PromoVideo.tsx`, update `DURATIONS` and `TOTAL_FRAMES`.
5. **Swap audio**: Replace files in `public/` or modify the ElevenLabs prompts in `scripts/generate-audio.mjs`.

## Tools Used

| Tool | Purpose |
|------|---------|
| [Remotion](https://remotion.dev) | React-based programmatic video creation |
| [Claude Code](https://claude.com/claude-code) | AI-assisted code generation for all components |
| [ElevenLabs](https://elevenlabs.io) | AI voiceover (TTS) and sound effect generation |
| [Suno](https://suno.com) | AI background music generation |
| [react-icons](https://react-icons.github.io/react-icons/) | Professional SVG icon library |
| [@remotion/google-fonts](https://remotion.dev/docs/google-fonts) | Font loading (Inter) |
| [@remotion/transitions](https://remotion.dev/docs/transitions) | Scene transitions (fade, wipe, slide) |

## License

Note that for some entities a Remotion company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
