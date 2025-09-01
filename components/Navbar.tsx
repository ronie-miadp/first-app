import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const Navbar = () => {
  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className='max-w-7xl mx-auto px-4'>
            {/* Logo */}
            <div className="flex item-center">
                <Link href="/" className="text-xl fon t-bold text-primary font-mon tracking-wider">
                    Plantventory
                </Link>
            </div>

            {/* Navbar Components */}
            <div className='hidden md:flex items-center space-x-4'>
                <Button variant="ghost" className='flex items-center gap-2' asChild>
                    <Link href="/plants"></Link>
                </Button>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
