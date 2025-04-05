'use client';


import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>

        <div className="space-x-8 text-gray-700 font-medium">
          <Link href="/admin/dashboard" className="hover:text-blue-600 transition">
            Dashboard
          </Link>
          <Link href="/admin/users" className="hover:text-blue-600 transition">
            Users
          </Link>
          <Link href="/admin/creditscore" className="hover:text-blue-600 transition">
            Credit Score
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
