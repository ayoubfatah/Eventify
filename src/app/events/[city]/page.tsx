import EventsList from "@/components/ui/EventsList";
import H1 from "@/components/ui/h1";
import { getEventsByCityName } from "@/lib/server-utils";

export default async function page({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const city = (await params).city;

  const { events } = await getEventsByCityName(city);

  return (
    <main className="container mx-auto px-4 py-5 flex flex-col  border-white/30 mb-9">
      {events?.length > 0 && (
        <H1 className="text-center py-10 ">All events in {city} </H1>
      )}
      <EventsList events={events} />
    </main>
  );
}
