import Hero from "@/components/Hero"
import FeaturedProducts from "@/components/FeaturedProducts"
import CategoryShowcase from "@/components/CategoryShowcase"
import CategoryStats from "@/components/CategoryStats"
import Newsletter from "@/components/Newsletter"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <Hero />
      <FeaturedProducts />
      <CategoryShowcase />
      <CategoryStats />
      <Newsletter />
    </main>
  )
}
