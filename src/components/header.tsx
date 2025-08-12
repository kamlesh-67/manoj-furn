"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ShoppingCart, Menu, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/contexts/cart-context"
import { ThemeToggle } from "@/components/theme-toggle"
import { CartSidebar } from "@/components/cart-sidebar"
import { toast } from "sonner"

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileSearchQuery, setMobileSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const { state } = useCart()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (mobileSearchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(mobileSearchQuery.trim())}`)
      setIsMobileMenuOpen(false)
      setMobileSearchQuery("")
      toast.success(`Searching for "${mobileSearchQuery.trim()}"`)
    } else {
      toast.error("Please enter a search term")
    }
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo - Always visible */}
        <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
          <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">F</span>
          </div>
          <span className="font-bold text-lg sm:text-xl">FurnitureStore</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
            Products
          </Link>
          <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
            Categories
          </Link>
          <Link href="/orders" className="text-sm font-medium hover:text-primary transition-colors">
            Orders
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
        </nav>

        {/* Desktop Search */}
        <form onSubmit={handleSearch} className="hidden lg:flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search furniture..."
              className="pl-8 w-[200px] xl:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search button for tablet */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => {
              setIsMobileMenuOpen(true)
              toast.info("Use the search bar in the menu")
            }}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Cart */}
          <CartSidebar>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {state.itemCount > 99 ? '99+' : state.itemCount}
                </span>
              )}
            </Button>
          </CartSidebar>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleMobileMenu}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden h-screen w-screen"
          onClick={closeMobileMenu}
          style={{ height: '100vh', width: '100vw' }}
        />
      )}

      {/* Mobile Menu Slide Panel */}
      <div className={`fixed top-0 right-0 h-screen w-full sm:w-80 bg-background border-l z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="flex flex-col h-full min-h-screen">
          {/* Menu Header */}
          <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur flex-shrink-0">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeMobileMenu}
              className="hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Menu Content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-6">
              {/* Mobile Search */}
              <div className="space-y-2">
                <form onSubmit={handleMobileSearch} className="space-y-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search furniture..."
                      className="pl-8"
                      value={mobileSearchQuery}
                      onChange={(e) => setMobileSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full" size="sm">
                    Search
                  </Button>
                </form>
              </div>

              {/* Mobile Navigation */}
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground mb-3 px-2">Navigation</h3>
                <nav className="flex flex-col space-y-1">
                  <Link
                    href="/"
                    className="text-lg font-medium hover:text-primary transition-colors py-3 px-3 rounded-md hover:bg-muted flex items-center"
                    onClick={() => {
                      closeMobileMenu()
                      toast.success("Going to Home")
                    }}
                  >
                    🏠 Home
                  </Link>
                  <Link
                    href="/products"
                    className="text-lg font-medium hover:text-primary transition-colors py-3 px-3 rounded-md hover:bg-muted flex items-center"
                    onClick={() => {
                      closeMobileMenu()
                      toast.success("Browsing Products")
                    }}
                  >
                    🛋️ Products
                  </Link>
                  <Link
                    href="/categories"
                    className="text-lg font-medium hover:text-primary transition-colors py-3 px-3 rounded-md hover:bg-muted flex items-center"
                    onClick={() => {
                      closeMobileMenu()
                      toast.success("Exploring Categories")
                    }}
                  >
                    📂 Categories
                  </Link>
                  <Link
                    href="/orders"
                    className="text-lg font-medium hover:text-primary transition-colors py-3 px-3 rounded-md hover:bg-muted flex items-center"
                    onClick={() => {
                      closeMobileMenu()
                      toast.success("Checking Orders")
                    }}
                  >
                    📦 Orders
                  </Link>
                  <Link
                    href="/about"
                    className="text-lg font-medium hover:text-primary transition-colors py-3 px-3 rounded-md hover:bg-muted flex items-center"
                    onClick={() => {
                      closeMobileMenu()
                      toast.success("Learning About Us")
                    }}
                  >
                    ℹ️ About
                  </Link>
                </nav>
              </div>
            </div>
          </div>

          {/* Menu Footer - Fixed at bottom */}
          <div className="border-t bg-background/95 backdrop-blur p-4 flex-shrink-0">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">Quick Actions</h3>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/orders" onClick={() => {
                  closeMobileMenu()
                  toast.success("Opening My Orders")
                }}>
                  📋 My Orders
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/support" onClick={() => {
                  closeMobileMenu()
                  toast.info("Help & Support coming soon!")
                }}>
                  🆘 Help & Support
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}