import Link from "next/link"
import { Crown, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Crown className="h-8 w-8 text-yellow-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                LuxeMarket
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed">
              Your premier destination for luxury products and exclusive collections. Experience elegance redefined.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/categories/electronics"
                className="block text-slate-400 hover:text-yellow-400 transition-colors"
              >
                Electronics
              </Link>
              <Link href="/categories/fashion" className="block text-slate-400 hover:text-yellow-400 transition-colors">
                Fashion
              </Link>
              <Link href="/categories/home" className="block text-slate-400 hover:text-yellow-400 transition-colors">
                Home & Living
              </Link>
              <Link href="/categories/beauty" className="block text-slate-400 hover:text-yellow-400 transition-colors">
                Beauty
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-4">Customer Service</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-slate-400 hover:text-yellow-400 transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="block text-slate-400 hover:text-yellow-400 transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="block text-slate-400 hover:text-yellow-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-slate-400 hover:text-yellow-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-slate-400">
                <Mail className="h-5 w-5 text-yellow-400" />
                <span>hello@luxemarket.com</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-400">
                <Phone className="h-5 w-5 text-yellow-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-400">
                <MapPin className="h-5 w-5 text-yellow-400" />
                <span>New York, NY</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-slate-400">
          <p>&copy; 2024 LuxeMarket. All rights reserved. Crafted with excellence.</p>
        </div>
      </div>
    </footer>
  )
}
