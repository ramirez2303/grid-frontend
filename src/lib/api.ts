import type {
  ApiResponse,
  CalendarRace,
  RaceWithResults,
  DriverStanding,
  ConstructorStanding,
  TeamListItem,
  TeamDetail,
  DriverDetail,
  CircuitListItem,
  CircuitDetail,
  CircuitWinner,
} from "@/types/api";

const BASE_URL = process.env["NEXT_PUBLIC_API_URL"] ?? "http://localhost:3001";

async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, { cache: "no-store" });

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

export function getCircuits(): Promise<CircuitListItem[]> {
  return fetchApi<CircuitListItem[]>("/api/circuits");
}

export function getCircuit(circuitId: string): Promise<CircuitDetail> {
  return fetchApi<CircuitDetail>(`/api/circuits/${circuitId}`);
}

export function getCircuitWinners(circuitId: string): Promise<CircuitWinner[]> {
  return fetchApi<CircuitWinner[]>(`/api/circuits/${circuitId}/winners`);
}

import type { CircuitTrackData, CircuitElevationData } from "@/types/api";

export function getCircuitTrackData(circuitId: string): Promise<CircuitTrackData> {
  return fetchApi<CircuitTrackData>(`/api/circuits/${circuitId}/trackdata`);
}

export function getCircuitElevation(circuitId: string): Promise<CircuitElevationData> {
  return fetchApi<CircuitElevationData>(`/api/circuits/${circuitId}/elevation`);
}

// Timing
import type { TimingResponse, PitStopEntry, RaceControlMessage, WeatherData, StintData, MeetingInfo, SessionInfo } from "@/types/timing";

export function getMeetings(year: number = 2026): Promise<MeetingInfo[]> {
  return fetchApi<MeetingInfo[]>(`/api/meetings?year=${year}`);
}

export function getSessions(meetingKey: number): Promise<SessionInfo[]> {
  return fetchApi<SessionInfo[]>(`/api/sessions/${meetingKey}`);
}

export function getTimingBoard(sessionKey: number): Promise<TimingResponse> {
  return fetchApi<TimingResponse>(`/api/timing/${sessionKey}`);
}

export function getPitStops(sessionKey: number): Promise<PitStopEntry[]> {
  return fetchApi<PitStopEntry[]>(`/api/timing/${sessionKey}/pitstops`);
}

export function getRaceControl(sessionKey: number): Promise<RaceControlMessage[]> {
  return fetchApi<RaceControlMessage[]>(`/api/timing/${sessionKey}/racecontrol`);
}

export function getWeather(sessionKey: number): Promise<WeatherData> {
  return fetchApi<WeatherData>(`/api/timing/${sessionKey}/weather`);
}

export function getStrategy(sessionKey: number): Promise<StintData[]> {
  return fetchApi<StintData[]>(`/api/timing/${sessionKey}/strategy`);
}

import type { GapChartData } from "@/types/timing";

export function getGapChart(sessionKey: number): Promise<GapChartData> {
  return fetchApi<GapChartData>(`/api/timing/${sessionKey}/gaps`);
}

// News + Glossary
import type { NewsResponse, GlossaryTerm } from "@/types/news";

export function getNews(params?: { source?: string; topic?: string; search?: string; limit?: number; offset?: number }): Promise<NewsResponse> {
  const qs = new URLSearchParams();
  if (params?.source) qs.set("source", params.source);
  if (params?.topic) qs.set("topic", params.topic);
  if (params?.search) qs.set("search", params.search);
  if (params?.limit) qs.set("limit", String(params.limit));
  if (params?.offset) qs.set("offset", String(params.offset));
  return fetchApi<NewsResponse>(`/api/news?${qs.toString()}`);
}

export function getGlossary(): Promise<GlossaryTerm[]> {
  return fetchApi<GlossaryTerm[]>("/api/glossary");
}

// Trivia + Facts + Records
import type { RecordItem, TriviaQuestionItem, DailyFactItem } from "@/types/trivia";

export function getRecords(): Promise<RecordItem[]> {
  return fetchApi<RecordItem[]>("/api/records");
}

export function getTriviaQuestions(count: number = 10): Promise<TriviaQuestionItem[]> {
  return fetchApi<TriviaQuestionItem[]>(`/api/trivia/random?count=${count}`);
}

export function getDailyFact(): Promise<DailyFactItem | null> {
  return fetchApi<DailyFactItem | null>("/api/facts/daily");
}

export function getFactsByTag(tag: string): Promise<DailyFactItem[]> {
  return fetchApi<DailyFactItem[]>(`/api/facts?tag=${tag}`);
}

// Replay
import type { TrackOutline, ReplayData, ElevationProfile } from "@/types/replay";

export function getReplayTrack(sessionKey: number): Promise<TrackOutline> {
  return fetchApi<TrackOutline>(`/api/replay/${sessionKey}/track`);
}

export function getReplayData(sessionKey: number): Promise<ReplayData> {
  return fetchApi<ReplayData>(`/api/replay/${sessionKey}/data`);
}

export function getReplayElevation(sessionKey: number): Promise<ElevationProfile> {
  return fetchApi<ElevationProfile>(`/api/replay/${sessionKey}/elevation`);
}
