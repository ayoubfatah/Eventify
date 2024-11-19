import Link from "next/link";

export default function CityNotFound({ city }: { city: string }) {
  return (
    <section className="">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            There are no events in &quot;{city}&quot;
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, we can&apos;t find any events in &quot;city&quot; .
            You&apos;ll find lots to explore on the home page.{" "}
          </p>
          <Link href={"/"}>
            <button className="  border border-primary py-4 px-8 hover:bg-primary  transition-all duration-200 ease-linear">
              Go back to the home page
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
