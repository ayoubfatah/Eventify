import Form from "@/components/ui/Form";
import H1 from "@/components/ui/h1";
import Link from "next/link";

export default function Home() {
  return (
    <div className="  relative h-full  flex justify-center items-center flex-col gap-3 py-36 ">
      <H1> Find events around you</H1>
      <p className="text-[20px] font-bold opacity-80">
        Browse More than{" "}
        <span className="underline italic text-primary font-extrabold ">
          {" "}
          1,000 events
        </span>{" "}
        around you
      </p>
      <Form />
      <section className="mt-4 flex gap-x-4 text-slate-500/80">
        <p>Popular:</p>
        <div className="space-x-2 text-slate-500">
          <Link href={"/events/marrakesh"}>Marrakesh</Link>
          <Link href={"/events/Casablanca"}>Casablanca</Link>
        </div>
      </section>
    </div>
  );
}
