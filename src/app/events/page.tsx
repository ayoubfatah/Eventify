"use client";
import H1 from "@/components/ui/h1";
import { Metadata } from "next";
import InfiniteEvents from "../reactQuery/InfiniteEvents";

type Props = {
  params: {
    city: Promise<string>;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const param = await params;
  const city = await param.city;

  return {
    title: city === "all" ? "All the events" : `Events in ${city}`,
  };
}

export async function generateStaticParams() {
  return [{ city: "Seattle" }, { city: "austin" }];
}

export default function EventsPage() {
  return (
    <main className="container mx-auto px-4 py-5 flex flex-col border-white/30 mb-9">
      <H1 className="text-center py-10">All events</H1>

      <InfiniteEvents />
    </main>
  );
}
