// Product database - in a real app, this would be from a database or API
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
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 1247,
    image: "/placeholder.svg?height=400&width=400&text=Headphones",
    images: [
      "/placeholder.svg?height=600&width=600&text=Front+View",
      "/placeholder.svg?height=600&width=600&text=Side+View",
      "/placeholder.svg?height=600&width=600&text=Back+View",
      "/placeholder.svg?height=600&width=600&text=Detail+View",
      "/placeholder.svg?height=600&width=600&text=In+Use",
      "/placeholder.svg?height=600&width=600&text=Accessories",
    ],
    category: "electronics",
    affiliateUrl: "https://example.com/affiliate/headphones",
    badge: "Best Seller",
    description:
      "Experience unparalleled audio quality with these premium wireless headphones. Featuring advanced noise cancellation, 30-hour battery life, and luxurious comfort for extended listening sessions.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium leather ear cushions",
      "Hi-Res Audio certified",
      "Quick charge: 5 min = 2 hours playback",
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 40kHz",
      Impedance: "32 ohms",
      Weight: "250g",
      Connectivity: "Bluetooth 5.0, USB-C",
    },
    tags: ["wireless", "bluetooth", "noise-cancelling", "premium", "audio"],
  },
  {
    id: "2",
    name: "Luxury Silk Scarf Collection",
    price: 189.99,
    rating: 4.9,
    reviews: 892,
    image: "/placeholder.svg?height=400&width=400&text=Silk+Scarf",
    images: [
      "/placeholder.svg?height=600&width=600&text=Scarf+Front",
      "/placeholder.svg?height=600&width=600&text=Pattern+Detail",
      "/placeholder.svg?height=600&width=600&text=Texture+Close",
      "/placeholder.svg?height=600&width=600&text=Styled+Look",
    ],
    category: "fashion",
    affiliateUrl: "https://example.com/affiliate/scarf",
    description:
      "Exquisite handcrafted silk scarves featuring exclusive patterns and premium materials. Perfect for adding elegance to any outfit.",
    features: [
      "100% Pure Mulberry Silk",
      "Hand-rolled edges",
      "Exclusive designer patterns",
      "Lightweight and breathable",
      "Versatile styling options",
    ],
    specifications: {
      Material: "100% Mulberry Silk",
      Dimensions: "90cm x 90cm",
      Weight: "45g",
      Care: "Dry clean only",
      Origin: "Made in Italy",
    },
    tags: ["silk", "luxury", "fashion", "accessories", "designer"],
  },
  {
    id: "3",
    name: "Smart Home Security System",
    price: 449.99,
    originalPrice: 599.99,
    rating: 4.7,
    reviews: 2156,
    image: "/placeholder.svg?height=400&width=400&text=Security+System",
    images: [
      "/placeholder.svg?height=600&width=600&text=Main+Hub",
      "/placeholder.svg?height=600&width=600&text=Camera+View",
      "/placeholder.svg?height=600&width=600&text=Sensor+Detail",
      "/placeholder.svg?height=600&width=600&text=App+Interface",
      "/placeholder.svg?height=600&width=600&text=Installation",
    ],
    category: "electronics",
    affiliateUrl: "https://example.com/affiliate/security",
    badge: "New",
    description:
      "Complete smart home security solution with AI-powered detection, 4K cameras, and 24/7 monitoring capabilities.",
    features: [
      "4K Ultra HD cameras",
      "AI-powered motion detection",
      "24/7 cloud recording",
      "Mobile app control",
      "Professional monitoring",
    ],
    specifications: {
      "Camera Resolution": "4K Ultra HD",
      Storage: "Cloud + Local",
      Connectivity: "Wi-Fi 6, Ethernet",
      Power: "PoE + Battery backup",
      Compatibility: "iOS, Android",
    },
    tags: ["security", "smart-home", "cameras", "monitoring", "ai"],
  },
  {
    id: "4",
    name: "Artisan Coffee Maker Pro",
    price: 329.99,
    rating: 4.6,
    reviews: 743,
    image: "/placeholder.svg?height=400&width=400&text=Coffee+Maker",
    images: [
      "/placeholder.svg?height=600&width=600&text=Coffee+Maker",
      "/placeholder.svg?height=600&width=600&text=Brewing+Process",
      "/placeholder.svg?height=600&width=600&text=Control+Panel",
      "/placeholder.svg?height=600&width=600&text=Coffee+Cup",
    ],
    category: "home",
    affiliateUrl: "https://example.com/affiliate/coffee",
    description:
      "Professional-grade coffee maker with precision temperature control and multiple brewing methods for the perfect cup.",
    features: [
      "Precision temperature control",
      "Multiple brewing methods",
      "Built-in grinder",
      "Programmable settings",
      "Premium stainless steel",
    ],
    specifications: {
      Capacity: "12 cups",
      Power: "1400W",
      Material: "Stainless Steel",
      Dimensions: '14" x 10" x 16"',
      Warranty: "2 years",
    },
    tags: ["coffee", "brewing", "kitchen", "appliance", "premium"],
  },
  {
    id: "5",
    name: "Designer Sunglasses Elite",
    price: 249.99,
    originalPrice: 349.99,
    rating: 4.5,
    reviews: 567,
    image: "/placeholder.svg?height=400&width=400&text=Sunglasses",
    images: [
      "/placeholder.svg?height=600&width=600&text=Sunglasses+Front",
      "/placeholder.svg?height=600&width=600&text=Side+Profile",
      "/placeholder.svg?height=600&width=600&text=Lens+Detail",
      "/placeholder.svg?height=600&width=600&text=Case+Included",
    ],
    category: "fashion",
    affiliateUrl: "https://example.com/affiliate/sunglasses",
    description:
      "Premium designer sunglasses with polarized lenses and titanium frames for ultimate style and protection.",
    features: [
      "Polarized UV400 lenses",
      "Titanium frame construction",
      "Anti-reflective coating",
      "Lightweight design",
      "Premium leather case included",
    ],
    specifications: {
      "Frame Material": "Titanium",
      "Lens Material": "Polarized Glass",
      "UV Protection": "100% UV400",
      Weight: "28g",
      Warranty: "Lifetime",
    },
    tags: ["sunglasses", "designer", "polarized", "titanium", "luxury"],
  },
  {
    id: "6",
    name: "Bluetooth Speaker Premium",
    price: 199.99,
    rating: 4.4,
    reviews: 1089,
    image: "/placeholder.svg?height=400&width=400&text=Speaker",
    images: [
      "/placeholder.svg?height=600&width=600&text=Speaker+Front",
      "/placeholder.svg?height=600&width=600&text=Speaker+Back",
      "/placeholder.svg?height=600&width=600&text=Controls",
      "/placeholder.svg?height=600&width=600&text=Waterproof",
    ],
    category: "electronics",
    affiliateUrl: "https://example.com/affiliate/speaker",
    description: "High-fidelity Bluetooth speaker with 360-degree sound, waterproof design, and 20-hour battery life.",
    features: [
      "360-degree surround sound",
      "Waterproof IPX7 rating",
      "20-hour battery life",
      "Voice assistant compatible",
      "Premium fabric finish",
    ],
    specifications: {
      "Power Output": "40W",
      "Battery Life": "20 hours",
      Connectivity: "Bluetooth 5.0",
      "Water Resistance": "IPX7",
      Dimensions: '8" x 3" x 3"',
    },
    tags: ["bluetooth", "speaker", "waterproof", "portable", "audio"],
  },
  {
    id: "7",
    name: "Leather Handbag Luxury",
    price: 399.99,
    originalPrice: 549.99,
    rating: 4.8,
    reviews: 432,
    image: "/placeholder.svg?height=400&width=400&text=Handbag",
    images: [
      "/placeholder.svg?height=600&width=600&text=Handbag+Front",
      "/placeholder.svg?height=600&width=600&text=Interior+View",
      "/placeholder.svg?height=600&width=600&text=Handle+Detail",
      "/placeholder.svg?height=600&width=600&text=Styled+Look",
    ],
    category: "fashion",
    affiliateUrl: "https://example.com/affiliate/handbag",
    badge: "Limited Edition",
    description:
      "Handcrafted luxury leather handbag with premium hardware and timeless design. Perfect for any occasion.",
    features: [
      "Genuine Italian leather",
      "Gold-plated hardware",
      "Multiple compartments",
      "Adjustable strap",
      "Handcrafted construction",
    ],
    specifications: {
      Material: "Italian Leather",
      Dimensions: '12" x 8" x 4"',
      Hardware: "Gold-plated",
      Lining: "Silk",
      Care: "Leather conditioner recommended",
    },
    tags: ["handbag", "leather", "luxury", "italian", "designer"],
  },
  {
    id: "8",
    name: "Skincare Set Premium",
    price: 159.99,
    rating: 4.7,
    reviews: 823,
    image: "/placeholder.svg?height=400&width=400&text=Skincare+Set",
    images: [
      "/placeholder.svg?height=600&width=600&text=Complete+Set",
      "/placeholder.svg?height=600&width=600&text=Cleanser",
      "/placeholder.svg?height=600&width=600&text=Serum",
      "/placeholder.svg?height=600&width=600&text=Moisturizer",
    ],
    category: "beauty",
    affiliateUrl: "https://example.com/affiliate/skincare",
    description:
      "Complete luxury skincare routine with organic ingredients and clinically proven results for radiant skin.",
    features: [
      "Organic ingredients",
      "Clinically tested",
      "Anti-aging formula",
      "Suitable for all skin types",
      "Cruelty-free",
    ],
    specifications: {
      "Set Includes": "Cleanser, Serum, Moisturizer, Eye Cream",
      "Skin Type": "All types",
      "Key Ingredients": "Hyaluronic Acid, Vitamin C, Retinol",
      Volume: "Full size products",
      Certification: "Organic, Cruelty-free",
    },
    tags: ["skincare", "organic", "anti-aging", "beauty", "luxury"],
  },
]

export const categories = [
  {
    id: "electronics",
    name: "Electronics",
    description: "Cutting-edge technology meets luxury design",
    image: "/placeholder.svg?height=300&width=400&text=Electronics",
    gradient: "from-blue-600 to-purple-600",
  },
  {
    id: "fashion",
    name: "Fashion",
    description: "Luxury apparel & accessories",
    image: "/placeholder.svg?height=300&width=400&text=Fashion",
    gradient: "from-pink-600 to-rose-600",
  },
  {
    id: "home",
    name: "Home & Living",
    description: "Premium home essentials",
    image: "/placeholder.svg?height=300&width=400&text=Home",
    gradient: "from-green-600 to-emerald-600",
  },
  {
    id: "beauty",
    name: "Beauty",
    description: "Luxury skincare & cosmetics",
    image: "/placeholder.svg?height=300&width=400&text=Beauty",
    gradient: "from-purple-600 to-indigo-600",
  },
]

// Search and filter functions
export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      product.category.toLowerCase().includes(lowercaseQuery),
  )
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((product) => product.category === categoryId)
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.badge).slice(0, 4)
}

export function getRelatedProducts(productId: string, category: string): Product[] {
  return products.filter((product) => product.id !== productId && product.category === category).slice(0, 4)
}
