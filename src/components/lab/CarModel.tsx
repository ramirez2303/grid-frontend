"use client";

import { useEffect, useState, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { liveries } from "@/data/liveries";
import { CarModelFallback } from "./CarModelFallback";

import type { TeamLivery } from "@/data/liveries";

interface CarModelProps {
  color: string;
  teamId: string;
  wireframe: boolean;
  xray: boolean;
}

const MODEL_PATH = "/models/f1-2026.glb";
const SCALE = 0.00074;
const OFFSET: [number, number, number] = [-1398 * SCALE, -(-31) * SCALE, 0];

function classifyMesh(name: string, centerX: number, sizeX: number): keyof TeamLivery {
  if (name === "Object_12") return "detail";
  if (centerX < 500) return "wings";
  if (centerX > 2500) return "bodyRear";
  if (sizeX < 4200) return "accent";
  return "body";
}

function GLBModel({ teamId, wireframe, xray }: CarModelProps) {
  const { scene } = useGLTF(MODEL_PATH);
  const livery = liveries[teamId] ?? liveries["mclaren"]!;

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = (child.material as THREE.Material).clone();
      }
    });
    return clone;
  }, [scene]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const mat = child.material as THREE.MeshStandardMaterial;

      child.geometry.computeBoundingBox();
      const bb = child.geometry.boundingBox!;
      const cx = (bb.min.x + bb.max.x) / 2;
      const sx = bb.max.x - bb.min.x;

      const zone = classifyMesh(child.name, cx, sx);
      mat.color.set(livery[zone]);
      mat.metalness = 0.5;
      mat.roughness = 0.35;
      mat.wireframe = wireframe;
      mat.transparent = xray;
      mat.opacity = xray ? 0.35 : 1;
      mat.needsUpdate = true;
    });
  }, [clonedScene, livery, wireframe, xray]);

  return <primitive object={clonedScene} scale={SCALE} position={OFFSET} />;
}

export function CarModel(props: CarModelProps) {
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    fetch(MODEL_PATH, { method: "HEAD" })
      .then((res) => { if (!res.ok) setUseFallback(true); })
      .catch(() => setUseFallback(true));
  }, []);

  if (useFallback) {
    return <CarModelFallback color={props.color} wireframe={props.wireframe} xray={props.xray} />;
  }

  return <GLBModel {...props} />;
}
