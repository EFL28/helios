import EventTeamsData from '@/components/ui/matchWidget/EventTeamsData';
import { MatchSchedule } from '@/components/ui/matchWidget/MatchSchedule';
import { ParsedEvent } from '@/utils/sofascore/types/parsedEvents.types';

interface MatchWidgetProps {
  event: ParsedEvent;
  isLive?: boolean;
  isFinished?: boolean;
}

export default function MatchWidget({
  event,
  isLive,
  isFinished,
}: MatchWidgetProps) {
  return (
    <div
      key={event.id}
      className="bg-white dark:bg-[#272727] mb-4 p-3 md:p-4 rounded-lg shadow-md cursor-pointer transition-all duration-200 sm:hover:shadow-lg sm:hover:scale-[1.02] active:scale-[0.98] sm:active:scale-100 flex flex-row sm:flex-col items-center"
    >
      {isLive && (
        <div className="absolute top-2 right-2 flex items-center mr-4">
          <span className="mr-1 text-sm font-semibold">Live</span>
          <div className="bg-red-600 h-4 w-4 rounded-full animate-pulse"></div>
        </div>
      )}
      <EventTeamsData event={event} showScore={isFinished} />
      <div className="mt-4 ml-auto sm:ml-0 sm:mt-4">
        <MatchSchedule
          date={new Date(event.startTimestamp * 1000).toISOString()}
        />
      </div>
    </div>
  );
}
