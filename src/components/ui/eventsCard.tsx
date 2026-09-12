"use client";
import { Event } from "@/lib/types";
import { cn } from "@/utils/helpers";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { useRef, useState } from "react";

const MotionLink = motion(Link);

export default function EventsCard({
  event,
  isInPast,
}: {
  event: Event;
  isInPast: boolean;
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.5 1"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  return (
    <MotionLink
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      href={`/event/${event?.slug}`}
      style={{ scale, opacity }}
      className={cn("relative w-full  flex ", {})}
    >
      <article className="relative h-[350px] w-full bg-[#232323] flex flex-col rounded-md overflow-hidden  hover:scale-105  transition-scale  active:scale-[1.02] duration-300 cursor-pointer">
        <div
          className={cn("h-[60%] relative", {
            grayscale: isInPast,
          })}
        >
          <Image
            priority={true}
            className="w-full h-[60%] object-cover"
            alt="event"
            src={event?.imageUrl || ""}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        </div>
        <section className="h-1/2 flex  items-center flex-col pt-10">
          <h2 className="text-white">{isInPast ? "true " : "false"}</h2>
          <h2 className="text-2xl lg:text-3xl font-semibold ">{event?.name}</h2>
          <span className="text-white/70">By {event?.organizerName}</span>
          <span className=" text-white/50">{event?.location}</span>
        </section>

        {isInPast && (
          <div className="absolute bg-black/70 right-[12px] top-[12px]  text-center z-999999 flex flex-col items-center rounded-md  ">
            <span className="font-bold   py-1 px-3 text-primary">Ended</span>
          </div>
        )}
        {!isInPast && (
          <section className="absolute bg-black/70 left-[12px] top-[12px] h-[45px] w-[45px]  text-center flex flex-col items-center rounded-md  ">
            <span className="font-bold text-xl -mb-[5px]">
              {new Date(event!.date).toLocaleString("en-US", {
                day: "2-digit",
              })}
            </span>
            <span className=" text-xs uppercase text-primary">
              {new Date(event!.date)
                .toLocaleString("en-US", { month: "short" })
                .toUpperCase()}
            </span>
          </section>
        )}
        <div className=" right-3 z-10 flex  mt-4">
          <Link
            href={`/event/${event?.slug}/edit`}
            onClick={(e) => e.stopPropagation()}
            className=" bg-primary block w-full text-center px-3 py-2 text-sm text-white hover:bg-primary/9s0"
          >
            Edit
          </Link>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              // delete logic here
            }}
            className=" bg-red-500/80 block w-full text-center px-3 py-2 text-sm text-white hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </article>
    </MotionLink>
  );
}
