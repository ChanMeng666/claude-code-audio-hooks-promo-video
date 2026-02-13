import React from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  staticFile,
  Video,
} from "remotion";
import { FaCheck } from "react-icons/fa";
import { COLORS, fontFamily } from "../constants";

export const DemoShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "See It in Action" underline
  const underlineWidth = interpolate(frame, [5, 25], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Demo window (frame 30-270)
  const windowScale = spring({
    frame: frame - 30,
    fps,
    config: { damping: 15 },
  });

  // Outro scale down
  const outroScale = interpolate(frame, [270, 290], [1, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Checkmark
  const checkScale = spring({
    frame: frame - 280,
    fps,
    config: { damping: 8 },
  });

  const checkOpacity = interpolate(frame, [275, 285], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "It just works" text
  const worksOpacity = interpolate(frame, [285, 295], [0, 1], {
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
        overflow: "hidden",
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: titleOpacity,
        }}
      >
        <span
          style={{
            fontFamily,
            fontSize: 42,
            fontWeight: 700,
            color: COLORS.white,
          }}
        >
          See It in Action
        </span>
        <div
          style={{
            width: `${underlineWidth}%`,
            maxWidth: 300,
            height: 3,
            backgroundColor: COLORS.green,
            marginTop: 8,
            boxShadow: COLORS.greenGlow,
          }}
        />
      </div>

      {/* Demo video */}
      {frame >= 30 && (
        <div
          style={{
            transform: `scale(${Math.min(windowScale, 1) * (frame > 270 ? outroScale : 1)})`,
          }}
        >
          <div
            style={{
              width: 1100,
              height: 650,
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: `0 20px 80px rgba(0,0,0,0.6), 0 0 40px ${COLORS.green}22`,
            }}
          >
            <Video
              src={staticFile("demo-task-complete.mp4")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      )}

      {/* Checkmark + "It just works" */}
      {frame >= 275 && (
        <div
          style={{
            position: "absolute",
            bottom: 80,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              backgroundColor: COLORS.green,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              color: COLORS.black,
              transform: `scale(${checkScale})`,
              opacity: checkOpacity,
            }}
          >
            <FaCheck />
          </div>
          <span
            style={{
              fontFamily,
              fontSize: 36,
              fontWeight: 700,
              color: COLORS.white,
              opacity: worksOpacity,
            }}
          >
            It just works.
          </span>
        </div>
      )}
    </div>
  );
};
