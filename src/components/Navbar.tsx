'use client'

import Link from 'next/link'
import { useState } from 'react'

interface NavbarProps {
  siteName: string
  logo?: string | null
}

export function Navbar({ siteName, logo }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Services', href: '/services' },
    { label: 'Artikel', href: '/artikel' },
    { label: 'Blog', href: '/blog' },
  ]

  return (
    <nav className="bg-primary-950/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-primary-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              {logo ? (
                <img src={logo} alt={siteName} className="h-10 w-auto" />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-accent-400 to-accent-600 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm">{siteName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}</span>
                </div>
              )}
              <span className="font-heading font-bold text-xl text-white tracking-tight">{siteName}</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-primary-100 hover:text-accent-300 font-medium px-4 py-2 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/services"
              className="ml-4 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-md"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-primary-200 hover:text-white focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-primary-900/98 backdrop-blur-md border-t border-primary-800/50">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-primary-100 hover:text-accent-300 hover:bg-primary-800/50 rounded-lg font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/services"
              className="block mt-4 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-center shadow-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
