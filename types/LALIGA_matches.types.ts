export interface RootInterface {
  filters: Filters;
  resultSet: ResultSet;
  competition: Competition;
  matches: Match[];
}

export interface Match {
  area: Area;
  competition: Competition;
  season: Season;
  id: number;
  utcDate: string;
  status: string;
  matchday: number;
  stage: string;
  group?: null | string;
  lastUpdated: string;
  homeTeam: HomeTeam;
  awayTeam: HomeTeam;
  score: Score;
  odds: Odds;
  referees: (Referee | Referees2)[];
}

export interface Referees2 {
  id: number;
  name: string;
  type: string;
  nationality: string;
}

export interface Referee {
  id: number;
  name: string;
  type: string;
  nationality?: string;
}

export interface Odds {
  msg: string;
}

export interface Score {
  winner?: string;
  duration: string;
  fullTime: FullTime;
  halfTime: FullTime;
}

export interface FullTime {
  home?: number;
  away?: number;
}

export interface HomeTeam {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}

export interface Season {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  winner?: string;
}

export interface Area {
  id: number;
  name: string;
  code: string;
  flag: string;
}

export interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
}

export interface ResultSet {
  count: number;
  first: string;
  last: string;
  played: number;
}

export interface Filters {
  season: string;
}
