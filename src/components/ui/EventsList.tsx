import React from "react";
import EventsCard from "./eventsCard";

import { getEvents } from "@/lib/server";
import CityNotFound from "./cityNotFound";
import PaginationButtons from "./PaginationButtons";

export default async function EventsList({
  city,
  page,
}: {
  city: string;
  page: number;
}) {
  const { events, totalCount } = await getEvents(city, page);
  const previousPath = page > 1 ? `/events/${city}?page=${page - 1}` : "";
  const nextPath =
    totalCount > 6 * page ? `/events/${city}?page=${page + 1}` : "";
  if (events.length <= 0) return <CityNotFound city={city} />;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mb-10">
        {events.map((event) => (
          <EventsCard key={event.id} event={event} />
        ))}
      </div>
      <PaginationButtons nextPath={nextPath} previousPath={previousPath} />
    </>
  );
}
