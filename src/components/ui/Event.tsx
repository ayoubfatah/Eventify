"use client";
import { type EventType } from "@/lib/types";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Image from "next/image";

export default function Event({ data }: { data: EventType }) {
  return (
    <article className=" grid grid-cols-[550px,1fr] relative">
      <div className="bg-blue-500 ">
        <Image
          className="w-full  object-fill"
          src={data.imageUrl}
          alt={data.slug}
          width={300}
          height={400}
        />
      </div>
      <section className=" bg-[#111111]   flex flex-col justify-center  px-8">
        {" "}
        <div className="py-4 ">
          <h1 className=" text-[40px] font-bold">{data.name}</h1>
          <p className="-mt-3 text-white/60">
            organized by {data.organizerName}
          </p>
        </div>
        <p className="pb-4 h-[120px]">{data.description}</p>
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
        className="absolute w-[calc(100%+4px)] h-[calc(100%+4px)] -left-[2px] -top-[2px] -z-10 "
        animate={{
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
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      ></motion.section>
    </article>
  );
}
