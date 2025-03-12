import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        // Now, create the movie and associate the actors, directors, and genres
        const movies = await prisma.movie.findMany();
        const responseBody = { movies };

        return NextResponse.json(responseBody);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}