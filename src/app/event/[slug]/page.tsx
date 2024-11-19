import EventCard from "@/components/ui/EventCard";
import { getEvent } from "@/lib/server";
import { notFound } from "next/navigation";

type EventPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return null;

  return { title: ` ${event.name} event ` };
}
export default async function page({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) return notFound();

  return (
    <main className="h-[calc(100vh-8rem)]  flex justify-center items-center">
      <div className="w-[1100px]">
        <EventCard data={event} />
      </div>
    </main>
  );
}
