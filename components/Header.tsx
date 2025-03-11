"use client";
import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';


const Header = () => {
  const [activeItem, setActiveItem] = useState('');
  
  const navItems = [
  ];
  
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-20">
        {/* Stylized Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Package className="h-8 w-8 text-teal-500" />
          <div className="font-extrabold text-3xl tracking-tight">
            <span className="text-teal-500">ICAT</span>
            <span className="text-gray-900"> TRACKING</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ y: -2 }}
              onHoverStart={() => setActiveItem(item.name)}
              onHoverEnd={() => setActiveItem('')}
            >
              <Link
                href={item.href}
                className={`relative px-1 py-2 text-lg font-medium transition-colors ${
                  activeItem === item.name ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.name}
                {activeItem === item.name && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 bottom-0 h-0.5 w-full bg-blue-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>
        
        {/* User Profile Indicator (replacing Login Button) */}
        <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full border border-gray-200">
          <User className="h-5 w-5 text-gray-600" />
          <div className="text-sm font-medium">
            <span className="text-gray-900">ICAT DEMO</span>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-xl font-medium text-gray-700 hover:text-blue-600"
                >
                  {item.name}
                </Link>
              ))}
              
              {/* User Profile in Mobile Menu */}
              <div className="flex items-center gap-3 mt-4 p-3 bg-gray-50 rounded-lg">
                <User className="h-5 w-5 text-gray-600" />
                <div className="text-sm font-medium">
                  <span className="text-gray-900">sals</span>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
