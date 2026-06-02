"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ConceptSection } from "@/components/concept-section"
import { MenuSection } from "@/components/menu-section"
import { GallerySection } from "@/components/gallery-section"
import { AccessSection } from "@/components/access-section"
import { Footer } from "@/components/footer"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
      <Header />
      <HeroSection />
      <ConceptSection />
      <MenuSection />
      <GallerySection />
      <AccessSection />
      <Footer />
    </main>
  )
}
