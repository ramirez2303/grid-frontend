"use client";

import { useState, useEffect } from "react";
import { Rotate3d } from "lucide-react";

interface TrackLayoutProps {
  circuitId: string;
  color?: string;
  className?: string;
}

export function TrackLayout({ circuitId, color = "#F0F0F2", className = "" }: TrackLayoutProps) {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setSvgContent(null);
    setFailed(false);
    fetch(`/tracks/${circuitId}.svg`)
      .then((r) => {
        if (!r.ok) throw new Error("not found");
        return r.text();
      })
      .then((text) => {
        let svg = text
          .replace(/stroke="[^"]*"/g, `stroke="${color}"`)
          .replace(/stroke:\s*#[^;]+;/g, `stroke: ${color};`)
          .replace(/fill="white"/g, `fill="${color}"`)
          .replace(/width="[^"]*"/, 'width="100%"')
          .replace(/height="[^"]*"/, 'height="100%"');
        if (!svg.includes("viewBox")) {
          svg = svg.replace("<svg ", '<svg viewBox="0 0 500 500" ');
        }
        if (!svg.includes("preserveAspectRatio")) {
          svg = svg.replace("<svg ", '<svg preserveAspectRatio="xMidYMid meet" ');
        }
        setSvgContent(svg);
      })
      .catch(() => setFailed(true));
  }, [circuitId, color]);

  if (failed || !svgContent) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="text-center text-grid-text-muted">
          <Rotate3d size={24} className="mx-auto mb-1 opacity-30" />
          <p className="text-[10px]">Trazado</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center overflow-hidden [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full ${className}`}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}
