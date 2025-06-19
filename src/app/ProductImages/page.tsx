'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CustomizedProducts from '../components/Product/CustomizedProducts';
import Add from '../components/Product/Add';
import newRequest from '@/utils/newRequest';

type Variant = {
  size_name?: string;
  color_name?: string;
  sell_price: number;
  original_price: number;
  images?: string[]; // Variant-specific images
};

type Product = {
  product_id: string | number;
  product_name: string;
  product_description: string;
  variants: Variant[];
  category_image?: string;
};

const ProductImages = () => {
  const searchParams = useSearchParams();
  const [index, setIndex] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Get product ID and images from URL
  const productId = searchParams.get('productId');
  const imagesParam = searchParams.get('images');

  // Fetch product details
  useEffect(() => {
    if (productId) {
      setLoading(true);
      newRequest.get(`/product/getProduct/${productId}`)
        .then(res => {
          const productData = res.data.data;
          setProduct(productData);
          
          // Set initial selected variant
          if (productData?.variants?.length > 0) {
            setSelectedVariant(productData.variants[0]);
            setSelectedSize(productData.variants[0].size_name || null);
            setSelectedColor(productData.variants[0].color_name || null);
          }
          
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching product:', err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [productId]);

  // Handle variant selection
  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    updateSelectedVariant(size, selectedColor);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    updateSelectedVariant(selectedSize, color);
  };

  const updateSelectedVariant = (size: string | null, color: string | null) => {
    if (!product) return;
    
    // Find matching variant
    const variant = product.variants.find(v => 
      (size ? v.size_name === size : true) && 
      (color ? v.color_name === color : true)
    );
    
    if (variant) {
      setSelectedVariant(variant);
      setIndex(0); // Reset image index when variant changes
    }
  };

  // Get unique sizes and colors
  const sizes: string[] = [...new Set(product?.variants.map(v => v.size_name).filter((s): s is string => typeof s === 'string'))];
  const colors: string[] = [...new Set(product?.variants.map(v => v.color_name).filter((c): c is string => typeof c === 'string'))];

  // Determine images to display
  type ImageType = { id: number; src: string; alt: string };
  let images: ImageType[] = [];
  try {
    // Use variant-specific images if available
    if (selectedVariant?.images?.length) {
      images = selectedVariant.images.map((src, i) => ({
        id: i + 1,
        src,
        alt: `${product?.product_name} ${selectedColor ? `- ${selectedColor}` : ''} ${selectedSize ? `- ${selectedSize}` : ''}`
      }));
    } 
    // Fallback to passed images
    else if (imagesParam) {
      const parsedImages = JSON.parse(imagesParam);
      if (Array.isArray(parsedImages)) {
        images = parsedImages.map((src: string, i: number) => ({
          id: i + 1,
          src,
          alt: product?.product_name || `Product Image ${i + 1}`
        }));
      }
    }
  } catch (error) {
    console.error('Error parsing images:', error);
    images = [
      { id: 1, src: '/pods1.avif', alt: 'Default Image 1' },
      { id: 2, src: '/pods.avif', alt: 'Default Image 2' },
      { id: 3, src: '/pods3.avif', alt: 'Default Image 3' },
    ];
  }

  if (loading) {
    return <div className="p-8">Loading product details...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Section */}
        <div className="lg:w-3/5 w-full">
          {/* Main Image */}
          <div className="relative w-full h-[500px]">
            <Image
              src={images[index]?.src || '/placeholder.jpg'}
              alt={images[index]?.alt || 'Product image'}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover rounded-md"
              priority
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

        {/* Product Details Section */}
        <div className="lg:w-2/5 w-full">
          {product ? (
            <>
              <h2 className="text-2xl font-bold mb-4">{product.product_name}</h2>
              <p className="text-gray-600 mb-4">{product.product_description}</p>
              
              <div className='h-[10px] mb-5 bg-gray-100'/>
              
              <div className='flex gap-4 items-center'>
                <p className="text-lg font-semibold text-slate-600 line-through">
                  ${selectedVariant?.original_price || product.variants[0]?.original_price || '78.09'}
                </p>
                <p className="text-lg font-semibold text-blue-600">
                  ${selectedVariant?.sell_price || product.variants[0]?.sell_price || '56.09'}
                </p>
              </div>
              
              <div className='h-[10px] mt-5 bg-gray-100'/>
              
              {/* Color Selection */}
              {colors.length > 0 && (
                <div className="mb-4">
                  <h4 className='font-medium mb-3'>Color</h4>
                  <div className="flex gap-2 flex-wrap">
                    {colors.map(color => (
                      <button
                        key={color}
                        className={`px-4 py-2 border rounded-md hover:bg-gray-100 ${
                          selectedColor === color ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => handleColorSelect(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Size Selection */}
              {sizes.length > 0 && (
                <div className="mb-6">
                  <h4 className='font-medium mb-3'>Size</h4>
                  <div className="flex gap-2 flex-wrap">
                    {sizes.map(size => (
                      <button
                        key={size}
                        className={`px-4 py-2 border rounded-md hover:bg-gray-100 ${
                          selectedSize === size ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => handleSizeSelect(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <CustomizedProducts/>
              <Add/>
              
              <div className='text-sm mt-4'>
                <h4 className='font-medium mb-4'>Product Details</h4>
                <p className='mb-4 text-slate-600'>
                  {product.product_description}
                </p>
              </div>
            </>
          ) : (
            /* Fallback content when no product is selected */
            <>
              <h2 className="text-2xl font-bold mb-4">Digital Incense</h2>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <div className='h-[10px] mb-5 bg-gray-100'/>
              <div className='flex gap-4 items-center'>
                <p className="text-lg font-semibold text-slate-600 line-through">$78.09</p>
                <p className="text-lg font-semibold text-blue-600">$56.09</p>
              </div>
              <div className='h-[10px] mt-5 bg-gray-100'/>
              <CustomizedProducts/>
              <Add/>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductImages;