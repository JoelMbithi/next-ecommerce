'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import CaortModal from '../Cart/CaortModal'

const Icons = () => {
    const [isOpenProfile, setIsOpenProfile] = useState(false)
    const [isOpenCart,setIsOpenCart] = useState(false)

    const router = useRouter();

    const isLoggedIn = false
    const handleProfile = () => {
        if(!isLoggedIn){
          router.push('/login')
        }
        setIsOpenProfile ((prev) => !prev)
    }

    const handleCart = () => {
        if(!isLoggedIn){
            router.push('/login')
        }

        setIsOpenCart ((prev) => !prev)
    }
    return (
    <div>
        <div className=' relative flex items-center gap-4 xl:gap-6'>
            <div className='cursor-pointer'>
            <img onClick={handleProfile} src='/profile.png' alt='search' width={24} height={24} />
            {isOpenProfile && (
                <div className='absolute p-4 rounded-md top-8 bg-slate-300 left-0 text-sm'>
                    <Link href={''} >profile</Link>
                    <div className='mt-2 cursor-pointer'>
                        Logout
                    </div>

                </div>
            )}
            </div>
            <div className='cursor-pointer'>
            <img src='/notification.png' alt='notification' width={24} height={24} />
            </div>
            <div className='cursor-pointer'>
            <img onClick={handleCart} src='/cart.png' alt='profile' width={24} height={24} />
            <div className='absolute -top-4  -right-4 w-6 h-6 bg-red-500 rounded-full text-white text-sm flex items-center justify-center'>2</div>
            {isOpenCart && (
               
                 <CaortModal/>
                
            )}
            </div>
        </div>
    </div>
  )
}

export default Icons
