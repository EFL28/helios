import { Match } from "@/types/LALIGA_matches.types";
import { NextResponse } from "next/server";

export async function GET() {
  const apiUrl = `${process.env.FOOTBALL_DATA_ORG_URL}/competitions/FL1/matches`;

  const options = {
    headers: {
      "X-Auth-Token": process.env.FOOTBALL_DATA_ORG_API_KEY || "",
    },
  };

  try {
    const res = await fetch(apiUrl, options);

    if (!res.ok) {
      console.error("Error al obtener los eventos:", res.statusText);
      return NextResponse.json(
        { error: "Error al obtener los eventos" },
        { status: 500 }
      );
    }

    const data = await res.json();

    // Calculo fecha
    const today = new Date();
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 1)
    ); // Lunes

    const endOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 7)
    ); // Domingo

    const startDate = startOfWeek.toISOString().split("T")[0]; // Lunes (semana actual)
    const endDate = endOfWeek.toISOString().split("T")[0]; // Domingo (semana actual)

    // Filtrar los partidos de semana actual
    const currentWeekFixtures = data.matches.filter((match: Match) => {
      const matchDate = match.utcDate.split("T")[0]; // Obtener solo la fecha
      return matchDate >= startDate && matchDate <= endDate;
    });

    return NextResponse.json(currentWeekFixtures);
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return NextResponse.json(
      { error: "Error al conectar con football-data.org" },
      { status: 500 }
    );
  }
}
