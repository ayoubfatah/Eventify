import { getCurrentUserEvents } from "@/lib/server-utils";
import { Event } from "@/lib/types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

// Query key factory (best practice)
export const eventQueryKeys = {
  all: ["events"] as const,
  currentUser: () => [...eventQueryKeys.all, "me"] as const,
};

export function useGetCurrentUserEvents(
  options?: Omit<UseQueryOptions<Event[], Error>, "queryKey" | "queryFn">,
) {
  const { isError, data, isLoading } = useQuery<Event[]>({
    queryKey: eventQueryKeys.currentUser(),
    queryFn: getCurrentUserEvents,
    staleTime: 0,
    gcTime: 0,
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options,
  });

  return { isError, events: data, isLoading };
}
