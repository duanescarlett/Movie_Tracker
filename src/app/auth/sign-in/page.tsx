// 'use client';
import Link from 'next/link';
// import React, { useState, useActionState } from 'react';
import { signin } from '@/app/auth/sign-in/actions';
// import { signIn as authSignIn } from "@/auth"

const Login = () => {
  return (
    <form
      action={async (formData) => {
        "use server"
        // await authSignIn("credentials", formData)
      }}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  )
  // const [formData, setFormData] = useState({
  //   email: '',
  //   password: ''
  // });
  // const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState('');
  // const [state, action, pending] = useActionState(signin, undefined);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // return (
  //   <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
  //     <h2 className="text-2xl font-bold mb-4">Login</h2>
  //     {message && <p className="mb-4 text-center text-sm text-gray-600">{message}</p>}
  //     <form action={async (formData) => {
  //       "use server"
  //       await authSignIn("credentials", formData)
  //     }} className="space-y-4">
  //       {state?.errors?.email && <p className="text-red-500 text-xs">{state.errors.email}</p>}
  //       <input 
  //         type="email" 
  //         name="email" 
  //         placeholder="Email" 
  //         value={formData.email} 
  //         onChange={handleChange} 
  //         className="w-full p-2 border rounded" 
  //       />
  //       {state?.errors?.password && <p className="text-red-500 text-xs">{state.errors.password}</p>}
  //       <input 
  //         type="password" 
  //         name="password" 
  //         placeholder="Password" 
  //         value={formData.password} 
  //         onChange={handleChange} 
  //         className="w-full p-2 border rounded" 
  //       />
  //       <button 
  //         type="submit" 
  //         className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
  //         disabled={loading}
  //       >
  //         {pending ? 'Logging in...' : 'Login'}
          
  //       </button>
  //       <div>
  //         <p>Dont have an account?</p>
  //         <Link href="/sign-up" className="text-blue-600 hover:underline">Sign Up</Link>
  //       </div>
  //     </form>
  //   </div>
  // );
}

export default Login;