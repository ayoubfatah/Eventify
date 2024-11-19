"use client";
import { type EventifyEvent } from "@prisma/client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import React, { useRef } from "react";

const MotionLink = motion(Link);

export default function EventsCard({ event }: { event: EventifyEvent }) {
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
      href={`/event/${event.slug}`}
      style={{ scale, opacity }}
      className="relative w-full  flex "
    >
      <article className="relative h-[350px] w-full bg-[#232323] flex flex-col rounded-md overflow-hidden  hover:scale-105  transition-scale  active:scale-[1.02] duration-300 cursor-pointer">
        <div className="h-[60%] relative">
          <Image
            priority={true}
            className="w-full h-[60%] object-cover"
            alt="event"
            src={event.imageUrl}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        </div>
        <section className="h-1/2 flex  items-center flex-col pt-10">
          <h2 className="text-2xl lg:text-3xl font-semibold ">{event.name}</h2>
          <span className="text-white/70">By {event.organizerName}</span>
          <span className=" text-white/50">{event.location}</span>
        </section>

        <section className="absolute bg-black/70 left-[12px] top-[12px] h-[45px] w-[45px]  text-center flex flex-col items-center rounded-md  ">
          <span className="font-bold text-xl -mb-[5px]">
            {new Date(event.date).toLocaleString("en-US", { day: "2-digit" })}
          </span>
          <span className=" text-xs uppercase text-primary">
            {new Date(event.date)
              .toLocaleString("en-US", { month: "short" })
              .toUpperCase()}
          </span>
        </section>
      </article>
    </MotionLink>
  );
}
