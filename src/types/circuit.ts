export interface CircuitListItem {
  id: string;
  name: string;
  country: string;
  city: string;
  latitude: number | null;
  longitude: number | null;
  length: number | null;
  turns: number | null;
  type: string | null;
}

export interface CircuitDetail {
  id: string;
  name: string;
  country: string;
  city: string;
  latitude: number | null;
  longitude: number | null;
  length: number | null;
  turns: number | null;
  drsZones: number | null;
  type: string | null;
  lapRecordTime: string | null;
  lapRecordDriver: string | null;
  lapRecordYear: number | null;
  numberOfLaps: number | null;
  raceDistance: string | null;
  firstGrandPrix: number | null;
  totalEditions: number | null;
  description: string | null;
}

export interface CircuitWinner {
  year: number;
  driverName: string;
  teamName: string;
  time: string | null;
}

export interface CircuitCorner {
  number: number;
  angle: number;
  length: number;
  x: number;
  y: number;
}

export interface CircuitTrackData {
  trackPoints: { x: number; y: number }[];
  corners: CircuitCorner[];
  marshalSectors: { number: number; x: number; y: number }[];
  rotation: number;
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
}

export interface CircuitElevationData {
  points: { distance: number; altitude: number }[];
  minAltitude: number;
  maxAltitude: number;
  totalClimb: number;
}
