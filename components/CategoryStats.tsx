"use client"

import { useState, useEffect } from "react"
import { BarChart3, TrendingUp, Package, Star } from "lucide-react"

interface CategoryStat {
  category: string
  name: string
  count: number
  avgPrice: number
  avgRating: number
}

interface StatsData {
  categoryStats: CategoryStat[]
  brands: string[]
  tags: string[]
  priceRange: { min: number; max: number }
  totalProducts: number
}

export default function CategoryStats() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats")
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-700 rounded w-64 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-slate-700 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!stats) return null

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Collection</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Discover our extensive range of premium products across multiple categories
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="glass-card p-6 rounded-xl text-center">
            <Package className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">{stats.totalProducts}</div>
            <div className="text-slate-400 text-sm">Total Products</div>
          </div>

          <div className="glass-card p-6 rounded-xl text-center">
            <BarChart3 className="h-8 w-8 text-blue-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">{stats.categoryStats.length}</div>
            <div className="text-slate-400 text-sm">Categories</div>
          </div>

          <div className="glass-card p-6 rounded-xl text-center">
            <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">{stats.brands.length}</div>
            <div className="text-slate-400 text-sm">Premium Brands</div>
          </div>

          <div className="glass-card p-6 rounded-xl text-center">
            <Star className="h-8 w-8 text-purple-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">
              {(stats.categoryStats.reduce((sum, cat) => sum + cat.avgRating, 0) / stats.categoryStats.length).toFixed(
                1,
              )}
            </div>
            <div className="text-slate-400 text-sm">Avg Rating</div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="glass-card p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Category Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.categoryStats.map((category) => (
              <div key={category.category} className="text-center">
                <div className="text-lg font-semibold text-white mb-2">{category.name}</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Products:</span>
                    <span className="text-yellow-400 font-medium">{category.count}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Avg Price:</span>
                    <span className="text-green-400 font-medium">${category.avgPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Avg Rating:</span>
                    <span className="text-purple-400 font-medium">{category.avgRating}★</span>
                  </div>
                </div>

                {/* Visual bar for product count */}
                <div className="mt-3 bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-1000"
                    style={{
                      width: `${(category.count / Math.max(...stats.categoryStats.map((c) => c.count))) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
