"use client";

import { useAuth } from "@/context/AuthProvider";
import { updateEvent } from "@/lib/server-utils";
import { Event } from "@/lib/types";
import { cn } from "@/utils/helpers";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { useQueryClient } from "@tanstack/react-query";
import DeleteConfirmModal from "./DeleteConfirmModal";
import EditEventForm, { NonNullEvent } from "./EditEventForm";

const MotionLink = motion(Link);

type EventStatus = "ended" | "today" | "tomorrow" | "upcoming";

const getEventStatus = (date: string | Date): EventStatus => {
  const eventDate = new Date(date);
  const now = new Date();

  if (eventDate <= now) {
    return "ended";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const eventDay = new Date(eventDate);
  eventDay.setHours(0, 0, 0, 0);

  if (eventDay.getTime() === today.getTime()) {
    return "today";
  }

  if (eventDay.getTime() === tomorrow.getTime()) {
    return "tomorrow";
  }

  return "upcoming";
};

export default function EventsCard({
  event,
  actions = false,
  isInPast,
  onDelete,
}: {
  event: Event;
  actions?: boolean;
  isInPast: boolean;
  onDelete?: () => void;
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [eventData, setEventData] = useState(event);

  const { user } = useAuth();

  const owned = user?.id === event?.userId;

  const eventStatus = getEventStatus(eventData!.date);
  const queryClient = useQueryClient();

  const handleSaveEdit = async (updatedData: NonNullEvent) => {
    try {
      const result = await updateEvent(updatedData);

      setEventData(result.event);
      await queryClient.invalidateQueries({ queryKey: ["events"] });

      toast.success("Event edited successfully!");

      setIsEditOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.5 1"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  const eventDate = new Date(eventData!.date);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      style={{ scale, opacity }}
      className="relative "
    >
      {/* Event Card */}
      <MotionLink
        href={`/event/${eventData?.slug}`}
        className="relative w-full flex"
      >
        <article
          className={cn(
            "relative h-[350px] w-full  bg-[#232323] flex flex-col overflow-hidden transition-scale active:scale-[1.02] duration-300 cursor-pointer",
            {
              "hover:scale-105 rounded-md ": !actions,
              "border border-primary rounded-md ": owned && !actions,
              "rounded-t-md rounded-r-md rounded-l-md rounded-b-none  ":
                actions,
            },
          )}
        >
          {/* Image */}
          <div
            className={cn("h-[60%] relative", {
              grayscale: isInPast,
            })}
          >
            <Image
              priority
              className="w-full h-[60%] object-cover"
              alt="event"
              src={eventData?.imageUrl || ""}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              quality={10}
            />
          </div>

          {/* Event Information */}
          <section className="h-1/2 flex items-center flex-col pt-10">
            <h2 className="text-2xl lg:text-2xl font-semibold">
              {eventData?.name}
            </h2>

            <span className="text-white/70">By {eventData?.organizerName}</span>

            <span className="text-white/50">{eventData?.location}</span>
          </section>

          {/* Owned Badge */}
          {owned && !actions && (
            <div className="absolute bottom-0 right-0 z-50 overflow-hidden rounded-tl-lg">
              <span className="flex items-center gap-1 bg-primary px-4 py-1.5 text-sm font-bold text-white">
                Owned
              </span>
            </div>
          )}

          {/* Event Status Badge */}
          <div className="absolute right-3 top-3 z-50">
            {eventStatus === "ended" && (
              <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/80 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white/60 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                Ended
              </span>
            )}

            {eventStatus === "today" && (
              <span className="flex items-center gap-1.5 rounded-full border border-red-500/30 bg-black/80 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-red-400 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
                Today
              </span>
            )}

            {eventStatus === "tomorrow" && (
              <span className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-black/80 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Tomorrow
              </span>
            )}
          </div>

          {/* Date Badge */}
          {eventStatus !== "ended" && (
            <section className="absolute left-3 top-3 z-50 flex h-[52px] w-[52px] flex-col items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-black/80 backdrop-blur-sm">
              <span className="text-xl font-bold leading-none text-white">
                {eventDate.toLocaleString("en-US", {
                  day: "2-digit",
                })}
              </span>

              <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                {eventDate
                  .toLocaleString("en-US", {
                    month: "short",
                  })
                  .toUpperCase()}
              </span>
            </section>
          )}
        </article>
      </MotionLink>

      {/* Actions */}
      {actions && (
        <motion.div style={{ scale, opacity }} className="flex">
          <button
            type="button"
            onClick={() => {
              setIsEditOpen(true);
            }}
            className="block w-full bg-primary px-3 py-2 text-sm text-white hover:bg-primary/90"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => setShowDeleteModel(true)}
            className="block w-full bg-red-500/80 px-3 py-2 text-sm text-white hover:bg-red-500"
          >
            Delete
          </button>
        </motion.div>
      )}

      {/* Delete Modal */}
      {showDeleteModel && (
        <DeleteConfirmModal
          onConfirm={onDelete!}
          onCancel={() => setShowDeleteModel(false)}
        />
      )}

      {/* Edit Modal */}
      <EditEventForm
        isOpen={isEditOpen}
        data={eventData as NonNullEvent}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSaveEdit}
      />
    </motion.div>
  );
}
