'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when clicking a link
  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`
        fixed w-full z-50 flex items-center transition-all duration-300
        ${scrolled 
          ? 'bg-black/20 backdrop-blur-sm border-b border-white/20 shadow-lg h-16' 
          : 'bg-transparent py-4 h-20'}
      `}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-white text-xl font-bold">
            TshangLa-English S2ST
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLink href="#hero" onClick={handleNavLinkClick}>Home</NavLink>
            <NavLink href="#about" onClick={handleNavLinkClick}>About</NavLink>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 py-4 bg-black/80 backdrop-blur-sm rounded-lg border border-white/10 shadow-xl">
            <div className="flex flex-col space-y-4 px-4">
              <NavLink href="#hero" onClick={handleNavLinkClick}>Home</NavLink>
              <NavLink href="#about" onClick={handleNavLinkClick}>About</NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => {
  return (
    <Link href={href} className="text-white hover:text-amber-200 transition-colors" onClick={onClick}>
      {children}
    </Link>
  );
};

export default Header;