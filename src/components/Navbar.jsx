import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="py-6 bg-[#1a73e8] text-white">
      <div className="container mx-auto flex items-center justify-between gap-x-6 max-w-7xl">
        <Link className="font-bold text-3xl italic" to="/">
            Jepto Books
        </Link>

      <div className="flex items-center justify-center gap-6 text-xl font-medium">
        <Link className="hover:text-blue-100 transition-colors duration-75 ease-in" to="/">Home</Link>
     
        <Link className="hover:text-blue-100 transition-colors duration-75 ease-in" to="/wishlist">Wishlist</Link>
      </div>
      
      </div>
    </nav>
  );
}
