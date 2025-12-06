# Deployment Guide

## Vercel Deployment (Recommended)

### Prerequisites
- GitHub account with your repository
- Vercel account (free tier available)

### Steps

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Convert to Next.js with Tailwind"
   git push origin main
   \`\`\`

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the project root

3. **Set Environment Variables**
   - In Vercel dashboard, go to Project Settings → Environment Variables
   - Add:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app is live!

## Local Deployment (Production Build)

\`\`\`bash
# Build the project
npm run build

# Start production server
npm run start
\`\`\`

## Optimization Tips

1. **Image Optimization**: Use Next.js `<Image>` component for better performance
2. **Code Splitting**: Dynamic imports for large components
3. **Caching**: Configure ISR (Incremental Static Regeneration) for static pages
4. **Monitoring**: Enable Vercel Analytics (already installed)

## Common Issues

### Build fails
- Check for TypeScript errors: `npm run type-check`
- Verify all imports are correct
- Check environment variables are set

### Slow deployment
- Large node_modules can slow builds
- Use `npm ci` instead of `npm install` in CI/CD
- Consider using pnpm for faster installs

### Runtime errors
- Check server logs in Vercel dashboard
- Use `console.error` for debugging
- Check browser DevTools for client-side errors
