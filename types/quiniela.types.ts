
export interface QuinielaData {
  fecha_sorteo: string; //'2024-09-01 23:28:00',
  dia_semana: string; // 'domingo',
  id_sorteo: string; // '1248206046',
  game_id: string; // 'LAQU',
  anyo: string; // '2024',
  premio_bote: string; // '0',
  cdc: string; // '12482',
  apuestas: string; //'3438310',
  recaudacion: string | null; // '2578732',
  combinacion: string | null; // '1 - 2 - 1 - X - 2 - 1 - 1 - X - 2 - X - 1 - 2 - 1 - X - 20',
  premios: string; //'1418302',
  fondo_bote: string; // "0";
  escrutinio: QuinielaEscrutinio[] | [];
  partidos: QuinielaPartido[];
  temporada: string; // "2024-2025";
  jornada: string; // "4";
  elige8?: QuinielaElige8;
  escrutinioElige8?: QuinielaEscrutinioElige8[];
}

export interface QuinielaPartido {
  local: string; // "Barcelona";
  visitante: string; // "Valladolid";
  signo?: string; // "1 ";
  marcador?: string; //"7 - 0";
  fecha?: string; // "2024/11/30 14:00:00";
}

export interface QuinielaEscrutinio {
  tipo: string; // "Pleno al 15 ";
  categoria: number; // 1;
  premio: string; // "193404,94";
  ganadores: string; // "1";
}

export interface QuinielaElige8 {
  gameid: string; //"ELG8";
  relsorteoid_asociado: string; // "1248213046";
  activo: string; //"1";
}

export interface QuinielaEscrutinioElige8 {
  tipo: string; // "8 Acertados 8 ";
  categoria: number; // 1;
  premio: string; //"811,53";
  ganadores: string; //"56";
}
