import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 20);
    });
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">EcomStore</span>
          </Link>
          
          <div className="flex-1 mx-8">
            <input
              type="text"
              placeholder="Search products..."
              className="input-field"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <span className="absolute -top-2 -right-2 bg-accent text-xs w-5 h-5 
                rounded-full flex items-center justify-center">0</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </Link>
            <button className="btn-primary">Sign In</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
