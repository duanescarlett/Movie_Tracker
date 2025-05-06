'use client'
import { useEffect, useState } from "react"
import Image from 'next/image';
import { Film_Interface } from "@/interfaceTypes/interfaces"
import getAllFilms from "@/buslogic/getAllFilms";
import Link from "next/link";

export default function Home() {

const [allFilms, setAllFilms] = useState<Film_Interface[]>([]);
const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFilms = async () => {
      const films = await getAllFilms();
      setAllFilms(films.movies);
      setIsLoading(false);
    };
    fetchFilms();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="hero bg-gray-800 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Movie Tracker</h1>
          <p className="text-xl mb-8">Track your favorite movies and stay updated with the latest releases.</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Get Started
          </button>
        </div>
      </section>
      <div className="grid grid-cols-6 gap-4 mt-10">
        {allFilms.map((film, index) => (
          <div key={index} className="flex justify-center">
            <div className="flex flex-col items-center">
              <Link href={`/film/${film.title}`}>
                <img src={film.poster} alt={film.title} width={125} height={187} />
              </Link>
              <Link href={`/film/${film.title}`}>
                <h3 className="text-xl font-medium text-center">{film?.title}</h3>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
