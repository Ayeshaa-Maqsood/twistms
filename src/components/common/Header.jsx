import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-quantum-dark text-quantum-cyan py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        TwistMS
      </Link>
      <nav className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/search" className="hover:underline">Search</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
      </nav>
    </header>
  );
}

