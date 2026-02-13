import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { FaMicrophone, FaBell } from "react-icons/fa";
import { COLORS, fontFamily } from "../../constants";
import { SoundWave } from "../../components/SoundWave";

export const AudioSets: React.FC = () => {
  const frame = useCurrentFrame();

  const splitProgress = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const leftSlide = interpolate(frame, [5, 25], [200, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rightSlide = interpolate(frame, [5, 25], [-200, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bottomTextOpacity = interpolate(frame, [40, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.black,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Section label */}
      <div
        style={{
          position: "absolute",
          top: 60,
          fontFamily,
          fontSize: 20,
          color: COLORS.green,
          opacity: 0.6,
          letterSpacing: 3,
          textTransform: "uppercase",
        }}
      >
        Audio Sets
      </div>

      {/* Split screen */}
      <div
        style={{
          display: "flex",
          gap: 60,
          alignItems: "center",
        }}
      >
        {/* ElevenLabs Voice */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            transform: `translateX(${leftSlide}px)`,
            opacity: splitProgress,
          }}
        >
          <div
            style={{
              width: 500,
              height: 300,
              borderRadius: 16,
              border: `2px solid ${COLORS.green}`,
              backgroundColor: `${COLORS.green}08`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
              padding: 30,
            }}
          >
            <span
              style={{
                fontFamily,
                fontSize: 28,
                fontWeight: 700,
                color: COLORS.green,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <FaMicrophone /> ElevenLabs Voice
            </span>
            <SoundWave barCount={25} width={350} height={100} />
            <span
              style={{
                fontFamily,
                fontSize: 16,
                color: COLORS.white,
                opacity: 0.6,
              }}
            >
              Professional AI-generated voice alerts
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 2,
            height: 250,
            backgroundColor: COLORS.green,
            opacity: splitProgress * 0.4,
            boxShadow: COLORS.greenGlowSm,
          }}
        />

        {/* UI Chimes */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            transform: `translateX(${rightSlide}px)`,
            opacity: splitProgress,
          }}
        >
          <div
            style={{
              width: 500,
              height: 300,
              borderRadius: 16,
              border: `2px solid ${COLORS.green}`,
              backgroundColor: `${COLORS.green}08`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
              padding: 30,
            }}
          >
            <span
              style={{
                fontFamily,
                fontSize: 28,
                fontWeight: 700,
                color: COLORS.green,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <FaBell /> UI Chimes
            </span>
            <SoundWave barCount={25} width={350} height={100} speed={0.2} color={`${COLORS.green}cc`} />
            <span
              style={{
                fontFamily,
                fontSize: 16,
                color: COLORS.white,
                opacity: 0.6,
              }}
            >
              Clean, minimal notification sounds
            </span>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          fontFamily,
          fontSize: 32,
          fontWeight: 700,
          color: COLORS.white,
          opacity: bottomTextOpacity,
        }}
      >
        <span style={{ color: COLORS.green }}>Choose Your Sound.</span>
      </div>
    </div>
  );
};
