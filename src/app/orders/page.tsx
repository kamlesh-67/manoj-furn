import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Eye, Truck } from "lucide-react"

// Mock data - in real app, this would come from database/API
const mockOrders = [
  {
    id: "FS123456",
    orderNumber: "FS123456",
    total: 45000,
    status: "delivered",
    paymentMethod: "UPI",
    paymentStatus: "paid",
    createdAt: new Date("2024-01-15"),
    estimatedDelivery: new Date("2024-01-22"),
    trackingNumber: "TRK789012345",
    items: [
      { name: "Modern Sofa", quantity: 1, price: 45000 }
    ]
  },
  {
    id: "FS123457",
    orderNumber: "FS123457", 
    total: 80000,
    status: "shipped",
    paymentMethod: "Card",
    paymentStatus: "paid",
    createdAt: new Date("2024-01-20"),
    estimatedDelivery: new Date("2024-01-27"),
    trackingNumber: "TRK789012346",
    items: [
      { name: "Dining Table Set", quantity: 1, price: 65000 },
      { name: "Coffee Table", quantity: 1, price: 15000 }
    ]
  },
  {
    id: "FS123458",
    orderNumber: "FS123458",
    total: 35000,
    status: "processing",
    paymentMethod: "COD",
    paymentStatus: "pending",
    createdAt: new Date("2024-01-25"),
    estimatedDelivery: new Date("2024-02-01"),
    trackingNumber: null,
    items: [
      { name: "Queen Bed Frame", quantity: 1, price: 35000 }
    ]
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered': return 'default'
    case 'shipped': return 'secondary'
    case 'processing': return 'outline'
    case 'cancelled': return 'destructive'
    default: return 'outline'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'delivered': return Package
    case 'shipped': return Truck
    case 'processing': return Package
    default: return Package
  }
}

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Track and manage your furniture orders
        </p>
      </div>

      {mockOrders.length === 0 ? (
        <div className="text-center py-16">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
          <p className="text-muted-foreground mb-6">
            Start shopping to see your orders here
          </p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {mockOrders.map((order) => {
            const StatusIcon = getStatusIcon(order.status)
            return (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <StatusIcon className="h-5 w-5" />
                        Order #{order.orderNumber}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Placed on {order.createdAt.toLocaleDateString('en-IN')}
                      </p>
                    </div>
                    <Badge variant={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
                    <div>
                      <p className="text-xs sm:text-sm font-medium">Total Amount</p>
                      <p className="text-base sm:text-lg font-bold text-primary">
                        ₹{order.total.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium">Payment Method</p>
                      <p className="text-xs sm:text-sm">{order.paymentMethod}</p>
                      <Badge variant={order.paymentStatus === 'paid' ? 'default' : 'outline'} className="text-xs mt-1">
                        {order.paymentStatus}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium">Estimated Delivery</p>
                      <p className="text-xs sm:text-sm">{order.estimatedDelivery?.toLocaleDateString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium">Tracking</p>
                      <p className="text-xs sm:text-sm">{order.trackingNumber || 'Not assigned'}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Items ({order.items.length})</p>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.name} × {item.quantity}</span>
                          <span>₹{item.price.toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto" asChild>
                      <Link href={`/orders/${order.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                    {order.trackingNumber && (
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        <Truck className="h-4 w-4 mr-2" />
                        Track Order
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}