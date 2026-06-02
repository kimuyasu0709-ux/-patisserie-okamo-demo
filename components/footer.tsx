"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Mail } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-12">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-14 h-14 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/okamo-logo.png"
                    alt="Pâtisserie OKAMO"
                    width={56}
                    height={56}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </Link>
            <p className="mt-4 font-sans text-sm text-secondary-foreground/60 leading-relaxed">
              美しい時間を、甘く彩る。
              <br />
              金沢の小さなパティスリー。
            </p>
          </div>

          {/* Navigation */}
          <div className="text-center">
            <h4 className="font-serif text-secondary-foreground text-sm uppercase tracking-widest mb-6">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Concept", href: "#concept" },
                { label: "Menu", href: "#menu" },
                { label: "Gallery", href: "#gallery" },
                { label: "Access", href: "#access" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-sans text-sm text-secondary-foreground/60 hover:text-accent transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social & Contact */}
          <div className="text-center md:text-right">
            <h4 className="font-serif text-secondary-foreground text-sm uppercase tracking-widest mb-6">
              Connect
            </h4>
            <div className="flex justify-center md:justify-end gap-4 mb-6">
              <a
                href="https://www.facebook.com/profile.php?id=61578312539653"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center text-secondary-foreground/60 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/patisserie_okamo/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center text-secondary-foreground/60 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@okamo.jp"
                className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center text-secondary-foreground/60 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                aria-label="メール"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="font-sans text-xs text-secondary-foreground/40">
              営業時間: 11:00〜18:00
            </p>
          </div>
        </div>

        {/* Divider with Animation */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-secondary-foreground/20 to-transparent" />
          </div>
          <div className="relative flex justify-center">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="font-sans text-xs text-secondary-foreground/40">
            © {currentYear} Pâtisserie OKAMO. All rights reserved.
          </p>
          <p className="font-sans text-[10px] text-secondary-foreground/30 mt-2">
            石川県金沢市北安江4丁目10-22
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group w-12 h-12 rounded-full bg-primary shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-accent hover:shadow-xl hover:-translate-y-1"
          aria-label="ページトップへ戻る"
        >
          <svg 
            className="w-5 h-5 text-primary-foreground transition-transform duration-300 group-hover:-translate-y-0.5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </footer>
  )
}
