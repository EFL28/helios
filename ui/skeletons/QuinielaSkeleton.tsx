export default function QuinielaSkeleton() {
  return (
    <div className="container mx-auto px-4 py-4 animate-pulse">
      {/* Encabezado */}
      <div className="text-center mb-8">
        <div className="h-8 bg-gray-200 w-48 mx-auto rounded mb-2"></div>
        <div className="h-6 bg-gray-200 w-32 mx-auto rounded"></div>
      </div>

      {/* Grid de partidos */}
      <div className="grid gap-4">
        {/* Primeros 14 partidos normales */}
        {[...Array(14)].map((_, index) => (
          <div
            key={index}
            className="bg-primary rounded-lg shadow p-4"
          >
            <div className="flex items-center justify-between">
              {/* Equipo Local */}
              <div className="w-1/3 text-right pr-4">
                <div className="h-4 bg-gray-200 w-24 ml-auto rounded"></div>
              </div>
              
              {/* Botones 1-X-2 */}
              <div className="flex gap-2 justify-center min-w-[120px]">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gray-200"
                  ></div>
                ))}
              </div>

              {/* Equipo Visitante */}
              <div className="w-1/3 text-left pl-4">
                <div className="h-4 bg-gray-200 w-24 rounded"></div>
              </div>
            </div>
          </div>
        ))}

        {/* Partido de goles (pleno al 15) */}
        <div className="bg-primary rounded-lg shadow p-4">
          <div className="flex flex-col items-center w-full gap-2">
            {/* Nombres de equipos */}
            <div className="flex justify-center gap-8 w-full">
              <div className="h-4 bg-gray-200 w-24 rounded"></div>
              <div className="h-4 bg-gray-200 w-24 rounded"></div>
            </div>
            {/* Botones de goles */}
            <div className="flex justify-center gap-4">
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div key={`local-${i}`} className="w-8 h-8 rounded-full bg-gray-200"></div>
                ))}
              </div>
              <div className="border-l border-gray-300 mx-1"></div>
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div key={`visitante-${i}`} className="w-8 h-8 rounded-full bg-gray-200"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botón de guardar */}
      <div className="mt-8 flex justify-center">
        <div className="h-10 bg-gray-200 w-32 rounded-lg"></div>
      </div>
    </div>
  );
}
