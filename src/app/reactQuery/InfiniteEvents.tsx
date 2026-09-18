"use client";

import EventsGridSkeleton from "@/components/ui/eventsCardSekelton";
import EventsList from "@/components/ui/EventsList";
import { getEvents } from "@/lib/server-utils";
import { Event } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useEffect, useRef } from "react";

type EventsResponse = {
  events: Event[];
  page: number;
  limit: number;
  hasMore: boolean;
};

export default function InfiniteEvents() {
  const router = useRouter();

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
    refetchOnMount: "always",

    queryFn: async ({ pageParam }) => {
      return getEvents(pageParam as number);
    },
    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore) {
        return undefined;
      }

      return lastPage.page + 1;
    },
  });

  useEffect(() => {
    router.refresh();
  }, [router]);

  const events = data?.pages.flatMap((page) => page.events) ?? [];

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

      <div ref={loadMoreRef} className="h-1 opacity-0" aria-hidden="true" />
    </>
  );
}
