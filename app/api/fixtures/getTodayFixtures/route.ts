import { IResponse, TodayMatchesResponse } from "@/types/api_response_types";
import { Match } from "@/types/matches.types";
import { NextResponse } from "next/server";

// Definir las ligas disponibles
const LEAGUES = [
  { id: "PL", name: "Premier League" },
  { id: "PD", name: "LaLiga" },
  { id: "BL1", name: "Bundesliga" },
  { id: "SA", name: "Serie A" },
  { id: "FL1", name: "Ligue 1" },
];

// Función para obtener partidos de una liga específica
async function getLeagueMatches(leagueId: string): Promise<Match[]> {
  const apiUrl = `${process.env.FOOTBALL_DATA_ORG_URL}/competitions/${leagueId}/matches`;
  const options = {
    headers: {
      "X-Auth-Token": process.env.FOOTBALL_DATA_ORG_API_KEY || "",
    },
  };

  try {
    const res = await fetch(apiUrl, options);
    if (!res.ok) {
      console.error(`Error fetching ${leagueId} matches:`, res.statusText);
      return [];
    }
    const data = await res.json();
    return data.matches || [];
  } catch (error) {
    console.error(`Error fetching ${leagueId} matches:`, error);
    return [];
  }
}

export async function GET(): Promise<
  NextResponse<IResponse<TodayMatchesResponse>>
> {
  try {
    // Obtener todos los partidos de todas las ligas
    const allLeaguesPromises = LEAGUES.map((league) =>
      getLeagueMatches(league.id)
    );
    const allLeaguesResults = await Promise.all(allLeaguesPromises);

    // Aplanar los resultados en un solo array
    const allMatches = allLeaguesResults.flat();

    // Obtener la fecha actual
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Filtrar partidos futuros
    const futureMatches = allMatches.filter((match) => {
      const matchDate = new Date(match.utcDate);
      matchDate.setHours(0, 0, 0, 0);
      return matchDate >= today;
    });

    if (futureMatches.length === 0) {
      return NextResponse.json({
        data: {
          type: "today_matches",
          data: {
            date: today.toISOString().split("T")[0],
            totalMatches: 0,
            matches: [],
          },
        },
      });
    }

    // Encontrar la fecha más cercana con partidos
    const dates = futureMatches.map((match) => {
      const date = new Date(match.utcDate);
      date.setHours(0, 0, 0, 0);
      return date.getTime();
    });

    const nearestDate = new Date(Math.min(...dates));
    nearestDate.setHours(0, 0, 0, 0);

    // Filtrar solo los partidos de la fecha más cercana
    const nearestMatches = futureMatches.filter((match) => {
      const matchDate = new Date(match.utcDate);
      matchDate.setHours(0, 0, 0, 0);
      return matchDate.getTime() === nearestDate.getTime();
    });

    // Ordenar por hora del partido
    const sortedMatches = nearestMatches.sort(
      (a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime()
    );

    // Agregar la liga a cada partido
    const matchesWithLeague: Match[] = sortedMatches.map((match) => {
      const league = LEAGUES.find((l) => match.competition.code === l.id);
      return {
        ...match,
        league: league?.name || "Unknown League",
      };
    });

    // Respuesta tipada correctamente como TodayMatchesResponse
    const response: TodayMatchesResponse = {
      type: "today_matches",
      data: {
        date: nearestDate.toISOString().split("T")[0],
        totalMatches: matchesWithLeague.length,
        matches: matchesWithLeague,
      },
    };

    return NextResponse.json({ data: response });
  } catch (error) {
    console.error("Error general:", error);
    return NextResponse.json(
      { error: "Error al conectar con football-data.org" },
      { status: 500 }
    );
  }
}
