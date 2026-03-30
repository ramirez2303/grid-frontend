"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GlobeCoastlines } from "./GlobeCoastlines";

import type { Topology } from "topojson-specification";

export interface CircuitPoint {
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
  topoData: Topology | null;
}

function latLngToVec3(lat: number, lng: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(-(r * Math.sin(phi) * Math.cos(theta)), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

export function GlobeScene({ points, selectedId, targetLatLng, onPointClick, topoData }: GlobeSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRot = useRef<{ x: number; y: number } | null>(null);

  if (targetLatLng) {
    targetRot.current = { x: targetLatLng.lat * (Math.PI / 180), y: -targetLatLng.lng * (Math.PI / 180) };
  }

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (targetRot.current) {
      groupRef.current.rotation.x += (targetRot.current.x - groupRef.current.rotation.x) * 2 * delta;
      groupRef.current.rotation.y += (targetRot.current.y - groupRef.current.rotation.y) * 2 * delta;
    } else {
      groupRef.current.rotation.y += 0.08 * delta;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial color="#0A0A12" roughness={0.95} metalness={0.05} />
      </mesh>

      <mesh>
        <sphereGeometry args={[2.003, 36, 18]} />
        <meshBasicMaterial color="#1a1a2e" wireframe transparent opacity={0.15} />
      </mesh>

      {topoData && <GlobeCoastlines topoData={topoData} radius={2.006} />}

      {points.map((pt) => {
        const pos = latLngToVec3(pt.lat, pt.lng, 2.02);
        const isSel = pt.id === selectedId;
        const color = isSel ? "#FF8000" : pt.completed ? "#27F4D2" : "#8A8A95";
        return (
          <group key={pt.id} position={pos}>
            <mesh onClick={(e) => { e.stopPropagation(); onPointClick(pt.id); }}>
              <sphereGeometry args={[isSel ? 0.055 : 0.03, 16, 16]} />
              <meshBasicMaterial color={color} />
            </mesh>
            {isSel && (
              <mesh>
                <ringGeometry args={[0.07, 0.09, 32]} />
                <meshBasicMaterial color="#FF8000" transparent opacity={0.6} side={THREE.DoubleSide} />
              </mesh>
            )}
          </group>
        );
      })}

      <mesh>
        <sphereGeometry args={[2.1, 48, 48]} />
        <meshBasicMaterial color="#27F4D2" transparent opacity={0.015} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}
