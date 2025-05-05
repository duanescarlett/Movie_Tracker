import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const { rating, userId, movieId } = await req.json();
        
        // Validate rating
        if (rating < 1 || rating > 10) {
            return NextResponse.json(
                { error: "Rating must be between 1 and 10." },
                { status: 400 }
            );
        }
    
        const res = await prisma.rating.create({
            data: {
                movie: { connect: { id: movieId } }, // Connect to the movie by ID
                source: 'user', // e.g., "IMDb", "Rotten Tomatoes"
                rating: rating, // Ensure decimal type for rating
                user: userId ? { connect: { id: userId } } : undefined, // Optional user association
            },
        });
        
        return NextResponse.json(res);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}