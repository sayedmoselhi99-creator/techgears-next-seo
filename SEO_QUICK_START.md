# SEO Quick Start Guide

## 5-Minute Setup

### Step 1: Get Your Google Analytics ID
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create new property (or use existing)
3. Copy your Measurement ID (looks like: G-XXXXXXXXXX)

### Step 2: Get Google Search Console Verification Code
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select "URL prefix" method
3. Enter your domain
4. Choose "HTML tag" verification
5. Copy the verification code content

### Step 3: Get Bing Verification Code
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site
3. Choose "Meta tag" verification
4. Copy the meta tag content

### Step 4: Add to Vercel
1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project
3. Settings → Environment Variables
4. Add:
   - `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` = G-XXXXXXXXXX
   - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` = xxxxx
   - `NEXT_PUBLIC_BING_SITE_VERIFICATION` = xxxxx
5. Trigger redeploy

### Step 5: Verify & Submit Sitemap
1. Visit your website in incognito mode
2. Right-click → View source
3. Search for "google-site-verification" - should be found
4. Search for "gtag.js" - should be found
5. Go to Google Search Console
6. Click "Sitemaps" → "Submit sitemap"
7. Enter: `https://yourdomain.com/sitemap.xml`

**Done!** You're ready for Google indexing.

---

## Monthly Monitoring Tasks

### Week 1
- [ ] Check Google Search Console coverage
- [ ] Review any crawl errors
- [ ] Monitor Core Web Vitals

### Week 2
- [ ] Review Google Analytics traffic
- [ ] Check top performing pages
- [ ] Look for low-performing pages

### Week 3
- [ ] Check search rankings (if using GSC)
- [ ] Monitor mobile performance
- [ ] Review user behavior

### Week 4
- [ ] Full SEO audit
- [ ] Content performance review
- [ ] Plan optimizations for next month

---

## Key Metrics to Track

### In Google Search Console
- **Impressions**: How many times your pages appear in search
- **Clicks**: How many times users click to your site
- **Average Position**: Where your pages rank
- **Click-Through Rate (CTR)**: % of impressions that result in clicks

### In Google Analytics
- **Users**: Total unique visitors
- **Sessions**: Total visits
- **Bounce Rate**: % of people who leave without interacting
- **Avg. Session Duration**: Average time spent on site
- **Pages per Session**: How many pages users view

### Performance Metrics
- **LCP**: < 2.5 seconds ✓
- **FID**: < 100 milliseconds ✓
- **CLS**: < 0.1 ✓

---

## Common Issues & Quick Fixes

| Issue | Solution |
|-------|----------|
| Pages not indexing | Submit in Search Console, check robots.txt |
| Analytics not tracking | Check GA ID is correct, wait 24 hours |
| Low rankings | Improve content quality, build links |
| Slow pages | Optimize images, enable caching |
| No impressions in GSC | Wait 7-14 days after claim, ensure indexing |

---

## Resources

- [Search Central Blog](https://developers.google.com/search/blog)
- [GA4 Documentation](https://support.google.com/analytics/answer/10089681)
- [Web.dev Guides](https://web.dev)
- [Schema.org](https://schema.org/)

---

**Version**: 1.0
**Updated**: 2025-12-05
