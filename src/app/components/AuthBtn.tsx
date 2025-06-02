'use client'
import { useSession, signIn, signOut } from "next-auth/react"
// const Component = ({ sessionData }: { sessionData: any }) => {
const Component = () => {
  const { data: session } = useSession()
  const appentSignOut = async () => {
    await signOut()
    
  }

  if (session) {
    // console.log("This is the session with cookies :> ", sessionData)
    return (
      <>
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

export default Component;