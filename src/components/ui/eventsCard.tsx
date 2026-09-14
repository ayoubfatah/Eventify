"use client";

import { updateEvent } from "@/lib/server-utils";
import { Event } from "@/lib/types";
import { cn } from "@/utils/helpers";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { toast } from "sonner";
import EditEventForm, { NonNullEvent } from "./EditEventForm";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { useAuth } from "@/context/AuthProvider";

const MotionLink = motion(Link);

export default function EventsCard({
  event,
  actions = false,
  isInPast,

  onDelete,
}: {
  event: Event;
  actions: boolean;
  isInPast: boolean;
  onDelete?: () => void;
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [eventData, setEventData] = useState(event);
  const { user } = useAuth();
  const owned = user?.id === event?.userId;

  // const previousPath = page > 1 ? `/events/${city}?page=${page - 1}` : "";
  // const nextPath =
  //   totalCount > 6 * page ? `/events/${city}?page=${page + 1}` : "";

  const handleSaveEdit = async (updatedData: NonNullEvent) => {
    try {
      const result = await updateEvent(updatedData);

      setEventData(result.event);
      if (result) {
        toast.success("Event edited successfully!");
        setTimeout(() => {
          setIsEditOpen(false);
        }, 0);
      }
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

  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <div className="relative">
      {/* Event Card */}
      <MotionLink
        ref={ref}
        initial={{ opacity: 0, scale: 0.8 }}
        href={`/event/${eventData?.slug}`}
        style={{ scale, opacity }}
        className={cn("relative w-full flex ")}
      >
        <article
          className={cn(
            "relative h-[350px] w-full bg-[#232323] flex flex-col rounded-md overflow-hidden  transition-scale active:scale-[1.02] duration-300 cursor-pointer",
            {
              "hover:scale-105": !actions,
              " border border-primary": owned && !actions,
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
            />
          </div>

          {/* Event Information */}
          <section className="h-1/2 flex items-center flex-col pt-10">
            <h2 className="text-white">{isInPast ? "true" : "false"}</h2>

            <h2 className="text-2xl lg:text-3xl font-semibold">
              {eventData?.name}
            </h2>

            <span className="text-white/70">By {eventData?.organizerName}</span>

            <span className="text-white/50">{eventData?.location}</span>
          </section>

          {/* Ended Badge */}
          {owned && !actions && (
            <div className="absolute bg-primary bottom-0 right-0 text-center z-50 flex flex-col items-center ">
              <span className="font-bold py-1 px-3 text-black">Owned</span>
            </div>
          )}
          {isInPast && (
            <div className="absolute bg-black/70 right-[12px] top-[12px] text-center z-50 flex flex-col items-center rounded-md">
              <span className="font-bold py-1 px-3 text-primary">Ended</span>
            </div>
          )}

          {/* Date Badge */}
          {!isInPast && (
            <section className="absolute bg-black/70 left-[12px] top-[12px] h-[45px] w-[45px] text-center flex flex-col items-center rounded-md">
              <span className="font-bold text-xl -mb-[5px]">
                {new Date(event!.date).toLocaleString("en-US", {
                  day: "2-digit",
                })}
              </span>

              <span className="text-xs uppercase text-primary">
                {new Date(event!.date)
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
        <div className=" right-3 bottom-3  flex  ">
          {/* Edit */}
          <button
            type="button"
            onClick={() => {
              setIsEditOpen(true);
            }}
            className="bg-primary  w-full block px-3 py-2 text-sm text-white hover:bg-primary/90 "
          >
            Edit
          </button>

          {/* Delete */}

          <button
            type="button"
            onClick={() => setShowDeleteModel(true)}
            className="bg-red-500/80  w-full block px-3 py-2 text-sm text-white hover:bg-red-500 "
          >
            Delete
          </button>
        </div>
      )}
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
    </div>
  );
}
