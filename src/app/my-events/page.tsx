import EventsList from "@/components/ui/EventsList";
import H1 from "@/components/ui/h1";
import { getCurrentUserEvents } from "@/lib/server-utils";

export default async function page() {
  const events = await getCurrentUserEvents();

  return (
    <main className="container mx-auto px-4 py-5 flex flex-col  border-white/30 mb-9">
      <H1 className="text-center py-10">All Your events</H1>
      <EventsList events={events as Event[]} />
    </main>
  );
}
