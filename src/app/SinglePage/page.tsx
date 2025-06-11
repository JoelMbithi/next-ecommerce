import React from 'react'
// Update the import path below to match the actual location and filename of ProductImages
import ProductImages from '../ProductImages/page'

const SinglePage = () => {
  return (
    <div className='px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex relative flex-col lg:flex-row gap-16'>
      {/* IMAGE */}
      <div className='w-full lg:w-1/2 lg:sticky top-20 h-max'>
      <ProductImages/>
      </div>
      {/* TEXT */}
      <div className='w-full lg:1/2 flex flex-col  gap-6'>

      </div>
    </div>
  )
}

export default SinglePage
