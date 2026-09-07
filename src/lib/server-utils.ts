import { notFound } from "next/navigation";
import "server-only";
import type { Event } from "./types";

const API_URL = "http://localhost:8080";

export async function getEvents(): Promise<{
  // city: string,
  // page = 1,
  events: Event[];
  // totalCount: number;
}> {
  const response = await fetch(`${API_URL}/events`);

  const data = await response.json();

  return {
    events: data.events,
  };
}

export async function getEvent(slug: string): Promise<Event> {
  const response = await fetch(`${API_URL}/events/${slug}`);

  if (!response.ok) {
    notFound();
  }

  const { event } = await response.json();

  return event;
}
