export type SectorColor = "purple" | "green" | "yellow" | "none";
export type Compound = "SOFT" | "MEDIUM" | "HARD" | "INTERMEDIATE" | "WET" | "UNKNOWN";

export interface TimingEntry {
  position: number;
  driverNumber: number;
  driverId: string;
  abbreviation: string;
  teamId: string;
  teamColor: string;
  gapToLeader: string | null;
  gapToAhead: string | null;
  bestLapTime: string | null;
  lastLapTime: string | null;
  sector1: { time: number | null; color: SectorColor };
  sector2: { time: number | null; color: SectorColor };
  sector3: { time: number | null; color: SectorColor };
  compound: Compound;
  tyreAge: number;
  pitStops: number;
  topSpeed: number | null;
  lapsCompleted: number;
}

export interface PitStopEntry {
  driverNumber: number;
  driverId: string;
  abbreviation: string;
  teamColor: string;
  lap: number;
  duration: number | null;
  compoundOld: Compound;
  compoundNew: Compound;
}

export interface RaceControlMessage {
  date: string;
  lap: number | null;
  category: string;
  flag: string | null;
  message: string;
  sector: number | null;
}

export interface WeatherData {
  airTemperature: number;
  trackTemperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  rainfall: number;
  pressure: number;
}

export interface StintData {
  driverNumber: number;
  driverId: string;
  stintNumber: number;
  compound: Compound;
  lapStart: number;
  lapEnd: number;
  tyreAge: number;
}

export interface MeetingInfo {
  meetingKey: number;
  name: string;
  location: string;
  country: string;
  dateStart: string;
}

export interface SessionInfo {
  sessionKey: number;
  meetingKey: number;
  name: string;
  type: string;
  dateStart: string;
  dateEnd: string;
}

export interface TimingResponse {
  session: SessionInfo;
  entries: TimingEntry[];
  totalLaps: number;
}

export const COMPOUND_COLORS: Record<Compound, string> = {
  SOFT: "#FF3333",
  MEDIUM: "#FFD700",
  HARD: "#FFFFFF",
  INTERMEDIATE: "#39B54A",
  WET: "#0067FF",
  UNKNOWN: "#888888",
};

export const SECTOR_COLORS: Record<SectorColor, string> = {
  purple: "#A855F7",
  green: "#22C55E",
  yellow: "#EAB308",
  none: "#55555F",
};

// Gap chart types
export interface GapDataPoint { lap: number; gap: number }
export interface DriverGapSeries { driverNumber: number; abbreviation: string; teamColor: string; gaps: GapDataPoint[] }
export interface GapPitStopMarker { driverNumber: number; lap: number }
export interface GapChartData { drivers: DriverGapSeries[]; totalLaps: number; safetyCarLaps: number[]; pitStopLaps: GapPitStopMarker[] }
