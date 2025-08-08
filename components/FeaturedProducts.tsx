"use client"

import { useProducts } from "@/hooks/useProducts"
import ProductCard from "./ProductCard"
import LoadingSpinner from "./LoadingSpinner"

export default function FeaturedProducts() {
  const { data, loading, error } = useProducts({ limit: 4 })

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                Featured Collection
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Handpicked premium products that define luxury and excellence
            </p>
          </div>
          <LoadingSpinner />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-400">Error loading featured products: {error}</p>
        </div>
      </section>
    )
  }

  const featuredProducts = data?.products.filter((product) => product.badge) || []

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Featured Collection
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Handpicked premium products that define luxury and excellence
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
