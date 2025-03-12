import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import getUser from '@/buslogic/getUser';
import { hashPassword } from "@/utils/encryption";
import Email from "next-auth/providers/email";
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

          console.log("GET User: > ", user)

          return user
          
        }
        
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        console.log("JWT callback", { token, user })
        if (user) {
          return {
        ...token,
        id: user.id,
        name: user.name,
        email: user.email,
          };
        }
        return token;
      },
      async session({ session, token }) {
        console.log("session callback", { session, token })
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