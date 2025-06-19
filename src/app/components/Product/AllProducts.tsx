'use client';

import Image from 'next/image';
import React from 'react';
import ProductList from './ProductList';

const AllProducts = () => {
  return (
    <div className='px-4  relative'>
      {/* CAMPAIGN */}
      <div className='hidden md:flex bg-pink-200 px-4 justify-between gap-8 h-64'>
        <div className='w-2/3 flex flex-col items-center justify-center gap-8'>
          <h1 className='text-4xl font-semibold leading-[48px] text-gray-700'>
            Grab up to 50% off on <br />Selected Products
          </h1>
          <button className='rounded-3xl bg-red-400 text-white w-max py-3 px-5 text-sm'>
            Buy Now
          </button>
        </div>

        {/* IMAGE */}
        <div className='relative w-1/3'>
          <Image src='/woman.png' fill alt='' className='object-contain' />
        </div>
      </div>

      {/* Remove onClick wrapper */}
      <div className="mt-6">
        <ProductList />
      </div>
    </div>
  );
};

export default AllProducts;
