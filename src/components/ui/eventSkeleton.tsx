export default function EventSkeleton() {
  return (
    <article className="relative w-full min-h-screen md:min-h-[600px] flex items-center justify-center overflow-hidden animate-pulse">
      {/* Background */}
      <div className=" absolute inset-0 z-0 bg-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10  w-full max-w-4xl mx-auto px-6 py-12 md:px-12 md:py-0">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center">
          {/* Image */}
          <div className="w-full    md:w-1/3 flex-shrink-0">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-black/10  shadow-2xl ring-1 ring-white/10" />
          </div>

          {/* Event Information */}
          <section className="w-full md:w-2/3 flex flex-col justify-between">
            {/* Title + Organizer */}
            <div className="mb-8">
              <div className="h-9 md:h-10 lg:h-12 w-4/5 bg-white/10 rounded-md mb-4" />

              <div className="h-4 md:h-5 w-2/5 bg-white/10 rounded-md" />
            </div>

            {/* Description */}
            <div className="mb-10 max-w-lg space-y-3">
              <div className="h-5 w-full bg-white/10 rounded-md" />
              <div className="h-5 w-11/12 bg-white/10 rounded-md" />
              <div className="h-5 w-4/5 bg-white/10 rounded-md" />
              <div className="h-5 w-3/5 bg-white/10 rounded-md" />
            </div>

            {/* Location + Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 pb-8 border-b border-white/10">
              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 mt-1 rounded-full bg-white/10 flex-shrink-0" />

                <div className="space-y-2">
                  <div className="h-3 w-20 bg-white/10 rounded" />
                  <div className="h-5 w-32 md:w-36 bg-white/10 rounded" />
                </div>
              </div>

              {/* Date */}
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 mt-1 rounded-full bg-white/10 flex-shrink-0" />

                <div className="space-y-2">
                  <div className="h-3 w-24 bg-white/10 rounded" />
                  <div className="h-5 w-40 md:w-44 bg-white/10 rounded" />
                </div>
              </div>
            </div>

            {/* Reservation Button */}
            <div className="w-full sm:w-auto">
              <div className="h-[56px] w-full sm:w-48 bg-white/10 rounded-lg" />
            </div>
          </section>
        </div>
      </div>

      {/* Desktop Owner Actions */}
      <div className="absolute top-6 right-6 z-20 hidden md:flex gap-4">
        <div className="w-11 h-11 rounded-lg bg-white/10" />
        <div className="w-11 h-11 rounded-lg bg-white/10" />
      </div>
    </article>
  );
}
