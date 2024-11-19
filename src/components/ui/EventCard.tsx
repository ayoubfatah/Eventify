"use client";
import { type EventifyEvent } from "@prisma/client";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Image from "next/image";

export default function EventCard({ data }: { data: EventifyEvent }) {
  return (
    <article className=" grid grid-cols-[500px,1fr] relative ">
      <div className="relative w-[500px] min-h-[350px]">
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
          <h1 className=" text-[40px] font-bold">{data.name}</h1>
          <p className="-mt-3 text-white/60">
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
        <div className="mt-auto py-3 flex justify-between text-primary ">
          <span className="flex gap-0">
            {" "}
            {data.location} <MapPin className="text-primary -mt-1" />{" "}
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
      <motion.section
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          backgroundColor: [
            "rgba(59, 130, 246, 0.8)",
            "rgba(239, 68, 68, 0.8)",
            "rgba(34, 197, 94, 0.8)",
            "rgba(234, 179, 8, 0.8)",
            "rgba(139, 92, 246, 0.8)",
            "rgba(59, 130, 246, 0.8)",
          ],
        }}
        transition={{
          opacity: { duration: 0.3 },
          backgroundColor: {
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        className="absolute w-[calc(100%+4px)] h-[calc(100%+4px)] -left-[2px] -top-[2px] -z-10"
      ></motion.section>
    </article>
  );
}
