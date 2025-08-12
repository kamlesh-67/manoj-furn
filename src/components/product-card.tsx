"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { toast } from "sonner"

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  material?: string | null
  brand?: string | null
  rating?: number | null
  reviewCount?: number | null
  imageUrl: string
  inStock: boolean
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart()

  const addToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      }
    })
    toast.success(`${product.name} added to cart!`)
  }
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>
      
      <CardContent className="p-3 sm:p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs sm:text-sm text-muted-foreground">{product.category}</span>
          {product.material && (
            <span className="text-xs bg-muted px-2 py-1 rounded">{product.material}</span>
          )}
        </div>
        <h3 className="font-semibold text-base sm:text-lg mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-2">
          {product.description}
        </p>
        {product.brand && (
          <p className="text-xs text-muted-foreground mb-2">by {product.brand}</p>
        )}
        {product.rating && (
          <div className="flex items-center gap-1 mb-3">
            <span className="text-yellow-500">★</span>
            <span className="text-xs">{product.rating}</span>
            {product.reviewCount && (
              <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
            )}
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="p-3 sm:p-4 pt-0 flex flex-col sm:flex-row gap-2">
        <Button asChild className="flex-1 w-full" size="sm">
          <Link href={`/products/${product.id}`}>
            View Details
          </Link>
        </Button>
        <Button 
          size="sm"
          variant="outline"
          disabled={!product.inStock}
          onClick={() => addToCart()}
          className="w-full sm:w-auto"
        >
          <ShoppingCart className="h-4 w-4 mr-2 sm:mr-0" />
          <span className="sm:hidden">Add to Cart</span>
        </Button>
      </CardFooter>
    </Card>
  )
}