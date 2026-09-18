import EventsCard from "@/components/ui/eventsCard";
import H1 from "@/components/ui/h1";
import { getReservedEvents } from "@/lib/server-utils";
import { isPast } from "date-fns";
import Link from "next/link";

export default async function page() {
  const { events } = await getReservedEvents();

  if (!events || events?.length === 0) {
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
    <main className="container mx-auto px-4 py-5 flex flex-col border-white/30 mb-9">
      <H1 className="text-center py-10">Your Registered Events</H1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mb-10">
        {events?.map((event) => {
          const isInPast = isPast(event!.date);
          return (
            <EventsCard isInPast={isInPast} key={event?.id} event={event} />
          );
        })}
      </div>
    </main>
  );
}
