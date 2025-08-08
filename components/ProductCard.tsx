"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Heart, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Product {
	id: string
	name: string
	price: number
	originalPrice?: number
	rating: number
	reviews: number
	image: string
	category: string
	affiliateUrl: string
	badge?: string
}

interface ProductCardProps {
	product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
	const [isLiked, setIsLiked] = useState(false)
	const [imageLoaded, setImageLoaded] = useState(false)

	const discount = product.originalPrice
		? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
		: 0

	return (
		<div className="group relative glass-card p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/20">
			{/* Badge */}
			{product.badge && (
				<div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
					{product.badge}
				</div>
			)}

			{/* Discount Badge */}
			{discount > 0 && (
				<div className="absolute top-4 right-4 z-10 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
					-{discount}%
				</div>
			)}

			{/* Wishlist Button */}
			<button
				onClick={() => setIsLiked(!isLiked)}
				className="absolute top-4 right-4 z-10 p-2 rounded-full glass-card hover:bg-white/20 transition-all group/heart"
			>
				<Heart
					className={`h-5 w-5 transition-all ${isLiked ? "text-red-500 fill-red-500" : "text-white group-hover/heart:text-red-400"
						}`}
				/>
			</button>

			{/* Product Image */}
			<Link href={`/product/${product.id}`} className="block relative overflow-hidden rounded-xl mb-4">
				<div className="aspect-square relative bg-slate-800/50">
					<Image
						src={product.image || "/placeholder.svg"}
						alt={product.name}
						fill
						className={`object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? "opacity-100" : "opacity-0"
							}`}
						onLoad={() => setImageLoaded(true)}
					/>
					{!imageLoaded && <div className="absolute inset-0 bg-slate-800/50 animate-pulse rounded-xl" />}
				</div>
			</Link>

			{/* Product Info */}
			<div className="space-y-3">
				<div className="flex items-center justify-between">
					<span className="text-xs text-yellow-400 font-medium uppercase tracking-wider">{product.category}</span>
					<div className="flex items-center space-x-1">
						<Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
						<span className="text-sm text-slate-300">{product.rating}</span>
						<span className="text-xs text-slate-500">({product.reviews})</span>
					</div>
				</div>

				<Link href={`/product/${product.id}`}>
					<h3 className="font-semibold text-lg text-white group-hover:text-yellow-400 transition-colors line-clamp-2">
						{product.name}
					</h3>
				</Link>

				<div className="flex items-center space-x-2">
					<span className="text-2xl font-bold text-white">${product.price.toFixed(2)}</span>
					{product.originalPrice && (
						<span className="text-lg text-slate-500 line-through">${product.originalPrice.toFixed(2)}</span>
					)}
				</div>

				{/* Buy Now Button */}
				<Button
					asChild
					className="w-full gold-gradient rounded-sm text-black font-semibold hover:scale-105 transition-all duration-300 group/btn"
				>
					<a
						href={product.affiliateUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center justify-center space-x-2"
					>
						<span>Buy Now</span>
						<ExternalLink className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
					</a>
				</Button>
			</div>
		</div>
	)
}
