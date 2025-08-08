"use client"

import { useState, useEffect, use } from "react"
import { notFound } from "next/navigation"
import { Grid3X3, List } from "lucide-react"
import ProductCard from "@/components/ProductCard"
import LoadingSpinner from "@/components/LoadingSpinner"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import { Button } from "@/components/ui/button"

interface Category {
	id: string
	name: string
	description: string
	image: string
	gradient: string
	productCount: number
}

interface Product {
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

interface CategoryData {
	category: Category
	products: Product[]
	pagination: {
		currentPage: number
		totalPages: number
		totalProducts: number
		pageSize: number
		hasNextPage: boolean
		hasPrevPage: boolean
	}
}

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
	const [data, setData] = useState<CategoryData | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [sortBy, setSortBy] = useState("relevance")
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
	const [currentPage, setCurrentPage] = useState(1)

	const paramsData = use(params)

	useEffect(() => {
		const fetchCategoryData = async () => {
			try {
				setLoading(true)
				setError(null)

				const response = await fetch(`/api/categories/${paramsData.category}?page=${currentPage}&sortBy=${sortBy}`)

				if (!response.ok) {
					if (response.status === 404) {
						notFound()
					}
					throw new Error("Failed to fetch category data")
				}

				const result = await response.json()
				setData(result)
			} catch (err) {
				setError(err instanceof Error ? err.message : "An error occurred")
			} finally {
				setLoading(false)
			}
		}

		fetchCategoryData()
	}, [currentPage, sortBy])

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
		window.scrollTo({ top: 0, behavior: "smooth" })
	}

	if (loading) {
		return (
			<main className="min-h-screen bg-linear-to-b from-slate-950 to-slate-900 pt-24">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<LoadingSpinner />
				</div>
			</main>
		)
	}

	if (error || !data) {
		return (
			<main className="min-h-screen bg-linear-to-b from-slate-950 to-slate-900 pt-24">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
					<p className="text-red-400">Error: {error || "Category not found"}</p>
				</div>
			</main>
		)
	}

	const { category, products, pagination } = data

	return (
		<main className="min-h-screen bg-linear-to-b from-slate-950 to-slate-900 pt-24">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Breadcrumb */}
				<BreadcrumbNav items={[{ label: "Categories", href: "/" }, { label: category.name }]} />

				{/* Category Header */}
				<div className="text-center mb-16">
					<h1 className="text-3xl md:text-6xl font-bold mb-6">
						<span className="bg-linear-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
							{category.name}
						</span>
					</h1>
					<p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-4">{category.description}</p>
					<div className="flex items-center justify-center space-x-4 text-sm">
						<span className="text-yellow-400 font-medium">
							{pagination.totalProducts} {pagination.totalProducts === 1 ? "Product" : "Products"} Available
						</span>
						<span className="text-slate-500">•</span>
						<span className="text-slate-400">
							Page {pagination.currentPage} of {pagination.totalPages}
						</span>
					</div>
				</div>

				{/* Sort and View Controls */}
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
					<select
						value={sortBy}
						onChange={(e) => {
							setSortBy(e.target.value)
							setCurrentPage(1)
						}}
						className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
					>
						<option value="relevance">Sort by Relevance</option>
						<option value="price-low">Price: Low to High</option>
						<option value="price-high">Price: High to Low</option>
						<option value="rating">Highest Rated</option>
						<option value="reviews">Most Reviews</option>
						<option value="name">Name A-Z</option>
						<option value="newest">Newest First</option>
					</select>

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

				{/* Products Grid */}
				{products.length > 0 ? (
					<>
						<div
							className={
								viewMode === "grid"
									? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 pb-20"
									: "space-y-6 pb-20"
							}
						>
							{products.map((product) => (
								<ProductCard key={product.id} product={product} />
							))}
						</div>

						{/* Pagination */}
						{pagination.totalPages > 1 && (
							<div className="flex justify-center items-center space-x-2 pb-20">
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
									const pageNum = Math.max(1, pagination.currentPage - 2) + i
									if (pageNum > pagination.totalPages) return null

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
						<div className="text-6xl mb-4">📦</div>
						<h3 className="text-2xl font-semibold text-white mb-2">No products available</h3>
						<p className="text-slate-400">Check back soon for new arrivals in this category.</p>
					</div>
				)}
			</div>
		</main>
	)
}
