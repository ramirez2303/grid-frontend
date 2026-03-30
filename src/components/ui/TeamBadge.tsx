"use client";

import { useState } from "react";
import Image from "next/image";
import { getTeamLogoUrl } from "@/lib/f1Media";

interface TeamBadgeProps {
  teamId: string;
  teamName: string;
  color?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = { sm: 24, md: 36, lg: 56 };

export function TeamBadge({ teamId, teamName, color, size = "md", className = "" }: TeamBadgeProps) {
  const [failed, setFailed] = useState(false);
  const px = sizes[size];
  const abbr = teamName.slice(0, 3).toUpperCase();

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center rounded-md font-bold ${className}`}
        style={{
          width: px,
          height: px,
          background: color ? `${color}20` : "var(--color-grid-card)",
          color: color ?? "var(--color-grid-text-muted)",
          fontSize: px * 0.3,
          fontFamily: "var(--font-display)",
          letterSpacing: "0.05em",
        }}
      >
        {abbr}
      </div>
    );
  }

  return (
    <Image
      src={getTeamLogoUrl(teamId)}
      alt={`${teamName} logo`}
      width={px}
      height={px}
      className={`object-contain ${className}`}
      onError={() => setFailed(true)}
      unoptimized
    />
  );
}
