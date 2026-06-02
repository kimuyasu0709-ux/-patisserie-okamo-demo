"use client"

import { useEffect, useRef, useState } from "react"

export function ConceptSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const concepts = [
    {
      number: "01",
      title: "素材へのこだわり",
      description: "地元石川の新鮮な食材を中心に、世界中から厳選した素材を使用。素材本来の味わいを最大限に引き出します。",
    },
    {
      number: "02", 
      title: "伝統と革新",
      description: "フランス菓子の伝統技法を大切にしながら、金沢の風土に合った独自のアレンジを加えています。",
    },
    {
      number: "03",
      title: "手仕事の温もり",
      description: "機械では再現できない繊細な仕上がり。一つひとつ、職人の手で丁寧に作り上げます。",
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="concept"
      className="py-24 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-[1200px] mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <span 
            className={`inline-block font-serif text-accent text-sm tracking-[0.3em] uppercase mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Our Concept
          </span>
          <h2 
            className={`font-serif text-3xl md:text-5xl text-foreground font-semibold tracking-wide transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <span className="text-balance">想いを、かたちに。</span>
          </h2>
        </div>

        {/* Concept Cards */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {concepts.map((concept, index) => (
            <div
              key={concept.number}
              className={`group relative transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              {/* Card */}
              <div className="relative p-8 md:p-10 bg-card rounded-2xl border border-border transition-all duration-500 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-2 hover:border-accent/30">
                {/* Number */}
                <span className="block font-serif text-6xl md:text-7xl text-accent/20 font-bold mb-4 transition-colors duration-300 group-hover:text-accent/40">
                  {concept.number}
                </span>
                
                {/* Title with Underline Animation */}
                <h3 className="relative font-serif text-xl md:text-2xl text-foreground font-semibold mb-4">
                  {concept.title}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-accent transition-all duration-500 group-hover:w-full" />
                </h3>
                
                {/* Description */}
                <p className="font-sans text-muted-foreground text-sm leading-relaxed">
                  {concept.description}
                </p>

                {/* Hover Decorative Element */}
                <div className="absolute top-4 right-4 w-8 h-8 border border-accent/0 rounded-full transition-all duration-500 group-hover:border-accent/30 group-hover:scale-150" />
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Quote */}
        <div 
          className={`mt-20 md:mt-28 text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "700ms" }}
        >
          <blockquote className="relative inline-block">
            <span className="absolute -top-6 -left-4 font-serif text-6xl text-accent/20">&ldquo;</span>
            <p className="font-serif text-lg md:text-xl text-muted-foreground italic tracking-wide max-w-2xl">
              お菓子は、人を笑顔にする小さな魔法。
              <br />
              その魔法を、毎日この場所から届けたい。
            </p>
            <span className="absolute -bottom-8 -right-4 font-serif text-6xl text-accent/20">&rdquo;</span>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
