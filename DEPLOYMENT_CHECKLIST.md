# Pre-Deployment SEO Checklist

## Environment Variables
- [ ] `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` set in Vercel
- [ ] `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` set in Vercel
- [ ] `NEXT_PUBLIC_BING_SITE_VERIFICATION` set in Vercel
- [ ] `NEXT_PUBLIC_SITE_URL` set correctly

## SEO Files
- [ ] `sitemap.xml` generates without errors
- [ ] `robots.txt` is accessible
- [ ] `sitemap.ts` is configured
- [ ] `manifest.ts` is configured

## Meta Tags
- [ ] Homepage has proper title and description
- [ ] All pages have meta tags
- [ ] Open Graph tags are present
- [ ] Twitter Card tags are present

## Structured Data
- [ ] Organization schema is valid
- [ ] BlogPosting schema on articles
- [ ] ContactPage schema on contact
- [ ] AboutPage schema on about page

## Performance
- [ ] Core Web Vitals targets are met
- [ ] Images are optimized and lazy loaded
- [ ] CSS and JS are minified
- [ ] Fonts are preloaded

## Security
- [ ] HTTPS is enabled
- [ ] Security headers are set
- [ ] No mixed content
- [ ] CSP headers configured

## Accessibility
- [ ] Alt text on all images
- [ ] Proper heading hierarchy
- [ ] ARIA labels where needed
- [ ] Keyboard navigation works

## Testing
- [ ] Mobile Friendly Test passes
- [ ] Structured Data Test passes
- [ ] Lighthouse score 90+
- [ ] No console errors

## Google Tools
- [ ] Verified in Google Search Console
- [ ] Sitemap submitted
- [ ] Google Analytics tracking verified
- [ ] Bing Webmaster Tools set up

## Post-Deployment
- [ ] Monitor Search Console for errors
- [ ] Check Analytics for real-time users
- [ ] Monitor Core Web Vitals
- [ ] Check indexation status
- [ ] Set up alerts for errors
