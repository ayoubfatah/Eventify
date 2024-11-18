import { EventType } from "@/lib/types";

import Image from "next/image";
import Link from "next/link";

import React from "react";

export default function EventsCard({ event }: { event: EventType }) {
  return (
    <Link href={`/event/${event.slug}`} className="relative w-full  flex ">
      <article className="relative w-full bg-[#232323] flex flex-col rounded-md overflow-hidden  hover:scale-105  transition-scale  active:scale-[1.02] duration-300 cursor-pointer">
        <Image
          priority={true}
          className="w-full h-[60%] object-cover"
          alt="event"
          src={event.imageUrl}
          height={280}
          width={500}
        />
        <section className="h-1/2 flex pt-4 items-center flex-col">
          <h2 className="text-2xl lg:text-3xl font-semibold pt-2">
            {event.name}
          </h2>
          <span className="text-white/70">By {event.organizerName}</span>
          <span className="pt-3 text-white/50">{event.location}</span>
        </section>

        <section className="absolute left-[12px] top-[12px] h-[45px] w-[45px]  text-center flex flex-col items-center rounded-md  ">
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
    </Link>
  );
}
