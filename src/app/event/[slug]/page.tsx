import EventCard from "@/components/ui/EventCard";
import EventSkeleton from "@/components/ui/eventSkeleton";
import { getEvent } from "@/lib/server-utils";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type EventParams = {
  slug: Promise<string>;
};

export async function generateMetadata({ params }: { params: EventParams }) {
  const param = await params;
  const slug = await param.slug;

  return { title: `${slug.split("-").join(" ")} event` };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return notFound();

  return (
    <main className="h-[calc(100vh-8rem)] flex justify-center items-center">
      <div className="w-[1100px]">
        <Suspense fallback={<EventSkeleton />}>
          <EventCard data={event} />
        </Suspense>
      </div>
    </main>
  );
}
