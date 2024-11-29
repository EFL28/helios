import { IResponse } from "@/types/api_response_types";
import { QuinielaData } from "@/types/quiniela.types";
import { NextResponse } from "next/server";

async function getQuiniela(): Promise<IResponse<QuinielaData | null>> {
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
        const quiniela_response: QuinielaData[] | string = await res.json();

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

export async function GET(): Promise<
  NextResponse<IResponse<QuinielaData | null>>
> {
  const quiniela = await getQuiniela();

  return NextResponse.json(quiniela);
}
