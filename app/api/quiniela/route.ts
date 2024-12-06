import { IResponse } from "@/types/api_response_types";
import { LaLigaTeam } from "@/types/la_liga/la_liga.types";
import {
  Quiniela,
  QuinielaResponse,
  QuinielaWithCrests,
} from "@/types/quiniela.types";
import { NextResponse } from "next/server";

async function getQuiniela(): Promise<IResponse<QuinielaResponse | null>> {
  const today = new Date();

  const apiUrlBase = process.env.QUINIELA_DATA_URL;

  if (!apiUrlBase) {
    console.error("QUINIELA_DATA_URL no está definida en el entorno.");
    return {
      data: null,
      error: "Configuración inválida",
    };
  }

  // Formatea la fecha a YYYYMMDD
  const formatDate = (date: Date) =>
    date.toISOString().split("T")[0].replace(/-/g, "");

  const currentDate = today;
  const maxAttempts = 7; // Limita las búsquedas a una semana
  let attempts = 0;

  while (attempts < maxAttempts) {
    const formattedDate = formatDate(currentDate);
    const apiUrl = `${apiUrlBase}${formattedDate}`;

    console.log(`Buscando quiniela para la fecha: ${formattedDate}`);

    try {
      const res = await fetch(apiUrl);

      if (res.ok) {
        const quiniela_response: QuinielaResponse[] | string = await res.json();

        if (typeof quiniela_response === "string") {
          console.log(`No hay jornada para la fecha: ${formattedDate}`);
        } else if (quiniela_response.length > 0) {
          // Retorna la primera quiniela válida
          console.log("Quiniela encontrada:", quiniela_response[0]);
          return {
            data: quiniela_response[0],
          };
        }
      } else {
        console.error(
          `Error en la respuesta de la API (${res.status}):`,
          res.statusText
        );
      }
    } catch (error) {
      console.error(
        `Error al intentar obtener la quiniela para la fecha ${formattedDate}:`,
        error
      );
    }

    // Incrementa la fecha para buscar el día siguiente
    currentDate.setDate(currentDate.getDate() + 1);
    attempts++;
  }

  console.error("No se encontró una quiniela válida en el rango de fechas.");

  return {
    data: null,
    error: "No se encontró una quiniela válida",
  };
}

function normalizeTeamName(teamName: string): string {
  const normalizations: { [key: string]: string } = {
    "Racing De Santander": "Racing",
    "At. Madrid": "Atlético de Madrid",
    Deportivo: "RC Deportivo",
    "Racing Ferrol": "Racing Club Ferrol",
    "R. Oviedo": "Real Oviedo",
    "R. Zaragoza": "Real Zaragoza",
  };

  return normalizations[teamName] || teamName;
}

async function getQuinielaWithCrests(): Promise<Quiniela> {
  const quiniela_res = await getQuiniela();

  if (!quiniela_res.data?.partidos) {
    return {
      partidos: [],
      jornada: "",
    };
  }
  const partidos = quiniela_res.data.partidos;

  if (!quiniela_res.data?.jornada) {
    return {
      partidos: [],
      jornada: "",
    };
  }
  const jornada = quiniela_res.data.jornada;

  const liga_1_api_response = await fetch(
    "https://apim.laliga.com/public-service/api/v1/teams?subscriptionSlug=laliga-easports-2024&limit=99&offset=0&orderField=nickname&orderType=ASC&contentLanguage=es&subscription-key=c13c3a8e2f6b46da9c5c425cf61fab3e"
  );
  const liga_1_teams = await liga_1_api_response.json();
  const la_liga_easports: LaLigaTeam[] = liga_1_teams.teams;

  const liga_2_api_response = await fetch(
    "https://apim.laliga.com/public-service/api/v1/teams?subscriptionSlug=laliga-hypermotion-2024&limit=99&offset=0&orderField=nickname&orderType=ASC&contentLanguage=es&subscription-key=c13c3a8e2f6b46da9c5c425cf61fab3e"
  );
  const liga_2_teams = await liga_2_api_response.json();
  const la_liga_hypermotion: LaLigaTeam[] = liga_2_teams.teams;

  const all_teams = [...la_liga_easports, ...la_liga_hypermotion];

  const partidos_with_crests: QuinielaWithCrests[] = partidos.map((partido) => {
    const normalizedLocalName = normalizeTeamName(partido.local);
    const normalizedVisitanteName = normalizeTeamName(partido.visitante);

    const local_team = all_teams.find((team) =>
      team.nickname.includes(normalizedLocalName)
    );
    const visitante_team = all_teams.find((team) =>
      team.nickname.includes(normalizedVisitanteName)
    );

    return {
      ...partido,
      local_crest: local_team?.shield.resizes.medium,
      visitante_crest: visitante_team?.shield.resizes.medium,
    };
  });

  const quiniela: Quiniela = {
    partidos: partidos_with_crests,
    jornada,
  };

  return quiniela;
}

export async function GET(): Promise<NextResponse<Quiniela>> {
  const quiniela = await getQuinielaWithCrests();

  return NextResponse.json(quiniela);
}
