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
  const response = await fetch(`${API_URL}/events?page=2&limit=4`);

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

export async function getCurrentUserEvents(): Promise<Event[]> {
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

    return data.events as Event[];
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

// add event

export async function addNewEvent(data: NonNullEvent) {
  const token = await getTokenFromCookies();

  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token!,
    },

    body: JSON.stringify({
      ...data,
      date: new Date(data.date).toISOString(),
    }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to create event");
  }
  const createdEvent = await response.json();

  return createdEvent;
}

export async function deleteEvent(eventId: number) {
  const token = await getTokenFromCookies();

  try {
    const response = await fetch(`${API_URL}/events/${eventId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
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

//  reservation

export async function registerForEvent(eventId: number): Promise<string> {
  const token = await getTokenFromCookies();

  try {
    const response = await fetch(
      `http://localhost:8080/registration/${eventId}`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        },
      },
    );

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

export async function cancelEventRegistration(
  eventId: number,
): Promise<string> {
  const token = await getTokenFromCookies();

  try {
    const response = await fetch(
      `http://localhost:8080/registration/${eventId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        },
      },
    );

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

export async function getEventReservation(eventId: number): Promise<boolean> {
  const token = await getTokenFromCookies();

  try {
    const response = await fetch(
      `http://localhost:8080/registration/${eventId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        },
      },
    );

    const data = await response.json();
    console.log(data, "Data");
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

  return {
    events: data.events,
  };
}
