import { div, param, span } from "framer-motion/client";
import { usePathname } from "next/navigation";
import { use } from "react";

interface Event {
  id: number;
  name: string;
  slug: string;
  city?: string;
  location: string;
  organizerName: string;
  imageUrl: string;
  description: string;
}

interface Params {
  city: string;
}

export default async function EventsPage({ params }: { params: Params }) {
  const value = await params;
  const name = value.city.charAt(0).toUpperCase() + value.city.slice(1);

  const res = await fetch(
    "https://bytegrad.com/course-assets/projects/evento/api/events?city=austin",
    {
      next: {
        revalidate: 3600,
      },
    }
  );
  const events = (await res.json()) as Event[];

  return (
    <main className="container mx-auto px-4 py-5 flex flex-col border-b border-white/30">
      <h1 className="text-3xl my-16 lg:text-6xl font-bold text-center">
        {name === "All" ? `${name} Events` : `Events in ${name}`}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
        {events.map((event, i) => (
          <article
            key={i}
            className="w-full bg-white/10 h-[350px] rounded-md overflow-hidden hover:bg-white/15 transition-colors"
          >
            <div
              className="h-[200px] bg-red-800 bg-cover bg-center"
              style={{
                backgroundImage: event.imageUrl
                  ? `url(${event.imageUrl})`
                  : undefined,
              }}
            />
            <div className="h-1/2 flex pt-4 items-center flex-col">
              <h2 className="text-2xl lg:text-3xl font-semibold pt-2">
                {event.name}
              </h2>
              <span className="text-white/70">By {event.organizerName}</span>
              <span className="pt-3 text-white/50">{event.location}</span>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
