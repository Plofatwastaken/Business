import productsData from "@/data/products.json"
import categoriesData from "@/data/categories.json"

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

export interface Category {
  id: string
  name: string
  description: string
  image: string
  gradient: string
  productCount?: number
}

export interface ProductFilters {
  category?: string
  search?: string
  sortBy?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  brand?: string
  inStock?: boolean
  tags?: string[]
}

export interface PaginationOptions {
  page?: number
  limit?: number
}

export interface ProductsResult {
  products: Product[]
  pagination: {
    currentPage: number
    totalPages: number
    totalProducts: number
    pageSize: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
  filters: ProductFilters
}

// Get all products with optional filtering and pagination
export function getProducts(filters: ProductFilters = {}, pagination: PaginationOptions = {}): ProductsResult {
  const { page = 1, limit = 12 } = pagination
  let filteredProducts = [...productsData] as Product[]

  // Apply category filter
  if (filters.category && filters.category !== "all") {
    filteredProducts = filteredProducts.filter((product) => product.category === filters.category)
  }

  // Apply search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
        product.category.toLowerCase().includes(searchLower),
    )
  }

  // Apply price filters
  if (filters.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter((product) => product.price >= filters.minPrice!)
  }

  if (filters.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter((product) => product.price <= filters.maxPrice!)
  }

  // Apply rating filter
  if (filters.minRating !== undefined && filters.minRating > 0) {
    filteredProducts = filteredProducts.filter((product) => product.rating >= filters.minRating!)
  }

  // Apply brand filter
  if (filters.brand) {
    filteredProducts = filteredProducts.filter(
      (product) => product.brand.toLowerCase() === filters.brand!.toLowerCase(),
    )
  }

  // Apply stock filter
  if (filters.inStock !== undefined) {
    filteredProducts = filteredProducts.filter((product) => product.inStock === filters.inStock)
  }

  // Apply tags filter
  if (filters.tags && filters.tags.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      filters.tags!.some((tag) =>
        product.tags.some((productTag) => productTag.toLowerCase().includes(tag.toLowerCase())),
      ),
    )
  }

  // Apply sorting
  switch (filters.sortBy) {
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price)
      break
    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price)
      break
    case "rating":
      filteredProducts.sort((a, b) => b.rating - a.rating)
      break
    case "reviews":
      filteredProducts.sort((a, b) => b.reviews - a.reviews)
      break
    case "name":
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
      break
    case "newest":
      // Assuming products with badges are newer
      filteredProducts.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0))
      break
    default:
      // Keep original order for relevance
      break
  }

  // Calculate pagination
  const totalProducts = filteredProducts.length
  const totalPages = Math.ceil(totalProducts / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  return {
    products: paginatedProducts,
    pagination: {
      currentPage: page,
      totalPages,
      totalProducts,
      pageSize: limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
    filters,
  }
}

// Get a single product by ID
export function getProductById(id: string): Product | null {
  return (productsData as Product[]).find((product) => product.id === id) || null
}

// Get related products (same category, excluding current product)
export function getRelatedProducts(productId: string, categoryId: string, limit = 4): Product[] {
  return (productsData as Product[])
    .filter((product) => product.category === categoryId && product.id !== productId)
    .slice(0, limit)
}

// Get all categories with real product counts
export function getCategories(): Category[] {
  return categoriesData.map((category) => ({
    ...category,
    productCount: (productsData as Product[]).filter((product) => product.category === category.id).length,
  }))
}

// Get category by ID
export function getCategoryById(id: string): Category | null {
  const category = categoriesData.find((cat) => cat.id === id)
  if (!category) return null

  return {
    ...category,
    productCount: (productsData as Product[]).filter((product) => product.category === category.id).length,
  }
}

// Get featured products (products with badges)
export function getFeaturedProducts(limit = 4): Product[] {
  return (productsData as Product[]).filter((product) => product.badge).slice(0, limit)
}

// Get products by category
export function getProductsByCategory(categoryId: string, options: PaginationOptions = {}): ProductsResult {
  return getProducts({ category: categoryId }, options)
}

// Search products
export function searchProducts(query: string, options: PaginationOptions = {}): ProductsResult {
  return getProducts({ search: query }, options)
}

// Get all unique brands
export function getBrands(): string[] {
  const brands = new Set((productsData as Product[]).map((product) => product.brand))
  return Array.from(brands).sort()
}

// Get all unique tags
export function getTags(): string[] {
  const tags = new Set((productsData as Product[]).flatMap((product) => product.tags))
  return Array.from(tags).sort()
}

// Get price range
export function getPriceRange(): { min: number; max: number } {
  const prices = (productsData as Product[]).map((product) => product.price)
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  }
}

// Get category statistics
export function getCategoryStats(): Array<{
  category: string
  name: string
  count: number
  avgPrice: number
  avgRating: number
}> {
  const categories = getCategories()

  return categories.map((category) => {
    const categoryProducts = (productsData as Product[]).filter((product) => product.category === category.id)

    const avgPrice =
      categoryProducts.length > 0
        ? categoryProducts.reduce((sum, product) => sum + product.price, 0) / categoryProducts.length
        : 0

    const avgRating =
      categoryProducts.length > 0
        ? categoryProducts.reduce((sum, product) => sum + product.rating, 0) / categoryProducts.length
        : 0

    return {
      category: category.id,
      name: category.name,
      count: categoryProducts.length,
      avgPrice: Math.round(avgPrice * 100) / 100,
      avgRating: Math.round(avgRating * 10) / 10,
    }
  })
}

// Get search suggestions
export function getSearchSuggestions(
  query: string,
  limit = 8,
): Array<{
  type: "product" | "brand" | "category" | "tag"
  text: string
  category?: string
  id?: string
  count?: number
}> {
  if (!query || query.length < 2) return []

  const queryLower = query.toLowerCase()
  const suggestions: Array<{
    type: "product" | "brand" | "category" | "tag"
    text: string
    category?: string
    id?: string
    count?: number
  }> = []

  // Product suggestions
  const productSuggestions = (productsData as Product[])
    .filter((product) => product.name.toLowerCase().includes(queryLower))
    .slice(0, 3)
    .map((product) => ({
      type: "product" as const,
      text: product.name,
      category: product.category,
      id: product.id,
    }))

  // Brand suggestions
  const brands = getBrands()
  const brandSuggestions = brands
    .filter((brand) => brand.toLowerCase().includes(queryLower))
    .slice(0, 2)
    .map((brand) => ({
      type: "brand" as const,
      text: brand,
      count: (productsData as Product[]).filter((p) => p.brand === brand).length,
    }))

  // Category suggestions
  const categories = getCategories()
  const categorySuggestions = categories
    .filter((category) => category.name.toLowerCase().includes(queryLower))
    .slice(0, 2)
    .map((category) => ({
      type: "category" as const,
      text: category.name,
      category: category.id,
      count: category.productCount,
    }))

  // Tag suggestions
  const tags = getTags()
  const tagSuggestions = tags
    .filter((tag) => tag.toLowerCase().includes(queryLower))
    .slice(0, 2)
    .map((tag) => ({
      type: "tag" as const,
      text: tag,
      count: (productsData as Product[]).filter((p) => p.tags.includes(tag)).length,
    }))

  suggestions.push(...productSuggestions, ...brandSuggestions, ...categorySuggestions, ...tagSuggestions)

  return suggestions.slice(0, limit)
}
