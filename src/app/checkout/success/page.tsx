import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Home, Package } from "lucide-react"

export default function CheckoutSuccessPage() {
  const orderNumber = `FS${Date.now().toString().slice(-6)}`

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-xl text-muted-foreground">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold mb-2">Order Number</h3>
                <p className="text-muted-foreground">{orderNumber}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Estimated Delivery</h3>
                <p className="text-muted-foreground">5-7 business days</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Shipping Method</h3>
                <p className="text-muted-foreground">Standard Delivery</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Payment Method</h3>
                <p className="text-muted-foreground">Credit Card ending in ****</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Package className="h-5 w-5" />
            <span>We&apos;ll send you tracking information once your order ships</span>
          </div>
          <p className="text-sm text-muted-foreground">
            A confirmation email has been sent to your email address with order details.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/products">
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}