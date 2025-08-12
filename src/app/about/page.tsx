import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Shield, Award, Users } from "lucide-react"

export default function AboutPage() {
  const features = [
    {
      icon: Truck,
      title: "Free Delivery",
      description: "Free delivery on orders over $500. Fast and reliable shipping nationwide."
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "All our furniture comes with a comprehensive warranty and quality guarantee."
    },
    {
      icon: Award,
      title: "Premium Materials",
      description: "We use only the finest materials and work with skilled craftsmen."
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Our furniture experts are here to help you make the perfect choice."
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">About FurnitureStore</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We're passionate about creating beautiful, functional furniture that transforms houses into homes. 
          Since our founding, we've been committed to quality, craftsmanship, and exceptional customer service.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Founded in 2010, FurnitureStore began as a small family business with a simple mission: 
              to provide high-quality, affordable furniture that brings comfort and style to every home.
            </p>
            <p>
              Over the years, we've grown from a local showroom to a trusted online retailer, 
              but our commitment to quality and customer satisfaction remains unchanged. We carefully 
              select each piece in our collection, working directly with skilled craftsmen and 
              reputable manufacturers.
            </p>
            <p>
              Today, we're proud to serve thousands of customers nationwide, helping them create 
              spaces they love with furniture that lasts.
            </p>
          </div>
        </div>
        <div className="bg-muted rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
          <p className="text-muted-foreground mb-6">
            To make quality furniture accessible to everyone, while providing exceptional 
            customer service and supporting sustainable practices in furniture manufacturing.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">13</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">99%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-muted rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">Quality</Badge>
            <p className="text-muted-foreground">
              We never compromise on quality. Every piece is carefully inspected 
              before it reaches your home.
            </p>
          </div>
          <div className="text-center">
            <Badge variant="outline" className="mb-4">Sustainability</Badge>
            <p className="text-muted-foreground">
              We're committed to sustainable practices and work with eco-conscious 
              manufacturers whenever possible.
            </p>
          </div>
          <div className="text-center">
            <Badge variant="outline" className="mb-4">Customer First</Badge>
            <p className="text-muted-foreground">
              Your satisfaction is our priority. We're here to help you every step 
              of the way, from selection to delivery.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
        <p className="text-muted-foreground mb-6">
          Have questions about our products or need help choosing the perfect piece? 
          We'd love to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="mailto:info@furniturestore.com"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Email Us
          </a>
          <a 
            href="tel:+1-555-0123"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Call Us: (555) 012-3456
          </a>
        </div>
      </div>
    </div>
  )
}