import Event from "@/components/ui/Event";
import { type EventType } from "@/lib/types";

type EventPageProps = {
  params: {
    slug: string;
  };
};
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
  console.log(data);
  return (
    <main className="h-[calc(100vh-8rem)]  flex justify-center items-center">
      <Event data={data} />
    </main>
  );
}
