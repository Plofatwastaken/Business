import { type NextRequest, NextResponse } from "next/server"
import { getCategoryById, getProductsByCategory } from "@/lib/productService"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const { searchParams } = new URL(request.url)
	const paramsData = await params
	const category = getCategoryById(paramsData.id)

	if (!category) {
		return NextResponse.json({ error: "Category not found" }, { status: 404 })
	}

	// Get pagination options
	const page = Number.parseInt(searchParams.get("page") || "1")
	const limit = Number.parseInt(searchParams.get("limit") || "12")
	const sortBy = searchParams.get("sortBy") || "relevance"

	// Get products for this category
	const productsResult = getProductsByCategory(paramsData.id, { page, limit })

	// Apply sorting if specified
	if (sortBy !== "relevance") {
		productsResult.filters.sortBy = sortBy
	}

	return NextResponse.json({
		category,
		...productsResult,
	})
}
