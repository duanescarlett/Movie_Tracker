"use client";
import { useEffect, useState } from "react";
import getOneFilm from "@/buslogic/getOneFilm";
import RateFilm from "@/app/components/RateFilm";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Page = ({ params }: { params: Promise<{ name: string }> }) => {
  const [filmData, setFilmData] = useState<any>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchFilm = async () => {
      const resolvedParams = await params;
      const decodedName = decodeURIComponent(resolvedParams.name);
      const film = await getOneFilm(decodedName);
      setFilmData(film.movie);
    };

    fetchFilm();
  }, [params]);

  return (
    <section className="overflow-hidden mt-10 bg-gray-50 sm:grid sm:grid-cols-2">
      {filmData && (
        <>
          <div className="flex flex-col p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {filmData.title}
              </h2>
              <p className="hidden text-gray-500 md:mt-4 md:block">
                {filmData.plot}
              </p>
            </div>
            <RateFilm movieId={filmData.id.toString()} userId={session?.user.id} />
          </div>
          {filmData.poster && (
            <Image
              alt={filmData.title}
              src={filmData.poster}
              height={100}
              width={80}
              className="h-56 w-full object-cover sm:h-full"
            />
          )}
          
        </>
      )}
    </section>
  );
};

export default Page;
