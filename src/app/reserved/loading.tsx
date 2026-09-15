import EventsGridSkeleton from "@/components/ui/eventsCardSekelton";
import H1 from "@/components/ui/h1";
import React from "react";

export default function loading() {
  return (
    <main className="container mx-auto px-4 py-5 flex flex-col border-white/30 mb-9">
      <H1 className="text-center py-10">Your Registered Events</H1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mb-10">
        <EventsGridSkeleton cardsNum={6} />
      </div>
    </main>
  );
}
