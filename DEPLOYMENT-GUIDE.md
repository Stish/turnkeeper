# 🚀 TurnKeeper PWA Deployment Guide

## Quick Deployment Options (Free)

### Option 1: GitHub Pages (Recommended - Free & Easy)

**Steps:**
1. Create a GitHub account at [github.com](https://github.com)
2. Create a new repository called `turnkeeper-pwa`
3. Upload all your files to the repository
4. Go to repository Settings → Pages
5. Select "Deploy from a branch" → "main" → "/ (root)"
6. Your app will be live at: `https://yourusername.github.io/turnkeeper-pwa`

**Pros:** Free, reliable, automatic HTTPS, easy updates
**Cons:** Public repository (unless you have GitHub Pro)

### Option 2: Netlify (Recommended - Free with great features)

**Steps:**
1. Go to [netlify.com](https://netlify.com) and sign up
2. Drag and drop your TurnKeeper folder to Netlify
3. Your app will be live immediately with a random URL
4. Optionally set a custom subdomain like `turnkeeper-yourname.netlify.app`

**Pros:** Free, instant deployment, automatic HTTPS, easy updates, custom domains
**Cons:** 100GB bandwidth limit (very generous)

### Option 3: Vercel (Great for developers)

**Steps:**
1. Go to [vercel.com](https://vercel.com) and sign up
2. Install Vercel CLI: `npm i -g vercel`
3. In your TurnKeeper folder, run: `vercel`
4. Follow the prompts to deploy

**Pros:** Free, fast CDN, automatic HTTPS, Git integration
**Cons:** Learning curve for CLI

### Option 4: Firebase Hosting (Google's platform)

**Steps:**
1. Go to [firebase.google.com](https://firebase.google.com)
2. Create a new project
3. Install Firebase CLI: `npm install -g firebase-tools`
4. In your folder: `firebase login` then `firebase init hosting`
5. Deploy with: `firebase deploy`

**Pros:** Free, Google's infrastructure, great for PWAs
**Cons:** Requires Firebase CLI setup

### Option 5: Surge.sh (Simple static hosting)

**Steps:**
1. Install: `npm install -g surge`
2. In your TurnKeeper folder: `surge`
3. Choose domain or use generated one
4. Your app is live!

**Pros:** Very simple, free, custom domains
**Cons:** Limited features compared to others

## Detailed GitHub Pages Setup (Recommended)

### Step-by-Step GitHub Deployment:

1. **Create GitHub Account & Repository:**
   ```
   1. Go to github.com and create account
   2. Click "New repository"
   3. Name: "turnkeeper-pwa"
   4. Make it Public
   5. Check "Add README file"
   6. Click "Create repository"
   ```

2. **Upload Your Files:**
   ```
   Method A - Web Interface:
   1. Click "uploading an existing file"
   2. Drag all files from TurnKeeper folder
   3. Commit changes
   
   Method B - Git Commands:
   git clone https://github.com/yourusername/turnkeeper-pwa.git
   cd turnkeeper-pwa
   [copy all your TurnKeeper files here]
   git add .
   git commit -m "Initial TurnKeeper PWA deployment"
   git push origin main
   ```

3. **Enable GitHub Pages:**
   ```
   1. Go to repository Settings tab
   2. Scroll to "Pages" section
   3. Source: "Deploy from a branch"
   4. Branch: "main"
   5. Folder: "/ (root)"
   6. Click Save
   ```

4. **Your App is Live!**
   - URL: `https://yourusername.github.io/turnkeeper-pwa`
   - Updates automatically when you push changes

## Pre-Deployment Checklist

### ✅ Files to Include:
- [ ] `index.html`
- [ ] `styles.css`
- [ ] `app.js`
- [ ] `manifest.json`
- [ ] `sw.js` (service worker)
- [ ] `icons/` folder with all icon sizes
- [ ] `mobile-test.html` (optional)
- [ ] `README.md` (recommended)

### ✅ PWA Requirements Check:
- [ ] HTTPS (automatic with all recommended platforms)
- [ ] Valid manifest.json
- [ ] Service worker registered
- [ ] App icons (192px and 512px minimum)
- [ ] Responsive design
- [ ] Works offline

### ✅ Production Optimizations:

1. **Update Service Worker Cache Version:**
   ```javascript
   // In sw.js, update version when deploying
   const CACHE_NAME = 'turnkeeper-v1.1.0';
   ```

2. **Add Analytics (Optional):**
   ```html
   <!-- Add to <head> in index.html -->
   <!-- Google Analytics or similar -->
   ```

3. **Optimize Icons:**
   - Ensure all icon sizes are included
   - Use tools like [realfavicongenerator.net](https://realfavicongenerator.net)

## Custom Domain Setup (Optional)

### For GitHub Pages:
1. Buy domain from registrar (GoDaddy, Namecheap, etc.)
2. In repository Settings → Pages → Custom domain
3. Enter your domain: `turnkeeper.yourname.com`
4. Update DNS records at your registrar:
   ```
   Type: CNAME
   Name: www
   Value: yourusername.github.io
   ```

### For Netlify:
1. Go to Site Settings → Domain management
2. Add custom domain
3. Follow DNS setup instructions

## Deployment Commands Reference

### GitHub (using Git):
```bash
# Initial setup
git clone https://github.com/yourusername/turnkeeper-pwa.git
cd turnkeeper-pwa
# [copy your files]
git add .
git commit -m "Deploy TurnKeeper PWA"
git push origin main

# Updates
git add .
git commit -m "Update TurnKeeper features"
git push origin main
```

### Netlify CLI:
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### Vercel:
```bash
npm i -g vercel
vercel --prod
```

### Firebase:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Surge:
```bash
npm install -g surge
surge
```

## SEO & Discoverability

### Add to index.html:
```html
<head>
    <!-- SEO Meta Tags -->
    <meta name="description" content="TurnKeeper - Free combat initiative tracker for tabletop RPG games. Works offline as a PWA.">
    <meta name="keywords" content="RPG, D&D, combat tracker, initiative, tabletop, PWA">
    <meta name="author" content="Stish">
    
    <!-- Open Graph for social sharing -->
    <meta property="og:title" content="TurnKeeper - Combat Initiative Tracker">
    <meta property="og:description" content="Free PWA for tracking combat initiative in tabletop RPG games">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://yourusername.github.io/turnkeeper-pwa">
    <meta property="og:image" content="https://yourusername.github.io/turnkeeper-pwa/icons/icon-512x512.png">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="TurnKeeper - Combat Initiative Tracker">
    <meta name="twitter:description" content="Free PWA for tracking combat initiative in tabletop RPG games">
    <meta name="twitter:image" content="https://yourusername.github.io/turnkeeper-pwa/icons/icon-512x512.png">
</head>
```

## Monitoring & Analytics

### Simple Analytics Options:
1. **Google Analytics** - Most comprehensive
2. **Simple Analytics** - Privacy-focused
3. **Plausible** - Simple and privacy-friendly
4. **GitHub Insights** - Basic traffic stats

## Security Considerations

### Content Security Policy (Optional):
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

### HTTPS Only:
All recommended platforms provide automatic HTTPS, which is required for PWA features.

## Troubleshooting Common Issues

### PWA Not Installing:
- Ensure HTTPS is enabled (automatic on all platforms)
- Check manifest.json is valid
- Verify service worker is registered
- Clear browser cache and try again

### Icons Not Showing:
- Check all icon files exist in `icons/` folder
- Verify paths in manifest.json are correct
- Use absolute paths if needed

### Offline Not Working:
- Check service worker console for errors
- Verify cache strategy in sw.js
- Test with browser DevTools → Application → Service Workers

## Recommended Deployment Choice

**For beginners:** GitHub Pages
- Free, reliable, automatic HTTPS
- Easy to update via web interface
- Great for learning Git

**For developers:** Netlify or Vercel
- Better features and performance
- Easier deployment process
- Better analytics and monitoring

Choose the option that best fits your technical comfort level and requirements!
