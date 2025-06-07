'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductList = () => {
  return (
    <div className='mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap'>
      <Link href={'/product'} className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]' >
        <div className='relative w-full h-80 group'>
          {/* Front image */}
          <Image
            className='absolute object-cover rounded z-10 transition-opacity duration-500 ease-in-out group-hover:opacity-0'
            src="/jacket.avif"
            alt="Jacket preview 1"
            fill
            sizes='25vw'
          />

          {/* Back image */}
          <Image
            className='absolute object-cover rounded opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out'
            src="/jacket.webp"
            alt="Jacket preview 2"
            fill
            sizes='25vw'
          />
          
          </div>
          {/* Description */}
          <div className='p-2 flex flex-col gap-y-2'>
            <div className='flex  justify-between mt-2 '>
            <span className='font-bold text-slate-600  '>Product Name</span>
            <span className='text-blue-600 text-xl'>$56.09</span>
          </div>
          <div className='text-gray-500   text-sm '>My Description</div>
          <button className='flex ring-1 ring-lama text-red-400 w-max p-2 hover:bg-red-400 hover:text-white   mt-3 rounded-full justify-center'>Add to Cart</button>
          </div>
       
      </Link>
    </div>
  )
}

export default ProductList
