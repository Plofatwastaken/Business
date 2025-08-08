"use client"

import { useState } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
	Star,
	Heart,
	Share2,
	ExternalLink,
	Shield,
	Truck,
	RotateCcw,
	X,
	ChevronLeft,
	ChevronRight,
	ZoomIn,
	Grid3X3,
	Maximize2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/ProductCard"
import LoadingSpinner from "@/components/LoadingSpinner"
import { useProduct } from "@/hooks/useProducts"
import BreadcrumbNav from "@/components/BreadcrumbNav"

export default function ProductPage({ params }: { params: { id: string } }) {
	const [selectedImage, setSelectedImage] = useState(0)
	const [isLiked, setIsLiked] = useState(false)
	const [isGalleryOpen, setIsGalleryOpen] = useState(false)

	const { product, relatedProducts, loading, error } = useProduct(params.id)

	if (loading) {
		return (
			<main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 pt-24">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<LoadingSpinner />
				</div>
			</main>
		)
	}

	if (error || !product) {
		notFound()
	}

	const discount = product.originalPrice
		? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
		: 0

	return (
		<main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 pt-24">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
				{/* Breadcrumb */}
				<BreadcrumbNav
					items={[
						{ label: "Categories", href: "/" },
						{
							label: product.category.charAt(0).toUpperCase() + product.category.slice(1),
							href: `/categories/${product.category}`,
						},
						{ label: product.name },
					]}
				/>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
					{/* Enhanced Product Images Gallery */}
					<div className="space-y-4">
						{/* Main Image Display */}
						<div className="aspect-square relative overflow-hidden rounded-2xl glass-card group">
							<Image
								src={product.images[selectedImage] || "/placeholder.svg"}
								alt={product.name}
								fill
								className="object-cover transition-transform duration-500 group-hover:scale-110"
							/>

							{/* Image Navigation Arrows */}
							<button
								onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : product.images.length - 1)}
								className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 p-2 md:p-3 rounded-full glass-card hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100"
							>
								<ChevronLeft className="h-4 w-4 md:h-6 md:w-6 text-white" />
							</button>

							<button
								onClick={() => setSelectedImage(selectedImage < product.images.length - 1 ? selectedImage + 1 : 0)}
								className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 p-2 md:p-3 rounded-full glass-card hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100"
							>
								<ChevronRight className="h-4 w-4 md:h-6 md:w-6 text-white" />
							</button>

							{/* Image Counter */}
							<div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 px-2 md:px-3 py-1 rounded-full glass-card text-white text-xs md:text-sm">
								{selectedImage + 1} / {product.images.length}
							</div>

							{/* Zoom Indicator */}
							<div className="absolute top-2 md:top-4 right-2 md:right-4 p-2 rounded-full glass-card opacity-0 group-hover:opacity-100 transition-all">
								<ZoomIn className="h-4 w-4 md:h-5 md:w-5 text-white" />
							</div>
						</div>

						{/* Thumbnail Images Grid */}
						<div className="grid grid-cols-4 gap-2 md:gap-4">
							{product.images.map((image, index) => (
								<button
									key={index}
									onClick={() => setSelectedImage(index)}
									className={`aspect-square relative overflow-hidden rounded-lg border-2 transition-all duration-300 hover:scale-105 ${selectedImage === index
										? "border-yellow-400 ring-2 ring-yellow-400/30"
										: "border-white/20 hover:border-white/40"
										}`}
								>
									<Image
										src={image || "/placeholder.svg"}
										alt={`${product.name} ${index + 1}`}
										fill
										className="object-cover"
									/>
									{selectedImage === index && <div className="absolute inset-0 bg-yellow-400/20" />}
								</button>
							))}
						</div>

						{/* Image Gallery Actions */}
						<div className="flex justify-between items-center">
							<button
								onClick={() => setIsGalleryOpen(true)}
								className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors text-sm"
							>
								<Grid3X3 className="h-4 w-4" />
								<span>View All Images</span>
							</button>

							<button className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors text-sm">
								<Maximize2 className="h-4 w-4" />
								<span className="hidden sm:inline">Full Screen</span>
							</button>
						</div>
					</div>

					{/* Product Details */}
					<div className="space-y-6">
						<div>
							<span className="text-yellow-400 font-medium uppercase tracking-wider text-sm capitalize">
								{product.category}
							</span>
							<h1 className="text-2xl md:text-4xl font-bold text-white mt-2 mb-4">{product.name}</h1>

							{/* Badge */}
							{product.badge && (
								<div className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
									{product.badge}
								</div>
							)}

							{/* Rating */}
							<div className="flex items-center space-x-4 mb-6">
								<div className="flex items-center space-x-1">
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className={`h-4 w-4 md:h-5 md:w-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-slate-400"
												}`}
										/>
									))}
									<span className="text-white font-medium ml-2">{product.rating}</span>
								</div>
								<span className="text-slate-400 text-sm">({product.reviews} reviews)</span>
							</div>

							{/* Description */}
							<div>
								<p className="text-slate-300 text-base md:text-lg leading-relaxed">{product.description}</p>
							</div>

							{/* Features */}
							<div>
								<h3 className="text-lg md:text-xl font-semibold text-white mb-4">Key Features</h3>
								<ul className="space-y-2">
									{product.features.map((feature, index) => (
										<li key={index} className="flex items-center space-x-3 text-slate-300 text-sm md:text-base">
											<div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0" />
											<span>{feature}</span>
										</li>
									))}
								</ul>
							</div>

							{/* Action Buttons */}
							<div className="space-y-4">
								<Button
									asChild
									size="lg"
									className="w-full gold-gradient text-black font-semibold text-base md:text-lg py-3 md:py-4 hover:scale-105 transition-all duration-300 animate-glow"
								>
									<a
										href={product.affiliateUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center justify-center space-x-2"
									>
										<span>Check It Out - ${product.price.toFixed(2)}</span>
										<ExternalLink className="h-4 w-4 md:h-5 md:w-5" />
									</a>
								</Button>

								<div className="flex space-x-4">
									<Button
										variant="outline"
										size="lg"
										className="flex-1 border-white/20 text-white hover:bg-white/10"
										onClick={() => setIsLiked(!isLiked)}
									>
										<Heart className={`h-4 w-4 md:h-5 md:w-5 mr-2 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
										{isLiked ? "Saved" : "Save"}
									</Button>

									<Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
										<Share2 className="h-4 w-4 md:h-5 md:w-5" />
									</Button>
								</div>
							</div>

							{/* Trust Badges */}
							<div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
								<div className="text-center">
									<Shield className="h-6 w-6 md:h-8 md:w-8 text-green-400 mx-auto mb-2" />
									<span className="text-xs md:text-sm text-slate-300">Secure Purchase</span>
								</div>
								<div className="text-center">
									<Truck className="h-6 w-6 md:h-8 md:w-8 text-blue-400 mx-auto mb-2" />
									<span className="text-xs md:text-sm text-slate-300">Fast Shipping</span>
								</div>
								<div className="text-center">
									<RotateCcw className="h-6 w-6 md:h-8 md:w-8 text-yellow-400 mx-auto mb-2" />
									<span className="text-xs md:text-sm text-slate-300">Easy Returns</span>
								</div>
							</div>
						</div>
					</div>

					{/* Specifications */}
					<div className="mt-16 glass-card p-6 md:p-8 rounded-2xl">
						<h2 className="text-xl md:text-2xl font-bold text-white mb-6">Specifications</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
							{Object.entries(product.specifications).map(([key, value]) => (
								<div key={key} className="flex justify-between items-center py-3 border-b border-white/10">
									<span className="text-slate-300 font-medium text-sm md:text-base">{key}</span>
									<span className="text-white text-sm md:text-base">{value}</span>
								</div>
							))}
						</div>
					</div>

					{/* Related Products */}
					{relatedProducts.length > 0 && (
						<div className="mt-16">
							<h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Related Products</h2>
							<div className="flex gap-4 overflow-x-scroll overflow-y-clip p-2">
								{relatedProducts.map((relatedProduct) => (
									<ProductCard key={relatedProduct.id} product={relatedProduct} />
								))}
							</div>
						</div>
					)}
				</div>

				{/* Full Screen Image Gallery Modal */}
				{isGalleryOpen && (
					<div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
						<div className="relative w-full h-full max-w-6xl mx-auto p-4">
							{/* Close Button */}
							<button
								onClick={() => setIsGalleryOpen(false)}
								className="absolute top-4 right-4 z-10 p-3 rounded-full glass-card hover:bg-white/20 transition-all"
							>
								<X className="h-6 w-6 text-white" />
							</button>

							{/* Main Gallery Image */}
							<div className="relative w-full h-full flex items-center justify-center">
								<div className="relative max-w-4xl max-h-full aspect-square">
									<Image
										src={product.images[selectedImage] || "/placeholder.svg"}
										alt={product.name}
										fill
										className="object-contain"
									/>
								</div>

								{/* Gallery Navigation */}
								<button
									onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : product.images.length - 1)}
									className="absolute left-4 top-1/2 transform -translate-y-1/2 p-4 rounded-full glass-card hover:bg-white/20 transition-all"
								>
									<ChevronLeft className="h-8 w-8 text-white" />
								</button>

								<button
									onClick={() => setSelectedImage(selectedImage < product.images.length - 1 ? selectedImage + 1 : 0)}
									className="absolute right-4 top-1/2 transform -translate-y-1/2 p-4 rounded-full glass-card hover:bg-white/20 transition-all"
								>
									<ChevronRight className="h-8 w-8 text-white" />
								</button>
							</div>

							{/* Gallery Thumbnails */}
							<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-full overflow-x-auto">
								{product.images.map((image, index) => (
									<button
										key={index}
										onClick={() => setSelectedImage(index)}
										className={`flex-shrink-0 w-16 h-16 relative overflow-hidden rounded-lg border-2 transition-all ${selectedImage === index ? "border-yellow-400" : "border-white/30 hover:border-white/60"
											}`}
									>
										<Image
											src={image || "/placeholder.svg"}
											alt={`${product.name} ${index + 1}`}
											fill
											className="object-cover"
										/>
									</button>
								))}
							</div>

							{/* Image Counter */}
							<div className="absolute top-4 left-4 px-4 py-2 rounded-full glass-card text-white">
								{selectedImage + 1} of {product.images.length}
							</div>
						</div>
					</div>
				)}
			</div>
		</main>
	)
}
