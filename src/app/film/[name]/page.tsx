'use client'
import { useEffect, useState } from "react"
import Image from 'next/image';
import getOneFilm from "@/buslogic/getOneFilm";
import { Film_Interface } from "@/interfaceTypes/interfaces";

const Page = ({ 
    params, 
}: { 
    params: { name: string } 
}) => {
    const { name } = params;
    const decodedName = decodeURIComponent(name);
    const [Film, setFilm] = useState<Film_Interface | null>(null);
    
    useEffect(() => {
        const fetchFilm = async () => {
            const film = await getOneFilm(name)
            setFilm(film.movie)
            console.log(film)
        };
        fetchFilm();
    }, [name])

    return (
        // <div>
        //     My URL Segment: { decodedName }
        //     <section className="flex flex-wrap items-center justify-center p-6 bg-white rounded-lg shadow-lg">
        //         {Film && (
        //             <div className="max-w-lg text-center">
        //                 <Image className="rounded-lg" src={Film.poster} alt={Film.title} width={300} height={450} />
        //                 <h1 className="mt-6 text-3xl font-bold text-gray-900">{Film.title}</h1>
        //                 <p className="mt-4 text-gray-700">{Film.plot}</p>
        //                 <div className="mt-4 flex justify-between text-gray-700">
        //                     <span>Runtime: {Film.runtime}</span>
        //                     <span>Year: {Film.year}</span>
        //                 </div>
        //             </div>
        //         )}
        //     </section>
        // </div>

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

                        <div className="mt-4 md:mt-8">
                            <a
                                href="#"
                                className="inline-block rounded-sm bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:ring-3 focus:ring-yellow-400 focus:outline-hidden"
                            >
                                Give this film a rating
                            </a>
                        </div>
                    </div>
                </div>

                <Image
                    alt={Film.title}
                    src={Film.poster}
                    height={375}
                    width={250}
                    className="h-56 w-full object-cover sm:h-full"
                />
            </>
            )}
        </section>
    )
}
export default Page

