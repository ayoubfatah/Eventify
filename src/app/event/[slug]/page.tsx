import EventCard from "@/components/ui/EventCard";
import { type EventType } from "@/lib/types";
import { title } from "process";

type EventPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: EventPageProps) {
  const { slug } = await params;

  const res = await fetch(
    `https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );
  const data = (await res.json()) as EventType;
  return { title: ` ${data.name} event ` };
}
export default async function page({ params }: EventPageProps) {
  const { slug } = await params;

  const res = await fetch(
    `https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );
  if (!res.ok) return <div>something happened</div>;
  const data = (await res.json()) as EventType;

  return (
    <main className="h-[calc(100vh-8rem)]  flex justify-center items-center">
      <div className="w-[1100px]">
        <EventCard data={data} />
      </div>
    </main>
  );
}
