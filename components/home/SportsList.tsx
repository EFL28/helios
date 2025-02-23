'use client';

import { useFilterStore } from '@/store/filterStore';
import { useIsLargeScreen } from '@/utils/hooks/useIsLargeScreen';
import { sports } from '@/utils/types/sports.types';

export default function SportsList() {
  const isLargeScreen = useIsLargeScreen();
  const { selectedSport, setSelectedSport, selectedLeague, setSelectedLeague } =
    useFilterStore();

  const handleLeagueSelect = (league: string) => {
    setSelectedLeague(league);
  };

  const toggleSport = (sport: string) => {
    setSelectedSport(sport);
  };

  if (isLargeScreen) {
    // Versión para pantallas grandes (desktop)
    return (
      <div className="flex gap-4 w-1/5">
        <main className="flex-1 bg-secondary text-white p-4 rounded-lg w-60">
          <h1 className="text-2xl font-bold text-center border-b-2 border-white mb-2">
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
                      selectedLeague === league ? 'text-focus' : 'text-white'
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
    );
  }

  // Versión para pantallas pequeñas (mobile)
  return (
    <>
      <div className="overflow-x-auto flex space-x-4 scrollbar-hide sm:mb-2">
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

      {selectedSport && (
        <div className="my-2 text-center bg-secondary text-white rounded-lg overflow-x-auto flex space-x-4 scrollbar-hide">
          {sports
            .find((sport) => sport.name === selectedSport)
            ?.leagues.map((league) => (
              <button
                key={league}
                onClick={() => handleLeagueSelect(league)}
                className={`flex-1 px-4 py-2 whitespace-nowrap transition-colors duration-300 ${
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
