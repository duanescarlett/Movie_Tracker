import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/utils/encryption";

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Compare hashed password
    const passwordMatch = await verifyPassword(password, existingUser.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, error: "Incorrect password" },
        { status: 401 }
      );
    }

    // Exclude the password before sending the user object
    const { password: _, ...safeUser } = existingUser;

    return NextResponse.json({ success: true, user: safeUser });
    
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching user:", error.message);
    } else {
      console.error("Error fetching user:", error);
    }
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
