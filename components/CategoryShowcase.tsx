"use client"

import { useCategories } from "@/hooks/useCategories"
import CategoryCard from "./CategoryCard"
import LoadingSpinner from "./LoadingSpinner"

export default function CategoryShowcase() {
  const { categories, loading, error } = useCategories()

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Shop by Category</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Explore our curated collections across different lifestyle categories
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
          <p className="text-red-400">Error loading categories: {error}</p>
        </div>
      </section>
    )
  }

  const totalProducts = categories.reduce((sum, cat) => sum + (cat.productCount || 0), 0)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Shop by Category</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-4">
            Explore our curated collections across different lifestyle categories
          </p>
          <p className="text-yellow-400 font-medium">
            {totalProducts} Premium Products Across {categories.length} Categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}
