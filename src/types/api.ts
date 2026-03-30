export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export interface CalendarRace {
  season: number;
  round: number;
  name: string;
  circuitId: string;
  circuitName: string;
  country: string;
  city: string;
  date: string;
  time: string | null;
  hasResults: boolean;
}

export interface RaceResultItem {
  position: number | null;
  driverId: string;
  firstName: string;
  lastName: string;
  abbreviation: string;
  driverNumber: number;
  teamId: string;
  teamName: string;
  teamColor: string;
  gridPosition: number | null;
  points: number;
  status: string | null;
  time: string | null;
  fastestLap: boolean;
  fastestLapTime: string | null;
}

export interface RaceWithResults {
  season: number;
  round: number;
  name: string;
  circuitName: string;
  country: string;
  date: string;
  results: RaceResultItem[];
}

export interface DriverStanding {
  position: number;
  driverId: string;
  firstName: string;
  lastName: string;
  abbreviation: string;
  number: number;
  nationality: string;
  points: number;
  wins: number;
  podiums: number;
  poles: number;
  fastestLaps: number;
  dnfs: number;
  teamId: string;
  teamName: string;
  teamColor: string;
}

export interface ConstructorStanding {
  position: number;
  teamId: string;
  name: string;
  fullName: string;
  color: string;
  points: number;
  wins: number;
  podiums: number;
  engine: string;
}

export interface TeamDriverSummary {
  id: string;
  firstName: string;
  lastName: string;
  abbreviation: string;
  number: number;
  nationality: string;
}

export interface TeamListItem {
  id: string;
  name: string;
  fullName: string;
  colorPrimary: string;
  engine: string;
  championships: number;
  wins: number;
  driverCount: number;
}

export interface TeamDetail {
  id: string;
  name: string;
  fullName: string;
  colorPrimary: string;
  colorSecondary: string | null;
  base: string | null;
  teamPrincipal: string | null;
  engine: string;
  firstSeason: number | null;
  championships: number;
  wins: number;
  podiums: number;
  bio: string | null;
  drivers: TeamDriverSummary[];
}

export interface DriverTeamSummary {
  id: string;
  name: string;
  colorPrimary: string;
}

export interface DriverDetail {
  id: string;
  firstName: string;
  lastName: string;
  abbreviation: string;
  number: number;
  nationality: string;
  dateOfBirth: string | null;
  championships: number;
  wins: number;
  podiums: number;
  poles: number;
  fastestLaps: number;
  firstSeason: number | null;
  team: DriverTeamSummary;
}

export type { CircuitListItem, CircuitDetail, CircuitWinner } from "./circuit";
