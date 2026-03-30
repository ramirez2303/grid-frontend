"use client";

import { useState } from "react";
import Image from "next/image";
import { getDriverImageUrl } from "@/lib/f1Media";

interface DriverImageProps {
  firstName: string;
  lastName: string;
  teamColor: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = { sm: 32, md: 48, lg: 80, xl: 120 };

export function DriverImage({ firstName, lastName, teamColor, size = "md", className = "" }: DriverImageProps) {
  const [failed, setFailed] = useState(false);
  const px = sizes[size];
  const initials = `${firstName[0]}${lastName[0]}`;

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center rounded-full font-bold text-white ${className}`}
        style={{
          width: px,
          height: px,
          background: `linear-gradient(135deg, ${teamColor}80, ${teamColor})`,
          fontSize: px * 0.35,
          fontFamily: "var(--font-display)",
        }}
      >
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={getDriverImageUrl(firstName, lastName)}
      alt={`${firstName} ${lastName}`}
      width={px}
      height={px}
      className={`rounded-full object-cover bg-grid-card ${className}`}
      style={{ border: `2px solid ${teamColor}40` }}
      onError={() => setFailed(true)}
      unoptimized
    />
  );
}
