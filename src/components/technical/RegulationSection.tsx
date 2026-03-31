"use client";

import { Wind, Zap, Fuel, Ruler, Gauge } from "lucide-react";

const sections = [
  { icon: Wind, title: "Aerodinámica Activa", text: "Los alerones cambian de configuración en tiempo real. Modo Z (alta carga) en curvas, Modo X (baja resistencia) en rectas. Reemplaza el DRS tradicional." },
  { icon: Zap, title: "Power Unit 50/50", text: "V6 turbo 1.6L + MGU-K reforzado. Split parejo entre combustión interna y potencia eléctrica. El MGU-H fue eliminado para simplificar y abaratar costos." },
  { icon: Fuel, title: "Combustible Sustentable", text: "100% combustible sustentable obligatorio. Reduce la huella de carbono de la F1 sin comprometer el rendimiento de los motores." },
  { icon: Ruler, title: "Dimensiones y Peso", text: "Autos más chicos: wheelbase 3400mm (vs 3600mm anterior). Peso mínimo reducido a 768 kg. Más ágiles y maniobrables." },
  { icon: Gauge, title: "Manual Override", text: "Boost eléctrico extra disponible al seguir de cerca a otro auto. Incentiva los adelantamientos y reemplaza parte del efecto DRS." },
];

export function RegulationSection() {
  return (
    <div>
      <h2 className="text-2xl tracking-wider text-grid-text mb-6" style={{ fontFamily: "var(--font-display)" }}>
        REGLAMENTO 2026
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <div key={s.title} className="rounded-xl bg-grid-surface border border-white/[0.06] p-5">
            <s.icon size={20} className="text-team-mercedes mb-3" />
            <h3 className="text-sm font-bold text-grid-text mb-2" style={{ fontFamily: "var(--font-display)" }}>{s.title}</h3>
            <p className="text-xs text-grid-text-secondary leading-relaxed">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
