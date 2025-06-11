import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Category = () => {
  return (
    <div className="px-4">
      <div className="mt-12 flex gap-x-8 gap-y-16 overflow-x-auto whitespace-nowrap pb-4">
        
          <div
            
            className="min-w-[250px] max-w-[250px] shadow p-3 rounded-md bg-white flex-shrink-0 flex flex-col justify-between"
          >
            <Link href="/category?cat=trouser" className="flex flex-col gap-3">
              <div className="relative bg-slate-100 w-full h-64 group rounded overflow-hidden">
                <Image
                  className="absolute object-cover rounded z-10 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                  src="/trouser.jpg"
                  alt="Trouser Front"
                  fill
                  sizes="25vw"
                />
                <Image
                  className="absolute object-cover rounded opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                  src="/trouser2.jpg"
                  alt="Trouser Back"
                  fill
                  sizes="25vw"
                />
              </div>
              <h1 className="mt-2 font-light truncate tracking-wide text-lg text-gray-700">
                Trousers
              </h1>
            </Link>

            <div className="flex flex-col mt-2">
              <span className="text-xl text-slate-700 font-bold mb-1">Classic Trousers</span>
              <span className="text-md text-gray-700 mb-1">Clothing</span>
              <p className="text-gray-500 text-sm line-clamp-2 h-10">
                Stylish and comfortable cotton trousers for all-day wear and flexibility.
              </p>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="font-semibold text-lg text-blue-600">$63.89</span>
              <button className="px-4 py-1 ring-1 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition duration-300">
                Add to Cart
              </button>
            </div>
          </div>
      
      </div>
    </div>
  )
}

export default Category
