import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FaWindows, FaApple, FaLinux, FaTerminal, FaGitAlt, FaCode } from "react-icons/fa";
import { COLORS, fontFamily } from "../constants";

const platformData: Record<string, { label: string; icon: React.ReactNode }> = {
  windows: { label: "Windows", icon: <FaWindows /> },
  macos: { label: "macOS", icon: <FaApple /> },
  linux: { label: "Linux", icon: <FaLinux /> },
  wsl: { label: "WSL", icon: <FaTerminal /> },
  gitbash: { label: "Git Bash", icon: <FaGitAlt /> },
  cygwin: { label: "Cygwin", icon: <FaCode /> },
};

export const PlatformIcon: React.FC<{
  platform: string;
  enterFrame?: number;
  size?: number;
}> = ({ platform, enterFrame = 0, size = 100 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const data = platformData[platform] ?? { label: platform, icon: null };

  const scale = spring({
    frame: frame - enterFrame,
    fps,
    config: { damping: 10, mass: 0.5 },
  });

  return (
    <div
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
          width: size,
          height: size,
          borderRadius: 16,
          border: `2px solid ${COLORS.green}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.45,
          color: COLORS.green,
          backgroundColor: COLORS.darkGray,
          boxShadow: COLORS.greenGlowSm,
        }}
      >
        {data.icon}
      </div>
      <span
        style={{
          fontFamily,
          fontSize: 16,
          color: COLORS.white,
          fontWeight: 500,
        }}
      >
        {data.label}
      </span>
    </div>
  );
};
