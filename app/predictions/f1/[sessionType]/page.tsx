"use client";

import { F1DriversData } from "@/types/f1.types";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function F1Prediction() {
  const params = useParams();
  const [selectedDrivers, setSelectedDrivers] = useState<number[]>([]);
  const [drivers, setDrivers] = useState([] as F1DriversData[]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/f1/getF1Drivers");
        const data = await res.json();
        const d = data.data;

        setDrivers(d);
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

  const handleDriverSelect = (driverId: number) => {
    if (selectedDrivers.includes(driverId)) {
      setSelectedDrivers(selectedDrivers.filter((id) => id !== driverId));
    } else if (selectedDrivers.length < 5) {
      setSelectedDrivers([...selectedDrivers, driverId]);
    }
  };

  const handleSubmit = async () => {
    if (selectedDrivers.length === 5) {
      // Aquí iría la lógica para enviar las predicciones
      console.log("Predicciones:", selectedDrivers);
    }
  };

  console.log("Drivers:", drivers);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Predicción para la{" "}
        {sessionTypeNames[
          params.sessionType as keyof typeof sessionTypeNames
        ].toLowerCase()}
      </h1>

      <p className="mb-4">Selecciona el Top 5 en orden:</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {drivers.map((driver, index) => (
          <div
            key={index}
            onClick={() => handleDriverSelect(driver.driver_number)}
            className={`p-4 border rounded cursor-pointer ${
              selectedDrivers.includes(driver.driver_number)
                ? "bg-primary text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-4">
              <Image
                src={driver.headshot_url}
                alt={`${driver.first_name} ${driver.last_name}`}
                width={60}
                height={60}
                unoptimized
              />
              <div>
                <p className="font-medium">
                  {driver.first_name} {driver.last_name}
                </p>
                <p className="text-sm">{driver.team_name}</p>
                {selectedDrivers.includes(driver.driver_number) && (
                  <span className="text-sm">
                    Posición: {selectedDrivers.indexOf(index) + 1}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={selectedDrivers.length !== 5}
        className="mt-4 px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
      >
        Enviar predicción
      </button>
    </div>
  );
}
