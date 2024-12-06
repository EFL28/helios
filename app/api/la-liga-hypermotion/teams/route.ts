import { LaLigaTeamsResponse } from "@/types/la_liga/la_liga.types";

export async function GET() {
  const league = "laliga-hypermotion";
  const season = "2024";
  const limit = 99;
  const offset = 0;
  const orderField = "nickname";
  const orderType = "ASC";
  const contentLanguage = "es";

  const url = `${process.env.LA_LIGA_URL}/teams?subscriptionSlug=${league}-${season}&limit=${limit}&offset=${offset}&orderField=${orderField}&orderType=${orderType}&contentLanguage=${contentLanguage}&subscription-key=${process.env.LA_LIGA_API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    return new Response("Error al obtener los equipos", {
      status: 500,
    });
  }

  const data: LaLigaTeamsResponse = await response.json();
  const teams = data.teams;

  return new Response(JSON.stringify(teams), {
    headers: {
      "content-type": "application/json",
    },
  });
}
