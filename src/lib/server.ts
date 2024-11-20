import { notFound } from "next/navigation";
import prisma from "./prisma";
import { cacheLife } from "next/dist/server/use-cache/cache-life";

export async function getEvents(city: string, page = 1) {
  "use cache";
  cacheLife("hours");
  const events = await prisma.eventifyEvent.findMany({
    where: {
      city:
        city == "all"
          ? undefined
          : city.charAt(0).toUpperCase() + city.slice(1),
    },
    orderBy: {
      date: "asc",
    },
    take: 9,
    skip: (page - 1) * 6,
  });
  let totalCount;
  if (city === "all") {
    totalCount = await prisma.eventifyEvent.count();
  } else {
    totalCount = await prisma.eventifyEvent.count({
      where: { city: city.charAt(0).toUpperCase() + city.slice(1) },
    });
  }

  if (!events) {
    notFound();
  }
  return { events, totalCount };
}

export async function getEvent(slug: string) {
  "use cache";
  cacheLife("hours");
  const event = await prisma.eventifyEvent.findUnique({
    where: { slug: slug },
  });
  return event;
}
