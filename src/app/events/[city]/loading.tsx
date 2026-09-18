import H1 from "@/components/ui/h1";

const EventCardSkeleton = () => {
  return (
    <div className="relative w-full flex">
      <article className="relative w-full  flex flex-col rounded-md overflow-hidden">
        {/* Image skeleton */}
        <div className="w-full h-[280px] bg-white/10 animate-pulse" />

        {/* Content section */}
        <section className="h-1/2 flex pt-4 items-center flex-col">
          {/* Title skeleton */}
          <div className="h-8 w-2/3 bg-white/10 rounded-md animate-pulse mt-2" />
          {/* Organizer skeleton */}
          <div className="h-4 w-1/2 bg-white/10 rounded-md animate-pulse mt-2" />
          {/* Location skeleton */}
          <div className="h-4 w-1/3 bg-white/10 rounded-md animate-pulse mt-3" />
        </section>

        {/* Date badge skeleton */}
      </article>
    </div>
  );
};

export default async function Loading({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const param = await params;
  const city = (await param)?.city;
  return (
    <main className="container mx-auto px-4 py-5 flex flex-col  border-white/30 mb-9">
      <H1 className="text-center py-10 ">All events in {city} </H1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {[...Array(6)].map((_, index) => (
          <EventCardSkeleton key={index} />
        ))}
      </div>
    </main>
  );
}
