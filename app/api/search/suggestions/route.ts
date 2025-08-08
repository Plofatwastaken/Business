import { type NextRequest, NextResponse } from "next/server"
import { getSearchSuggestions } from "@/lib/productService"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q") || ""

    const suggestions = getSearchSuggestions(query, 8)

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error("Error fetching search suggestions:", error)
    return NextResponse.json({ error: "Failed to fetch suggestions" }, { status: 500 })
  }
}
