import React from "react";

const filter = () => {
  return (
    <div className="mt-12 flex justify-between">
      {/* First select */}
      <div className="flex gap-6 flex-wrap">
        <div className="gap-4 flex">
        <select
          name="type"
          id=""
          className="py-2 gap-4 px-4 rounded-2xl text-xs font-medium bg-slate-300"
        >
          <option className="mt-2" value="physical">Physical</option>
          <option value="digital">Digital</option>
        </select>
        <input
          type="text "
          name="min"
          placeholder="min price"
          className="text-xs rounded-2xl  pl-2 w-24 ring-1 ring-gray-400"
        />
        <input
          type="text "
          name="max"
          placeholder="max price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
        />
        </div>
        {/* Size */}
        <div>
         <select
          name="type"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-slate-300"
        >
          <option className="mt-2" value="size">Size</option>
          
        </select>
        </div>
        {/* Color */}
        <div>
         <select
          name="type"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-slate-300"
        >
          <option className="mt-2" value="color">Color</option>
          <option value="test">Test</option>
        </select>
        </div>
       {/* Category */}
       <div>
        <select
          name="type"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-slate-300"
        >
          <option className="mt-2" value="category">Category</option>
          <option value="new arrivals">New Arrivals</option>
            <option value="Popular">Popular </option>
        </select>
       </div>
        {/* Filter */}
        <div>
        <select
          name="type"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-slate-300"
        >
          <option className="mt-2" value="category">All Filters</option>
          
        </select>
       </div>
       <div>
        <select name="" id="" className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400">
          <option value="">Sort By</option>
          <option value="">Price (loe to high)</option>
          <option value="">Price (high to low)</option>
          <option value="">Newest</option>
          <option value="">Oldest</option>
        </select>
       </div>
      </div>
    </div>
  );
};

export default filter;
