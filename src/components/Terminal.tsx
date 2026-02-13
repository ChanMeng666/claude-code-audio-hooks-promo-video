import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { COLORS } from "../constants";

export const Terminal: React.FC<{
  children: React.ReactNode;
  title?: string;
  width?: number;
  height?: number;
  enterFrame?: number;
  style?: React.CSSProperties;
}> = ({
  children,
  title = "Terminal",
  width = 1200,
  height = 500,
  enterFrame = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - enterFrame,
    fps,
    config: { damping: 15, mass: 0.8 },
  });

  const opacity = interpolate(frame - enterFrame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: COLORS.darkGray,
        borderRadius: 12,
        border: `1px solid ${COLORS.lightGray}`,
        overflow: "hidden",
        transform: `scale(${scale})`,
        opacity,
        boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${COLORS.green}22`,
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          height: 40,
          backgroundColor: COLORS.mediumGray,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 8,
          borderBottom: `1px solid ${COLORS.lightGray}`,
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#febc2e" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#28c840" }} />
        <span
          style={{
            marginLeft: 12,
            color: "#888",
            fontSize: 13,
            fontFamily: `"Courier New", monospace`,
          }}
        >
          {title}
        </span>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: 24,
          fontFamily: `"Courier New", monospace`,
          fontSize: 20,
          color: COLORS.green,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
};
