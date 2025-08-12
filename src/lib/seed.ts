import { prisma } from './db'

const sampleProducts = [
  {
    name: "Modern Sofa",
    description: "Comfortable 3-seater sofa with premium fabric upholstery",
    price: 899.99,
    category: "Living Room",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop",
  },
  {
    name: "Dining Table Set",
    description: "Elegant wooden dining table with 6 chairs",
    price: 1299.99,
    category: "Dining Room",
    imageUrl: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=500&h=400&fit=crop",
  },
  {
    name: "Queen Bed Frame",
    description: "Solid wood queen size bed frame with headboard",
    price: 699.99,
    category: "Bedroom",
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&h=400&fit=crop",
  },
  {
    name: "Office Chair",
    description: "Ergonomic office chair with lumbar support",
    price: 299.99,
    category: "Office",
    imageUrl: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=500&h=400&fit=crop",
  },
  {
    name: "Coffee Table",
    description: "Glass top coffee table with metal legs",
    price: 399.99,
    category: "Living Room",
    imageUrl: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=400&fit=crop",
  },
  {
    name: "Bookshelf",
    description: "5-tier wooden bookshelf for storage and display",
    price: 249.99,
    category: "Storage",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop",
  }
]

export async function seedDatabase() {
  try {
    // Clear existing data
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.cartItem.deleteMany()
    await prisma.cart.deleteMany()
    await prisma.product.deleteMany()

    // Create products
    for (const product of sampleProducts) {
      await prisma.product.create({
        data: product
      })
    }

    console.log('Database seeded successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}