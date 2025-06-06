'use client'
import { url } from 'inspector'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Slinder = () => {
    const Slides = [
        {
            id:1,
            title:"Summer Sale Collection",
            description:"Sale! Limited time offer!",
            image:"https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
            bg:"bg-gradient-to-r from-yellow-50 to-pink-50",
            url:'/'
        },
        {
            id:2,
            title:"Winter Wonderland",
            description:"Sale! Up to 50 off!",
            image:"https://images.unsplash.com/photo-1547721064-da6cfb341d50?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
            bg:"bg-gradient-to-r from-blue-50 to-gray-50",
            url:'/'
        },
        {
            id:3,
            title:"Spring Awakening",
            description:" Embrace the bloom!",
            image:"https://images.unsplash.com/photo-1521747116042-5a810fda9664?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
            bg:"bg-gradient-to-r from-green-50 to-yellow-50",
            url:'/'
        }
    ]

    const [current,setCurrent] = useState(0)
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === Slides.length -1 ? 0 : prev +1 ))
        },3000)

        return () => clearInterval(interval)
    })

  return (
    <div className='h-[calc(100vh-80px)]  overflow-hidden'>
      <div
  className='h-full flex transition-all ease-in-out duration-1000'
  style={{
    width: `${Slides.length * 100}vw`,
    transform: `translateX(-${current * 100}vw)`,
  }}
>

        {Slides.map((slide) => (
            <div key={slide.id} className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row mt-5 p-4 `}>
                {/* TEXT CONTAINER */}
                <div className='h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 xl:gap-12 text-center'>
                    <h2 className='text-xl xl:text-3xl 2xl:text-5xl  mb-4'>{slide.description}</h2>
                    <h2 className='text-5xl xl:text-6xl 2xl:text-8xl font-bold text-slate-400 mb-4'>{slide.title}</h2>
                    <Link href={slide.url} >
                    <button className='mt-3  bg-black text-white px-2 py-4 rounded'> SHOP NOW</button>
                    </Link>
                </div>
                {/* IMAGE CONTAINER */}
                <div className='relative h-1/2  xl:h-full xl: w-1/2'>
                    <Image
  src={slide.image}
  alt={slide.title}
  fill
  className="object-cover"
/>

                </div>
            </div>
        ))}
      </div>
      <div className='absolute m-auto left-1/2 bottom-8 flex gap-4'>
        {Slides.map((slide,index) => (
        <div  className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center  ${ current === index ? "scale-150" 
            : ""
            
        }`}
        key={slide.id} onClick={() => setCurrent(index)}>
            {current === index && (
                <div className='w-[6px] h-[6px] bg-gray-600 rounded-full'></div>
            )}
        </div>
      ))}
      </div>
    </div>
  )
}

export default Slinder
