import { prisma } from "@/lib/db"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { ProductSort } from "@/components/product-sort"

interface SearchParams {
  category?: string
  material?: string
  search?: string
  minPrice?: string
  maxPrice?: string
  sortBy?: string
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const { category, material, search, minPrice, maxPrice, sortBy } = params

  // Build where clause
  const whereClause: any = {}
  
  if (category) whereClause.category = category
  if (material) whereClause.material = material
  if (minPrice || maxPrice) {
    whereClause.price = {}
    if (minPrice) whereClause.price.gte = parseFloat(minPrice)
    if (maxPrice) whereClause.price.lte = parseFloat(maxPrice)
  }
  if (search) {
    whereClause.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { brand: { contains: search, mode: 'insensitive' } },
    ]
  }

  // Build orderBy clause
  let orderBy: any = { createdAt: 'desc' }
  switch (sortBy) {
    case 'price-low':
      orderBy = { price: 'asc' }
      break
    case 'price-high':
      orderBy = { price: 'desc' }
      break
    case 'name':
      orderBy = { name: 'asc' }
      break
    case 'rating':
      orderBy = { rating: 'desc' }
      break
    case 'newest':
      orderBy = { createdAt: 'desc' }
      break
    default:
      orderBy = { createdAt: 'desc' }
  }

  const products = await prisma.product.findMany({
    where: whereClause,
    orderBy,
  })

  const categories = await prisma.product.findMany({
    select: { category: true },
    distinct: ['category'],
  })

  const materials = await prisma.product.findMany({
    select: { material: true },
    distinct: ['material'],
  })

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
        <aside className="lg:w-64">
          <div className="lg:sticky lg:top-24">
            <ProductFilters 
              categories={categories.map(c => c.category)}
              materials={materials.map(m => m.material)}
              currentCategory={category}
              currentMaterial={material}
              minPrice={minPrice ? parseInt(minPrice) : undefined}
              maxPrice={maxPrice ? parseInt(maxPrice) : undefined}
            />
          </div>
        </aside>
        
        <main className="flex-1">
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                  {category ? `${category} Furniture` : 'All Products'}
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {search && `Search results for "${search}" • `}
                  {material && `Material: ${material} • `}
                  {products.length} product{products.length !== 1 ? 's' : ''} found
                </p>
              </div>
              <ProductSort currentSort={sortBy} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {products.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <p className="text-muted-foreground text-base sm:text-lg">
                No products found matching your criteria.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}