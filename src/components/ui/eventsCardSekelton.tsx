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

const EventsGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {[...Array(9)].map((_, index) => (
        <EventCardSkeleton key={index} />
      ))}
    </div>
  );
};
export default EventsGridSkeleton;
