import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="py-6 ">
      <div className="container mx-auto flex items-center justify-between gap-x-6 max-w-7xl">
        <Link to="/">
            Jepto Books
        </Link>
        <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/wishlist">Wishlist</Link>
      </div>
      </div>
    </nav>
  );
}
