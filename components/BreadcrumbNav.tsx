"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[]
}

export default function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-400 mb-6 overflow-x-auto">
      <Link href="/" className="flex items-center hover:text-yellow-400 transition-colors shrink-0">
        <Home className="h-4 w-4 mr-1" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2 shrink-0">
          <ChevronRight className="h-4 w-4 text-slate-600" />
          {item.href ? (
            <Link href={item.href} className="hover:text-yellow-400 transition-colors truncate">
              {item.label}
            </Link>
          ) : (
            <span className="text-white truncate">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
