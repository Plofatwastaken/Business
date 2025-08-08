import { type NextRequest, NextResponse } from "next/server"
import { getProductById, getRelatedProducts } from "@/lib/productService"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = getProductById(params.id)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const relatedProducts = getRelatedProducts(product.id, product.category, 4)

    return NextResponse.json({
      product,
      relatedProducts,
    })
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}
