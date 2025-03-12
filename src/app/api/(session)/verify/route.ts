import { NextResponse } from "next/server";
import { verifySession } from "@/app/auth/sessions"; // Adjust the path if needed

export async function GET() {
  try {
    const session = await verifySession();
    
    return NextResponse.json(session, { status: 200 });
  } catch (error) {
    return NextResponse.json({ isAuth: false, error: "Session invalid" }, { status: 401 });
  }
}