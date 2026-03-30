"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CircuitPoint {
  id: string;
  lat: number;
  lng: number;
  completed: boolean;
}

interface GlobeSceneProps {
  points: CircuitPoint[];
  selectedId: string | null;
  targetLatLng: { lat: number; lng: number } | null;
  onPointClick: (id: string) => void;
}

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

export function GlobeScene({ points, selectedId, targetLatLng, onPointClick }: GlobeSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef<{ x: number; y: number } | null>(null);

  if (targetLatLng) {
    targetRotation.current = {
      x: targetLatLng.lat * (Math.PI / 180),
      y: -targetLatLng.lng * (Math.PI / 180),
    };
  }

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (targetRotation.current) {
      groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 2 * delta;
      groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 2 * delta;
    } else {
      groupRef.current.rotation.y += 0.1 * delta;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Globe sphere */}
      <mesh>
        <sphereGeometry args={[2, 48, 48]} />
        <meshStandardMaterial color="#111115" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Wireframe overlay */}
      <mesh>
        <sphereGeometry args={[2.005, 24, 24]} />
        <meshBasicMaterial color="#222230" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Circuit points */}
      {points.map((point) => {
        const pos = latLngToVector3(point.lat, point.lng, 2.05);
        const isSelected = point.id === selectedId;
        const color = isSelected ? "#FF8000" : point.completed ? "#27F4D2" : "#55555F";
        const scale = isSelected ? 0.06 : 0.035;
        return (
          <mesh
            key={point.id}
            position={pos}
            onClick={(e) => { e.stopPropagation(); onPointClick(point.id); }}
          >
            <sphereGeometry args={[scale, 12, 12]} />
            <meshBasicMaterial color={color} />
          </mesh>
        );
      })}

      {/* Ambient edge glow */}
      <mesh>
        <sphereGeometry args={[2.08, 48, 48]} />
        <meshBasicMaterial color="#27F4D2" transparent opacity={0.02} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}
