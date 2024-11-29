import { EventResponse, IResponse } from "@/types/api_response_types";
import { F1RaceData } from "@/types/f1.types";
import { Match } from "@/types/matches.types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EventSkeleton from "./skeletons/EventSkeleton";

interface EventProps {
  selectedLeague: string | null;
}

function formatLocalDateTime(
  dateStr: string,
  timeStr: string | undefined
): string {
  // Crear fecha UTC
  const utcDate = new Date(`${dateStr}T${timeStr}`);

  // Convertir a timestamp local
  const localDate = new Date(utcDate.getTime());

  return localDate.toLocaleString("es-ES", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

export default function Event({ selectedLeague }: EventProps) {
  console.log("selectedLeague", selectedLeague);
  const [events, setEvents] = useState<Match[]>([]);
  const [f1Event, setF1Event] = useState<F1RaceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Limpiar los estados al cambiar de liga
      setF1Event(null);
      setEvents([]);

      try {
        let endpoint = "/api/fixtures/getTodayFixtures"; // Por defecto hoy
        switch (selectedLeague) {
          case "La Liga":
            endpoint = "/api/fixtures/footballFixtures/getLaLigaFixtures";
            break;
          case "Premier League":
            endpoint =
              "/api/fixtures/footballFixtures/getPremierLeagueFixtures";
            break;
          case "Bundesliga":
            endpoint = "/api/fixtures/footballFixtures/getBundesligaFixtures";
            break;
          case "Serie A":
            endpoint = "/api/fixtures/footballFixtures/getSerieAFixtures";
            break;
          case "Ligue 1":
            endpoint = "/api/fixtures/footballFixtures/getLigue1Fixtures";
            break;
          case "Fórmula 1":
            endpoint = "/api/fixtures/f1Fixtures/getNextF1GP";
            break;
          case null:
            endpoint = "/api/fixtures/getTodayFixtures";
            break;
        }

        const res = await fetch(endpoint);
        const data: IResponse = await res.json();
        const info: EventResponse = data.data;

        switch (info.type) {
          case "today_matches":
            setEvents(info.data.matches);
            break;
          case "league_matches":
            setEvents(info.data.matches);
            break;
          case "f1_race":
            setF1Event(info.data);
            break;
        }
      } catch (error) {
        console.error("Error al cargar los eventos", error);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedLeague]);

  const handleSessionClick = (sessionType: string, date: string) => {
    if (!date) {
      return;
    }

    // Solo permitir predicciones si la fecha no ha pasado
    const sessionDate = new Date(`${date}`);
    const now = new Date();

    if (sessionDate > now) {
      router.push(`/predictions/f1/${sessionType}`);
    } else {
      // Opcional: Mostrar algún mensaje de que la sesión ya pasó
      console.log("Esta sesión ya ha terminado");
    }
  };

  if (isLoading) {
    return <EventSkeleton />;
  }

  return (
    <section className="mb-4 max-w-full">
      {/* <h2 className="text-xl md:text-2xl font-semibold mb-4">
        {selectedLeague
          ? `Eventos de ${selectedLeague}`
          : "Eventos de esta semana"}
      </h2> */}

      {f1Event ? (
        <div className="bg-white dark:bg-[#272727] p-3 md:p-4 rounded-lg shadow-md mb-4 sm:hover:shadow-lg sm:hover:scale-[1.02] transition-all duration-200 cursor-pointer">
          <div className="flex flex-col gap-3">
            <div className="flex justify-center items-center gap-3">
              <Image
                src={f1Event.flagUrl}
                alt="Country Grand Prix flag"
                width={50}
                height={20}
                className="rounded-sm"
              />
              <h3 className="text-lg font-semibold text-center">
                {f1Event.raceName}
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-center">
                <span className="font-medium">Circuito:</span>{" "}
                {f1Event.circuitName}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
                {/* Libres 1 */}
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  <p className="font-medium">Práctica 1</p>
                  <p>
                    {formatLocalDateTime(f1Event.fp1Date, f1Event.fp1Time)}h
                  </p>
                </div>

                {/* Sprint Qualifying */}
                {f1Event.sprintGP && f1Event.sprintQualifyingDate && (
                  <div
                    className="bg-gray-100 dark:bg-gray-800 p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    onClick={() =>
                      f1Event.sprintQualifyingDate &&
                      handleSessionClick(
                        "sprint-qualifying",
                        f1Event.sprintQualifyingDate
                      )
                    }
                  >
                    <p className="font-medium">Clasificación Sprint</p>
                    <p>
                      {formatLocalDateTime(
                        f1Event.sprintQualifyingDate,
                        f1Event.sprintQualifyingTime
                      )}
                      h
                    </p>
                  </div>
                )}

                {/* Sprint Race */}
                {f1Event.sprintGP && f1Event.sprintRaceDate && (
                  <div
                    className="bg-gray-100 dark:bg-gray-800 p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    onClick={() =>
                      f1Event.sprintRaceDate &&
                      handleSessionClick("sprint-race", f1Event.sprintRaceDate)
                    }
                  >
                    <p className="font-medium">Carrera Sprint</p>
                    <p>
                      {formatLocalDateTime(
                        f1Event.sprintRaceDate,
                        f1Event.sprintRaceTime
                      )}
                      h
                    </p>
                  </div>
                )}

                {/* Libres 2 */}
                {!f1Event.sprintGP && f1Event.fp2Date && (
                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                    <p className="font-medium">Práctica 2</p>
                    <p>
                      {formatLocalDateTime(f1Event.fp2Date, f1Event.fp2Time)}h
                    </p>
                  </div>
                )}

                {/* Libres 3 */}
                {!f1Event.sprintGP && f1Event.fp3Date && (
                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                    <p className="font-medium">Práctica 3</p>
                    <p>
                      {formatLocalDateTime(f1Event.fp3Date, f1Event.fp3Time)}h
                    </p>
                  </div>
                )}

                {/* Clasificación */}
                <div
                  className="bg-gray-100 dark:bg-gray-800 p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  onClick={() =>
                    f1Event.qualifyingDate &&
                    handleSessionClick("qualifying", f1Event.qualifyingDate)
                  }
                >
                  <p className="font-medium">Clasificación</p>
                  <p>
                    {formatLocalDateTime(
                      f1Event.qualifyingDate,
                      f1Event.qualifyingTime
                    )}
                    h
                  </p>
                </div>

                {/* Carrera */}
                <div
                  className="bg-gray-100 dark:bg-gray-800 p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  onClick={() =>
                    f1Event.raceDate &&
                    handleSessionClick("race", f1Event.raceDate)
                  }
                >
                  <p className="font-medium">Carrera</p>
                  <p>
                    {formatLocalDateTime(f1Event.raceDate, f1Event.raceTime)}h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : events.length > 0 ? (
        events.map((event, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#272727] p-3 md:p-4 rounded-lg shadow-md mb-4 sm:hover:shadow-lg sm:hover:scale-[1.02] transition-all duration-200 cursor-pointer"
          >
            {/* Vista móvil: flex column */}
            <div className="flex flex-col sm:hidden gap-2">
              <div className="flex items-center gap-2">
                <Image
                  src={event.homeTeam.crest}
                  alt={event.homeTeam.name}
                  width={25}
                  height={25}
                  className="w-6 h-6"
                />
                <span className="text-sm font-medium">
                  {event.homeTeam.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={event.awayTeam.crest}
                  alt={event.awayTeam.name}
                  width={25}
                  height={25}
                  className="w-6 h-6"
                />
                <span className="text-sm font-medium">
                  {event.awayTeam.name}
                </span>
              </div>
            </div>

            {/* Vista desktop: grid */}
            <div className="hidden sm:grid grid-cols-[1fr_40px_80px_40px_1fr] items-center">
              <span className="text-base font-medium text-right mt-2">
                {event.homeTeam.name}
              </span>
              <Image
                src={event.homeTeam.crest}
                alt={event.homeTeam.name}
                width={25}
                height={25}
                className="w-8 h-8 justify-self-end"
              />
              <div className="text-center">vs</div>
              <Image
                src={event.awayTeam.crest}
                alt={event.awayTeam.name}
                width={25}
                height={25}
                className="w-8 h-8 justify-self-start"
              />
              <span className="text-base font-medium text-left mt-2">
                {event.awayTeam.name}
              </span>
            </div>

            {/* Tag con el dia y la hora */}
            <p className="text-gray-500 dark:text-white text-sm md:text-base text-center mt-4">
              {new Date(event.utcDate)
                .toLocaleDateString("es-ES", {
                  weekday: "long",
                  day: "numeric",
                  month: "numeric",
                })
                .replace(",", "")
                .replace(" de", "/")
                .replace(/^\w/, (c) => c.toUpperCase())}{" "}
              -{" "}
              {new Date(event.utcDate).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              h
            </p>
          </div>
        ))
      ) : (
        <p className="text-center text-secondary">
          No hay eventos disponibles.
        </p>
      )}
    </section>
  );
}
