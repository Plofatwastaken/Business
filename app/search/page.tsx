"use client"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Grid3X3, List, Star, Filter } from "lucide-react"
import ProductCard from "@/components/ProductCard"
import LoadingSpinner from "@/components/LoadingSpinner"
import { Button } from "@/components/ui/button"
import { useProducts } from "@/hooks/useProducts"
import { useCategories } from "@/hooks/useCategories"

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [sortBy, setSortBy] = useState("relevance")
  const [filterCategory, setFilterCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [minRating, setMinRating] = useState(0)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const { categories } = useCategories()

  // Parse price range
  const { minPrice, maxPrice } = useMemo(() => {
    if (priceRange === "all") return { minPrice: undefined, maxPrice: undefined }
    const [min, max] = priceRange.split("-").map(Number)
    return { minPrice: min, maxPrice: max || undefined }
  }, [priceRange])

  const { data, loading, error } = useProducts({
    search: query,
    category: filterCategory === "all" ? undefined : filterCategory,
    sortBy,
    minPrice,
    maxPrice,
    minRating: minRating || undefined,
    page: currentPage,
  })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const clearFilters = () => {
    setFilterCategory("all")
    setPriceRange("all")
    setMinRating(0)
    setCurrentPage(1)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-linear-to-b from-slate-950 to-slate-900 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingSpinner />
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-linear-to-b from-slate-950 to-slate-900 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-red-400">Error: {error}</p>
        </div>
      </main>
    )
  }

  const { products, pagination } = data || { products: [], pagination: null }

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-950 to-slate-900 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
            {query ? (
              <>
                Search Results for <span className="text-yellow-400">"{query}"</span>
              </>
            ) : (
              "All Products"
            )}
          </h1>
          <p className="text-slate-400">
            {pagination?.totalProducts || 0} product{(pagination?.totalProducts || 0) !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 shrink-0">
            <div className="glass-card p-4 md:p-6 rounded-2xl sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg md:text-xl font-semibold text-white">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden text-white"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
                {/* Category Filter */}
                <div>
                  <h3 className="text-white font-medium mb-3">Category</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value="all"
                        checked={filterCategory === "all"}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="text-yellow-400 focus:ring-yellow-400"
                      />
                      <span className="text-slate-300 text-sm">All Categories</span>
                    </label>
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={category.id}
                          checked={filterCategory === category.id}
                          onChange={(e) => setFilterCategory(e.target.value)}
                          className="text-yellow-400 focus:ring-yellow-400"
                        />
                        <span className="text-slate-300 text-sm">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h3 className="text-white font-medium mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {[
                      { value: "all", label: "All Prices" },
                      { value: "0-100", label: "Under $100" },
                      { value: "100-250", label: "$100 - $250" },
                      { value: "250-500", label: "$250 - $500" },
                      { value: "500", label: "Over $500" },
                    ].map((range) => (
                      <label key={range.value} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="price"
                          value={range.value}
                          checked={priceRange === range.value}
                          onChange={(e) => setPriceRange(e.target.value)}
                          className="text-yellow-400 focus:ring-yellow-400"
                        />
                        <span className="text-slate-300 text-sm">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h3 className="text-white font-medium mb-3">Minimum Rating</h3>
                  <div className="space-y-2">
                    {[0, 3, 4, 4.5].map((rating) => (
                      <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={minRating === rating}
                          onChange={(e) => setMinRating(Number(e.target.value))}
                          className="text-yellow-400 focus:ring-yellow-400"
                        />
                        <div className="flex items-center space-x-1">
                          {rating === 0 ? (
                            <span className="text-slate-300 text-sm">All Ratings</span>
                          ) : (
                            <>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < rating ? "text-yellow-400 fill-yellow-400" : "text-slate-500"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-slate-300 text-sm">& up</span>
                            </>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  size="sm"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Sort and View Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                >
                  <option value="relevance">Sort by Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="text-white"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="text-white"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Products Grid/List */}
            {products.length > 0 ? (
              <>
                <div
                  className={
                    viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" : "space-y-6"
                  }
                >
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2 mt-12">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={!pagination.hasPrevPage}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Previous
                    </Button>

                    {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                      const pageNum = i + 1
                      return (
                        <Button
                          key={pageNum}
                          variant={pagination.currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(pageNum)}
                          className={
                            pagination.currentPage === pageNum
                              ? "gold-gradient text-black"
                              : "border-white/20 text-white hover:bg-white/10"
                          }
                        >
                          {pageNum}
                        </Button>
                      )
                    })}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={!pagination.hasNextPage}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-white mb-2">No products found</h3>
                <p className="text-slate-400 mb-6">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button onClick={clearFilters} className="gold-gradient text-black font-semibold">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SearchContent />
    </Suspense>
  )
}
