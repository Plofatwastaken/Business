"use client"

import { useState, useEffect } from "react"

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  images: string[]
  category: string
  affiliateUrl: string
  badge?: string
  description: string
  features: string[]
  specifications: Record<string, string>
  tags: string[]
  inStock: boolean
  brand: string
  colors: string[]
}

export interface ProductsResponse {
  products: Product[]
  pagination: {
    currentPage: number
    totalPages: number
    totalProducts: number
    pageSize: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
  filters: Record<string, string | null>
}

export interface UseProductsOptions {
  category?: string
  search?: string
  sortBy?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  brand?: string
  inStock?: boolean
  limit?: number
  page?: number
}

export function useProducts(options: UseProductsOptions = {}) {
  const [data, setData] = useState<ProductsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        const params = new URLSearchParams()

        Object.entries(options).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            params.append(key, value.toString())
          }
        })

        const response = await fetch(`/api/products?${params.toString()}`)

        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [JSON.stringify(options)])

  return { data, loading, error, refetch: () => setLoading(true) }
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/products/${id}`)

        if (!response.ok) {
          throw new Error("Product not found")
        }

        const result = await response.json()
        setProduct(result.product)
        setRelatedProducts(result.relatedProducts)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  return { product, relatedProducts, loading, error }
}
