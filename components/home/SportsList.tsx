'use client';

import { sports } from '@/utils/types/sports.types';
import React from 'react';

export default function SportsList() {
  const [selectedSport, setSelectedSport] = React.useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = React.useState<string | null>(
    null,
  );

  const handleLeagueSelect = (league: string) => {
    setSelectedLeague(selectedLeague === league ? null : league);
  };

  const toggleSport = (sport: string) => {
    setSelectedSport(selectedSport === sport ? null : sport);
  };

  return (
    <>
      {/* Bloque para pantallas medianas y grandes */}
      <div className="hidden lg:flex gap-4 w-1/5">
        <main className="flex-1 bg-secondary text-white p-4 rounded-lg w-60">
          <h1 className="text-2xl font-bold text-center bg-secondary text-white border-b-2 border-white mb-2">
            Deportes
          </h1>
          {sports.map((sport) => (
            <div key={sport.name}>
              <h3 className="text-lg font-semibold">{sport.name}</h3>
              <ul>
                {sport.leagues.map((league) => (
                  <li
                    key={league}
                    onClick={() => handleLeagueSelect(league)}
                    className={`py-1 cursor-pointer hover:text-focus transition-colors duration-300 ${
                      selectedLeague === league ? 'text-focus' : ''
                    }`}
                  >
                    {league}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </main>
      </div>

      {/* Bloque para pantallas pequeñas */}
      <div className="lg:hidden overflow-x-auto flex space-x-4 scrollbar-hide ">
        {sports.map((sport) => (
          <button
            key={sport.name}
            onClick={() => toggleSport(sport.name)}
            className={`flex-1 px-4 py-2 rounded-lg whitespace-nowrap transition-colors duration-300 ${
              selectedSport === sport.name
                ? 'bg-focus text-secondary'
                : 'bg-secondary text-white'
            }`}
          >
            {sport.name}
          </button>
        ))}
      </div>

      {/* Mostrar ligas del deporte seleccionado en pantallas pequeñas */}
      {selectedSport && (
        <div className="lg:hidden my-2 text-center bg-secondary text-white rounded-lg overflow-x-auto flex space-x-4 scrollbar-hide">
          {sports
            .find((sport) => sport.name === selectedSport)
            ?.leagues.map((league) => (
              <button
                key={league}
                onClick={() => handleLeagueSelect(league)}
                className={`flex-1 px-4 py-2 whitespace-nowrap transition-colors duration-300 
                  ${
                    selectedLeague === league ? 'bg-focus text-secondary' : ''
                  }`}
              >
                {league}
              </button>
            ))}
        </div>
      )}
    </>
  );
}
