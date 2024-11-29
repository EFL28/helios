"use client";

import { QuinielaPartido } from "@/types/quiniela.types";
import QuinielaSkeleton from "@/ui/skeletons/QuinielaSkeleton";
import { useEffect, useState } from "react";

export default function Quiniela() {
  const [isLoading, setIsLoading] = useState(true);
  const [partidos, setPartidos] = useState<QuinielaPartido[]>([]);
  const [jornada, setJornada] = useState<string | null>(null);
  const [predicciones, setPredicciones] = useState<{
    [key: number]: { local?: string; visitante?: string } | string;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const endpoint = "/api/quiniela";

        const res = await fetch(endpoint);
        const data = await res.json();

        const partidos: QuinielaPartido[] = data.data.partidos;
        const jornada: string = data.data.jornada;

        setPartidos(partidos);
        setJornada(jornada);
      } catch (error) {
        console.error("Error al cargar los eventos", error);
        setPartidos([]);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <QuinielaSkeleton />;
  }

  const handlePrediccion = (index: number, valor: string) => {
    setPredicciones((prev) => ({
      ...prev,
      [index]: valor,
    }));
  };

  const handlePrediccionGoles = (
    index: number,
    equipo: "local" | "visitante",
    valor: string
  ) => {
    setPredicciones((prev) => ({
      ...prev,
      [index]: {
        ...(typeof prev[index] === "object" ? prev[index] : {}),
        [equipo]: valor,
      },
    }));
  };

  const renderPrediccionNormal = (index: number) => (
    <div className="flex gap-2 justify-center min-w-[120px]">
      {["1", "X", "2"].map((opcion) => (
        <button
          key={opcion}
          onClick={() => handlePrediccion(index, opcion)}
          className={`w-8 h-8 rounded-full border ${
            predicciones[index] === opcion
              ? "bg-secondary text-white"
              : "bg-foreground-50 hover:bg-secondary"
          }`}
        >
          {opcion}
        </button>
      ))}
    </div>
  );

  const renderPrediccionGoles = (index: number, partido: QuinielaPartido) => {
    const prediccion =
      (predicciones[index] as { local?: string; visitante?: string }) || {};

    return (
      <div className="flex flex-col items-center w-full gap-2">
        <div className="flex justify-center gap-8 w-full">
          <span className="text-center">{partido.local}</span>
          <span className="text-center">{partido.visitante}</span>
        </div>
        <div className="flex justify-center gap-4">
          <div className="flex gap-1">
            {["0", "1", "2", "M"].map((gol) => (
              <button
                key={`local-${gol}`}
                onClick={() => handlePrediccionGoles(index, "local", gol)}
                className={`w-8 h-8 rounded-full border ${
                  prediccion.local === gol
                    ? "bg-secondary text-white"
                    : "bg-foreground-50 hover:bg-secondary"
                }`}
              >
                {gol}
              </button>
            ))}
          </div>
          <div className="border-l border-gray-300 mx-1"></div>
          <div className="flex gap-1">
            {["0", "1", "2", "M"].map((gol) => (
              <button
                key={`visitante-${gol}`}
                onClick={() => handlePrediccionGoles(index, "visitante", gol)}
                className={`w-8 h-8 rounded-full border ${
                  prediccion.visitante === gol
                    ? "bg-secondary text-white"
                    : "bg-foreground-50 hover:bg-secondary"
                }`}
              >
                {gol}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold text-center mb-2">Quiniela</h1>
      <h2 className="text-xl text-center mb-8">Jornada {jornada}</h2>

      <div className="grid gap-4">
        {partidos.map((partido, index) => (
          <div
            key={index}
            className="bg-primary rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
          >
            {index < 14 ? (
              <div className="flex items-center justify-between">
                <div className="w-1/3 text-right pr-4">{partido.local}</div>
                <div className="flex justify-center">
                  {renderPrediccionNormal(index)}
                </div>
                <div className="w-1/3 text-left pl-4">{partido.visitante}</div>
              </div>
            ) : (
              renderPrediccionGoles(index, partido)
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary/90 transition-colors"
          onClick={() => console.log(predicciones)}
        >
          Guardar Quiniela
        </button>
      </div>
    </div>
  );
}
