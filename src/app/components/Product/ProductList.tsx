import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import newRequest from '../../../utils/newRequest';

type Variant = {
  images: string[];
  sell_price: number;
};

type Product = {
  product_id: string | number;
  product_name: string;
  product_description: string;
  variants: Variant[];
  category_image?: string; // Add this since your API returns it
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  const fetchProduct = async () => {
    try {
      const res = await newRequest.get('/product/getAllProduct');
      console.log("API Response:", res.data.data);
      setProducts(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleImageClick = (product: Product) => {
    // First try to use variants[0].images, then category_image, then fallback to defaults
    let imagesToPass = [];
    
    if (product.variants?.[0]?.images?.length > 0) {
      imagesToPass = product.variants[0].images;
    } else if (product.category_image) {
      imagesToPass = [product.category_image];
    } else {
      imagesToPass = ['/pods1.avif', '/pods.avif', '/pods3.avif'];
    }
    
    // Also pass product ID to fetch details in ProductImages
    router.push(`/ProductImages?images=${encodeURIComponent(JSON.stringify(imagesToPass))}&productId=${product.product_id}`);
  };

  return (
    <div className="px-4">
      <div className="mt-12 flex gap-x-8 gap-y-16 overflow-x-auto whitespace-nowrap pb-4">
        {products.map((product) => {
          // Determine which image to show in the list
          const mainImage = product.variants?.[0]?.images?.[0] || 
                          product.category_image || 
                          '/pods1.avif';
          const hoverImage = product.variants?.[0]?.images?.[1] || 
                           product.category_image || 
                           '/pods.avif';

          return (
            <div
              key={product.product_id}
              className="min-w-[250px] max-w-[250px] shadow p-3 rounded-md bg-white flex-shrink-0 flex flex-col justify-between"
            >
              {/* Image Gallery */}
              <div
                className="relative bg-slate-100 w-full h-64 group rounded overflow-hidden cursor-pointer"
                onClick={() => handleImageClick(product)}
              >
                <Image
                  className="absolute object-cover rounded z-10 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                  src={mainImage}
                  alt={product.product_name}
                  fill
                  sizes="25vw"
                />
                <Image
                  className="absolute object-cover rounded opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                  src={hoverImage}
                  alt={product.product_name}
                  fill
                  sizes="25vw"
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col mt-2">
                <span className="text-xl text-slate-700 font-bold mb-1">{product.product_name}</span>
                <p className="text-gray-500 text-sm line-clamp-2 h-10">{product.product_description}</p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="font-semibold text-lg text-blue-600">
                  ${product.variants[0]?.sell_price || '63.89'}
                </span>
                <button className="px-4 py-1 ring-1 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;