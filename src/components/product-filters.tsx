"use client"

import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface ProductFiltersProps {
  categories: string[]
  materials: string[]
  currentCategory?: string
  currentMaterial?: string
  minPrice?: number
  maxPrice?: number
}

export function ProductFilters({ 
  categories, 
  materials, 
  currentCategory,
  currentMaterial,
  minPrice = 0,
  maxPrice = 100000
}: ProductFiltersProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const search = searchParams.get('search')
  const currentMinPrice = parseInt(searchParams.get('minPrice') || '0')
  const currentMaxPrice = parseInt(searchParams.get('maxPrice') || '100000')
  
  const [priceRange, setPriceRange] = useState([currentMinPrice, currentMaxPrice])

  const buildFilterUrl = (filters: Record<string, string | undefined>) => {
    const params = new URLSearchParams()
    
    if (search) params.set('search', search)
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'undefined') {
        params.set(key, value)
      }
    })
    
    return `/products?${params.toString()}`
  }

  const applyPriceFilter = () => {
    const url = buildFilterUrl({
      category: currentCategory,
      material: currentMaterial,
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString()
    })
    router.push(url)
  }

  const clearFilters = () => {
    router.push(`/products${search ? `?search=${search}` : ''}`)
  }

  const priceRanges = [
    { label: "Under ₹15,000", min: 0, max: 15000 },
    { label: "₹15,000 - ₹30,000", min: 15000, max: 30000 },
    { label: "₹30,000 - ₹50,000", min: 30000, max: 50000 },
    { label: "₹50,000 - ₹75,000", min: 50000, max: 75000 },
    { label: "Above ₹75,000", min: 75000, max: 100000 }
  ]

  return (
    <Card className="mb-4 lg:mb-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-3 text-sm">Categories</h3>
          <div className="space-y-1">
            <Button
              variant={!currentCategory ? "default" : "ghost"}
              size="sm"
              className={cn(
                "w-full justify-start text-sm h-8",
                !currentCategory && "bg-primary text-primary-foreground"
              )}
              asChild
            >
              <Link href={buildFilterUrl({ material: currentMaterial, minPrice: currentMinPrice.toString(), maxPrice: currentMaxPrice.toString() })}>
                All Categories
              </Link>
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={currentCategory === category ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "w-full justify-start text-sm h-8",
                  currentCategory === category && "bg-primary text-primary-foreground"
                )}
                asChild
              >
                <Link 
                  href={buildFilterUrl({ 
                    category, 
                    material: currentMaterial,
                    minPrice: currentMinPrice.toString(),
                    maxPrice: currentMaxPrice.toString()
                  })}
                >
                  {category}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Range */}
        <div>
          <h3 className="font-semibold mb-3 text-sm">Price Range</h3>
          <div className="space-y-4">
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={100000}
                min={0}
                step={1000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
                <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
              </div>
            </div>
            <Button size="sm" onClick={applyPriceFilter} className="w-full">
              Apply Price Filter
            </Button>
          </div>
          
          <div className="space-y-2 mt-4">
            {priceRanges.map((range) => (
              <Button
                key={range.label}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs h-7"
                asChild
              >
                <Link 
                  href={buildFilterUrl({ 
                    category: currentCategory,
                    material: currentMaterial,
                    minPrice: range.min.toString(),
                    maxPrice: range.max.toString()
                  })}
                >
                  {range.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Materials */}
        <div>
          <h3 className="font-semibold mb-3 text-sm">Material</h3>
          <div className="space-y-1">
            <Button
              variant={!currentMaterial ? "default" : "ghost"}
              size="sm"
              className={cn(
                "w-full justify-start text-sm h-8",
                !currentMaterial && "bg-primary text-primary-foreground"
              )}
              asChild
            >
              <Link href={buildFilterUrl({ 
                category: currentCategory,
                minPrice: currentMinPrice.toString(),
                maxPrice: currentMaxPrice.toString()
              })}>
                All Materials
              </Link>
            </Button>
            {materials.map((material) => (
              <Button
                key={material}
                variant={currentMaterial === material ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "w-full justify-start text-sm h-8",
                  currentMaterial === material && "bg-primary text-primary-foreground"
                )}
                asChild
              >
                <Link 
                  href={buildFilterUrl({ 
                    category: currentCategory,
                    material,
                    minPrice: currentMinPrice.toString(),
                    maxPrice: currentMaxPrice.toString()
                  })}
                >
                  {material}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}