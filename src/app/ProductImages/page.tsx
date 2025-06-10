'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import CustomizedProducts from '../components/Product/CustomizedProducts';
import Add from '../components/Product/Add';

const ProductImages = () => {
  const images = [
    { id: 1, src: '/pods1.avif', alt: 'Modern House Exterior' },
    { id: 2, src: '/pods.avif', alt: 'Cozy Living Room' },
    { id: 3, src: '/pods3.avif', alt: 'Spacious Kitchen' },
    { id: 4, src: '/images/house4.jpg', alt: 'Luxury Bathroom' },
  ];

  const [index, setIndex] = useState(0);

  return (
    <div className="p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Section */}
        <div className="lg:w-3/5 w-full">
          {/* Main Image */}
          <div className="relative w-full h-[500px]">
            <Image
              src={images[index].src}
              alt={images[index].alt}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover rounded-md"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 mt-6 flex-wrap">
            {images.map((img, i) => (
              <div
                key={img.id}
                className={`relative w-20 h-20 cursor-pointer border-2 rounded-md hover:border-blue-500 ${
                  index === i ? 'border-blue-500' : 'border-transparent'
                }`}
                onClick={() => setIndex(i)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="10vw"
                  className="object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Text Section */}
        <div className="lg:w-2/5 w-full">
          <h2 className="text-2xl font-bold mb-4">Digital Incense</h2>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            aliquam, justo ut vulputate malesuada.
          </p>
          <div className='h-[10px] mb-5 bg-gray-100'/>
         <div className='flex gap-4 items-center'>
           <p className="text-lg font-semibold text-slate-600 line-through">$78.09</p>
          <p className="text-lg font-semibold text-blue-600">$56.09</p>
         </div>
            <div className='h-[10px] mt-5 bg-gray-100'/>
       
          <CustomizedProducts/>
          <Add/>
          <div className='text-sm mt-4'>
            <h4 className='font-medium mb-4'>Title</h4>
            <p className='mb-4 text-slate-600'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat deleniti veniam molestias debitis rem obcaecati ducimus ab est ipsum illum omnis esse vero, sapiente itaque delectus sit in natus modi!
            </p>
          </div>
          <div className='text-sm'>
            <h4 className='font-medium mb-4'>Title</h4>
            <p className='mb-4 text-slate-600'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat deleniti veniam molestias debitis rem obcaecati ducimus ab est ipsum illum omnis esse vero, sapiente itaque delectus sit in natus modi!
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ProductImages;
