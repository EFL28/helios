import Results from "@/app/results/page";
import Event from "@/ui/event";

interface EventsProps {
  selectedLeague: string | null;
}

export default function Events({ selectedLeague }: EventsProps) {
  return (
    <>
      {/* Pantallas medianas y grandes */}
      <div className="hidden sm:flex container px-4 gap-4">
        <main className="flex-1">
          <h1 className="text-2xl font-bold text-center bg-secondary text-white rounded-lg p-2 mb-4">
            Eventos
          </h1>
          <Event selectedLeague={selectedLeague} />
        </main>
        <aside className="w-1/3">
          <Results />
        </aside>
      </div>

      {/* Pantallas pequeñas */}
      <div className="sm:hidden container">
        <h1 className="text-2xl font-bold text-center mt-2 bg-secondary text-white rounded-lg p-2 mb-4">
          Eventos
        </h1>
        <Event selectedLeague={selectedLeague} />
        <aside className="mt-4">
          <Results />
        </aside>
      </div>
    </>
  );
}
