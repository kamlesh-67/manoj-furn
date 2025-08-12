const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const sampleProducts = [
  {
    name: "Modern Sofa",
    description: "Comfortable 3-seater sofa with premium fabric upholstery",
    price: 45000,
    category: "Living Room",
    material: "Fabric",
    dimensions: "200x90x85 cm",
    color: "Grey",
    brand: "ComfortPlus",
    rating: 4.5,
    reviewCount: 128,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop",
  },
  {
    name: "Dining Table Set",
    description: "Elegant wooden dining table with 6 chairs",
    price: 65000,
    category: "Dining Room",
    material: "Wood",
    dimensions: "180x90x75 cm",
    color: "Brown",
    brand: "WoodCraft",
    rating: 4.3,
    reviewCount: 89,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=500&h=400&fit=crop",
  },
  {
    name: "Queen Bed Frame",
    description: "Solid wood queen size bed frame with headboard",
    price: 35000,
    category: "Bedroom",
    material: "Wood",
    dimensions: "160x200x120 cm",
    color: "Natural",
    brand: "SleepWell",
    rating: 4.7,
    reviewCount: 156,
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&h=400&fit=crop",
  },
  {
    name: "Office Chair",
    description: "Ergonomic office chair with lumbar support",
    price: 15000,
    category: "Office",
    material: "Leather",
    dimensions: "65x65x110 cm",
    color: "Black",
    brand: "ErgoMax",
    rating: 4.2,
    reviewCount: 203,
    imageUrl: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=500&h=400&fit=crop",
  },
  {
    name: "Coffee Table",
    description: "Glass top coffee table with metal legs",
    price: 20000,
    category: "Living Room",
    material: "Glass",
    dimensions: "120x60x45 cm",
    color: "Clear",
    brand: "ModernHome",
    rating: 4.0,
    reviewCount: 67,
    imageUrl: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=400&fit=crop",
  },
  {
    name: "Bookshelf",
    description: "5-tier wooden bookshelf for storage and display",
    price: 12500,
    category: "Storage",
    material: "Wood",
    dimensions: "80x30x180 cm",
    color: "White",
    brand: "StoragePro",
    rating: 4.4,
    reviewCount: 94,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop",
  },
  {
    name: "Leather Recliner",
    description: "Premium leather recliner with massage function",
    price: 55000,
    category: "Living Room",
    material: "Leather",
    dimensions: "90x95x105 cm",
    color: "Brown",
    brand: "LuxurySeats",
    rating: 4.8,
    reviewCount: 45,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop",
  },
  {
    name: "Metal Wardrobe",
    description: "Spacious 3-door metal wardrobe with mirror",
    price: 28000,
    category: "Bedroom",
    material: "Metal",
    dimensions: "150x60x200 cm",
    color: "Silver",
    brand: "MetalCraft",
    rating: 4.1,
    reviewCount: 72,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop",
  }
]

async function main() {
  console.log('Start seeding...')
  
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

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })