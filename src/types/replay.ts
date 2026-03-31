export interface TrackPoint { x: number; y: number }
export interface ElevationPoint { distance: number; altitude: number }
export interface ReplayFrame { driverNumber: number; x: number; y: number }

export interface ReplayDriverInfo {
  driverNumber: number;
  abbreviation: string;
  teamColor: string;
}

export interface TrackOutline {
  points: TrackPoint[];
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
}

export interface ReplayData {
  timestamps: number[];
  frames: Record<number, ReplayFrame[]>;
  totalLaps: number;
  drivers: ReplayDriverInfo[];
}

export interface ElevationProfile {
  points: ElevationPoint[];
}
