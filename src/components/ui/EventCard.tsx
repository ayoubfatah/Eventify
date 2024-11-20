"use client";
import { type EventifyEvent } from "@prisma/client";
import { MapPin } from "lucide-react";
import Image from "next/image";

export default function EventCard({ data }: { data: EventifyEvent }) {
  return (
    <article className="mt-[155px] sm:mt-[100px] 2lg:grid  2lg:grid-cols-[500px,1fr] 2lg:mt-0 relative ">
      <div className="relative  flex justify-center items-center w-full h-[350px] 2lg:[380px]  2lg:w-[500px] lg:-min-h-[350px]">
        <Image
          priority
          className=" object-cover w-full h-full"
          src={data.imageUrl}
          alt={data.slug}
          fill
        />
      </div>
      <section className=" bg-[#000000]   flex flex-col justify-center  px-8">
        {" "}
        <div className="py-4 ">
          <h1 className="text-[30px] sm:text-[40px] font-bold">{data.name}</h1>
          <p className="text-[13px] sm:text-[16px] -mt-2 sm:-mt-3 text-white/60">
            organized by {data.organizerName}
          </p>
        </div>
        <p className="pb-4 ">{data.description}</p>
        <div className="mb-4">
          {" "}
          <button className="  border border-primary py-4 px-8 hover:bg-primary  transition-all duration-200 ease-linear">
            Get Tickets
          </button>
        </div>
        <div className="text-[11px] xs:text-[13px] sm:text-[16px] mt-auto py-3 flex justify-between text-primary ">
          <span className="flex gap-0">
            {" "}
            {
              data.location
            } <MapPin className="text-primary -mt-2 sm:-mt-1" />{" "}
          </span>
          <span>
            {new Date(data.date).toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </span>
        </div>
      </section>
    </article>
  );
}
