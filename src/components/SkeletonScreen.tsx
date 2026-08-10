import { JSX } from 'react';

function SkeletonScreen(): JSX.Element {
  return (
    <main
      aria-busy="true"
      className="mx-4 w-max-xl min-h-screen font-outfit flex flex-col md:flex-row-reverse animate-pulse motion-reduce:animate-none"
    >
      <p className="sr-only" role="status">
        Loading car configurator.
      </p>
      <section className="order-last md:order-first mb-4 min-h-min md:h-auto w-full grid place-items-center">
        <div className="w-5/6 sm:w-4/6 md:w-4/5">
          <div className="h-7 w-20 bg-neutral-300 dark:bg-neutral-700 rounded mb-2" />
          <div className=" mb-6 flex flex-wrap gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-12 p-4 m-2 w-24 bg-neutral-300 dark:bg-neutral-700 rounded-lg"
              />
            ))}
          </div>

          <div className="h-7 w-20 bg-neutral-300 dark:bg-neutral-700 rounded mb-2" />
          <div className="mb-6 flex flex-wrap gap-2">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="h-12 p-4 m-2 w-28 bg-neutral-300 dark:bg-neutral-700 rounded-lg"
              />
            ))}
          </div>

          <div className="h-6 w-20 bg-neutral-300 dark:bg-neutral-700 rounded mb-2" />
          <div className="flex flex-wrap gap-2 mb-6">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="h-12 p-4 m-2 w-20 bg-neutral-300 dark:bg-neutral-700 rounded-lg"
              />
            ))}
          </div>

          <div className="h-6 w-16 bg-neutral-300 dark:bg-neutral-700 rounded mb-2" />
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-20 w-20 bg-neutral-300 dark:bg-neutral-700 rounded-lg"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="order-first md:order-last w-full min-h-min md:h-auto dark:bg-blue-800 bg-neutral-200 rounded-lg md:rounded-l-lg my-4 md:grid md:place-items-center">
        <div className="m-auto w-5/6 sm:w-4/6 md:w-4/5">
          <div className="h-21 md:h-24 lg:h-40 2xl:h-60 my-12 mx-auto w-3/4 bg-neutral-300 dark:bg-neutral-600 rounded" />
          <div className="h-9 w-48 mx-auto bg-neutral-300 dark:bg-neutral-600 rounded mb-4" />
          <div className="flex justify-around mt-8 mb-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="h-4 w-14 bg-neutral-300 dark:bg-neutral-600 rounded" />
                <div className="h-4 w-20 bg-neutral-300 dark:bg-neutral-600 rounded" />
              </div>
            ))}
          </div>
          <div className="h-8 w-40 mx-auto bg-neutral-300 dark:bg-neutral-600 mb-6 rounded" />
        </div>
      </section>
    </main>
  );
}

export default SkeletonScreen;
