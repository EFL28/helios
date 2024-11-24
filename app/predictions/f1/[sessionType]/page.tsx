"use client";

import { F1DriversData } from "@/types/f1.types";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function F1Prediction() {
  const params = useParams();
  const [selectedDrivers, setSelectedDrivers] = useState<number[]>([]);
  const [drivers, setDrivers] = useState([] as F1DriversData[]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await fetch("/api/f1/getF1Drivers");
        const data = await res.json();
        setDrivers(data.data);
      } catch (error) {
        console.error("Error al obtener los pilotos:", error);
        return {
          error: "Error al obtener los pilotos",
        };
      } finally {
        setIsLoading(false);
      }
    };
    fetchDrivers();
  }, []);

  const sessionTypeNames = {
    qualifying: "Clasificación",
    race: "Carrera",
    "sprint-qualifying": "Clasificación Sprint",
    "sprint-race": "Carrera Sprint",
  };

  const handlePositionChange = (position: number, driverId: number) => {
    setSelectedDrivers((prev) => {
      const newSelection = [...prev];
      // Si el piloto ya está seleccionado en otra posición, lo removemos
      const existingIndex = newSelection.indexOf(driverId);
      if (existingIndex !== -1) {
        newSelection[existingIndex] = 0;
      }
      // Asignamos el piloto a la nueva posición
      newSelection[position - 1] = driverId;
      return newSelection;
    });
  };

  const handleSubmit = async () => {
    if (selectedDrivers.filter(Boolean).length === 5) {
      console.log("Predicciones:", selectedDrivers);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">
        Predicción para la{" "}
        {sessionTypeNames[
          params.sessionType as keyof typeof sessionTypeNames
        ].toLowerCase()}
      </h1>

      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((position) => (
          <div key={position} className="flex items-center gap-4">
            <div className="font-bold text-xl w-8">#{position}</div>
            {selectedDrivers[position - 1] && (
              <div className="w-12 h-12 relative">
                <Image
                  src={
                    drivers.find(
                      (d) => d.driver_number === selectedDrivers[position - 1]
                    )?.headshot_url || ""
                  }
                  alt="Driver"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </div>
            )}
            <select
              value={selectedDrivers[position - 1] || ""}
              onChange={(e) =>
                handlePositionChange(position, Number(e.target.value))
              }
              className="flex-1 p-2 border rounded-lg bg-inherit"
            >
              <option value="">Selecciona un piloto</option>
              {drivers.map((driver) => (
                <option
                  key={driver.driver_number}
                  value={driver.driver_number}
                  disabled={
                    selectedDrivers.includes(driver.driver_number) &&
                    selectedDrivers[position - 1] !== driver.driver_number
                  }
                  className="text-black"
                >
                  {driver.first_name} {driver.last_name} - {driver.team_name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={selectedDrivers.filter(Boolean).length !== 5}
        className="mt-6 px-4 py-2 bg-secondary text-white rounded-lg disabled:opacity-50 w-full"
      >
        Enviar predicción
      </button>
    </div>
  );
}
