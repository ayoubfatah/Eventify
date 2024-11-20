import EventsGridSkeleton from "@/components/ui/eventsCardSekelton";
import EventsList from "@/components/ui/EventsList";
import H1 from "@/components/ui/h1";
import { Metadata } from "next";
import { Suspense } from "react";
import { z } from "zod";

type Props = {
  params: {
    city: Promise<string>;
  };
};

type EventPageProps = Props & {
  searchParams: { [key: string]: string | string[] | undefined };
};

const pageNumberSchema = z.coerce.number().int().positive().optional();

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

export default async function EventsPage({
  params,
  searchParams,
}: EventPageProps) {
  const param = await params;
  const city = await param.city;
  const searchParam = await searchParams;
  const parsedPage = pageNumberSchema.safeParse(searchParam.page);
  if (!parsedPage.success) {
    throw new Error("invalid page number");
  }

  const name = city.charAt(0).toUpperCase() + city.slice(1);
  return (
    <main className="container mx-auto px-4 py-5 flex flex-col  border-white/30 mb-9">
      <H1 className="text-center py-10">
        {name === "All" ? `${name} Events` : `Events in ${name}`}
      </H1>
      <Suspense key={city + parsedPage.data} fallback={<EventsGridSkeleton />}>
        <EventsList page={parsedPage.data || 1} city={city} />
      </Suspense>
    </main>
  );
}
