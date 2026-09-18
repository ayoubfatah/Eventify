import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  cancelEventRegistration,
  getEventReservation,
  getReservedEvents,
  registerForEvent,
} from "@/lib/server-utils";

export const eventQueryKeys = {
  all: ["events"] as const,

  reserved: () => ["events", "reserved"] as const,

  reservation: (eventId: number) => ["events", eventId, "reservation"] as const,
};

export function useReservedEvents() {
  return useQuery({
    queryKey: eventQueryKeys.reserved(),
    queryFn: getReservedEvents,
  });
}

export function useEventReservation(eventId: number) {
  return useQuery({
    queryKey: eventQueryKeys.reservation(eventId),
    queryFn: () => getEventReservation(eventId),
  });
}

export function useRegisterForEvent(eventId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => registerForEvent(eventId),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: eventQueryKeys.reservation(eventId),
        }),

        queryClient.invalidateQueries({
          queryKey: eventQueryKeys.reserved(),
        }),
      ]);
    },
  });
}

export function useCancelEventRegistration(eventId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cancelEventRegistration(eventId),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: eventQueryKeys.reservation(eventId),
        }),

        queryClient.invalidateQueries({
          queryKey: eventQueryKeys.reserved(),
        }),
      ]);
    },
  });
}
