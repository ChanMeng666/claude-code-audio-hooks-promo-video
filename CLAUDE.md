# CLAUDE.md - Project Guidelines for Claude Code

## Project Overview

This is a Remotion-based promotional video project. The video is composed entirely in React/TypeScript, rendered to MP4 via Remotion's CLI.

## Tech Stack

- **Remotion 4.0.421** - Video framework (React-based)
- **React 19** + **TypeScript 5.9**
- **@remotion/transitions** - Scene transitions (fade, wipe, slide)
- **@remotion/google-fonts** - Inter font
- **@remotion/media** - Video embedding
- **react-icons** - SVG icons (FontAwesome set)
- **ElevenLabs API** - AI voiceover and sound effects
- **Suno** - AI background music

## Key Commands

```bash
npm run dev          # Start Remotion Studio (live preview)
npm run render       # Render to out/promo-video.mp4
npm run lint         # ESLint + TypeScript check
npm run generate-audio  # Generate audio via ElevenLabs API
```

## Architecture

### Entry Flow

`src/index.ts` -> `src/Root.tsx` -> `src/PromoVideo.tsx`

### PromoVideo.tsx

The main orchestrator with two layers:

1. **Audio Layer**: Background music + SFX/VO placed at exact global frames via `<Sequence from={frame}>`
2. **Visual Layer**: 7 sections connected via `<TransitionSeries>` with transitions between them

### Constants (src/constants.ts)

All timing, colors, and dimensions are centralized here:

- `DURATIONS` - Frame counts for each section and transition
- `TOTAL_FRAMES` - Must equal sum of all section durations minus transition overlaps
- `COLORS` - Brand colors (#16F800 green, #000000 black)
- `FPS` - 30
- `WIDTH/HEIGHT` - 1920x1080

### Global Timeline Calculation

TransitionSeries overlaps adjacent sections during transitions. To calculate the effective start frame of each section:

```
Section N start = Section (N-1) start + Section (N-1) duration - Transition duration
```

When changing durations, you MUST recalculate:
1. `TOTAL_FRAMES` in constants.ts
2. All audio `<Sequence from={}>` positions in PromoVideo.tsx
3. BackgroundMusic ducking ranges in PromoVideo.tsx

The current timeline is documented in the comment block at the top of PromoVideo.tsx.

### Section Components

Each section is a standalone React component that uses `useCurrentFrame()` (which resets to 0 for each section/sequence). Sections should NOT reference global frame numbers - they only know their local frame range.

### Sub-scene Pattern (FeatureHighlights)

FeatureHighlights uses nested `<Sequence>` components to create sub-scenes. Each sub-scene gets its own frame 0 via Remotion's Sequence frame reset. The sub-scene duration is defined in FeatureHighlights.tsx as `SUB_SCENE_DURATION`.

## Important Patterns

### Animation Timing

- Use `interpolate()` for linear animations with clamped extrapolation
- Use `spring()` for bouncy/natural entrance animations
- Always set `extrapolateLeft: "clamp"` and `extrapolateRight: "clamp"` on interpolate
- Animation setup should complete within the first 60-70% of a section's duration
- The remaining 30-40% should be "hold time" for readability

### Audio Placement

- SFX and VO are placed at **global** frame positions (not section-local)
- Use `<Sequence from={globalFrame} durationInFrames={duration}>` wrapping `<Audio>`
- BackgroundMusic volume = base * fadeIn * fadeOut * demoDuck * voRevealDuck * voCtaDuck
- When adding new audio, add a corresponding duck in BackgroundMusic if it conflicts

### TypeScript Strictness

- `noUnusedLocals: true` is enabled in tsconfig.json
- Remove all unused imports/variables or the build will fail
- Use `npx tsc --noEmit` to check before committing

## File Conventions

- Section components: `src/sections/SectionName.tsx`
- Feature sub-scenes: `src/sections/features/FeatureName.tsx`
- Reusable components: `src/components/ComponentName.tsx`
- Static assets: `public/` (audio, video, SVG)
- Scripts: `scripts/` (Node.js ESM scripts)

## Audio Assets

All audio files go in `public/`:

- `bgm.mp3` - Background music (generated via Suno or ElevenLabs)
- `vo-*.mp3` - Voiceover files (ElevenLabs TTS)
- `sfx-*.mp3` - Sound effects (ElevenLabs Sound Generation)

The ElevenLabs API key should be stored in `.env` (never committed). See `.env.example` for the template.

## Common Tasks

### Adding a New Section

1. Create `src/sections/NewSection.tsx`
2. Add duration to `DURATIONS` in constants.ts
3. Add a `<TransitionSeries.Sequence>` + `<TransitionSeries.Transition>` in PromoVideo.tsx
4. Recalculate `TOTAL_FRAMES` and all audio positions
5. Update the timeline comment in PromoVideo.tsx

### Changing Section Duration

1. Update the value in `DURATIONS` (constants.ts)
2. Recalculate `TOTAL_FRAMES` = sum of all section durations - sum of all transition durations
3. Recalculate all audio `<Sequence from={}>` values that come after the changed section
4. Update BackgroundMusic ducking ranges if affected

### Replacing Audio

1. Place the new file in `public/` with the same filename
2. If the duration changed significantly, adjust the `durationInFrames` on the corresponding `<Sequence>` in PromoVideo.tsx

## Don'ts

- Don't use emoji in component code - use react-icons (FontAwesome) instead
- Don't hardcode global frame numbers inside section components - use `useCurrentFrame()` which is section-local
- Don't forget to update `TOTAL_FRAMES` when changing any duration
- Don't commit `.env` files with API keys
- Don't add `volume={0}` to demo Video components (the demo video should play with its original audio)
