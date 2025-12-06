# React to Next.js Migration Guide

This project has been successfully converted from a Vite + React + React Router setup to a modern Next.js application with Tailwind CSS.

## Key Changes

### 1. Project Structure
- **Before**: React app with `/src` directory and Vite bundler
- **After**: Next.js App Router with `/app` directory structure

### 2. Routing
- **Before**: React Router with client-side routing
- **After**: Next.js file-based routing in the `/app` directory

### 3. Package Management
- **Before**: Vite dev server (`npm run dev` → vite)
- **After**: Next.js dev server (`npm run dev` → next dev)

### 4. File Structure

\`\`\`
OLD (Vite + React)          NEW (Next.js)
src/                        app/
├── pages/                  ├── layout.tsx
│   ├── Home.jsx            ├── page.tsx
│   ├── PostPage.jsx        ├── post/
│   ├── About.jsx           │   └── [slug]/
│   └── ...                 │       └── page.tsx
├── components/             ├── about/page.tsx
├── lib/                    ├── contact/page.tsx
└── App.jsx                 ├── login/page.tsx
                            ├── admin/
                            │   ├── page.tsx
                            │   ├── layout.tsx
                            │   └── dashboard/
                            │       └── page.tsx
                            └── globals.css

components/                 components/
├── Header.jsx              ├── Header.tsx
├── Footer.jsx              ├── Footer.tsx
├── PostCard.jsx            ├── PostCard.tsx
└── ...                     └── ...

lib/                        lib/
├── supabase.jsx            ├── supabase.ts
├── admin/                  ├── supabase-server.ts
└── ...                     ├── date-utils.ts
                            └── ...
\`\`\`

## New Features

### Server-Side Rendering (SSR)
- Pages are now server-rendered by default
- Automatic static generation for better performance
- Client components marked with `'use client'` directive

### Metadata API
- SEO metadata defined in each page using `export const metadata`
- Replaces React Helmet for better performance

### Built-in API Routes
- `/api/auth/callback/route.ts` handles OAuth callbacks
- Middleware authentication in `middleware.ts`

### Improved Performance
- Automatic code splitting
- Image optimization
- Font optimization (using `next/font`)

## Environment Variables

Ensure these are set in your `.env.local` or Vercel project settings:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

## Running the Project

### Development
\`\`\`bash
npm install
npm run dev
# Open http://localhost:3000
\`\`\`

### Production Build
\`\`\`bash
npm run build
npm run start
\`\`\`

## Route Mapping

| Old Route | New Route |
|-----------|-----------|
| `/` | `/` |
| `/post/:slug` | `/post/[slug]` |
| `/about` | `/about` |
| `/contact` | `/contact` |
| `/login` | `/login` |
| `/admin` | `/admin/dashboard` |
| `/privacy-policy` | `/privacy-policy` |
| `/disclaimer` | `/disclaimer` |
| `/affiliate-disclosure` | `/affiliate-disclosure` |
| `/terms-conditions` | `/terms-conditions` |

## Database Schema Expectations

The app expects a Supabase table `posts` with these columns:
- `id` (uuid, primary key)
- `title` (text)
- `slug` (text, unique)
- `content_html` (text)
- `image_url` (text, nullable)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## Troubleshooting

### Posts not loading
1. Check Supabase connection credentials in `.env.local`
2. Verify the `posts` table exists and has data
3. Check browser console for errors

### Admin panel not accessible
1. Ensure you're logged in (redirect to `/login`)
2. Check Supabase auth configuration
3. Verify user exists in Supabase auth

### Styling issues
1. Tailwind CSS is configured in `tailwind.config.ts`
2. Global styles in `app/globals.css`
3. Custom animations preserved from original project

## Next Steps

1. Update environment variables for your Supabase project
2. Test all routes and functionality
3. Update social media links in Header and Footer
4. Customize admin panel as needed
5. Deploy to Vercel or your hosting provider
