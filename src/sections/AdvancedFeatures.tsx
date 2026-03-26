import React from "react";
import {
  Sequence,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";
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

  // Screenshot scale-in
  const imgScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15 },
  });

  // Screenshot glow pulse
  const glowPulse = Math.sin(frame * 0.08) * 0.4 + 0.6;

  const textOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const modesOpacity = interpolate(frame, [70, 85], [0, 1], {
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
        Focus Flow
      </div>

      {/* Main content: screenshot left + text/modes right */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 50,
        }}
      >
        {/* Real screenshot */}
        <div
          style={{
            transform: `scale(${Math.min(imgScale, 1)})`,
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: `0 10px 40px rgba(0,0,0,0.5), 0 0 ${30 * glowPulse}px ${COLORS.green}33`,
          }}
        >
          <Img
            src={staticFile("demo-focus-flow.png")}
            style={{
              width: 620,
              height: 420,
              objectFit: "cover",
              borderRadius: 12,
              border: `2px solid ${COLORS.green}33`,
            }}
          />
        </div>

        {/* Text + mode icons */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 24,
            maxWidth: 420,
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: 32,
              fontWeight: 700,
              color: COLORS.white,
              opacity: textOpacity,
              lineHeight: 1.3,
            }}
          >
            Stay centered while
            <br />
            <span style={{ color: COLORS.green }}>Claude thinks.</span>
          </div>

          <div
            style={{
              fontFamily,
              fontSize: 17,
              color: COLORS.white,
              opacity: textOpacity * 0.6,
              lineHeight: 1.5,
            }}
          >
            Guided breathing exercises launch automatically.
            <br />
            Close when Claude finishes.
          </div>

          {/* Mode icons */}
          <div style={{ display: "flex", gap: 24, opacity: modesOpacity }}>
            {modes.map((mode, i) => {
              const scale = spring({
                frame: frame - 75 - i * 8,
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
                    gap: 6,
                    transform: `scale(${scale})`,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 10,
                      border: `1.5px solid ${COLORS.green}66`,
                      backgroundColor: `${COLORS.green}10`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      color: COLORS.green,
                    }}
                  >
                    {mode.icon}
                  </div>
                  <span
                    style={{
                      fontFamily,
                      fontSize: 12,
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
