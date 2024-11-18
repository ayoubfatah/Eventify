import EventsCard from "@/components/ui/eventsCard";
import EventsGridSkeleton from "@/components/ui/eventsCardSekelton";
import EventsList from "@/components/ui/EventsList";
import H1 from "@/components/ui/h1";
import { type EventType } from "@/lib/types";
import { Suspense } from "react";
interface Params {
  city: string;
}
export async function generateMetadata({ params }: { params: Params }) {
  const { city } = await params;

  return {
    title: ` ${city === "all" ? `All the events` : `Events in ${city}`}  `,
  };
}
export default async function EventsPage({ params }: { params: Params }) {
  const value = await params;
  const name = value.city.charAt(0).toUpperCase() + value.city.slice(1);
  return (
    <main className="container mx-auto px-4 py-5 flex flex-col border-b border-white/30">
      <H1 className="text-center py-10">
        {name === "All" ? `${name} Events` : `Events in ${name}`}
      </H1>
      <Suspense fallback={<EventsGridSkeleton />}>
        <EventsList city={value.city} />
      </Suspense>
    </main>
  );
}
