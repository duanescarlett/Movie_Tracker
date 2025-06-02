import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const { rating, userId, movieId } = await req.json();
        console.log("Received data:", { rating, userId, movieId });
        // Validate rating
        if (rating < 1 || rating > 10) {
            return NextResponse.json(
                { error: "Rating must be between 1 and 10." },
                { status: 400 }
            );
        }
    
        console.log("Data being sent to Prisma:", {
            movie: { connect: { id: movieId } },
            source: 'user',
            rating: rating,
            user: userId ? { connect: { id: userId } } : undefined,
        });

        const existingRating = await prisma.rating.findFirst({
            where: {
                movieId: parseInt(movieId, 10),
                userId: userId ? parseInt(userId, 10) : undefined,
            },
        });

        if (existingRating) {
            return NextResponse.json(
                { error: "A rating for this movie by this user already exists." },
                { status: 400 }
            );
        }

        const res = await prisma.rating.create({
            data: {
                movie: { connect: { id: parseInt(movieId, 10) } }, // Convert movieId to integer
                source: 'user',
                rating: rating,
                user: userId ? { connect: { id: parseInt(userId, 10) } } : undefined, // Convert userId to integer
            },
        });
        
        return NextResponse.json(res);
    } catch (error: any) {
        console.error("Error in rateFilm API route:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}