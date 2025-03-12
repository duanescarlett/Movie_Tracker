import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import getUser from '@/buslogic/getUser';
import { hashPassword } from "@/utils/encryption";
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
        authorize: async (credentials, req) => {
  
          // const cols = collection(db, "users")
          
            // const cols = collection(db, "users")
            // const cols = collection(db, "users")
            
          console.log(credentials)
          if (!credentials?.password) {
            throw new Error("Password is required");
          }
          // const hash = await hashPassword(credentials.password);

          const user = await getUser({ 
            email: credentials?.email || '',  
            password: credentials.password, 
          });

          return user;
          
        }
        
      }),
    ],
  })
  
  export { handler as GET, handler as POST }