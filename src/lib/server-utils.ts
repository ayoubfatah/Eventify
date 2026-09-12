import { notFound } from "next/navigation";
import type { Event } from "./types";
import { NonNullEvent } from "@/components/ui/EditEventForm";
import { getTokenFromCookies } from "./cookies";

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

export async function getEventsByCityName(city: string): Promise<{
  // city: string,
  // page = 1,
  events: Event[];
  // totalCount: number;
}> {
  const response = await fetch(`${API_URL}/events/city/${city}`);

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

export async function updateEvent(data: NonNullEvent) {
  const token = await getTokenFromCookies();
  const response = await fetch(`${API_URL}/events/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token!,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to update event: ${response.status}`);
  }

  return response.json();
}

export async function reserveEvent(eventId: string) {
  const token = await getTokenFromCookies();

  const response = await fetch(`${API_URL}/registration/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token!,
    },
  });

  return response.json();
}

export async function getCurrentUserEvents() {
  const token = await getTokenFromCookies();

  try {
    const response = await fetch("http://localhost:8080/events/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Couldn't fetch user's events");
    }

    return data.events;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Something went wrong");
  }
}

export async function cancelEvent(eventId: string) {
  const token = await getTokenFromCookies();

  const response = await fetch(`${API_URL}/registration/${eventId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token!,
    },
  });

  return response.json();
}
