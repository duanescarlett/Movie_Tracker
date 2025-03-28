import NextAuth, { User } from "next-auth"

// Extend the User type to include the username property
declare module "next-auth" {
  interface User {
    username: string;
  }
}
import CredentialsProvider from "next-auth/providers/credentials"
import getUser from '@/buslogic/getUser';
import { hashPassword } from "@/utils/encryption";
import Email from "next-auth/providers/email";
import { login } from "@/app/auth/auth";
// import { uuid } from "uuidv4";
// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [

//   ],
// }

// export default NextAuth(authOptions)
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

          console.log("User Object: => ", user) 
          if (user == "Incorrect password" || user == "User not found") {
            return null;
          } else {
            await login(user.email, user.username)
            return user as User;
            // return user;
          }

        }
        
      }),
    ],
    callbacks: {
      async jwt({ token, user, account, trigger }) {
        console.log("JWT callback", { token, user, account })
        
        if (trigger === "update" && user?.username) {
          token.name = user.username;
        }
        
        if (user) {
          return {
            ...token,
            id: user.id,
            name: user.username,
            email: user.email,
          };
        }
        return token;
      },
      async session({ session, token, user }) {
        console.log("session callback", { session, token, user })
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            email: token.email
          }
        }
      }
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
    },
  })
  
  export { handler as GET, handler as POST }