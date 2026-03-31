"use client";

import { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { CarModelFallback } from "./CarModelFallback";

interface CarModelProps {
  color: string;
  wireframe: boolean;
  xray: boolean;
}

const MODEL_PATH = "/models/f1-2026.glb";

function GLBModel({ color, wireframe, xray }: CarModelProps) {
  const { scene } = useGLTF(MODEL_PATH);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const mat = child.material as THREE.MeshStandardMaterial;
        if (mat.isMeshStandardMaterial) {
          mat.wireframe = wireframe;
          mat.transparent = xray;
          mat.opacity = xray ? 0.35 : 1;
          mat.needsUpdate = true;
        }
      }
    });
    setReady(true);
  }, [scene, wireframe, xray]);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const mat = child.material as THREE.MeshStandardMaterial;
        if (mat.isMeshStandardMaterial && mat.color) {
          const hsl = { h: 0, s: 0, l: 0 };
          mat.color.getHSL(hsl);
          if (hsl.s > 0.1 || hsl.l > 0.3) {
            mat.color.set(color);
            mat.needsUpdate = true;
          }
        }
      }
    });
  }, [scene, color]);

  if (!ready) return null;

  return <primitive object={scene} scale={0.5} position={[0, 0, 0]} />;
}

export function CarModel({ color, wireframe, xray }: CarModelProps) {
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    fetch(MODEL_PATH, { method: "HEAD" })
      .then((res) => { if (!res.ok) setUseFallback(true); })
      .catch(() => setUseFallback(true));
  }, []);

  if (useFallback) {
    return <CarModelFallback color={color} wireframe={wireframe} xray={xray} />;
  }

  return <GLBModel color={color} wireframe={wireframe} xray={xray} />;
}
