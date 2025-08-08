"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, TrendingUp } from "lucide-react"

interface CategoryCardProps {
  category: {
    id: string
    name: string
    description: string
    image: string
    gradient: string
    productCount: number
  }
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.id}`}
      className="group relative overflow-hidden rounded-2xl aspect-4/5 glass-card hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-2xl"
    >
      <Image
        src={category.image || "/placeholder.svg"}
        alt={category.name}
        fill
        className="object-cover transition-all duration-700 group-hover:scale-110"
      />
      <div
        className={`absolute inset-0 bg-linear-to-t ${category.gradient} opacity-60 group-hover:opacity-70 transition-opacity`}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

      {/* Product Count Badge */}
      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
        <ShoppingBag className="h-3 w-3 text-white" />
        <span className="text-white text-xs font-medium">{category.productCount}</span>
      </div>

      {/* Category Info */}
      <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2 group-hover:text-yellow-400 transition-colors">
          {category.name}
        </h3>
        <p className="text-slate-200 text-xs md:text-sm mb-2 line-clamp-2">{category.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-yellow-400">
            <TrendingUp className="h-3 w-3" />
            <span className="text-xs font-medium">
              {category.productCount} {category.productCount === 1 ? "Product" : "Products"}
            </span>
          </div>

          <div className="text-xs text-slate-300 group-hover:text-yellow-400 transition-colors">Explore →</div>
        </div>
      </div>
    </Link>
  )
}
