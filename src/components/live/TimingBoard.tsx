"use client";

import { TimingRow } from "./TimingRow";

import type { TimingResponse } from "@/types/timing";

interface TimingBoardProps {
  data: TimingResponse;
}

export function TimingBoard({ data }: TimingBoardProps) {
  return (
    <div className="rounded-xl bg-grid-surface border border-white/[0.06] overflow-x-auto">
      <table className="w-full text-sm min-w-[700px]">
        <thead>
          <tr className="border-b border-white/[0.06] text-[10px] uppercase tracking-wider text-grid-text-muted">
            <th className="py-2.5 px-2 text-left">Pos</th>
            <th className="py-2.5 px-1 w-2"></th>
            <th className="py-2.5 px-2 text-left">Piloto</th>
            <th className="py-2.5 px-2 text-right">Gap</th>
            <th className="py-2.5 px-2 text-right hidden md:table-cell">Int</th>
            <th className="py-2.5 px-2 text-right hidden lg:table-cell">Mejor</th>
            <th className="py-2.5 px-2 text-right hidden lg:table-cell">Última</th>
            <th className="py-2.5 px-1 hidden xl:table-cell">S1</th>
            <th className="py-2.5 px-1 hidden xl:table-cell">S2</th>
            <th className="py-2.5 px-1 hidden xl:table-cell">S3</th>
            <th className="py-2.5 px-2">Neum</th>
            <th className="py-2.5 px-2 text-center">Pit</th>
          </tr>
        </thead>
        <tbody>
          {data.entries.map((entry) => (
            <TimingRow key={entry.driverNumber} entry={entry} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
