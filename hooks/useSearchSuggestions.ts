"use client"

import { useState, useEffect, useCallback } from "react"
import { debounce } from "lodash"

export interface SearchSuggestion {
  type: "product" | "brand" | "category"
  text: string
  category: string | null
  id: string | null
}

export function useSearchSuggestions(query: string) {
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [loading, setLoading] = useState(false)

  const debouncedFetch = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery.length < 2) {
        setSuggestions([])
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(searchQuery)}`)
        const result = await response.json()
        setSuggestions(result.suggestions || [])
      } catch (error) {
        console.error("Error fetching suggestions:", error)
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }, 300),
    [],
  )

  useEffect(() => {
    if (query.trim()) {
      setLoading(true)
      debouncedFetch(query.trim())
    } else {
      setSuggestions([])
      setLoading(false)
    }

    return () => {
      debouncedFetch.cancel()
    }
  }, [query, debouncedFetch])

  return { suggestions, loading }
}
