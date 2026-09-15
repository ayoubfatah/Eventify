import EventsCard from "./eventsCard";

import { Event } from "@/lib/types";
import { isPast } from "date-fns";
import CityNotFound from "./cityNotFound";

export default function EventsList({
  events,
  actions = false,
}: {
  events: Event[];
  actions?: boolean;
}) {
  // const previousPath = page > 1 ? `/events/${city}?page=${page - 1}` : "";
  // const nextPath =
  //   totalCount > 6 * page ? `/events/${city}?page=${page + 1}` : "";

  if (!events || events?.length === 0) return <CityNotFound />;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mb-10">
        {events?.map((event) => {
          const isInPast = isPast(event!.date);

          return (
            <EventsCard
              actions={actions}
              isInPast={isInPast}
              key={event?.id}
              event={event}
            />
          );
        })}
      </div>
      {/* <PaginationButtons nextPath={nextPath} previousPath={previousPath} /> */}
    </>
  );
}
