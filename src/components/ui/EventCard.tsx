"use client";
import { reserveEvent, updateEvent } from "@/lib/server-utils";
import { Event } from "@/lib/types";
import { cn } from "@/utils/helpers";
import { Clock, Edit, MapPin, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import EditEventForm, { NonNullEvent } from "./EditEventForm";
import { useAuth } from "@/context/AuthProvider";
import EventSkeleton from "./eventSkeleton";
import { toast } from "sonner";

interface EventCardProps {
  data: Event;
}

export default function EventCard({ data }: EventCardProps) {
  const [isReserved, setIsReserved] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [eventData, setEventData] = useState(data);
  const { user, isLoading } = useAuth();

  const handleSaveEdit = async (updatedData: NonNullEvent) => {
    try {
      const result = await updateEvent(updatedData);
      toast.success("Event edited successfully!");

      setEventData(result.event);
      setTimeout(() => {
        setIsEditOpen(false);
      }, 0);
    } catch (error) {
      console.log(error);
    }
  };

  const isOwner = eventData?.userId === user?.id;

  if (isLoading) {
    return <EventSkeleton />;
  }
  return (
    <>
      <article className="relative w-full h-screen md:h-[600px] border border-primary flex items-center justify-center overflow-hidden">
        {/* Blurred background image */}
        <div className="absolute inset-0 z-0">
          <Image
            className="object-cover w-full h-full blur-md scale-110"
            src={eventData?.imageUrl || ""}
            alt={eventData?.slug || ""}
            fill
            priority
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60"></div>
          {/* Additional overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Edit Button - Only show if owner */}
        {isOwner && (
          <>
            <div className="absolute top-6 right-6 z-2000 flex gap-4">
              <button
                onClick={() => setIsEditOpen(true)}
                className=" p-3 z-9999999 bg-primary hover:bg-primary/90 text-black rounded-lg transition-all duration-200 shadow-lg hover:shadow-primary/50 active:scale-95"
                title="Edit event"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => setIsEditOpen(true)}
                className=" p-3 bg-red-500 z-9999999   text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-red-500/50 active:scale-95"
                title="Edit event"
              >
                <Trash size={20} />
              </button>
            </div>
          </>
        )}

        <div className="bottom-0 text-black font-semibold px-4 py-1.5 right-0 absolute bg-primary  z-9999">
          Owned
        </div>
        {/* Content container */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 py-12">
          <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
            {/* Left side - Event image (smaller, sharp version) */}
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

            {/* Right side - Event details */}
            <section className="w-full md:w-2/3 flex flex-col justify-between">
              {/* Event name and organizer */}
              <div className="mb-8">
                <h1 className="text-4xl whitespace-nowrap md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3 tracking-tight">
                  {eventData?.name}
                </h1>
                <p className="text-sm md:text-base text-white/70 font-light">
                  organized by{" "}
                  <span className="text-primary font-bold">
                    {eventData?.organizerName}
                  </span>
                </p>
              </div>

              {/* Description */}
              <p className="text-base md:text-lg text-white/80 leading-relaxed mb-10 max-w-lg font-light">
                {eventData?.description}
              </p>

              {/* Info grid - Location and Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 pb-8 border-b border-white/10">
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

              {!isOwner && (
                <button
                  onClick={async () => {
                    await reserveEvent(eventData!.id.toString());
                    setIsReserved(!isReserved);
                  }}
                  className={cn(
                    "w-full sm:w-auto px-8 md:px-10 py-4 text-black font-bold text-base md:text-lg rounded-lg transition-all duration-200 ease-linear hover:shadow-sm hover:shadow-primary/50 active:scale-95",
                    {
                      "bg-transparent border border-primary text-white":
                        isReserved,
                    },
                    {
                      "bg-primary border border-transparent hover:bg-primary/90":
                        !isReserved,
                    },
                  )}
                >
                  {!isReserved ? "Reserve a ticket" : "Reserved"}
                </button>
              )}
            </section>
          </div>
        </div>
      </article>

      {/* Edit Form Modal */}
      <EditEventForm
        data={eventData as NonNullEvent}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSaveEdit}
      />
    </>
  );
}
