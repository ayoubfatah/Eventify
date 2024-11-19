import { type EventifyEvent } from "@prisma/client";

export async function getEvents(city: string) {
  const res = await fetch(
    `https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  const events = (await res?.json()) as EventifyEvent[];

  return { events, res };
}

export async function getEvent(slug: string) {
  const res = await fetch(
    `https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  const event = (await res.json()) as EventifyEvent;
  return { event, res };
}
