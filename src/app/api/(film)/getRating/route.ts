import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const movieId = Number(url.searchParams.get("movieId"));

    
        const averageRating = await prisma.rating.aggregate({
            where: { movieId: movieId },
            _avg: { rating: true },
          });
        //   console.log(averageRating._avg.rating);
        
        return NextResponse.json(averageRating._avg.rating);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}