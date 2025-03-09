import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RequestBody = {
  email: string;
  username: string;
  password: string;
};

export async function POST(req: Request) {

  let body: RequestBody;

  try {
    // Ensure body is not empty before parsing
    const text = await req.text();
    if (!text) {
      return NextResponse.json({ success: false, error: "Request body is empty" }, { status: 400 });
    }

    // Parse the JSON
    body = JSON.parse(text);
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid JSON format" }, { status: 400 });
  }

  const { email, username, password } = body;

  if (!email || !username || !password) {
    return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ success: false, error: "Email already in use" }, { status: 409 });
    }

    await prisma.user.create({ data: { email, username, password } });
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ success: false, error: "Failed to create user" });
  }
  
}
