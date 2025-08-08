import { NextResponse } from "next/server"
import { getCategoryStats, getBrands, getTags, getPriceRange } from "@/lib/productService"

export async function GET() {
  try {
    const categoryStats = getCategoryStats()
    const brands = getBrands()
    const tags = getTags()
    const priceRange = getPriceRange()

    return NextResponse.json({
      categoryStats,
      brands,
      tags,
      priceRange,
      totalProducts: categoryStats.reduce((sum, cat) => sum + cat.count, 0),
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
