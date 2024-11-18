import EventsCard from "@/components/eventsCard";
import H1 from "@/components/ui/h1";
import { type EventType } from "@/lib/types";

interface Params {
  city: string;
}

export default async function EventsPage({ params }: { params: Params }) {
  const value = await params;
  const name = value.city.charAt(0).toUpperCase() + value.city.slice(1);

  const res = await fetch(
    `https://bytegrad.com/course-assets/projects/evento/api/events?city=${value.city}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!res.ok) {
    return (
      <main className="flex flex-shrink  h-[calc(100vh-8rem)] justify-center items-center text-center text-white text-4xl font-bold">
        there are no events in {value.city}
      </main>
    );
  }
  const events = (await res?.json()) as EventType[];

  return (
    <main className="container mx-auto px-4 py-5 flex flex-col border-b border-white/30">
      <H1 className="text-center py-10">
        {name === "All" ? `${name} Events` : `Events in ${name}`}
      </H1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
        {events.map((event) => (
          <EventsCard key={event.id} event={event} />
        ))}
      </div>
    </main>
  );
}
