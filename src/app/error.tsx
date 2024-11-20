"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  return (
    <section className="">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Something&apos;s missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, we can&apos;t find that page. You&apos;ll find lots to
            explore on the home page.{" "}
          </p>
          <a href={"/"}>
            <button className="  border border-primary py-4 px-8 hover:bg-primary  transition-all duration-200 ease-linear">
              Go back to the home page
            </button>
            <button
              onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
              }
              className="  border border-primary py-4 px-8 hover:bg-primary  transition-all duration-200 ease-linear"
            >
              Try again
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
