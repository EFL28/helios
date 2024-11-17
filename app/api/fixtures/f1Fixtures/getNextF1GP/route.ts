import { F1RaceResponse, IResponse } from "@/types/api_response_types";
import { F1GPsResponse, F1RaceData, Race } from "@/types/f1.types";
import { countryCodeMap } from "@/types/f1_countries.types";
import { NextResponse } from "next/server";

async function getF1GPs(): Promise<F1GPsResponse<F1RaceData>> {
  const apiUrl = `${process.env.F1_DATA_URL}/current.json`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      console.error("Error al obtener las carreras:", res.statusText);
      return {
        error: "Error al obtener las carreras",
      };
    }
    const data = await res.json();
    const races: Race[] = data.MRData.RaceTable.Races;
    const today = new Date();

    // Filtrar carreras futuras
    const upcomingRaces = races.filter(
      (race: Race) => new Date(race.date) > today
    );

    if (upcomingRaces.length === 0) {
      console.log("No hay más carreras esta temporada.");
      return {
        error: "No hay más carreras.",
      };
    }

    // Obtener la carrera más proxima
    const nextRace = upcomingRaces[0];
    const countryName = nextRace.Circuit.Location.country;
    const countryCode = countryCodeMap[countryName];

    // Generar URL de la bandera utilizando Flagpedia
    const flagUrl = `https://flagcdn.com/w1280/${countryCode
      .toLowerCase()
      .replace(/\s/g, "-")}.png`;

    // Obtener si hay carrera al sprint
    const sprintGP = nextRace.Sprint ? true : false;

    const response: F1RaceData = {
      flagUrl,
      location: `${nextRace.Circuit.Location.locality}, ${countryName}`,
      raceName: nextRace.raceName,
      circuitName: nextRace.Circuit.circuitName,

      sprintGP: sprintGP,

      // FP1
      fp1Date: nextRace.FirstPractice.date,
      fp1Time: nextRace.FirstPractice.time,

      // Sprint Qualifying
      sprintQualifyingDate: sprintGP ? nextRace.SecondPractice?.date : "",
      sprintQualifyingTime: sprintGP ? nextRace.SecondPractice?.time : "",

      // FP2
      fp2Date: sprintGP ? "" : nextRace.SecondPractice?.date,
      fp2Time: sprintGP ? "" : nextRace.SecondPractice?.time,

      // FP3
      fp3Date: sprintGP ? "" : nextRace.ThirdPractice?.date,
      fp3Time: sprintGP ? "" : nextRace.ThirdPractice?.time,

      // Sprint
      sprintRaceDate: sprintGP ? nextRace.Sprint?.date : "",
      sprintRaceTime: sprintGP ? nextRace.Sprint?.time : "",

      // Qualifying
      qualifyingDate: nextRace.Qualifying.date,
      qualifyingTime: nextRace.Qualifying.time,

      // Race
      raceDate: nextRace.date,
      raceTime: nextRace.time,
    };

    return { data: response };
  } catch (error) {
    console.error(`Error fetching races:`, error);
    return {
      error: "Error.",
    };
  }
}

export async function GET(): Promise<NextResponse<IResponse<F1RaceResponse>>> {
  try {
    const nextRace = await getF1GPs();
    if (!nextRace || !nextRace.data) {
      return NextResponse.json({
        error: "No hay más carreras esta temporada",
      });
    }
    console.log("nextRace 222", nextRace.data);
    return NextResponse.json({
      data: {
        type: "f1_race",
        data: nextRace.data,
      },
    });
  } catch (error) {
    console.error("Error al cargar las carreras de F1", error);
    return NextResponse.json({ error: "Error al obtener las carreras" });
  }
}
