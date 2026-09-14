import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  cancelEventRegistration,
  getEventReservation,
  registerForEvent,
} from "@/lib/server-utils";

export const eventQueryKeys = {
  all: ["events"] as const,

  reservation: (eventId: number) => ["events", eventId, "reservation"] as const,
};

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

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: eventQueryKeys.reservation(eventId),
      });
    },
  });
}

export function useCancelEventRegistration(eventId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cancelEventRegistration(eventId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: eventQueryKeys.reservation(eventId),
      });
    },
  });
}
