import NextAuth, { User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import getUser from '@/buslogic/getUser';
import logger from "@/services/logger";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

// Extend the NextAuth `User` and `Session` types to include the `id` property
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
  }

  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

// Initialize the logger instance
// const log = logger();

const handler = NextAuth({
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: {
            label: "Email",
            type: "text",
            placeholder: "email@email.com"
          },
          password: { 
            label: "Password", 
            type: "password",
            placeholder: "password"
          }
        },
        authorize: async (credentials) => {
          if (!credentials?.password) {
            throw new Error("Password is required");
          }

          let user = await getUser({ 
            email: credentials?.email || '',  
            password: credentials.password, 
          });

          console.log("User Object: => ", user);
          // log.info("User Object: => ", user);
          if (!user || user === "Incorrect password" || user === "User not found") {
            return null;
          } else {
            // Ensure the returned user object has id and email properties
            return {
              id: user.id.toString(), // Convert id to string
              email: user.email, // Ensure userId is set
              name: user.name // Optionally set name
            };
          }
          // Always return null if no valid user
          return null;
        }
      }),
    ],
    callbacks: {
      async jwt({ token, user }: { token: JWT; user?: User }) {
        if (user) {
          token.id = user.id.toString(); // Convert id to string
          token.email = user.email;
        } 
        return token;
      },
      async session({ session, token }: { session: Session; token: JWT }) {
        if (token) {
          session.user = session.user || {}; // Ensure session.user exists
          session.user.id = token.id as string; // Include user.id in the session
          session.user.email = token.email;
        }
        return session; // Explicitly return the session object
      }
    },
    // secret: process.env.NEXTAUTH_SECRET,
    // session: {
    //   strategy: "jwt",
    // },
  })
  
  export { handler as GET, handler as POST }