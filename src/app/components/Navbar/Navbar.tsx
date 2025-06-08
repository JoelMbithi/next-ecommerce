'use client'
import Link from 'next/link'
import React from 'react'
import Menu from '../Navbar/Menu'
import Search from './Search'
import Icons from './Icons'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div className='  h-15 top-0 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 sticky z-50  backdrop-blur-md'>
      <div className='h-full flex items-center justify-between md:hidden '>
        {/* mobile */}
      
      <Link href='/' className='text-2xl tracking-wide'>
      Joe
      </Link>
      <Menu />
      
      </div>

      {/* desktop */}

      <div className='hidden md:flex items-center justify-between gap-8 h-full'>
        {/* Left */}
         <div className='w-1/3 xl:w-1/2 flex items-center gap-4 xl:gap-8'>
         
        
          <Link href='/' className='flex items-center gap-3'>
           <Image src='/logo.png' alt='logo' width={24} height={24}  />
           <div className='text-2xl tracking-wide'>
            Joe
           </div>
      </Link>
         </div>
         {/* links */}
            <div className='hidden xl:flex     gap-4'>
              <Link href="/">Home</Link>
          <Link href="/list">Shop</Link>
         
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
         
            </div>
         {/* Right */}
         <div className='w-2/3 xl:w-1/2 flex justify-between items-center  gap-8'>
            <Search />
            <Icons/>
         </div>
      </div>
    </div>
  )
}

export default Navbar
