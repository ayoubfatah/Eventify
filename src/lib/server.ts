import prisma from "./prisma";

export async function getEvents(city: string) {
  // const res = await fetch(
  //   `https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`,
  //   {
  //     next: {
  //       revalidate: 3600,
  //     },
  //   }
  // );

  // const events = (await res?.json()) as EventifyEvent[];

  // return { events, res };
  const events = await prisma.eventifyEvent.findMany({
    where: {
      city:
        city == "all"
          ? undefined
          : city.charAt(0).toUpperCase() + city.slice(1),
    },
  });
  return events;
}

export async function getEvent(slug: string) {
  const event = await prisma.eventifyEvent.findUnique({
    where: { slug: slug },
  });
  return event;
}
