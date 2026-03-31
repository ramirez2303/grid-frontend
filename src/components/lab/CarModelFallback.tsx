"use client";

import * as THREE from "three";

interface CarModelFallbackProps {
  color: string;
  wireframe: boolean;
  xray: boolean;
}

function Wheel({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.18, 0.18, 0.12, 16]} />
      <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
    </mesh>
  );
}

export function CarModelFallback({ color, wireframe, xray }: CarModelFallbackProps) {
  const mat = { color, wireframe, transparent: xray, opacity: xray ? 0.35 : 1, roughness: 0.4, metalness: 0.6 };
  const dark = { color: "#111", wireframe, transparent: xray, opacity: xray ? 0.2 : 1, roughness: 0.6, metalness: 0.3 };

  return (
    <group>
      <mesh position={[0, 0.15, 0]}><boxGeometry args={[0.5, 0.18, 2.8]} /><meshStandardMaterial {...mat} /></mesh>
      <mesh position={[0, 0.12, 1.7]}><boxGeometry args={[0.25, 0.1, 0.6]} /><meshStandardMaterial {...mat} /></mesh>
      <mesh position={[0, 0.3, -0.1]}><boxGeometry args={[0.32, 0.12, 0.5]} /><meshStandardMaterial {...dark} /></mesh>
      <mesh position={[0.35, 0.18, -0.2]}><boxGeometry args={[0.25, 0.2, 1.2]} /><meshStandardMaterial {...mat} /></mesh>
      <mesh position={[-0.35, 0.18, -0.2]}><boxGeometry args={[0.25, 0.2, 1.2]} /><meshStandardMaterial {...mat} /></mesh>
      <mesh position={[0, 0.05, 2.05]}><boxGeometry args={[1.0, 0.03, 0.3]} /><meshStandardMaterial {...mat} /></mesh>
      <mesh position={[0.5, 0.08, 2.05]}><boxGeometry args={[0.02, 0.1, 0.3]} /><meshStandardMaterial {...mat} /></mesh>
      <mesh position={[-0.5, 0.08, 2.05]}><boxGeometry args={[0.02, 0.1, 0.3]} /><meshStandardMaterial {...mat} /></mesh>
      <mesh position={[0, 0.5, -1.3]}><boxGeometry args={[0.7, 0.03, 0.2]} /><meshStandardMaterial {...mat} /></mesh>
      <mesh position={[0.25, 0.35, -1.3]}><boxGeometry args={[0.02, 0.3, 0.02]} /><meshStandardMaterial {...mat} /></mesh>
      <mesh position={[-0.25, 0.35, -1.3]}><boxGeometry args={[0.02, 0.3, 0.02]} /><meshStandardMaterial {...mat} /></mesh>
      <mesh position={[0, 0.42, 0.15]}><torusGeometry args={[0.18, 0.025, 8, 16, Math.PI]} /><meshStandardMaterial color="#333" roughness={0.3} metalness={0.8} wireframe={wireframe} /></mesh>
      <mesh position={[0, 0.02, 0]}><boxGeometry args={[0.6, 0.02, 2.6]} /><meshStandardMaterial {...dark} /></mesh>
      <mesh position={[0, 0.08, -1.45]} rotation={[0.3, 0, 0]}><boxGeometry args={[0.55, 0.02, 0.3]} /><meshStandardMaterial {...dark} /></mesh>
      <Wheel position={[0.42, 0.18, 1.4]} />
      <Wheel position={[-0.42, 0.18, 1.4]} />
      <Wheel position={[0.42, 0.18, -0.9]} />
      <Wheel position={[-0.42, 0.18, -0.9]} />
    </group>
  );
}
