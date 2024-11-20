import Link from "next/link";

export default function CityNotFound() {
  return (
    <section className="">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            There are no events in here
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, we can&apos;t find any events . You&apos;ll find lots to
            explore on the events page.{" "}
          </p>
          <Link href={"/events/all"}>
            <button className="  border border-primary py-4 px-8 hover:bg-primary  transition-all duration-200 ease-linear">
              Go back to the events page
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
