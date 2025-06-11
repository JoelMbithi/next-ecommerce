import React, { useState } from 'react'

const Add = () => {
    const [quantity ,setQuantity] = useState(1)
  const stock = 14
    const handleQuantity = (value: "Decrease" | "Increase") => {
         if(value === "Decrease" && quantity > 1){
          setQuantity((prev) => prev - 1)
         }

         if(value === "Increase" && quantity < stock) {
          setQuantity ((prev) => prev + 1)
         }
    }
  return (
    <div className='flex flex-col gap-4 mt-8'>
     <h4 className='font-medium'>Choose a Quantity</h4>
     <div className='flex justify-between'>
        <div className='flex items-center gap-4'>
            <div className='bg-gray-200 py-2 px-4 rounded-3xl flex items-center justify-between w-32'>
            <button className='cursor-pointer text-xl' onClick={() => handleQuantity ("Decrease")}>-</button>
            {quantity}
            <button className='cursor-pointer text-xl' onClick={() => handleQuantity ("Increase")}>+</button>
        </div>
        <div className='text-xs'>Only <span className='text-orange-500'>4 items</span> left! <br /> {"Don't"} miss it</div>
     </div>
        
     <button className='w-36 text-sm rounded-3xl ring-1 ring-red-400 text-red-400 py-2 px-4 hover:bg-red-600 hover:text-white disabled:bg-pink-300 disabled:cursor-not-allowed disabled:text-white disabled:ring-none'>Add to Cart</button> 
    </div>
    </div>
  )
}

export default Add
