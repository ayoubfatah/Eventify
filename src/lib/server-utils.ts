import { notFound } from "next/navigation";
import type { Event } from "./types";
import { NonNullEvent } from "@/components/ui/EditEventForm";

const API_URL = "http://localhost:8080";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNzc0BnbWFpbC5jb20iLCJleHAiOjE3ODg2ODYxNjQsInVzZXJJZCI6MX0.c8YCfo7_xggj8PVllE2QfReImjwO0KrxUPMO5OQv1VweyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNzc0BnbWFpbC5jb20iLCJleHAiOjE3ODg2ODYxNjQsInVzZXJJZCI6MX0.c8YCfo7_xggj8PVllE2QfReImjwO0KrxUPMO5OQv1Vw";
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
  const response = await fetch(`${API_URL}/events/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: TOKEN,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to update event: ${response.status}`);
  }

  return response.json();
}

export async function reserveEvent(eventId: string) {
  const response = await fetch(`${API_URL}/registration/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: TOKEN,
    },
  });
  console.log(response);

  return response.json();
}

export async function cancelEvent(eventId: string) {
  const response = await fetch(`${API_URL}/registration/${eventId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: TOKEN,
    },
  });
  console.log(response);
  return response.json();
}


