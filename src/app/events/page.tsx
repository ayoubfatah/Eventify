import H1 from "@/components/ui/h1";
import InfiniteEvents from "../reactQuery/InfiniteEvents";

export default function EventsPage() {
  return (
    <main className="container mx-auto px-4 py-5 flex flex-col border-white/30 mb-9">
      <H1 className="text-center py-10">All events</H1>

      <InfiniteEvents />
    </main>
  );
}
