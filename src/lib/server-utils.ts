"use server";

import { notFound } from "next/navigation";
import type { Event } from "./types";
import { NonNullEvent } from "@/components/ui/EditEventForm";
import { getTokenFromCookies } from "./cookies";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type EventsResponse = {
  events: Event[];
  page: number;
  limit: number;
  hasMore: boolean;
};

// events

export async function getEvents(pageParam: number): Promise<EventsResponse> {
  const response = await fetch(`${API_URL}/events?page=${pageParam}&limit=6`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return response.json();
}

// events by city

export async function getEventsByCityName(
  city: string,
): Promise<{ events: Event[] }> {
  const response = await fetch(`${API_URL}/events/city/${city}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch events by city");
  }

  const data = await response.json();

  return {
    events: data.events,
  };
}

// single event

export async function getEvent(slug: string): Promise<Event> {
  const response = await fetch(`${API_URL}/events/${slug}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    notFound();
  }

  const { event } = await response.json();

  return event;
}

// update event

export async function updateEvent(data: NonNullEvent) {
  const token = await getTokenFromCookies();

  const response = await fetch(`${API_URL}/events/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token!,
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.message || `Failed to update event: ${response.status}`,
    );
  }

  const updatedEvent = await response.json();

  return updatedEvent;
}

// add event

export async function addNewEvent(data: NonNullEvent) {
  const token = await getTokenFromCookies();

  const response = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token!,
    },
    body: JSON.stringify({
      ...data,
      date: new Date(data.date).toISOString(),
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(errorData?.message || "Failed to create event");
  }

  const createdEvent = await response.json();

  return createdEvent;
}

// delete event

export async function deleteEvent(eventId: number) {
  const token = await getTokenFromCookies();

  try {
    const response = await fetch(`${API_URL}/events/${eventId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Couldn't delete the event");
    }

    return data.events;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Something went wrong");
  }
}

// current user events

export async function getCurrentUserEvents(): Promise<Event[]> {
  const token = await getTokenFromCookies();

  try {
    const response = await fetch(`${API_URL}/events/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Couldn't fetch user's events");
    }

    return data.events as Event[];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Something went wrong");
  }
}

// reserve event

export async function reserveEvent(eventId: string) {
  const token = await getTokenFromCookies();

  const response = await fetch(`${API_URL}/registration/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token!,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(errorData?.message || "Failed to reserve event");
  }

  return response.json();
}

// register for event

export async function registerForEvent(eventId: number): Promise<string> {
  const token = await getTokenFromCookies();

  try {
    const response = await fetch(`${API_URL}/registration/${eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Couldn't register for event");
    }

    return data.message;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Something went wrong");
  }
}

// cancel registration

export async function cancelEventRegistration(
  eventId: number,
): Promise<string> {
  const token = await getTokenFromCookies();

  try {
    const response = await fetch(`${API_URL}/registration/${eventId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Couldn't cancel event registration");
    }

    return data.message;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Something went wrong");
  }
}

// event reservation

export async function getEventReservation(eventId: number): Promise<boolean> {
  const token = await getTokenFromCookies();

  try {
    const response = await fetch(`${API_URL}/registration/${eventId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Couldn't check event reservation");
    }

    return data.reserved as boolean;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Something went wrong");
  }
}

// reserved events

export async function getReservedEvents(): Promise<{
  events: Event[];
}> {
  const token = await getTokenFromCookies();

  const response = await fetch(`${API_URL}/events/registration`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token!,
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Couldn't fetch reserved events");
  }

  return {
    events: data.events,
  };
}
