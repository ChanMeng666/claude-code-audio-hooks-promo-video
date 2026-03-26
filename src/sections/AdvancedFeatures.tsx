import React from "react";
import { Sequence, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import {
  FaWind,
  FaTint,
  FaLink,
  FaSlack,
  FaDiscord,
  FaMicrosoft,
  FaBell,
} from "react-icons/fa";
import { COLORS, fontFamily } from "../constants";

const SUB_SCENE_DURATION = 150;

/* ── Sub-scene A: Focus Flow ── */
const FocusFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Breathing animation
  const cycleLength = 90;
  const cycleFrame = frame % cycleLength;
  const breathPhase = cycleFrame / cycleLength;
  const breathWidth = 30 + Math.sin(breathPhase * Math.PI * 2) * 25;

  const titleOpacity = interpolate(frame, [5, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textOpacity = interpolate(frame, [30, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const modesOpacity = interpolate(frame, [60, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const modes = [
    { icon: <FaWind />, label: "Breathing" },
    { icon: <FaTint />, label: "Hydration" },
    { icon: <FaLink />, label: "URL / Command" },
  ];

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
        Focus Flow
      </div>

      <div
        style={{
          opacity: titleOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            width: 160,
            height: 160,
            borderRadius: "50%",
            border: `3px solid ${COLORS.green}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 ${breathWidth}px ${COLORS.green}66, inset 0 0 ${breathWidth * 0.5}px ${COLORS.green}22`,
          }}
        >
          <div
            style={{
              width: `${breathWidth + 30}%`,
              height: `${breathWidth + 30}%`,
              borderRadius: "50%",
              backgroundColor: `${COLORS.green}20`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily,
              fontSize: 16,
              color: COLORS.green,
              fontWeight: 600,
            }}
          >
            {breathPhase < 0.33 ? "Inhale" : breathPhase < 0.7 ? "Hold" : "Exhale"}
          </div>
        </div>

        <div
          style={{
            fontFamily,
            fontSize: 28,
            fontWeight: 600,
            color: COLORS.white,
            opacity: textOpacity,
          }}
        >
          Stay centered while Claude thinks.
        </div>

        <div style={{ display: "flex", gap: 40, opacity: modesOpacity }}>
          {modes.map((mode, i) => {
            const scale = spring({
              frame: frame - 65 - i * 8,
              fps,
              config: { damping: 10, mass: 0.5 },
            });
            return (
              <div
                key={mode.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  transform: `scale(${scale})`,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    border: `1.5px solid ${COLORS.green}66`,
                    backgroundColor: `${COLORS.green}10`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    color: COLORS.green,
                  }}
                >
                  {mode.icon}
                </div>
                <span
                  style={{
                    fontFamily,
                    fontSize: 14,
                    color: COLORS.white,
                    opacity: 0.7,
                  }}
                >
                  {mode.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ── Sub-scene B: Webhooks ── */
const Webhooks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const services = [
    { icon: <FaSlack />, label: "Slack", color: "#E01E5A" },
    { icon: <FaDiscord />, label: "Discord", color: "#5865F2" },
    { icon: <FaMicrosoft />, label: "Teams", color: "#6264A7" },
    { icon: <FaBell />, label: "ntfy.sh", color: COLORS.green },
  ];

  const textOpacity = interpolate(frame, [50, 65], [0, 1], {
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
        Webhooks
      </div>

      <div style={{ display: "flex", gap: 50 }}>
        {services.map((svc, i) => {
          const scale = spring({
            frame: frame - 10 - i * 10,
            fps,
            config: { damping: 10, mass: 0.6 },
          });

          const labelOpacity = interpolate(frame, [15 + i * 10, 25 + i * 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={svc.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                transform: `scale(${scale})`,
              }}
            >
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 20,
                  border: `2px solid ${svc.color}88`,
                  backgroundColor: `${svc.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 40,
                  color: svc.color,
                  boxShadow: `0 0 20px ${svc.color}33`,
                }}
              >
                {svc.icon}
              </div>
              <span
                style={{
                  fontFamily,
                  fontSize: 16,
                  fontWeight: 600,
                  color: COLORS.white,
                  opacity: labelOpacity,
                }}
              >
                {svc.label}
              </span>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 50,
          fontFamily,
          fontSize: 28,
          fontWeight: 600,
          color: COLORS.white,
          opacity: textOpacity,
          textAlign: "center",
        }}
      >
        Get notified anywhere.{" "}
        <span style={{ color: COLORS.green }}>Even on your phone.</span>
      </div>
    </div>
  );
};

/* ── Main AdvancedFeatures orchestrator ── */
export const AdvancedFeatures: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Sequence durationInFrames={SUB_SCENE_DURATION}>
        <FocusFlow />
      </Sequence>
      <Sequence from={SUB_SCENE_DURATION} durationInFrames={SUB_SCENE_DURATION}>
        <Webhooks />
      </Sequence>
    </div>
  );
};
