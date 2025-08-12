# Deployment Checklist for Vercel

## ✅ Pre-Deployment Checklist

### Code Quality
- [x] Build passes without errors (`npm run build`)
- [x] No TypeScript errors
- [x] ESLint passes with minimal warnings
- [x] All components are properly typed
- [x] No console.log statements in production code

### Database
- [x] Prisma schema is up to date
- [x] Database migrations are ready
- [x] Seed data is available
- [ ] Production database is set up (choose one):
  - [ ] Vercel Postgres
  - [ ] PlanetScale (MySQL)
  - [ ] Supabase (PostgreSQL)
  - [ ] Railway (PostgreSQL/MySQL)

### Environment Variables
- [x] `.env.example` file created
- [ ] Production environment variables configured in Vercel:
  - [ ] `DATABASE_URL`
  - [ ] Any other required variables

### Performance
- [x] Images are optimized (using Next.js Image component)
- [x] Components are properly lazy-loaded
- [x] Bundle size is reasonable
- [x] No memory leaks in React components

### SEO & Meta
- [x] Page titles are set
- [x] Meta descriptions are configured
- [x] Favicon is present
- [x] Open Graph tags (optional)

## 🚀 Deployment Steps

### 1. Prepare Repository
```bash
# Ensure all changes are committed
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Vercel Setup
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your furniture-store repository
5. Configure project settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### 3. Environment Variables
In Vercel dashboard, add these environment variables:
```
DATABASE_URL=your_production_database_url
```

### 4. Database Setup (Choose One)

#### Option A: Vercel Postgres (Recommended)
1. In Vercel dashboard, go to Storage tab
2. Create new Postgres database
3. Copy connection string to `DATABASE_URL`
4. Run migrations:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

#### Option B: PlanetScale (MySQL)
1. Create account at [planetscale.com](https://planetscale.com)
2. Create new database
3. Get connection string
4. Update Prisma schema for MySQL
5. Run migrations

#### Option C: Supabase (PostgreSQL)
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from settings
4. Run migrations

### 5. Deploy
1. Click "Deploy" in Vercel
2. Wait for build to complete
3. Test the deployed application

### 6. Post-Deployment
1. **Seed Database** (if needed):
   ```bash
   # Connect to production database and run:
   npm run db:seed
   ```

2. **Test Core Features**:
   - [ ] Homepage loads correctly
   - [ ] Product listing works
   - [ ] Search functionality
   - [ ] Filters and sorting
   - [ ] Add to cart
   - [ ] Checkout process
   - [ ] Order management
   - [ ] Support forms

3. **Performance Check**:
   - [ ] Page load times are acceptable
   - [ ] Images load properly
   - [ ] Mobile responsiveness
   - [ ] Dark/light mode toggle

## 🔧 Troubleshooting

### Common Issues

#### Build Errors
- Check TypeScript errors: `npm run build`
- Fix ESLint warnings: `npm run lint`
- Ensure all imports are correct

#### Database Connection
- Verify `DATABASE_URL` is correct
- Check database permissions
- Ensure Prisma client is generated

#### Environment Variables
- Double-check variable names
- Ensure no trailing spaces
- Verify values are correct

#### Performance Issues
- Check bundle size
- Optimize images
- Review component re-renders

## 📊 Monitoring

After deployment, monitor:
- **Vercel Analytics**: Page views, performance
- **Error Tracking**: Check Vercel function logs
- **Database Performance**: Query times, connections
- **User Feedback**: Support requests, issues

## 🔄 Updates

For future updates:
1. Make changes locally
2. Test thoroughly (`npm run build`)
3. Commit and push to main branch
4. Vercel will auto-deploy
5. Test production deployment

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review database connection
3. Verify environment variables
4. Test locally first
5. Check this troubleshooting guide

---

**Happy Deploying! 🚀**