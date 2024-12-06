export interface LaLigaTeamsResponse {
  total: number;
  teams: LaLigaTeam[];
}

export interface LaLigaTeam {
  id: number;
  slug: string;
  name: string;
  nickname: string;
  boundname: string;
  shortname: string;
  color: string;
  color_secondary: string;
  foundation: string;
  web: string;
  sprite_status: string;
  club: LaLigaTeamClub;
  venue: LaLigaTeamVenue;
  shield: LaLigaTeamShield;
  competitions: [];
  opta_id: string;
  lde_id: number;
}

export interface LaLigaTeamClub {
  id: number;
  slug: string;
  name: string;
  nickname: string;
  boundname: string;
  shortname: string;
  selector_name: string;
  address: string;
  foundation: string;
  web: string;
  twitter: string;
  facebook: string;
  instagram: string;
  mail: string;
  phone: string;
  president: string;
}

export interface LaLigaTeamVenue {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  capacity: number;
  address: string;
  country: {
    id: string;
  };
  image: {
    id: number;
    url: string;
    resizes: Resizes;
  };
  timezone: string;
  city: string;
  slug: string;
  opta_id: string;
  lde_id: number;
}

export interface LaLigaTeamShield {
  id: number;
  name: string;
  url: string;
  resizes: Resizes;
}

export interface Resizes {
  xsmall: string;
  small: string;
  medium: string;
  large: string;
  xlarge: string;
  hl?: string;
}
