export default function EventSkeleton() {
  return (
    <article className="grid grid-cols-[450px,600px] relative state-effects">
      <div className="bg-white/10 animate-pulse h-full"></div>

      <section className=" flex flex-col justify-center px-8">
        <div className="py-4">
          <div className="h-[40px] bg-white/10 rounded-md animate-pulse w-3/4 mb-4" />

          <div className="h-5 bg-white/10/60 rounded-md animate-pulse w-1/2 -mt-3" />
        </div>

        <div className="pb-4 space-y-2">
          <div className="h-4 bg-white/10 rounded-md animate-pulse w-full" />
          <div className="h-4 bg-white/10 rounded-md animate-pulse w-5/6" />
          <div className="h-4 bg-white/10 rounded-md animate-pulse w-4/6" />
        </div>

        <div className="mb-4">
          <div className="h-[56px] w-[144px] rounded-sm animate-pulse bg-white/10" />
        </div>

        <div className="mt-auto py-3 flex justify-between ">
          <span className="flex gap-0">
            <div className="h-6 bg-white/10 rounded-md animate-pulse w-24" />
          </span>
          <div className="h-6 bg-white/10 rounded-md animate-pulse w-40" />
        </div>
      </section>
    </article>
  );
}
