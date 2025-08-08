"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    setIsSubscribed(true)
    setEmail("")
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-12 text-center luxury-gradient rounded-3xl">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-yellow-400/20">
              <Sparkles className="h-8 w-8 text-yellow-400" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Join the Elite Circle</h2>

          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Get exclusive access to luxury deals, early product launches, and curated collections delivered to your
            inbox.
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                  required
                />
              </div>
              <Button
                type="submit"
                className="gold-gradient text-black font-semibold px-8 py-3 rounded-full hover:scale-105 transition-all duration-300"
              >
                Subscribe
              </Button>
            </form>
          ) : (
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 text-green-400 text-lg font-semibold">
                <Sparkles className="h-5 w-5" />
                <span>Welcome to the Elite Circle!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
