import Link from 'next/link'
import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa"
import { SiVisa } from "react-icons/si";
import { FaCcPaypal } from "react-icons/fa6";
import { SiBarclays } from "react-icons/si";




const Footer = () => {
  return (
    <div className='px-4 py-24 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mt-24  bg-slate-200'>
     {/* TOP */}
     <div className='flex flex-col md:flex-row gap-4 justify-between p-4  '>
       {/* LEFT */}
      <div className='w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8 mb-4'>
         <Link href='/' className='text-2xl mb-2 font-bold text-slate-600'>
      Joe
      </Link> 
      
      <div className=' '>
        <h1 className='text-sm  mb-6 text-slate-400'>123 Kenyatta Avenue, 2nd Floor
         Nairobi, Kenya</h1>
         <span className='font-semibold text-slate-600  mb-6 '>joellembithi@gmail.com</span><br />
          <h1 className='font-semibold mt-6 text-slate-600 mb-4'>+254 743 861 565</h1>

      </div> 
      {/* ICONS */}
      <div className='flex gap-8'>
<Link href="https://twitter.com/yourusername" target="_blank"><FaXTwitter /></Link>
<Link href="https://instagram.com/yourusername" target="_blank"><FaInstagram /></Link>
<Link href="https://wa.me/254743861565" target="_blank"><FaWhatsapp /></Link>
<Link href="https://youtube.com/@yourchannelname" target="_blank"><FaYoutube /></Link>
      </div>
      
      
      </div>
      {/* CENTER */}
      <div className=' hidden lg:flex  w-1/2 gap-4 justify-between'>
      {/* Company */}
      <div className=''>
        <h3 className='mb-12 font-bold text-slate-600'>COMPANY</h3>
        <p className='mb-4 text-slate-400'>About Us</p>
        <p  className='mb-4 text-slate-400'>Careers</p>
        <p  className='mb-4 text-slate-400'>Blog</p>
        <p  className='mb-4 text-slate-400'>Artifacts</p>
        <p  className='mb-4 text-slate-400'>Contacts Us</p>
      </div>
      {/* SHOP */}
      <div>
        <h3 className='mb-10 font-bold text-slate-600'>SHOP</h3>
        <p  className='mb-4 text-slate-400'>New Arrivals</p>
        <p  className='mb-4 text-slate-400'>Accessories</p>
        <p  className='mb-4 text-slate-400'>Men</p>
        <p  className='mb-4 text-slate-400'>Woman</p>
       
      </div>
      {/* HELP */}
      <div>
        <h3 className='mb-10 font-bold text-slate-600'>HELP</h3>
        <p className='mb-4 text-slate-400' >All Products</p>
        <p className='mb-4 text-slate-400' >Customer Service</p>
        <p className='mb-4 text-slate-400'>Find a Store</p>
        <p className='mb-4 text-slate-400'>Legal & Privacy</p>
        <p className='mb-4 text-slate-400'>Legal & Privacy</p>
        <p className='mb-4 text-slate-400'>Gift Card</p>
      </div>
      
      </div>

       {/* RIGHT */}
      <div className='w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8 mb-4'>
        <h3 className='mb-10 font-bold text-slate-600'>Subscribee</h3>
        <p className='text-sm text-gray-500'>Be the first to get the latest news about trends, promotions and much more!</p>
        {/* input*/}
        <div className='flex mt-4'>
          <input className='p-2 w-3/4 ' type="text" placeholder='Email address' />
          <button className='w-1/4 bg-red-400 text-white'>Join</button>
        </div>

        <h3 className='font-semibold text-slate-600'>Secure Payments</h3>

        {/* PAYMENT ICONS */}
       <div className='flex justify-between'>
         <Link href="" target="_blank"><SiBarclays /></Link>
<Link href="" target="_blank"><FaCcPaypal /></Link>
<Link href="" target="_blank"><SiVisa /></Link>
<Link href="" target="_blank"><FaYoutube /></Link>
       </div>
      </div>
     </div>
     {/* BOTTOM */}
     <div className='w-full  flex flex-col md:flex-row justify-between gap-8 mt-16'>
      <span className='text-sm text-slate-600'>&copy; 2025 Joe Shop</span>
      <div className='mt-4 flex gap-4 justify-between'>
        <h1 className='text-slate-500'>Language</h1>
        <h1 className='font-semibold text-slate-700 text-xl'>United States | English</h1>
        <h1 className='text-slate-500'>Currency</h1>
        <h1 className='font-semibold text-slate-700 text-xl'>$ USD</h1>
      </div>
     </div>
    </div>
  )
}

export default Footer
