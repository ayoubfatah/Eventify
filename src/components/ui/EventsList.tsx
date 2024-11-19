import React from "react";
import EventsCard from "./eventsCard";

import { getEvents } from "@/lib/server";

export default async function EventsList({ city }: { city: string }) {
  const events = await getEvents(city);
  console.log(events);
  if (!events) {
    return (
      <main className="flex flex-shrink  justify-center items-center text-center text-white text-4xl font-bold">
        there are no events in {city}
      </main>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mb-[100px]">
      {events.map((event) => (
        <EventsCard key={event.id} event={event} />
      ))}
    </div>
  );
}
