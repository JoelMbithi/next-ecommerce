import React from 'react'

const CustomizedProducts = () => {
  return (
    <div className='flex flex-col gap-6'>
     {/* Color */}
     <h4 className='font-medium'>Choose a colors</h4>
     <ul className='flex items-center gap-3'>
        <li className='w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-red-500'>
            <div className='absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2'/>
        </li>
        {/* second ring */}
        <li className='w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-blue-500'>
        </li>
          {/* third ring */}
          <li className='w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-green-500'>
            <div className='absolute w-10 h-[2px] rotate-45 bg-red-400 rounded-full ring-2 top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2'/>
        </li>
     </ul>
     {/* Size */}
     <h4 className='font-medium'>Choose a size</h4>
     <ul className='flex items-center gap-3'></ul>
    </div>
  )
}

export default CustomizedProducts
