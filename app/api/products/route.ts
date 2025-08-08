import { type NextRequest, NextResponse } from "next/server"
import { getProducts } from "@/lib/productService"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse filters
    const filters = {
      category: searchParams.get("category") || undefined,
      search: searchParams.get("search") || undefined,
      sortBy: searchParams.get("sortBy") || "relevance",
      minPrice: searchParams.get("minPrice") ? Number.parseFloat(searchParams.get("minPrice")!) : undefined,
      maxPrice: searchParams.get("maxPrice") ? Number.parseFloat(searchParams.get("maxPrice")!) : undefined,
      minRating: searchParams.get("minRating") ? Number.parseFloat(searchParams.get("minRating")!) : undefined,
      brand: searchParams.get("brand") || undefined,
      inStock: searchParams.get("inStock") === "true" ? true : undefined,
    }

    // Parse pagination
    const pagination = {
      page: Number.parseInt(searchParams.get("page") || "1"),
      limit: Number.parseInt(searchParams.get("limit") || "12"),
    }

    const result = await getProducts(filters, pagination)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
