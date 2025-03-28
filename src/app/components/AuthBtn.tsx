'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import { logout } from "@/app/auth/auth";

export default function Component() {
  const { data: session } = useSession()

  const appentSignOut = async () => {
    await signOut()
    
  }

  if (session) {
    return (
      <>
        {/* Signed in as {session?.user?.email} <br /> */}
        <button 
          onClick={() => signOut()} 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign out
        </button>
      </>
    )
  }
  return (
    <>
      <button 
        onClick={() => signIn()} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign in
      </button>
    </>
  )
}