import type {
  ApiResponse,
  CalendarRace,
  RaceWithResults,
  DriverStanding,
  ConstructorStanding,
} from "@/types/api";

const BASE_URL = process.env["NEXT_PUBLIC_API_URL"] ?? "http://localhost:3001";

async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, { next: { revalidate: 60 } });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const json = (await response.json()) as ApiResponse<T>;

  if (!json.success) {
    throw new Error(json.error ?? "Unknown API error");
  }

  return json.data;
}

export function getCalendar(): Promise<CalendarRace[]> {
  return fetchApi<CalendarRace[]>("/api/calendar");
}

export function getLastRaceResult(): Promise<RaceWithResults> {
  return fetchApi<RaceWithResults>("/api/results/last");
}

export function getDriverStandings(): Promise<DriverStanding[]> {
  return fetchApi<DriverStanding[]>("/api/standings/drivers");
}

export function getConstructorStandings(): Promise<ConstructorStanding[]> {
  return fetchApi<ConstructorStanding[]>("/api/standings/constructors");
}
