'use client'
import Link from 'next/link'
import MobileMenu from '@/app/components/MobileMenu'
import Image from 'next/image'
import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs'

// import { SignedIn, SignedOut } from '@clerk/clerk-react'
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
const Navbar = () => {

    
    
    return (
        <div className='h-24 flex items-center justify-between textStyleBold'>
            {/* LEFT */}
            <div className='md:hidden lg:block w-[20%]'>
                <Link href={'/'}>
                    SMS Movie Tracker
                </Link>
            </div>
            {/* CENTER */}
            {/* <div className='hidden md:flex w-[50%] text-sm items-center justify-between'> */}
            <div className="hidden md:flex w-[50%] text-sm items-center justify-evenly">
                {/* LINKS */}
                <div className='flex gap-6 textStyleBold'>
                    <Link href={'/'} className='flex gap-2'>    
                        <Image 
                            // src="/home.png" 
                            src="/vercel.svg"
                            alt="Image description" 
                            width={16} 
                            height={16} />
                        <span>Homepage</span>
                    </Link>
                    <Link href={'/'} className='flex gap-2'>    
                        <Image 
                            // src="/home.png" 
                            src="/vercel.svg"
                            alt="Image description" 
                            width={16} 
                            height={16} />
                        <span>Members</span>
                    </Link>
                    <Link href={'/'} className='flex gap-2'>    
                        <Image 
                            // src="/home.png" 
                            src="/vercel.svg"
                            alt="Image description" 
                            width={16} 
                            height={16} />
                        <span>Stories</span>
                    </Link>
                </div>
                <div className='hidden xl:flex p-2 bg-slate-100 items-center rounded-xl'>
                    <input type="text" placeholder="search..." className="bg-transparent outline-none"/>
                    <Image src="/search.png" alt="" width={14} height={14}/>
                </div>
            </div>
            {/* RIGHT */}
            <div className='w-[50%] flex items-center gap-4 xl:gap-8 justify-end'>
                <ClerkLoading>
                    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <div className='cursor-pointer'>
                            <Image src="/people.png" alt="" width={20} height={20} />
                        </div>
                        <div className='cursor-pointer'>
                            <Image src="/messages.png" alt="" width={20} height={20} />
                        </div>
                        <div className='cursor-pointer'>
                            <Image src="/notifications.png" alt="" width={20} height={20} />
                        </div>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <div className='flex items-center gap-2 cursor-pointer text-sm'>
                            <Image src="/login.png" alt="login button" width={20} height={20} />
                            <Link href="/sign-in">Login / Register</Link>
                        </div>
                    </SignedOut>                
                </ClerkLoaded>
                <MobileMenu />
            </div>
        </div>
    )
}

export default Navbar
