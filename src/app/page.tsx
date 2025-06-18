"use client";

import Category from "./components/Product/Category"
import ProductList from "./components/Product/ProductList"
import Slinder from "./components/Slinder/Slinder"
import List from "./list/page"


const HomePage = () => {


  return (
    <div className=''>
      <Slinder/>
    <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
      <h1 className='text-3xl font-bold mb-8'>Featured Products</h1>
       <ProductList/>
    </div>
    <div className="mt-24 p-2">
      <h1 className='text-3xl font-bold mb-8'>Products Category</h1>
       <Category/>
    </div>
    <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
      <h1 className='text-3xl font-bold mb-8'></h1>
       <List/>
    </div>
    </div>
  ) 
}

export default HomePage