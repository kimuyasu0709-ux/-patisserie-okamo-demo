"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Concept", href: "#concept" },
    { label: "Menu", href: "#menu" },
    { label: "Gallery", href: "#gallery" },
    { label: "Access", href: "#access" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-md shadow-lg py-3" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
        <Link 
          href="/" 
          className="group flex items-center gap-3"
        >
          <div className={`relative w-12 h-12 transition-all duration-500 group-hover:scale-110 ${
            isScrolled ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
          }`}>
            <Image
              src="/okamo-logo.png"
              alt="Pâtisserie OKAMO"
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative font-sans text-sm tracking-wider uppercase transition-colors duration-300 group ${
                isScrolled ? "text-foreground hover:text-primary" : "text-primary-foreground/90 hover:text-primary-foreground"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 transition-colors duration-300 ${
            isScrolled ? "text-foreground" : "text-primary-foreground"
          }`}
          aria-label="メニューを開く"
        >
          <div className="relative w-6 h-6">
            <Menu className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`} />
            <X className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-secondary/98 backdrop-blur-lg transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col p-6 gap-4">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-secondary-foreground font-sans text-lg tracking-wider uppercase py-2 border-b border-secondary-foreground/10 transition-all duration-300 hover:text-accent hover:pl-4"
              style={{ 
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms",
                transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-20px)",
                opacity: isMobileMenuOpen ? 1 : 0
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
