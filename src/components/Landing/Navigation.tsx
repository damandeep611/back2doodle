"use client"
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const navItems = [
  { title: "Home", href: "/" },
  { title: "Showcase", href: "/showcase" },
  { title: "Pricing", href: "/pricing" },
  { title: "Demo", href: "/demo" },
];


export default function Navigation() {
  return (
     <header className="flex items-center justify-between  my-6 ">
      <div className=" ">
          <span className='font-semibold text-blue-400'>back2doodle</span>
        </div>
        <nav className="space-x-16 hidden md:flex">
          {navItems.map((items, index) => (
            <Link
              href={items.href}
              key={index}
              className="text-zinc-800 font-medium"
            >
              {items.title}
            </Link>
          ))}
        </nav>
        
        {/* mobile menu icon */}
        <span className=" block md:hidden bg-black text-white p-2 rounded-md">
          <MenuIcon size={16} />
        </span>
        <div className=" hidden md:flex items-center justify-between gap-4 text-sm ">
          <Link
            href="/dashboard"
            className="px-6 py-2 rounded-full border border-zinc-400"
          >
            Sign In
          </Link>
          <button className="px-4 py-2 rounded-full border bg-zinc-950 text-white">
            Sign Up
          </button>
        </div>
      </header>
  )
}
