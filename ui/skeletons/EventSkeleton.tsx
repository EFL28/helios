export default function EventSkeleton() {
  return (
    <section className="mb-4 max-w-full">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">
        Eventos de esta semana
      </h2>
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="bg-white p-3 md:p-4 rounded-lg shadow-md mb-4 animate-pulse"
        >
          {/* Vista móvil skeleton */}
          <div className="flex flex-col sm:hidden gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>

          {/* Vista desktop skeleton */}
          <div className="hidden sm:grid grid-cols-[1fr_40px_80px_40px_1fr] items-center">
            <div className="h-4 bg-gray-200 rounded w-32 justify-self-end"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-full justify-self-end"></div>
            <div className="text-center w-8 h-4 bg-gray-200 rounded mx-auto"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-full justify-self-start"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>

          {/* Fecha skeleton */}
          <div className="mt-4 flex justify-center">
            <div className="h-4 bg-gray-200 rounded w-40"></div>
          </div>
        </div>
      ))}
    </section>
  );
} 