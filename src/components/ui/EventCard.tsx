"use client";

import { updateEvent } from "@/lib/server-utils";

import { Event } from "@/lib/types";
import { cn } from "@/utils/helpers";
import { Clock, Edit, MapPin, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { useDeleteEvent } from "@/app/reactQuery/events/useDeleteUserEvent";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DeleteConfirmModal from "./DeleteConfirmModal";
import EditEventForm, { NonNullEvent } from "./EditEventForm";
import EventSkeleton from "./eventSkeleton";

import {
  useCancelEventRegistration,
  useEventReservation,
  useRegisterForEvent,
} from "@/app/reactQuery/events/useEventReservation";
import { isPast } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";

interface EventCardProps {
  data: Event;
}

export default function EventCard({ data }: EventCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [eventData, setEventData] = useState(data);

  const { user, isLoading } = useAuth();
  const router = useRouter();

  const deleteEvent = useDeleteEvent();

  const reservationQuery = useEventReservation(eventData?.id as number);
  const registerMutation = useRegisterForEvent(eventData?.id as number);
  const cancelMutation = useCancelEventRegistration(eventData?.id as number);
  const queryClient = useQueryClient();

  const isInPast = isPast(eventData!.date);

  const isReserved = reservationQuery.data ?? false;

  const isReservationLoading =
    reservationQuery.isLoading ||
    registerMutation.isPending ||
    cancelMutation.isPending;

  const handleSaveEdit = async (updatedData: NonNullEvent) => {
    try {
      const result = await updateEvent(updatedData);

      toast.success("Event edited successfully!");
      queryClient.invalidateQueries({ queryKey: ["events"] });

      setEventData(result.event);

      setTimeout(() => {
        setIsEditOpen(false);
      }, 0);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReservation = () => {
    if (isReserved) {
      cancelMutation.mutate(undefined, {
        onSuccess: () => {
          if (!user) {
            toast.success("You need to be logged in to reserver this event");
          } else {
            toast.success("Reservation cancelled");
          }
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });

      return;
    }

    registerMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Event reserved successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const isOwner = eventData?.userId === user?.id;

  if (isLoading) {
    return <EventSkeleton />;
  }

  return (
    <>
      <article
        className={cn(
          "relative w-full min-h-screen md:min-h-[600px] flex items-center justify-center overflow-hidden",
          {
            "md:border md:border-primary ": isOwner,
          },
        )}
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            className="object-cover w-full h-full blur-md scale-110"
            src={eventData?.imageUrl || ""}
            alt={eventData?.slug || ""}
            fill
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Desktop Owner Actions */}
        {isOwner && (
          <div className="absolute top-6 right-6 z-20 hidden md:flex gap-4">
            <button
              onClick={() => setIsEditOpen(true)}
              className="p-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-primary/50 active:scale-95"
              title="Edit event"
            >
              <Edit size={20} />
            </button>

            <button
              onClick={() => setShowDeleteModel(true)}
              className="p-3 bg-red-500 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-red-500/50 active:scale-95"
              title="Delete event"
            >
              <Trash size={20} />
            </button>
          </div>
        )}

        {/* Owned Badge */}
        {isOwner && (
          <div className="absolute bottom-0 right-0 text-white font-semibold px-4 py-1.5 bg-primary z-20">
            Owned
          </div>
        )}

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-12 md:px-12 md:py-0">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center">
            {/* Image */}
            <div className="w-full md:w-1/3 flex-shrink-0">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10 hover:ring-primary/50 transition-all duration-300">
                <Image
                  className="object-cover w-full h-full"
                  src={eventData?.imageUrl || ""}
                  alt={eventData?.slug || ""}
                  fill
                />
              </div>
            </div>

            {/* Event Information */}
            <section className="w-full md:w-2/3 flex flex-col justify-between">
              <div className="mb-8">
                <h1 className="text-2xl whitespace-normal md:whitespace-nowrap md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3 tracking-tight">
                  {eventData?.name}
                </h1>

                <p className="text-sm md:text-base text-white/70 font-light">
                  organized by{" "}
                  <span className="text-primary font-bold">
                    {eventData?.organizerName}
                  </span>
                </p>
              </div>

              <p className="text-base md:text-lg text-white/80 leading-relaxed mb-10 max-w-lg font-light">
                {eventData?.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 pb-8 border-b border-white/10">
                {/* Location */}
                <div className="flex items-start gap-3">
                  <MapPin
                    className="text-primary mt-1 flex-shrink-0"
                    size={20}
                  />

                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/50 mb-1">
                      Location
                    </p>

                    <p className="text-base md:text-lg text-white font-medium">
                      {eventData?.location}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-start gap-3">
                  <Clock
                    className="text-primary mt-1 flex-shrink-0"
                    size={20}
                  />

                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/50 mb-1">
                      Date & Time
                    </p>

                    <p className="text-base md:text-lg text-white font-medium">
                      {new Date(eventData!.date).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}

                      <span className="ml-3 text-sm font-semibold text-primary">
                        {new Date(eventData!.date).toLocaleString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Reservation */}
              {user && !isOwner && !isInPast && (
                <button
                  disabled={isReservationLoading}
                  onClick={handleReservation}
                  className={cn(
                    "w-full sm:w-auto px-8 md:px-10 py-4 font-bold text-base md:text-lg rounded-lg transition-all duration-200 ease-linear active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
                    isReserved
                      ? "bg-transparent border border-primary text-white hover:bg-primary/10"
                      : "bg-primary border border-transparent text-white hover:bg-primary/90",
                  )}
                >
                  {isReservationLoading
                    ? "Loading..."
                    : isReserved
                      ? "Cancel reservation"
                      : "Reserve a ticket"}
                </button>
              )}

              {/* Mobile Owner Actions */}
              {isOwner && (
                <div className="flex md:hidden gap-3 w-full">
                  <button
                    onClick={() => setIsEditOpen(true)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-all duration-200 active:scale-95"
                  >
                    <Edit size={18} />
                    Edit Event
                  </button>

                  <button
                    onClick={() => setShowDeleteModel(true)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all duration-200 active:scale-95"
                  >
                    <Trash size={18} />
                    Delete
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </article>

      {/* Delete Modal */}
      {showDeleteModel && (
        <DeleteConfirmModal
          onConfirm={() => {
            deleteEvent.mutate(eventData?.id as number);
            router.push("/my-events");
            router.refresh();
          }}
          onCancel={() => setShowDeleteModel(false)}
        />
      )}

      {/* Edit Modal */}
      <EditEventForm
        data={eventData as NonNullEvent}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSaveEdit}
      />
    </>
  );
}
