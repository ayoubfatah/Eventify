import EventCard from "@/components/ui/EventCard";
import { getEvent } from "@/lib/server-utils";
import { notFound } from "next/navigation";

type EventParams = {
  slug: Promise<string>;
};

export async function generateMetadata({ params }: { params: EventParams }) {
  const param = await params;
  const slug = await param.slug;
  const event = await getEvent(slug);
  if (!event) return null;

  return { title: `${event.name} event` };
}

export default async function Page({ params }: { params: EventParams }) {
  const param = await params;
  const slug = await param.slug;
  const event = await getEvent(slug);

  if (!event) return notFound();

  return (
    <main className="h-[calc(100vh-8rem)] flex justify-center items-center">
      <div className="w-[1100px]">
        <EventCard data={event} />
      </div>
    </main>
  );
}
