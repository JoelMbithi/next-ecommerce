import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Category = () => {
  return (
    <div className="px-4 overflow-x-scroll">
      <div className="mt-12 flex gap-x-8 gap-y-16 flex-wrap ">
        {/* Link wrapping image + heading */}
        <Link
          href={'/category?cat=text'}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
        >
          <div className="relative bg-slate-100 w-full h-80 group rounded overflow-hidden">
            {/* FRONT IMAGE */}
            <Image
              className="absolute object-cover rounded z-10 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
              src="/trouser.jpg"
              alt="Trouser Front"
              fill
              sizes="25vw"
            />
            {/* BACK IMAGE */}
            <Image
              className="absolute object-cover rounded opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
              src="/trouser2.jpg"
              alt="Trouser Back"
              fill
              sizes="25vw"
            />
          </div>

          <h1 className="mt-4 font-light truncate tracking-wide text-lg text-gray-700">
            Category
          </h1>
        </Link>

        {/* Description aligned below the card container */}
        <div className="w-full sm:w-[45%] lg:w-[22%] flex flex-col gap-y-4">
          <div className="flex flex-col">
            <span className="text-2xl text-slate-600 font-bold mb-1">
              Product Name
            </span>
            <span className="mb-1 text-xl text-gray-700">Category</span>
            <span className="text-gray-500 mb-1 text-sm">
              Description goes here, brief and clear.
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">$63.89</span>
            <button className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300">
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category
