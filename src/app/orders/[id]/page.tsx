import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Truck, CheckCircle, Clock, MapPin } from "lucide-react"

// Mock data - in real app, this would come from database/API
const mockOrder = {
  id: "FS123456",
  orderNumber: "FS123456",
  total: 45000,
  status: "shipped",
  paymentMethod: "UPI",
  paymentStatus: "paid",
  customerName: "John Doe",
  customerEmail: "john@example.com",
  customerPhone: "+91 9876543210",
  shippingAddress: "123 Main Street, Bangalore, Karnataka 560001",
  createdAt: new Date("2024-01-15"),
  estimatedDelivery: new Date("2024-01-22"),
  trackingNumber: "TRK789012345",
  items: [
    { 
      id: "1",
      name: "Modern Sofa", 
      quantity: 1, 
      price: 45000,
      imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop"
    }
  ],
  trackingHistory: [
    {
      status: "Order Placed",
      description: "Your order has been placed successfully",
      timestamp: new Date("2024-01-15T10:00:00"),
      completed: true
    },
    {
      status: "Order Confirmed",
      description: "Your order has been confirmed and is being prepared",
      timestamp: new Date("2024-01-15T14:00:00"),
      completed: true
    },
    {
      status: "In Production",
      description: "Your furniture is being crafted with care",
      timestamp: new Date("2024-01-16T09:00:00"),
      completed: true
    },
    {
      status: "Quality Check",
      description: "Quality inspection completed successfully",
      timestamp: new Date("2024-01-18T16:00:00"),
      completed: true
    },
    {
      status: "Shipped",
      description: "Your order is on its way to you",
      timestamp: new Date("2024-01-19T11:00:00"),
      completed: true
    },
    {
      status: "Out for Delivery",
      description: "Your order is out for delivery",
      timestamp: null,
      completed: false
    },
    {
      status: "Delivered",
      description: "Order delivered successfully",
      timestamp: null,
      completed: false
    }
  ]
}

export default function OrderDetailsPage() {
  const subtotal = mockOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal >= 2000 ? 0 : 200
  const tax = subtotal * 0.18
  const total = subtotal + shipping + tax

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/orders">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Order Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Order #{mockOrder.orderNumber}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Placed on {mockOrder.createdAt.toLocaleDateString('en-IN')}
                  </p>
                </div>
                <Badge variant="secondary">
                  {mockOrder.status.charAt(0).toUpperCase() + mockOrder.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium">Estimated Delivery</p>
                  <p className="text-sm">{mockOrder.estimatedDelivery.toLocaleDateString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Payment Method</p>
                  <p className="text-sm">{mockOrder.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Tracking Number</p>
                  <p className="text-sm font-mono">{mockOrder.trackingNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Order Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrder.trackingHistory.map((event, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      event.completed ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      {event.completed ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${event.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {event.status}
                      </p>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      {event.timestamp && (
                        <p className="text-xs text-muted-foreground">
                          {event.timestamp.toLocaleString('en-IN')}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span>₹{tax.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">{mockOrder.customerName}</p>
                <p className="text-sm text-muted-foreground">{mockOrder.shippingAddress}</p>
                <p className="text-sm text-muted-foreground">{mockOrder.customerPhone}</p>
                <p className="text-sm text-muted-foreground">{mockOrder.customerEmail}</p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-3">
                {mockOrder.status === 'delivered' && (
                  <Button className="w-full" asChild>
                    <Link href={`/orders/${mockOrder.id}/return`}>
                      Return/Exchange
                    </Link>
                  </Button>
                )}
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/support">
                    Need Help?
                  </Link>
                </Button>
                <Button className="w-full" variant="outline">
                  Download Invoice
                </Button>
                {mockOrder.status === 'delivered' && (
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/support?type=return">
                      Return/Exchange
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}