"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { feature } from "topojson-client";

import type { Topology, GeometryCollection } from "topojson-specification";

interface GlobeCoastlinesProps {
  topoData: Topology;
  radius: number;
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

export function GlobeCoastlines({ topoData, radius }: GlobeCoastlinesProps) {
  const geometry = useMemo(() => {
    const land = feature(topoData, topoData.objects["land"] as GeometryCollection);
    const points: number[] = [];

    for (const feat of land.features) {
      const coords = feat.geometry.type === "Polygon"
        ? [feat.geometry.coordinates]
        : feat.geometry.type === "MultiPolygon"
          ? feat.geometry.coordinates
          : [];

      for (const polygon of coords) {
        for (const ring of polygon) {
          for (let i = 0; i < ring.length - 1; i++) {
            const [lng1, lat1] = ring[i] as [number, number];
            const [lng2, lat2] = ring[i + 1] as [number, number];
            const v1 = latLngToVec3(lat1, lng1, radius);
            const v2 = latLngToVec3(lat2, lng2, radius);
            points.push(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
          }
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return geo;
  }, [topoData, radius]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#334155" transparent opacity={0.5} />
    </lineSegments>
  );
}
