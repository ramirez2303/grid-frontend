"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
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
  return new THREE.Vector3(
    -(r * Math.sin(phi) * Math.cos(theta)),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

function latLngToCameraPos(lat: number, lng: number, dist: number): THREE.Vector3 {
  return latLngToVec3(lat, lng, dist);
}

export function GlobeScene({ points, selectedId, targetLatLng, onPointClick, topoData }: GlobeSceneProps) {
  const { camera } = useThree();
  const targetCamPos = useRef<THREE.Vector3 | null>(null);
  const autoAngle = useRef(0);
  const hasSelection = !!selectedId;

  if (targetLatLng) {
    targetCamPos.current = latLngToCameraPos(targetLatLng.lat, targetLatLng.lng, 5);
  } else {
    targetCamPos.current = null;
  }

  useFrame((_, delta) => {
    if (targetCamPos.current) {
      camera.position.lerp(targetCamPos.current, 2.5 * delta);
      camera.lookAt(0, 0, 0);
    } else if (!hasSelection) {
      autoAngle.current += 0.15 * delta;
      camera.position.x = 5 * Math.sin(autoAngle.current);
      camera.position.z = 5 * Math.cos(autoAngle.current);
      camera.position.y = 1;
      camera.lookAt(0, 0, 0);
    }
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial color="#0A0A12" roughness={0.95} metalness={0.05} />
      </mesh>

      <mesh>
        <sphereGeometry args={[2.003, 36, 18]} />
        <meshBasicMaterial color="#1a1a2e" wireframe transparent opacity={0.12} />
      </mesh>

      {topoData && <GlobeCoastlines topoData={topoData} radius={2.006} />}

      {points.map((pt) => {
        const pos = latLngToVec3(pt.lat, pt.lng, 2.02);
        const isSel = pt.id === selectedId;
        const color = isSel ? "#FF8000" : pt.completed ? "#27F4D2" : "#8A8A95";
        return (
          <group key={pt.id} position={pos}>
            <mesh
              onClick={(e) => { e.stopPropagation(); onPointClick(pt.id); }}
              onPointerOver={(e) => { document.body.style.cursor = "pointer"; e.stopPropagation(); }}
              onPointerOut={() => { document.body.style.cursor = "auto"; }}
            >
              <sphereGeometry args={[isSel ? 0.06 : 0.035, 16, 16]} />
              <meshBasicMaterial color={color} />
            </mesh>
            {isSel && (
              <mesh>
                <ringGeometry args={[0.08, 0.1, 32]} />
                <meshBasicMaterial color="#FF8000" transparent opacity={0.5} side={THREE.DoubleSide} />
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
