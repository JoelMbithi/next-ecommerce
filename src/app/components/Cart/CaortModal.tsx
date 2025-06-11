import React from 'react'

const CaortModal = () => {

    const cart =  true
  return (
    <div className='absolute  rounded shadow-[0_0_10px_rgba(0,0,0,0.1)]  bg-white w-80 right-0 p-4 h-30 flex flex-col    top-10 z-20'>
     {!cart ? (
        <div>Cart is Empty</div>
     ) : (
        <div className='flex flex-col gap-4'>
            <h3 className='text-xl font-bold text-slate-600 mb-2'>Shopping Cart</h3>
            {/* item 1 */}
            <div className='flex  gap-4 '>
            <img src='https://plus.unsplash.com/premium_photo-1681236323432-3df82be0c1b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHZ8ZW58MHx8MHx8fDA%3D' alt='cart' width={80} height={24} className='object-cover  rounded-md' />

            <div className='flex flex-col justify-between '>
                {/* TOP */}
                <div className=' '>
                    {/* TITLE */}
                    <div className=' flex flex-row gap-4  '>
                        <h3 className='font-bold text-xl mb-2 text-slate-600'>Product Name</h3>
                        <div className='text-red-600 font-bold'>$49</div>
                    </div>
                    {/* DESC */}
                    <div className=' text-sm text-gray mb-2'>
                        available
                    </div>
                </div>
                {/* BOTTOM */}
                <div className='flex flex-row gap-4 justify-between'>
                    <span className='font-bold text-sm'>Quantity</span>
                    <span className='text-blue-600 font-bold text-sm  '>Remove</span>
                </div>
            </div>
        </div>

        {/* Item 2 */}
        <div className='flex flex-col  gap-4 mt-4'>
            {/* top */}
            <div className='flex gap-4 justify-between'>
                <h3 className='font-bold text-xl text-slate-600'>Subtotal</h3>
                <span className='text-xl font-bold '>$40.5</span>
            </div>
            {/* Middle */}
            <div className='text-sm text-gray-500'>
                Shopping with us?
            </div>
            {/* bottom */}
            <div className='flex justify-between'>
                <button className='font-bold shadow p-2 bg-slate-200 hover:text-white rounded hover:bg-black'>View Cart</button>
                <button className='font-bold shadow p-2  bg-black text-white rounded hover:text-black hover:bg-slate-200'>Checkout</button>
            </div>
        </div>
        </div>
     ) }
    </div>
  )
}

export default CaortModal
