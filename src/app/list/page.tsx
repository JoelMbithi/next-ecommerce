'use client'

import Image from 'next/image'
import React from 'react'
import Filter from '../components/Filter/Filter'
import { useRouter } from 'next/navigation'
import ProductList from '../components/Product/ProductList'

const List = () => {
  const router = useRouter()

  return (
    <div className='px-4 py-8 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative'>
      {/* CAMPAIGN */}
      <div className='hidden md:flex bg-pink-200 px-4 justify-between gap-8 h-64'>
        <div className='w-2/3 flex flex-col items-center justify-center gap-8'>
          <h1 className='text-4xl font-semibold leading-[48px] text-gray-700'>
            Grab up to 50% off on <br />Selected Products
          </h1>
          <button 
            onClick={() => router.push('/ProductImages')}
            className='rounded-3xl bg-red-400 text-white w-max py-3 px-5 text-sm'
          >
            Buy Now
          </button>
        </div>

        {/* IMAGE */}
        <div className='relative w-1/3'>
          <Image src='/woman.png' fill alt='' className='object-contain' />
        </div>
      </div>

      {/* FILTER */}
      <div>
        <Filter />
      </div>

      {/* Product List - No wrapping h1 tag */}
      <div className="mt-6">
        <ProductList />
      </div>

      {/* Optional "View All" link */}
      <button
        onClick={() => router.push('/ProductImages')}
        className='mt-4 text-blue-500 hover:underline'
      >
        View All Products
      </button>
    </div>
  )
}

export default List