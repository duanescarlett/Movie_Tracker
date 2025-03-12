import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const { title } = await req.json();

        const encodedTitle = encodeURIComponent(title);
        const response = await fetch(`http://www.omdbapi.com/?t=${encodedTitle}&apikey=${process.env.OMDB_API}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseBody = await response.text();
        console.log("Response from API call: ", responseBody);

        const movieData = JSON.parse(responseBody);

        // First, split the comma-separated values into arrays
        const actorsArray: string[] = movieData.Actors.split(',').map((actor: string) => actor.trim());
        const directorsArray: string[] = movieData.Director.split(',').map((director: string) => director.trim());
        const genresArray: string[] = movieData.Genre.split(',').map((genre: string) => genre.trim());

        // Ensure actors exist
        const actorRecords = await Promise.all(
            actorsArray.map(async (name) => {
                return await prisma.actor.upsert({
                    where: { name }, 
                    update: {},
                    create: { name }
                });
            })
        );

        // Ensure directors exist
        const directorRecords = await Promise.all(
            directorsArray.map(async (name) => {
                return await prisma.director.upsert({
                    where: { name },
                    update: {},
                    create: { name }
                });
            })
        );

        // Ensure genres exist
        const genreRecords = await Promise.all(
            genresArray.map(async (name) => {
                return await prisma.genre.upsert({
                    where: { name },
                    update: {},
                    create: { name }
                });
            })
        );

        // Now, create the movie and associate the actors, directors, and genres
        const movie = await prisma.movie.create({
            data: {
                title: movieData.Title,
                year: parseInt(movieData.Year),
                runtime: parseInt(movieData.Runtime),
                plot: movieData.Plot,
                poster: movieData.Poster,
                actors: {
                    create: actorRecords.map(actor => ({
                        actor: { connect: { id: actor.id } }
                    }))
                },
                directors: {
                    create: directorRecords.map(director => ({
                        director: { connect: { id: director.id } }
                    }))
                },
                genres: {
                    create: genreRecords.map(genre => ({
                        genre: { connect: { id: genre.id } }
                    }))
                }
            }
        });

        console.log("Movie created:", movie);
        // Write the data to the database
        // await prisma.movie.create({
        //     data: {
        //         title: movieData.Title,
        //         year: parseInt(movieData.Year),
        //         runtime: parseInt(movieData.Runtime),
        //         plot: movieData.Plot,
        //         poster: movieData.Poster,
        //         actors: movieData.Actors,
        //         directors: movieData.Director,
        //         genres: movieData.Genre
        //     }
        // });
        
        return NextResponse.json(responseBody);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}