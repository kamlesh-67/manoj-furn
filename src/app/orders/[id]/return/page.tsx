"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Package, RefreshCw, AlertCircle } from "lucide-react"
import { toast } from "sonner"

// Mock order data - in real app, this would come from database/API
const mockOrder = {
  id: "FS123456",
  orderNumber: "FS123456",
  total: 45000,
  status: "delivered",
  customerName: "John Doe",
  customerEmail: "john@example.com",
  customerPhone: "+91 9876543210",
  createdAt: new Date("2024-01-15"),
  items: [
    { 
      id: "1",
      name: "Modern Sofa", 
      quantity: 1, 
      price: 45000,
      imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop"
    }
  ]
}

export default function ReturnPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    type: '',
    reason: '',
    description: '',
    customerName: mockOrder.customerName,
    customerEmail: mockOrder.customerEmail,
    customerPhone: mockOrder.customerPhone
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    toast.success(`${formData.type === 'return' ? 'Return' : 'Replacement'} request submitted successfully!`)
    router.push(`/orders/${mockOrder.id}`)
  }

  const returnReasons = [
    "Damaged during delivery",
    "Wrong item received",
    "Quality issues",
    "Size/dimension mismatch",
    "Changed mind",
    "Defective product",
    "Other"
  ]

  const canReturn = () => {
    const orderDate = mockOrder.createdAt
    const daysSinceOrder = Math.floor((Date.now() - orderDate.getTime()) / (1000 * 60 * 60 * 24))
    return daysSinceOrder <= 30 && mockOrder.status === 'delivered'
  }

  if (!canReturn()) {
    return (
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <Button variant="ghost" className="mb-4 sm:mb-6" size="sm" asChild>
          <Link href={`/orders/${mockOrder.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Order
          </Link>
        </Button>

        <Card>
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Return/Replacement Not Available</h2>
            <p className="text-muted-foreground mb-4">
              This order is not eligible for return or replacement. Returns are only available within 30 days of delivery.
            </p>
            <Button asChild>
              <Link href="/support">Contact Support</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <Button variant="ghost" className="mb-4 sm:mb-6" size="sm" asChild>
        <Link href={`/orders/${mockOrder.id}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Order
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Return Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Return/Replacement Request
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Request Type */}
                <div>
                  <Label>Request Type *</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        formData.type === 'return' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => handleInputChange('type', 'return')}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="type"
                          value="return"
                          checked={formData.type === 'return'}
                          onChange={(e) => handleInputChange('type', e.target.value)}
                          className="text-primary"
                        />
                        <div>
                          <p className="font-medium">Return</p>
                          <p className="text-sm text-muted-foreground">Get full refund</p>
                        </div>
                      </div>
                    </div>

                    <div 
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        formData.type === 'replacement' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => handleInputChange('type', 'replacement')}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="type"
                          value="replacement"
                          checked={formData.type === 'replacement'}
                          onChange={(e) => handleInputChange('type', e.target.value)}
                          className="text-primary"
                        />
                        <div>
                          <p className="font-medium">Replacement</p>
                          <p className="text-sm text-muted-foreground">Exchange for new item</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <Label htmlFor="reason">Reason *</Label>
                  <Select onValueChange={(value) => handleInputChange('reason', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      {returnReasons.map((reason) => (
                        <SelectItem key={reason} value={reason}>
                          {reason}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    required
                    placeholder="Please provide detailed information about the issue..."
                    className="min-h-[120px]"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Contact Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="customerName">Full Name</Label>
                      <Input
                        id="customerName"
                        value={formData.customerName}
                        onChange={(e) => handleInputChange('customerName', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="customerEmail">Email</Label>
                      <Input
                        id="customerEmail"
                        type="email"
                        value={formData.customerEmail}
                        onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="customerPhone">Phone Number</Label>
                    <Input
                      id="customerPhone"
                      type="tel"
                      value={formData.customerPhone}
                      onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={!formData.type || !formData.reason || !formData.description}
                >
                  Submit {formData.type === 'return' ? 'Return' : 'Replacement'} Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Order Number</p>
                  <p className="text-sm text-muted-foreground">{mockOrder.orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Order Date</p>
                  <p className="text-sm text-muted-foreground">{mockOrder.createdAt.toLocaleDateString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Total Amount</p>
                  <p className="text-lg font-bold text-primary">₹{mockOrder.total.toLocaleString('en-IN')}</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <p className="text-sm font-medium mb-3">Items</p>
                {mockOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 mb-3">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="text-xs text-muted-foreground">
                <p className="mb-2">• Returns are processed within 5-7 business days</p>
                <p className="mb-2">• Replacement items will be shipped within 3-5 business days</p>
                <p>• Original packaging is required for returns</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}