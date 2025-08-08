"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const heroSlides = [
  {
    id: 1,
    title: "Luxury Redefined",
    subtitle: "Discover Premium Products Curated for Excellence",
    image: "/placeholder.svg?height=800&width=1200",
    cta: "Explore Collection",
  },
  {
    id: 2,
    title: "Exclusive Elegance",
    subtitle: "Where Sophistication Meets Innovation",
    image: "/placeholder.svg?height=800&width=1200",
    cta: "Shop Now",
  },
  {
    id: 3,
    title: "Unparalleled Quality",
    subtitle: "Experience the Finest Selection",
    image: "/placeholder.svg?height=800&width=1200",
    cta: "Discover More",
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <section className="relative h-screen overflow-hidden mt-16">
      {/* Background Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center parallax-bg"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-900/70 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 mb-6 animate-float">
              <Sparkles className="h-6 w-6 text-yellow-400" />
              <span className="text-yellow-400 font-medium tracking-wider uppercase text-sm">Premium Collection</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                {heroSlides[currentSlide].title}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
              {heroSlides[currentSlide].subtitle}
            </p>

            <Button
              size="lg"
              className="gold-gradient text-black font-semibold px-8 py-4 text-lg rounded-full hover:scale-105 transition-all duration-300 animate-glow"
            >
              {heroSlides[currentSlide].cta}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full glass-card hover:bg-white/10 transition-all group"
      >
        <ChevronLeft className="h-6 w-6 text-white group-hover:text-yellow-400" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full glass-card hover:bg-white/10 transition-all group"
      >
        <ChevronRight className="h-6 w-6 text-white group-hover:text-yellow-400" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-yellow-400 scale-125" : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
