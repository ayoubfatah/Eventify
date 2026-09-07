import EventsList from "@/components/ui/EventsList";
import H1 from "@/components/ui/h1";
import { getEvents } from "@/lib/server-utils";
import { Event } from "@/lib/types";
import { Metadata } from "next";

type Props = {
  params: {
    city: Promise<string>;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const param = await params;
  const city = await param.city;

  return {
    title: city === "all" ? `All the events` : `Events in ${city}`,
  };
}
export async function generateStaticParams() {
  // most popular cities
  return [{ city: "Seattle" }, { city: "austin" }];
}

export default async function EventsPage() {
  const { events } = await getEvents();

  return (
    <main className="container mx-auto px-4 py-5 flex flex-col  border-white/30 mb-9">
      <H1 className="text-center py-10">All events</H1>
      <EventsList events={events as Event[]} />
    </main>
  );
}
