"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const menuItems = [
  {
    id: 1,
    name: "ジャルダン",
    nameEn: "Choux Cream",
    price: "¥420",
    description: "サクサクのシュー生地と濃厚カスタード",
    category: "定番",
    image: "/images/cake-montblanc.jpg",
  },
  {
    id: 2,
    name: "イチゴのタルト",
    nameEn: "Tarte aux Fruits",
    price: "¥680",
    description: "季節のフルーツを贅沢に使用したタルト",
    category: "季節限定",
    image: "/images/tart-strawberry.jpg",
  },
  {
    id: 3,
    name: "モンブラン",
    nameEn: "Mont Blanc",
    price: "¥620",
    description: "能登栗を使用した風味豊かな一品",
    category: "人気",
    image: "/images/tart-strawberry2.jpg",
  },
  {
    id: 4,
    name: "チョコバナナショートケーキ",
    nameEn: "Opera",
    price: "¥580",
    description: "コーヒーとチョコレートの大人の味わい",
    category: "定番",
    image: "/images/cake-chocolate.jpg",
  },
  {
    id: 5,
    name: "バースデーケーキ",
    nameEn: "Mille-feuille",
    price: "¥550",
    description: "層になったパイ生地とカスタードの調和",
    category: "定番",
    image: "/images/cake-birthday.jpg",
  },
  {
    id: 6,
    name: "抹茶と和のクッキー缶",
    nameEn: "Eclair Matcha",
    price: "¥480",
    description: "加賀棒茶クリームと宇治抹茶の融合",
    category: "オリジナル",
    image: "/images/cookie-tin.jpg",
  },
]

export function MenuSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  useEffect(() => {
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

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="py-24 md:py-32 bg-secondary relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span 
            className={`inline-block font-serif text-accent text-sm tracking-[0.3em] uppercase mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Our Menu
          </span>
          <h2 
            className={`font-serif text-3xl md:text-5xl text-secondary-foreground font-semibold tracking-wide transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <span className="text-balance">季節を味わう</span>
          </h2>
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${150 + index * 100}ms` }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className={`relative bg-card/90 backdrop-blur-sm rounded-xl overflow-hidden border border-border/50 transition-all duration-500 ${
                hoveredItem === item.id ? "shadow-2xl shadow-primary/20 scale-[1.02] -translate-y-2" : "shadow-lg"
              }`}>
                {/* Category Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className={`inline-block px-3 py-1 text-xs font-sans uppercase tracking-wider rounded-full transition-all duration-300 ${
                    item.category === "季節限定" 
                      ? "bg-accent text-accent-foreground" 
                      : item.category === "人気"
                      ? "bg-primary text-primary-foreground"
                      : item.category === "オリジナル"
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {item.category}
                  </span>
                </div>

                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={`object-cover transition-transform duration-700 ${
                      hoveredItem === item.id ? "scale-110" : "scale-100"
                    }`}
                  />
                  {/* Shimmer on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ${
                    hoveredItem === item.id ? "translate-x-full" : "-translate-x-full"
                  }`} />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-serif text-xl text-card-foreground font-semibold">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  {/* Hover Line Animation */}
                  <div className={`mt-4 h-0.5 bg-accent transition-all duration-500 ${
                    hoveredItem === item.id ? "w-full" : "w-0"
                  }`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div 
          className={`text-center mt-12 md:mt-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "900ms" }}
        >
          <button className="group relative inline-flex items-center gap-3 bg-transparent border-2 border-secondary-foreground/30 text-secondary-foreground px-8 py-4 rounded-full font-sans text-sm uppercase tracking-widest transition-all duration-300 hover:border-accent hover:text-accent overflow-hidden">
            <span className="relative z-10">メニューをもっと見る</span>
            <svg 
              className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="absolute inset-0 bg-accent/10 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </button>
        </div>
      </div>
    </section>
  )
}
