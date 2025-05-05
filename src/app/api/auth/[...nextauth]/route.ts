import NextAuth, { User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import getUser from '@/buslogic/getUser';

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
          if (user == "Incorrect password" || user == "User not found") {
            return null;
          } else {
            return user as User;
          }
        }
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.email = user.email;
        } 
        return token;
      },
      async session({ session, token }) {
        if (token && session.user) {
          session.user.name = token.id as string;
          session.user.email = token.email;
        }
        return session;
      }
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
    },
  })
  
  export { handler as GET, handler as POST }