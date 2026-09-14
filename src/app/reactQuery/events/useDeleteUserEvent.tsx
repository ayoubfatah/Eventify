import { deleteEvent } from "@/lib/server-utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eventQueryKeys } from "./getCurrentUserEvents";
import { Event } from "@/lib/types";
import { toast } from "sonner";

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEvent,
    onMutate: async (eventId: number) => {
      await queryClient.cancelQueries({
        queryKey: eventQueryKeys.currentUser(),
      });

      //   taking a snapshot
      const previousEvents = queryClient.getQueryData<Event[]>(
        eventQueryKeys.currentUser(),
      );

      queryClient.setQueryData<Event[]>(
        eventQueryKeys.currentUser(),
        (events) => events?.filter((event) => event?.id !== eventId) ?? [],
      );

      return {
        previousEvents,
      };
    },
    onError: (_error, _postId, context) => {
      if (context?.previousEvents) {
        queryClient.setQueryData(
          eventQueryKeys.currentUser(),
          context.previousEvents,
        );
      }
    },
    onSettled: () => {
      toast.success("Event Deleted Successfully");
      return queryClient.invalidateQueries({
        queryKey: eventQueryKeys.currentUser(),
      });
    },
  });
}
