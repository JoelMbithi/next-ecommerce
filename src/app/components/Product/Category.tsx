import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import newRequest from '../../../utils/newRequest.js'

type Product = {
  product_id: string | number;
  product_name?: string;
  product_description?: string;
  product_category?: string;
  sell_price?: number;
  category_name?: string;
  variants: {
    product_items_id: number | string;
    color_name?: string;
    original_price?: number;
    sell_price?: number;
    images: string[];
  }[];
};

const Category = () => {
  const [product, setProduct] = useState<Product[]>([])

  const fetchProduct = async () => {
    try {
      const res = await newRequest.get('/product/getAllProduct')
      setProduct(res.data.data)
      console.log(res.data.data)
    } catch (error) {
      console.log("Error")
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <div className="px-4">
      <div className="mt-12 flex gap-x-8 gap-y-16 overflow-x-auto whitespace-nowrap pb-4">
        {product && product.map((product) => (
          <div
            key={product.product_id}
            className="min-w-[250px] max-w-[250px] shadow p-3 rounded-md bg-white flex-shrink-0 flex flex-col justify-between"
          >
            <Link href={`/category?cat=${product.product_category || 'default'}`} className="flex flex-col gap-3">
              <div className="relative bg-slate-100 w-full h-64 group rounded overflow-hidden">
               <div className="relative w-full h-72 group">
  {/* First image (default) */}
  <Image
    className="absolute object-cover rounded z-10 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
    src={product.variants[0]?.images[0] || "/placeholder1.jpg"}
    alt={`${product.product_name} Front`}
    fill
    sizes="25vw"
  />

  {/* Second image (on hover) */}
  <Image
    className="absolute object-cover rounded opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
    src={product.variants[0]?.images[1] || "/placeholder2.jpg"}
    alt={`${product.product_name} Back`}
    fill
    sizes="25vw"
  />
</div>

              </div>
              <h1 className="mt-2 font-light truncate tracking-wide text-lg text-gray-700">
                {product.product_name || 'Trousers'}
              </h1>
            </Link>

            <div className="flex flex-col mt-2">
              <span className="text-xl text-slate-700 font-bold mb-1">{product.product_name || 'Classic Trousers'}</span>
              <span className="text-md text-gray-700 mb-1">{product.category_name || 'Clothing'}</span>
              <p className="text-gray-500 text-sm line-clamp-2 h-10">
                {product.product_description || 'Stylish and comfortable cotton trousers for all-day wear and flexibility.'}
              </p>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="font-semibold text-lg text-blue-600">
                ${product.sell_price || '63.89'}
              </span>
              <button className="px-4 py-1 ring-1 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Category
