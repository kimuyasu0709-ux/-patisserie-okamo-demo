"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 50,
          y: (e.clientY - rect.top - rect.height / 2) / 50,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-secondary"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating decorative elements */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-accent/10"
            style={{
              width: `${60 + i * 40}px`,
              height: `${60 + i * 40}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float ${6 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
              transform: `translate(${mousePosition.x * (i + 1)}px, ${mousePosition.y * (i + 1)}px)`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo Animation */}
        <div 
          className={`mb-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div
            className="inline-block w-32 h-32 md:w-40 md:h-40 drop-shadow-2xl"
            style={{
              transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
              transition: "transform 0.3s ease-out"
            }}
          >
            <Image
              src="/okamo-logo.png"
              alt="Pâtisserie OKAMO"
              width={160}
              height={160}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>

        {/* Text Content with Reveal Animation */}
        <div className="overflow-hidden mb-4">
          <h1 
            className={`font-serif text-4xl md:text-6xl lg:text-7xl text-primary-foreground font-semibold tracking-wider transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <span className="text-balance">美しい時間を、</span>
            <br />
            <span className="text-accent text-balance">甘く彩る。</span>
          </h1>
        </div>

        <p 
          className={`font-sans text-secondary-foreground/70 text-sm md:text-base max-w-md mx-auto mb-12 tracking-wide transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          石川県金沢市にある小さなパティスリー。
          <br className="hidden sm:block" />
          素材の声に耳を傾け、一つひとつ心を込めて。
        </p>

        {/* CTA Button with Magnetic Effect */}
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "1100ms" }}
        >
          <a
            href="#concept"
            className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-sans text-sm uppercase tracking-widest transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-1"
          >
            <span>Discover</span>
            <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "1500ms" }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-sans text-xs text-secondary-foreground/50 tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  )
}
