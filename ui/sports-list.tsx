import Events from "@/ui/events";
import React from "react";

const sports = [
  {
    name: "Fútbol",
    leagues: ["La Liga", "Premier League", "Bundesliga", "Serie A", "Ligue 1"],
  },
  {
    name: "Baloncesto",
    leagues: ["NBA", "Euroliga"],
  },
  {
    name: "Tenis",
    leagues: [
      "Abierto de Australia",
      "Roland Garros",
      "Wimbledon",
      "Abierto de Estados Unidos",
    ],
  },
  {
    name: "Motor",
    leagues: ["MotoGP", "Fórmula 1"],
  },
  {
    name: "Ciclismo",
    leagues: ["Giro de Italia", "Tour de Francia", "Vuelta a España"],
  },
];

export default function SportsList() {
  const [selectedSport, setSelectedSport] = React.useState<string | null>(null);

  const toggleSport = (sport: string) => {
    setSelectedSport(selectedSport === sport ? null : sport);
  };

  return (
    <div className="mx-4 mt-4 sm:mx-8 md:mx-8 lg:mx-12 xl:mx-12">
      {/* Pantallas pequeñas */}
      <div className="sm:hidden overflow-x-auto flex space-x-4 scrollbar-hide">
        {sports.map((sport) => (
          <button
            key={sport.name}
            onClick={() => toggleSport(sport.name)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors duration-300 
              ${
                selectedSport === sport.name
                  ? "bg-focus text-secondary"
                  : "bg-secondary text-white"
              }`}
          >
            {sport.name}
          </button>
        ))}
      </div>

      {/* Mostrar ligas del deporte seleccionado en pantallas pequeñas */}
      {selectedSport && (
        <div className="sm:hidden mt-2 text-center bg-secondary text-white rounded-lg">
          <ul>
            {sports
              .find((sport) => sport.name === selectedSport)
              ?.leagues.map((league) => (
                <li className="p-2" key={league}>
                  {league}
                </li>
              ))}
          </ul>
        </div>
      )}

      <div className="sm:hidden">
        <Events />
      </div>

      {/* Pantallas medianas y grandes */}
      <div className="hidden sm:flex">
        <div className="rounded-lg bg-secondary text-white p-4">
          <h2 className="text-2xl font-bold mb-2 text-center border-b-2 border-white hidden sm:block">
            Deportes
          </h2>
          {sports.map((sport) => (
            <div key={sport.name}>
              <h3 className="text-lg font-semibold">{sport.name}</h3>
              <ul>
                {sport.leagues.map((league) => (
                  <li key={league}>{league}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Events />
      </div>
    </div>
  );
}
