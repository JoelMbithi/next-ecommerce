"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
const Menu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <Image
        src="/menu.png"
        width={30}
        height={30}
        alt=""
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <div className="absolute bg-black  text-white left-0 top-20 w-full h-[calc(100vh-80px)] gap-8 justify-center text-xl z-10 flex flex-col items-center ">
          <Link href="">HomePage</Link>
          <Link href="/list">List</Link>
          <Link href="/login">Login</Link>

          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
