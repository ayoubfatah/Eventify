import EventsGridSkeleton from "@/components/ui/eventsCardSekelton";
import EventsList from "@/components/ui/EventsList";
import H1 from "@/components/ui/h1";
import { Metadata } from "next";
import { Suspense } from "react";

type Props = {
  params: {
    city: string;
  };
};

type EventPageProps = Props & {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;

  return {
    title: city === "all" ? `All the events` : `Events in ${city}`,
  };
}
export default async function EventsPage({
  params,
  searchParams,
}: EventPageProps) {
  const value = await params;
  const page = (await searchParams.page) ?? 1;

  const name = value.city.charAt(0).toUpperCase() + value.city.slice(1);
  return (
    <main className="container mx-auto px-4 py-5 flex flex-col  border-white/30 mb-9">
      <H1 className="text-center py-10">
        {name === "All" ? `${name} Events` : `Events in ${name}`}
      </H1>
      <Suspense fallback={<EventsGridSkeleton />}>
        <EventsList page={+page} city={value.city} />
      </Suspense>
    </main>
  );
}
