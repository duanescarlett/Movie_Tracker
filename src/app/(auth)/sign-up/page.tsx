'use client';
import React, { useState, useActionState } from 'react';
import { signup } from '@/app/(auth)/sign-up/actions';
import Link from 'next/link';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [state, action, pending] = useActionState(signup, undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async () => {
  //   // e.preventDefault();
  //   setLoading(true);
  //   setMessage('');

  //   createUser(formData); // Send this to actions

  //   setLoading(false);
  // };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {message && <p className="mb-4 text-center text-sm text-gray-600">{message}</p>}
      <form action={action} className="space-y-4">
      {state?.errors?.username && <p className="text-red-500 text-xs">{state.errors.username}</p>}
        <input 
          type="text" 
          name="username" 
          placeholder="Username" 
          value={formData.username} 
          onChange={handleChange} 
          className="w-full p-2 border rounded" 
        />
        
        {state?.errors?.email && <p className="text-red-500 text-xs">{state.errors.email}</p>}
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          className="w-full p-2 border rounded" 
        />
        
        {state?.errors?.password && <p className="text-red-500 text-xs">{state.errors.password}</p>}
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
          className="w-full p-2 border rounded" 
        />
        
        <p className="text-xs text-gray-500">Password must be at least 8 characters</p>
        
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={pending}
        >
          {pending ? 'Registering...' : 'Register'}
          

        </button>          
        <div>
          <p>Already have an account?</p>
          <Link href="/sign-in" className="text-blue-600 hover:underline">Sign In</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;