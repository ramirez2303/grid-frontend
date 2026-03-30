import type {
  ApiResponse,
  CalendarRace,
  RaceWithResults,
  DriverStanding,
  ConstructorStanding,
  TeamListItem,
  TeamDetail,
  DriverDetail,
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

export function getTeams(): Promise<TeamListItem[]> {
  return fetchApi<TeamListItem[]>("/api/teams");
}

export function getTeam(teamId: string): Promise<TeamDetail> {
  return fetchApi<TeamDetail>(`/api/teams/${teamId}`);
}

export function getDriver(driverId: string): Promise<DriverDetail> {
  return fetchApi<DriverDetail>(`/api/drivers/${driverId}`);
}

export function getResults(round: number): Promise<RaceWithResults> {
  return fetchApi<RaceWithResults>(`/api/results/${round}`);
}
