"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const allImages = [
  "/images/gallery/gallery-0.jpg",
  "/images/gallery/gallery-1.jpg",
  "/images/gallery/gallery-2.jpg",
  "/images/gallery/gallery-3.jpg",
  "/images/gallery/gallery-4.jpg",
  "/images/gallery/gallery-5.jpg",
]

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const aspects = ["tall", "wide", "square", "square", "wide", "tall"] as const
const titles = ["店内の様子", "ショーケース", "季節のタルト", "シュークリーム", "金沢の朝", "職人の技"]

const baseGalleryImages = allImages.map((src, i) => ({
  id: i + 1,
  src,
  aspect: aspects[i],
  title: titles[i],
}))

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredImage, setHoveredImage] = useState<number | null>(null)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [galleryImages, setGalleryImages] = useState(baseGalleryImages)
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null)

  useEffect(() => {
    setGalleryImages(prev => {
      const srcs = shuffled(prev.map(img => img.src))
      return prev.map((img, i) => ({ ...img, src: srcs[i] }))
    })
    setIsVisible(true)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImage(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY })
  }

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="py-24 md:py-32 bg-background relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setLightboxImage(null)}
            aria-label="閉じる"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative w-full h-full max-w-5xl max-h-[90vh] mx-4"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={lightboxImage.src}
              alt={lightboxImage.title}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}

      {/* Custom Cursor for Gallery */}
      {hoveredImage !== null && (
        <div
          className="fixed w-20 h-20 pointer-events-none z-40 mix-blend-difference transition-transform duration-100"
          style={{
            left: cursorPosition.x - 40,
            top: cursorPosition.y - 40,
          }}
        >
          <div className="w-full h-full rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-white text-xs font-sans uppercase tracking-wider">View</span>
          </div>
        </div>
      )}

      <div className="max-w-[1200px] mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span 
            className={`inline-block font-serif text-accent text-sm tracking-[0.3em] uppercase mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Gallery
          </span>
          <h2 
            className={`font-serif text-3xl md:text-5xl text-foreground font-semibold tracking-wide transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <span className="text-balance">日々の風景</span>
          </h2>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {galleryImages.map((image, index) => {
            const gridClass = 
              image.aspect === "tall" ? "row-span-2" :
              image.aspect === "wide" ? "col-span-2" : ""
            
            return (
              <div
                key={image.id}
                className={`${gridClass} group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${150 + index * 100}ms` }}
                onMouseEnter={() => setHoveredImage(image.id)}
                onMouseLeave={() => setHoveredImage(null)}
                onClick={() => setLightboxImage({ src: image.src, title: image.title })}
              >
                {/* Image Container */}
                <div className={`relative bg-gradient-to-br from-primary/20 to-accent/20 ${
                  image.aspect === "tall" ? "h-80 md:h-[500px]" :
                  image.aspect === "wide" ? "h-40 md:h-60" : "h-40 md:h-60"
                }`}>
                  {/* Photo */}
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className={`object-cover transition-transform duration-700 ${
                      hoveredImage === image.id ? "scale-110" : "scale-100"
                    }`}
                  />

                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-primary/80 flex items-center justify-center transition-opacity duration-500 ${
                    hoveredImage === image.id ? "opacity-100" : "opacity-0"
                  }`}>
                    <div className="text-center transform transition-all duration-500" style={{
                      transform: hoveredImage === image.id ? "translateY(0)" : "translateY(20px)",
                      opacity: hoveredImage === image.id ? 1 : 0,
                    }}>
                      <span className="block font-serif text-lg md:text-xl text-primary-foreground">
                        {image.title}
                      </span>
                      <span className="block font-sans text-xs text-primary-foreground/70 mt-2 uppercase tracking-wider">
                        Click to view
                      </span>
                    </div>
                  </div>

                  {/* Corner Decorations on Hover */}
                  <div className={`absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-accent transition-all duration-300 ${
                    hoveredImage === image.id ? "opacity-100 scale-100" : "opacity-0 scale-50"
                  }`} />
                  <div className={`absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-accent transition-all duration-300 ${
                    hoveredImage === image.id ? "opacity-100 scale-100" : "opacity-0 scale-50"
                  }`} style={{ transitionDelay: "100ms" }} />
                </div>
              </div>
            )
          })}
        </div>

        {/* SNS Links */}
        <div
          className={`flex items-center justify-center gap-8 mt-12 md:mt-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <a
            href="https://www.facebook.com/profile.php?id=61578312539653"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 font-sans text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <span className="text-sm uppercase tracking-widest">Facebook</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <span className="text-border">|</span>
          <a
            href="https://www.instagram.com/patisserie_okamo"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 font-sans text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <span className="text-sm uppercase tracking-widest">Instagram</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
