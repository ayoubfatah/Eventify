import React from "react";
import EventsCard from "./eventsCard";
import { EventType } from "@/lib/types";

export default async function EventsList({ city }: { city: string }) {
  const res = await fetch(
    `https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`,
    {}
  );

  if (!res.ok) {
    return (
      <main className="flex flex-shrink  h-[calc(100vh-8rem)] justify-center items-center text-center text-white text-4xl font-bold">
        there are no events in {city}
      </main>
    );
  }
  const events = (await res?.json()) as EventType[];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
      {events.map((event) => (
        <EventsCard key={event.id} event={event} />
      ))}
    </div>
  );
}
