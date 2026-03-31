"use client";

import { useState } from "react";
import { Html } from "@react-three/drei";

interface AnnotationPointProps {
  position: [number, number, number];
  label: string;
  description: string;
  color?: string;
}

export function AnnotationPoint({ position, label, description, color = "#FF8000" }: AnnotationPointProps) {
  const [open, setOpen] = useState(false);

  return (
    <group position={position}>
      {/* Pulsing dot */}
      <mesh onClick={() => setOpen(!open)} onPointerOver={() => { document.body.style.cursor = "pointer"; }} onPointerOut={() => { document.body.style.cursor = "auto"; }}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Outer ring pulse */}
      <mesh>
        <ringGeometry args={[0.05, 0.07, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} side={2} />
      </mesh>

      {/* Tooltip */}
      {open && (
        <Html distanceFactor={5} position={[0, 0.15, 0]} center>
          <div
            className="rounded-lg bg-grid-card border border-white/[0.08] px-3 py-2 shadow-xl max-w-[220px] pointer-events-auto"
            onClick={() => setOpen(false)}
          >
            <p className="text-xs font-bold text-grid-text mb-1" style={{ fontFamily: "var(--font-display)" }}>
              {label}
            </p>
            <p className="text-[10px] text-grid-text-secondary leading-relaxed" style={{ fontFamily: "var(--font-mono)" }}>
              {description}
            </p>
          </div>
        </Html>
      )}
    </group>
  );
}
