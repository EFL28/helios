import { Match } from "@/types/LALIGA_matches.types";
import Image from "next/image";
import { useEffect, useState } from "react";
import EventSkeleton from "./skeletons/EventSkeleton";

export default function Event() {
  const [events, setEvents] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/fixtures/getLaLigaFixtures");
        const data = await res.json();
        if (data && Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error("Error al cargar los eventos", data);
        }
      } catch (error) {
        console.error("Error al cargar los eventos", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <EventSkeleton />;
  }

  return (
    <section className="mb-4 max-w-full">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">
        Partidos de esta semana
      </h2>

      {events.length > 0 ? (
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
          No hay partidos esta semana.
        </p>
      )}
    </section>
  );
}
