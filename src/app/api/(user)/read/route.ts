import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const password = searchParams.get("password");

  if (!email || !password) {
    return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return NextResponse.json({ success: false, error: "Incorrect password" }, { status: 401 });
    }

    return NextResponse.json({ success: true, user: existingUser });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch user" });
  }
}