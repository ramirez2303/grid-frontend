"use client";

import { useState } from "react";
import Image from "next/image";
import { getTeamLogoUrl } from "@/lib/f1Media";

interface TeamBadgeProps {
  teamId: string;
  teamName: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = { sm: 24, md: 36, lg: 56 };

export function TeamBadge({ teamId, teamName, size = "md", className = "" }: TeamBadgeProps) {
  const [failed, setFailed] = useState(false);
  const px = sizes[size];
  const url = getTeamLogoUrl(teamId, px * 2);

  if (failed || !url) {
    return (
      <div
        className={`flex items-center justify-center rounded-md font-bold text-grid-text-muted flex-shrink-0 ${className}`}
        style={{
          width: px,
          height: px,
          background: "var(--color-grid-card)",
          fontSize: px * 0.3,
          fontFamily: "var(--font-display)",
        }}
      >
        {teamName.slice(0, 3).toUpperCase()}
      </div>
    );
  }

  return (
    <Image
      src={url}
      alt={`${teamName} logo`}
      width={px}
      height={px}
      className={`object-contain flex-shrink-0 ${className}`}
      onError={() => setFailed(true)}
      unoptimized
    />
  );
}
