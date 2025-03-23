// export { default } from "next-auth/middleware"

// export const config = { matcher: ["/signout"]}
import { NextRequest } from "next/server";
import { updateSession } from "@/app/auth/auth";

export default async function middleware(request: NextRequest) {
  return await updateSession(request);
}