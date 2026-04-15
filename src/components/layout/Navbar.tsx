'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Scale, Phone } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Attorneys', href: '/attorneys' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 border-b',
        scrolled 
          ? 'bg-navy-900/90 backdrop-blur-md border-navy-800 py-3 shadow-2xl' 
          : 'bg-transparent border-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Scale className="w-8 h-8 text-gold-600 transition-colors" />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight leading-none text-white">
                LAWYERS IN <span className="text-gold-600">NEPAL</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/80">
                Justice. Expertise. Trust.
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-gold-600 text-white"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/appointment"
              className="bg-gold-600 hover:bg-gold-500 text-navy-900 px-5 py-2.5 rounded-sm text-sm font-bold transition-all shadow-lg hover:shadow-gold-500/20"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={isOpen}
              className="p-2 rounded-md text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden absolute top-full left-0 w-full bg-navy-900 border-b border-navy-800 transition-all duration-300 overflow-hidden",
        isOpen ? "max-h-screen opacity-100 py-6" : "max-h-0 opacity-0 py-0"
      )}>
        <div className="px-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-lg font-medium text-white hover:text-gold-600"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/appointment"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center bg-gold-600 text-navy-900 py-3 rounded-sm font-bold"
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </nav>
  );
}
