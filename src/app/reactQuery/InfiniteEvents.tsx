"use client";

import EventsGridSkeleton from "@/components/ui/eventsCardSekelton";
import EventsList from "@/components/ui/EventsList";
import { Event } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

type EventsResponse = {
  events: Event[];
  page: number;
  limit: number;
  hasMore: boolean;
};

export default function InfiniteEvents() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    error,
    isPending,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<EventsResponse>({
    queryKey: ["events"],

    queryFn: async ({ pageParam }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events?page=${pageParam}&limit=4`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      return response.json();
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore) {
        return undefined;
      }

      return lastPage.page + 1;
    },
  });

  const events = data?.pages.flatMap((page) => page.events) ?? [];
  console.log(events);
  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "300px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isPending) {
    return <EventsGridSkeleton />;
  }

  if (error) {
    return <div>Failed to load events.</div>;
  }

  return (
    <>
      <EventsList actions={false} events={events as Event[]} />

      {isFetchingNextPage && <EventsGridSkeleton />}

      {!hasNextPage && <div className="py-10 text-center">No more events.</div>}

      <div ref={loadMoreRef} className="h-1 opacity-0" aria-hidden="true" />
    </>
  );
}
