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
    const [rating, setRating] = useState<number>(0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRating(Number(e.target.value));
    };

    const handleSubmitRating = () => {
        // Handle the rating submission logic here
        console.log(`Rating submitted: ${rating}`);
    };
    
    useEffect(() => {
        const fetchFilm = async () => {
            const film = await getOneFilm(name)
            setFilm(film.movie)
            console.log(film)
        };
        fetchFilm();
    }, [name])

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

                        <div className="mt-4 md:mt-8">
                            <div className="flex items-center space-x-4">
                                <input
                                    type="number"
                                    min="1"
                                    max="100"
                                    placeholder="Rate 1-100"
                                    value={rating}
                                    onChange={handleInputChange}
                                    className="rounded-sm border-gray-300 px-4 py-2 text-sm focus:ring-emerald-600 focus:border-emerald-600"
                                />
                                <button
                                    onClick={handleSubmitRating}
                                    className="inline-block rounded-sm bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 focus:ring-3 focus:ring-yellow-400 focus:outline-hidden"
                                >
                                    Submit Rating
                                </button>
                            </div>
                        </div>
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
    )
}
export default Page

