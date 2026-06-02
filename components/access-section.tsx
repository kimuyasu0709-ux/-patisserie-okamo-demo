"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Clock, Phone, Car } from "lucide-react"

export function AccessSection() {
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

  const accessInfo = [
    {
      icon: MapPin,
      label: "住所",
      value: "〒920-0022\n石川県金沢市北安江4丁目10-22",
      delay: 200,
    },
    {
      icon: Clock,
      label: "営業時間",
      value: "11:00〜18:00",
      delay: 300,
    },
    {
      icon: Phone,
      label: "電話番号",
      value: "076-254-1299",
      delay: 400,
    },
    {
      icon: Car,
      label: "アクセス",
      value: "金沢駅より車で10分\n駐車場あり",
      delay: 500,
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="access"
      className="py-24 md:py-32 bg-primary relative overflow-hidden"
    >
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span 
            className={`inline-block font-serif text-accent text-sm tracking-[0.3em] uppercase mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Access
          </span>
          <h2 
            className={`font-serif text-3xl md:text-5xl text-primary-foreground font-semibold tracking-wide transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <span className="text-balance">お店へのご案内</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map Placeholder */}
          <div 
            className={`relative transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-primary-foreground/10">
              <iframe
                src="https://maps.google.com/maps?q=石川県金沢市北安江4丁目10-22&output=embed&hl=ja&z=16"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="pâtisserie OKAMO の地図"
                className="absolute inset-0 w-full h-full"
              />
            </div>

            {/* Decorative Corner */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-accent rounded-tl-lg" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-accent rounded-br-lg" />
          </div>

          {/* Info Cards */}
          <div className="space-y-6">
            {accessInfo.map((info, index) => (
              <div
                key={info.label}
                className={`group flex items-start gap-4 p-6 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 transition-all duration-700 hover:bg-primary-foreground/10 hover:border-accent/30 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${info.delay}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-accent/30 group-hover:scale-110">
                  <info.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <span className="block font-sans text-xs text-primary-foreground/60 uppercase tracking-wider mb-1">
                    {info.label}
                  </span>
                  <p className="font-sans text-primary-foreground whitespace-pre-line leading-relaxed">
                    {info.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Note */}
        <div 
          className={`mt-16 text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "700ms" }}
        >
          <div className="inline-block p-6 rounded-xl bg-accent/10 border border-accent/20">
            <p className="font-sans text-sm text-primary-foreground/80">
              ご予約・お問い合わせは、店頭またはお電話にて承っております。
              <br />
              ホールケーキのご予約は、3日前までにお願いいたします。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
