"use client";

import EventsCard from "@/components/ui/eventsCard";
import EventsGridSkeleton from "@/components/ui/eventsCardSekelton";
import H1 from "@/components/ui/h1";
import { isPast } from "date-fns";
import Link from "next/link";
import { useGetCurrentUserEvents } from "../reactQuery/events/getCurrentUserEvents";
import { useDeleteEvent } from "../reactQuery/events/useDeleteUserEvent";

export default function MyEvents() {
  const { events, isLoading, isError } = useGetCurrentUserEvents();
  const deleteEvent = useDeleteEvent();

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-5 flex flex-col border-white/30 mb-9">
        <H1 className="text-center py-10">All Your events</H1>
        <EventsGridSkeleton cardsNum={6} />
      </main>
    );
  }

  if (!events || events?.length === 0) {
    return (
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16 xl:mt-20">
          <div className="mx-auto max-w-screen-sm text-center">
            <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
              You haven’t created any events yet
            </p>

            <p className="mb-6 text-lg font-light text-gray-500 dark:text-gray-400">
              Create your first event and start sharing it with others.
            </p>

            <Link
              href="/add-event"
              className="inline-block border border-primary px-8 py-4 transition-all duration-200 ease-linear hover:bg-primary"
            >
              Create Your First Event
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <main className="container mx-auto px-4 py-5 flex flex-col border-white/30 mb-9">
      <H1 className="text-center py-10">All Your events</H1>

      {isError && <p className="text-red-500 mb-4">{isError}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mb-10">
        {events?.map((event) => {
          const isInPast = isPast(event!.date);

          return (
            <EventsCard
              actions={true}
              isInPast={isInPast}
              key={event?.id}
              event={event}
              onDelete={() => deleteEvent.mutate(event?.id as number)}
            />
          );
        })}
      </div>
    </main>
  );
}
