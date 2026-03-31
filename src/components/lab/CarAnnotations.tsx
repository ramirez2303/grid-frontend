"use client";

import { AnnotationPoint } from "./AnnotationPoint";

const annotations = [
  {
    position: [0, 0.12, 2.05] as [number, number, number],
    label: "ALERÓN DELANTERO",
    description: "Aerodinámica activa 2026. Cambia entre modo Z (alta carga en curvas) y modo X (baja resistencia en rectas).",
  },
  {
    position: [0, 0.55, -1.3] as [number, number, number],
    label: "ALERÓN TRASERO",
    description: "Integra DRS con el nuevo sistema de aerodinámica activa. Se ajusta automáticamente según la velocidad.",
  },
  {
    position: [0, 0.15, -0.5] as [number, number, number],
    label: "POWER UNIT",
    description: "V6 turbo 1.6L + MGU-K reforzado. Split 50/50 entre combustión interna y potencia eléctrica.",
  },
  {
    position: [0, 0.45, 0.15] as [number, number, number],
    label: "HALO",
    description: "Estructura de titanio de 7kg que protege la cabeza del piloto. Soporta 12 veces el peso del auto.",
  },
  {
    position: [0, 0.05, -1.35] as [number, number, number],
    label: "DIFUSOR",
    description: "Genera downforce por efecto suelo. Diseño simplificado en 2026 para mejorar el seguimiento entre autos.",
  },
  {
    position: [0.42, 0.18, 1.4] as [number, number, number],
    label: "NEUMÁTICOS",
    description: "Pirelli 2026. Compuestos: Soft (C5-C3), Medium (C4-C2), Hard (C3-C1). Nuevas dimensiones para el reglamento.",
  },
];

export function CarAnnotations() {
  return (
    <group>
      {annotations.map((a) => (
        <AnnotationPoint key={a.label} position={a.position} label={a.label} description={a.description} />
      ))}
    </group>
  );
}
