import Results from "@/app/results/page";

export default function Events() {
  return (
    <>
      {/* Pantallas medianas y grandes */}
      <div className="hidden sm:flex container mx-4">
        <main className="mb-4 bg-red-400">
          <section className="mb-4">
            {/* Aquí irá el listado de eventos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Evento 1 */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">
                  La Liga - Real Madrid vs Barcelona
                </h3>
                <p className="text-gray-500">Hora: 16:00</p>
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                  Predecir
                </button>
              </div>
              {/* Agrega más eventos aquí */}
            </div>
          </section>
        </main>
        <Results />
      </div>

      {/* Pantallas pequeñas */}
      <div className="sm:hidden container">
        <h1 className="text-2xl font-bold text-center mt-2 bg-secondary text-white rounded-lg">
          Eventos
        </h1>
        <div className="bg-red-400">
          <h1>Hola</h1>
          <h1>Hola</h1>
          <h1>Hola</h1>
          <h1>Hola</h1>
        </div>
      </div>
    </>
  );
}
