"use client";

import { useState } from "react";
import Image from "next/image";
import { getDriverImageUrl, getDriverHeadshotUrl } from "@/lib/f1Media";

interface DriverImageProps {
  driverId: string;
  firstName: string;
  lastName: string;
  teamColor: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "headshot" | "fullbody";
  className?: string;
}

const sizes = { sm: 32, md: 48, lg: 80, xl: 120 };

export function DriverImage({ driverId, firstName, lastName, teamColor, size = "md", variant = "headshot", className = "" }: DriverImageProps) {
  const [failed, setFailed] = useState(false);
  const px = sizes[size];

  const url = variant === "headshot"
    ? getDriverHeadshotUrl(driverId, px * 2)
    : getDriverImageUrl(driverId, px * 2);

  if (failed || !url) {
    return (
      <div
        className={`flex items-center justify-center rounded-full font-bold text-white flex-shrink-0 ${className}`}
        style={{
          width: px,
          height: px,
          background: `linear-gradient(135deg, ${teamColor}80, ${teamColor})`,
          fontSize: px * 0.35,
          fontFamily: "var(--font-display)",
        }}
      >
        {firstName[0]}{lastName[0]}
      </div>
    );
  }

  return (
    <Image
      src={url}
      alt={`${firstName} ${lastName}`}
      width={px}
      height={px}
      className={`rounded-full object-cover bg-grid-card flex-shrink-0 ${className}`}
      style={{ border: `2px solid ${teamColor}40` }}
      onError={() => setFailed(true)}
      unoptimized
    />
  );
}
