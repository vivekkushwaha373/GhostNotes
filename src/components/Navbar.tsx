'use client'

import { User } from 'next-auth';
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const Navbar = () => {
    const { data: session } = useSession();
    
    const user = session?.user as User;
    const path = usePathname();
   
    return (
        <nav className='p-4 md:p-6 shadow-md w-full z-10'>
            <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
                <a className='text-xl font-bold mb-4 md:mb-0' href="/dashboard">Ghost Notes</a>
                {
                    session ? (
                        <div className='flex md:gap-4 justify-between items-center w-full md:w-auto'>
                            <span className='mr-4 invisible w-0 fixed md:relative  md:visible md:w-auto '>Welcome, {user?.username || user?.email}</span>
                            <Button className='cursor-pointer' onClick={() => signOut()}>Logout</Button>
                            {path!=='/dashboard'?
                                (<Link href='/dashboard'>
                                <Button className=' cursor-pointer w-full md:w-auto' >Dashboard</Button>
                            </Link>):
                            (
                            <Link href='/'>
                                <Button className='w-full md:w-auto' >Home</Button>
                            </Link>
                            )
                            }
                        </div>
                    ) : (
                            
                            <Link href='/signin'>
                                <Button className='w-full md:w-auto' >Login</Button>
                            </Link>
                           
                           
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar
