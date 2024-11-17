import { F1RaceData } from "./f1.types";
import { Match } from "./matches.types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IResponse<T = any> {
  error?: string;
  data?: T;
}

// Definimos un tipo genérico para diferentes tipos de eventos
export type EventType = "today_matches" | "league_matches" | "f1_race";

export interface BaseEventResponse {
  type: EventType;
}

// Interfaz para la respuesta de F1
export interface F1RaceResponse extends BaseEventResponse {
  type: "f1_race";
  data: F1RaceData;
  error?: string;
}

// Interfaz para los partidos de hoy
export interface TodayMatchesResponse extends BaseEventResponse {
  type: "today_matches";
  data: {
    date: string;
    totalMatches: number;
    matches: Match[];
  };
}

// Interfaz para los partidos de liga
export interface LeagueMatchesResponse extends BaseEventResponse {
  type: "league_matches";
  data: { matches: Match[] };
}

// Tipo unificado para todas las respuestas posibles
export type EventResponse =
  | F1RaceResponse
  | TodayMatchesResponse
  | LeagueMatchesResponse;
