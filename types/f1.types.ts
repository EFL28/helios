// Interfaz para la ubicación del circuito
interface Location {
  lat: string;
  long: string;
  locality: string;
  country: string;
}

// Interfaz para el circuito
interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: Location;
}

// Interfaz para las sesiones de práctica/clasificación
interface Session {
  date: string;
  time: string;
}

// Interfaz para una carrera individual
export interface Race {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time: string;
  FirstPractice: Session;
  SecondPractice: Session;
  ThirdPractice?: Session;
  Qualifying: Session;

  Sprint?: Session;
}

export interface F1RaceData {
  flagUrl: string;
  location: string;
  raceName: string;
  circuitName: string;

  raceDate: string;
  raceTime: string;

  sprintGP?: boolean;

  sprintQualifyingDate?: string;
  sprintQualifyingTime?: string;

  sprintRaceDate?: string;
  sprintRaceTime?: string;

  fp1Date: string;
  fp1Time: string;

  fp2Date?: string;
  fp2Time?: string;

  fp3Date?: string;
  fp3Time?: string;

  qualifyingDate: string;
  qualifyingTime: string;
}

export interface F1DriversData {
  broadcast_name: string;
  country_code: string;
  driver_number: number;
  first_name: string;
  full_name: string;
  headshot_url: string;
  last_name: string;
  meeting_key: number;
  name_acronym: string;
  session_key: number;
  team_colour: string;
  team_name: string;
}

export interface F1GPsResponse<T> {
  error?: string;
  data?: T;
}

export interface F1DriversResponse<T> {
  error?: string;
  data?: T;
}
