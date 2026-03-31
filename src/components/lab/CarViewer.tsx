"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { CarModel } from "./CarModel";
import { CarAnnotations } from "./CarAnnotations";

import type { ViewMode } from "./ViewModeToggle";

interface CarViewerProps {
  teamColor: string;
  viewMode: ViewMode;
}

export function CarViewer({ teamColor, viewMode }: CarViewerProps) {
  return (
    <div className="w-full h-[70vh] min-h-[500px] rounded-2xl bg-grid-surface border border-white/[0.06] overflow-hidden">
      <Suspense fallback={
        <div className="flex h-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-grid-text-muted border-t-team-mclaren" />
        </div>
      }>
        <Canvas camera={{ position: [3, 2, 3], fov: 35 }} shadows>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow shadow-mapSize={1024} />
          <directionalLight position={[-3, 3, -3]} intensity={0.3} color="#27F4D2" />
          <pointLight position={[0, 4, 0]} intensity={0.5} color="#FF8000" />

          {/* Environment for reflections */}
          <Environment preset="city" />

          {/* Car */}
          <CarModel color={teamColor} wireframe={viewMode === "wireframe"} xray={viewMode === "xray"} />
          <CarAnnotations />

          {/* Ground */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#0A0A10" roughness={0.95} metalness={0.05} />
          </mesh>

          <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={10} blur={2} />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={10}
            target={[0, 0.2, 0]}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
