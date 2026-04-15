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
          ? 'bg-white/90 backdrop-blur-md border-navy-100 py-3 shadow-sm' 
          : 'bg-transparent border-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Scale className={cn(
              "w-8 h-8 transition-colors",
              scrolled ? "text-navy-700" : "text-gold-600"
            )} />
            <div className="flex flex-col">
              <span className={cn(
                "text-xl font-bold tracking-tight leading-none",
                scrolled ? "text-navy-900" : "text-white"
              )}>
                LAWYERS IN <span className="text-gold-600">NEPAL</span>
              </span>
              <span className={cn(
                "text-[10px] uppercase tracking-[0.2em] font-medium",
                scrolled ? "text-navy-500" : "text-white/80"
              )}>
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
                className={cn(
                  "text-sm font-medium transition-colors hover:text-gold-600",
                  scrolled ? "text-navy-700" : "text-white"
                )}
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
              className={cn(
                "p-2 rounded-md",
                scrolled ? "text-navy-700" : "text-white"
              )}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden absolute top-full left-0 w-full bg-white border-b border-navy-100 transition-all duration-300 overflow-hidden",
        isOpen ? "max-h-screen opacity-100 py-6" : "max-h-0 opacity-0 py-0"
      )}>
        <div className="px-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-lg font-medium text-navy-900 hover:text-gold-600"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/appointment"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center bg-navy-700 text-white py-3 rounded-sm font-bold"
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </nav>
  );
}
