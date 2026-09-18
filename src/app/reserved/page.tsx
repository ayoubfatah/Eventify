"use client";

import EventsCard from "@/components/ui/eventsCard";
import H1 from "@/components/ui/h1";

import { isPast } from "date-fns";
import Link from "next/link";
import { useReservedEvents } from "../reactQuery/events/useEventReservation";

export default function ReservedPage() {
  const { data, isLoading, isError } = useReservedEvents();

  if (isLoading) {
    return <div>Loading your events...</div>;
  }

  if (isError) {
    return <div>Failed to load your events.</div>;
  }

  const events = data?.events;

  if (!events || events.length === 0) {
    return (
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16 xl:mt-20">
          <div className="mx-auto max-w-screen-sm text-center">
            <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
              You haven’t registered for any events yet
            </p>

            <p className="mb-6 text-lg font-light text-gray-500 dark:text-gray-400">
              Explore upcoming events and find something you’d like to join.
            </p>

            <Link
              href="/events"
              className="inline-block border border-primary px-8 py-4 transition-all duration-200 ease-linear hover:bg-primary"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <main className="container mx-auto mb-9 flex flex-col border-white/30 px-4 py-5">
      <H1 className="py-10 text-center">Your Registered Events</H1>

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {events.map((event) => {
          const isInPast = isPast(event!.date);

          return (
            <EventsCard key={event?.id} event={event} isInPast={isInPast} />
          );
        })}
      </div>
    </main>
  );
}
