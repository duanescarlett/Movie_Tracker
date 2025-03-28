import getOneFilm from "@/buslogic/getOneFilm";

export default async function Page({ params, }: {
    params: Promise<{ name: string }>
}) {
    const { name } = await params
  const decodedName = decodeURIComponent(name);
  const filmData = await getOneFilm(decodedName); // Ensure it is awaited
  const Film = filmData.movie;

  return (
    <section className="overflow-hidden mt-10 bg-gray-50 sm:grid sm:grid-cols-2">
      {Film && (
        <>
          <div className="p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {Film.title}
              </h2>
              <p className="hidden text-gray-500 md:mt-4 md:block">
                {Film.plot}
              </p>
            </div>
          </div>
          {Film.poster && (
            <img
              alt={Film.title}
              src={Film.poster}
              height={375}
              width={250}
              className="h-56 w-full object-cover sm:h-full"
            />
          )}
        </>
      )}
    </section>
  );
};

// export default Page;
