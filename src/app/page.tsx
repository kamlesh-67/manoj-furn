import { prisma } from "@/lib/db"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({
    take: 6,
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      {/* Hero Section */}
      <section className="text-center py-8 sm:py-12 lg:py-16 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg mb-8 sm:mb-12 lg:mb-16">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4">
          Premium Furniture for Your Home
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
          Discover our collection of high-quality furniture designed to transform your living space into a comfortable and stylish haven.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <Link href="/products">Shop Now</Link>
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
            <Link href="/categories">Browse Categories</Link>
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Featured Products</h2>
          <Button variant="outline" size="sm" className="w-full sm:w-auto" asChild>
            <Link href="/products">View All</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="mt-12 sm:mt-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {['Living Room', 'Bedroom', 'Dining Room', 'Office'].map((category) => (
            <Link
              key={category}
              href={`/products?category=${encodeURIComponent(category)}`}
              className="group relative overflow-hidden rounded-lg bg-muted p-4 sm:p-6 hover:bg-muted/80 transition-colors min-h-[80px] flex items-center justify-center"
            >
              <h3 className="font-semibold text-sm sm:text-base lg:text-lg group-hover:text-primary transition-colors text-center">
                {category}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}