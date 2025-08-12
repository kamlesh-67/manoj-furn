"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { toast } from "sonner"

interface Product {
  id: string
  name: string
  price: number
  imageUrl: string
}

interface AddToCartButtonProps {
  product: Product
  disabled?: boolean
  size?: "default" | "sm" | "lg" | "icon"
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  className?: string
}

export function AddToCartButton({ 
  product, 
  disabled = false, 
  size = "lg",
  variant = "default",
  className = "w-full"
}: AddToCartButtonProps) {
  const { dispatch } = useCart()

  const handleAddToCart = () => {
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
    <Button 
      size={size}
      variant={variant}
      className={className}
      disabled={disabled}
      onClick={handleAddToCart}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add to Cart
    </Button>
  )
}