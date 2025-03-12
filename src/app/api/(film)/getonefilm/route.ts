import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const filmTitle = url.searchParams.get("title");

        if (!filmTitle) {
            return NextResponse.json({ error: "Film title is required" }, { status: 400 });
        }

        const movie = await prisma.movie.findFirst({
            where: { title: filmTitle },
        });

        if (!movie) {
            return NextResponse.json({ error: "Film not found" }, { status: 404 });
        }

        return NextResponse.json({ movie });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}