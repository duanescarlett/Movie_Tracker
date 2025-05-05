'use client'
import Link from 'next/link'
import MobileMenu from '@/app/components/MobileMenu'
import Image from 'next/image'
import AuthBtn from './AuthBtn'
import { useSession } from "next-auth/react";

import { ChangeEvent, useEffect, useState } from 'react'
import getOneFilm from '@/buslogic/getOneFilm'

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [singleFilm, setSingleFilm] = useState<string>('')
    const { data: session } = useSession();

    console.log("Session data:", session); // Debugging log to check session data

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    useEffect(() => {
        const fetchFilm = async () => {
            if (searchQuery) {
                const film = await getOneFilm(searchQuery)
                console.log(film)
                setSingleFilm(film.movie.title)
            }
        }
        fetchFilm()
    }, [searchQuery])

    return (
        <div className='w-full h-24 flex items-center justify-between textStyleBold'>
            {/* LEFT */}
            <div className='md:hidden lg:block w-[20%]'>
                <Link href={'/'}>
                    SMS Movie Tracker
                </Link>
            </div>
            
            {/* CENTER */}
            <div className="hidden md:flex w-[50%] text-sm items-center justify-evenly">
                <div className='flex gap-6 textStyleBold'>
                    <Link href={'/'} className='flex gap-6'>    
                        <Image 
                            src="/vercel.svg"
                            alt="Image description" 
                            width={16} 
                            height={16} />
                        <span>Homepage</span>
                    </Link>
                    <Link href={'/'} className='flex gap-2'>    
                        <Image 
                            src="/vercel.svg"
                            alt="Image description" 
                            width={16} 
                            height={16} />
                        <span>Members</span>
                    </Link>
                    <Link href={'/'} className='flex gap-2'>    
                        <Image 
                            src="/vercel.svg"
                            alt="Image description" 
                            width={16} 
                            height={16} />
                        <span>Stories</span>
                    </Link>
                </div>
            </div>
            
            {/* RIGHT */}
            <div className='w-[50%] flex items-center gap-4 xl:gap-8 justify-end'>
                <div className='relative hidden md:flex xl:flex p-2 bg-slate-100 items-center rounded-xl'>
                    <input 
                        type="text" 
                        placeholder="search..." 
                        className="bg-transparent outline-none"
                        onChange={(e) => handleInputChange(e)}
                    />
                    <Image src="/search.png" alt="" width={14} height={14}/>
                    {searchQuery && (
                        <div className='absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg'>
                            <ul>
                                <li className='p-2 hover:bg-gray-100'>
                                    {singleFilm && (
                                        <Link 
                                            href={`/film/${singleFilm}`}>
                                            {searchQuery}
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                {session && session.user && (
                    <div className="text-sm text-gray-700">
                        {/* Logged in as: {session.user.email} (ID: {session.user.name}) */}
                    </div>
                )}
                <AuthBtn />
                <MobileMenu />
            </div>
        </div>
    )
}

export default Navbar
