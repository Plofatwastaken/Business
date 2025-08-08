"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Menu, X, Crown, ShoppingBag, User, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSearchSuggestions } from "@/hooks/useSearchSuggestions"
import { useCategories } from "@/hooks/useCategories"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const { suggestions, loading: suggestionsLoading } = useSearchSuggestions(searchQuery)
  const { categories } = useCategories()

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setShowSuggestions(false)
      setSearchQuery("")
      setIsMenuOpen(false)
    }
  }

  const handleSuggestionClick = (suggestion: any) => {
    if (suggestion.type === "product" && suggestion.id) {
      router.push(`/product/${suggestion.id}`)
    } else if (suggestion.type === "category" && suggestion.category) {
      router.push(`/categories/${suggestion.category}`)
    } else if (suggestion.type === "brand") {
      router.push(`/search?q=${encodeURIComponent(suggestion.text)}`)
    } else {
      handleSearch(suggestion.text)
    }
    setShowSuggestions(false)
    setSearchQuery("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(searchQuery)
    }
  }

  return (
    <nav className="fixed top-0 w-full z-50 glass-card border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group flex-shrink-0">
            <Crown className="h-8 w-8 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              LuxeMarket
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="text-slate-300 hover:text-yellow-400 transition-colors font-medium text-sm"
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Enhanced Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4 lg:mx-8" ref={searchRef}>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search luxury products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowSuggestions(true)
                }}
                onKeyPress={handleKeyPress}
                onFocus={() => setShowSuggestions(true)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-full text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all"
              />

              {/* Search Suggestions Dropdown */}
              {showSuggestions && (searchQuery.length > 1 || suggestions.length > 0) && (
                <div className="absolute top-full left-0 right-0 mt-2 glass-card border border-white/10 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                  {suggestionsLoading ? (
                    <div className="px-4 py-3 text-slate-400 text-center">
                      <div className="animate-spin h-4 w-4 border-2 border-yellow-400 border-t-transparent rounded-full mx-auto"></div>
                    </div>
                  ) : suggestions.length > 0 ? (
                    suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors flex items-center space-x-3"
                      >
                        <Search className="h-4 w-4 text-slate-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="block truncate">{suggestion.text}</span>
                          {suggestion.type !== "product" && (
                            <span className="text-xs text-slate-400 capitalize">{suggestion.type}</span>
                          )}
                        </div>
                      </button>
                    ))
                  ) : searchQuery.length > 1 ? (
                    <div className="px-4 py-3 text-slate-400 text-center">No suggestions found</div>
                  ) : null}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ShoppingBag className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-card border-t border-white/10">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search luxury products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-full text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
              />
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="block py-2 text-slate-300 hover:text-yellow-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                  <span className="text-xs text-slate-500 ml-2">({category.productCount})</span>
                </Link>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center justify-around pt-4 border-t border-white/10">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Heart className="h-4 w-4 mr-2" />
                Wishlist
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <User className="h-4 w-4 mr-2" />
                Account
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
