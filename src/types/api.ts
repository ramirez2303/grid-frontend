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
  engine: string;
}
