# Furniture Store - E-commerce Platform

A modern, full-featured furniture e-commerce platform built with Next.js 15, featuring a beautiful red theme and comprehensive shopping functionality.

## 🚀 Features

### 🛍️ Shopping Experience
- **Product Catalog** with advanced filtering and sorting
- **Search Functionality** across products, brands, and descriptions
- **Shopping Cart** with persistent storage
- **Checkout Process** with Indian payment methods (UPI, Card, COD)
- **Order Management** with detailed tracking

### 🔍 Advanced Filtering & Sorting
- **Price Range Filter** with interactive slider
- **Material Filter** (Wood, Fabric, Leather, Glass, Metal)
- **Category Filter** (Living Room, Bedroom, Dining Room, Office, Storage)
- **Sort Options** (Price, Name, Rating, Newest)
- **Combined Filters** work together seamlessly

### 🇮🇳 Indian Localization
- **Currency**: Indian Rupees (₹) with proper formatting
- **States**: All 28 Indian states and 8 union territories
- **Payment Methods**: UPI, Credit/Debit Cards, Cash on Delivery
- **Tax**: 18% GST calculation
- **Shipping**: Free shipping over ₹2,000

### 📱 Mobile-First Design
- **Responsive Layout** works on all devices
- **Mobile Menu** with smooth slide animations
- **Touch-Friendly** interface elements
- **Dark/Light Mode** toggle

### 🆘 Customer Support
- **Help & Support** page with contact forms
- **Return/Replacement** system with 30-day policy
- **Order Tracking** with detailed status updates
- **FAQ Section** for common queries

### ⭐ Product Features
- **Product Ratings** and review counts
- **Brand Information** and material details
- **Product Images** with optimization
- **Detailed Descriptions** and specifications

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Database**: SQLite with Prisma ORM
- **Icons**: Lucide React
- **Notifications**: Sonner (Toast)
- **Theme**: next-themes for dark/light mode
- **State Management**: React Context + useReducer

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd furniture-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect Next.js and configure build settings
   - Set environment variables in Vercel dashboard:
     - `DATABASE_URL`: Your database connection string

3. **Database Setup**
   - For production, consider using:
     - **Vercel Postgres** (recommended)
     - **PlanetScale** (MySQL)
     - **Supabase** (PostgreSQL)
     - **Railway** (PostgreSQL/MySQL)

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
```

For production, update the `DATABASE_URL` to your production database.

## 📁 Project Structure

```
furniture-store/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (routes)/          # Route groups
│   │   ├── api/               # API routes
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   ├── ui/               # shadcn/ui components
│   │   └── ...               # Custom components
│   ├── contexts/             # React contexts
│   ├── lib/                  # Utility functions
│   └── generated/            # Generated files (Prisma)
├── prisma/                   # Database schema and migrations
├── public/                   # Static assets
├── scripts/                  # Database seeding scripts
└── ...config files
```

## 🎨 Customization

### Theme Colors
The app uses a red theme defined in `src/app/globals.css`. To change colors:

1. Update CSS variables in the `:root` selector
2. Modify Tailwind config if needed
3. Update component styles as required

### Adding Products
1. Update the seed script in `scripts/seed.js`
2. Run `npm run db:seed` to populate the database
3. Or add products through the admin interface (if implemented)

## 📊 Database Schema

### Core Models
- **Product**: Furniture items with details, pricing, and inventory
- **Cart/CartItem**: Shopping cart functionality
- **Order/OrderItem**: Order management and tracking
- **SupportRequest**: Customer support tickets
- **ReturnRequest**: Return and replacement requests

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Lucide** for the icon set
- **Tailwind CSS** for the utility-first CSS framework
- **Prisma** for the database toolkit
- **Next.js** for the React framework

---

**Built with ❤️ for the Indian furniture market** 🇮🇳