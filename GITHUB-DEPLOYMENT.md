# 🚀 GitHub Pages Deployment - Step by Step

## Your Current Setup
✅ GitHub Pages account (ready)
✅ TurnKeeper PWA files (ready)
📁 Location: `c:\work\_scripts\pwa\TurnKeeper`

## Step 1: Create Repository

1. **Go to GitHub.com and sign in**
2. **Click the "+" icon** in top right → "New repository"
3. **Repository settings:**
   - Repository name: `turnkeeper-pwa`
   - Description: `Combat initiative tracker PWA for tabletop RPGs`
   - ✅ Public (required for free GitHub Pages)
   - ✅ Add a README file
   - Click **"Create repository"**

## Step 2: Upload Your Files

### Method A: Web Interface (Easiest)

1. **In your new repository**, click **"uploading an existing file"**
2. **Open Windows Explorer** to `c:\work\_scripts\pwa\TurnKeeper`
3. **Select ALL files** (Ctrl+A):
   ```
   ✅ index.html
   ✅ styles.css
   ✅ app.js
   ✅ manifest.json
   ✅ sw.js
   ✅ icons/ (folder)
   ✅ All .md files
   ✅ All other files
   ```
4. **Drag and drop** all files to GitHub
5. **Commit changes:**
   - Commit message: `Initial TurnKeeper PWA deployment`
   - Click **"Commit changes"**

### Method B: Git Commands (If you prefer command line)

```bash
# Clone your repository
git clone https://github.com/YOURUSERNAME/turnkeeper-pwa.git
cd turnkeeper-pwa

# Copy all your TurnKeeper files here
# Then:
git add .
git commit -m "Deploy TurnKeeper PWA"
git push origin main
```

## Step 3: Enable GitHub Pages

1. **Go to your repository** on GitHub
2. **Click "Settings"** tab (top of repository)
3. **Scroll down** to "Pages" section (left sidebar)
4. **Configure Pages:**
   - Source: **"Deploy from a branch"**
   - Branch: **"main"**
   - Folder: **"/ (root)"**
   - Click **"Save"**

## Step 4: Your App is Live! 🎉

- **Your URL:** `https://YOURUSERNAME.github.io/turnkeeper-pwa`
- **Deployment time:** 2-10 minutes
- **Auto-updates:** Every time you push changes

## Step 5: Test Your Deployment

1. **Wait 5-10 minutes** for GitHub to build your site
2. **Visit your URL:** `https://YOURUSERNAME.github.io/turnkeeper-pwa`
3. **Test PWA features:**
   - ✅ App loads correctly
   - ✅ Mobile responsive design works
   - ✅ PWA installation prompt appears
   - ✅ Dark/light theme toggle works
   - ✅ Offline functionality works

## Important: Fix Icons First!

⚠️ **Before deploying**, generate your PWA icons:

1. **Go to:** [realfavicongenerator.net](https://realfavicongenerator.net)
2. **Upload:** Your `icons/icon.svg` file
3. **Download:** All generated PNG icons
4. **Place them** in your `icons/` folder:
   ```
   icons/
   ├── icon-72x72.png
   ├── icon-96x96.png
   ├── icon-128x128.png
   ├── icon-144x144.png
   ├── icon-152x152.png
   ├── icon-192x192.png
   ├── icon-384x384.png
   └── icon-512x512.png
   ```

## Updating Your App

**To make changes after deployment:**

1. **Edit files** locally in `c:\work\_scripts\pwa\TurnKeeper`
2. **Upload changes** to GitHub:
   - Go to your repository
   - Click on the file you want to edit
   - Click pencil icon ✏️ to edit
   - Or upload new version of file
3. **Commit changes**
4. **Your live site updates automatically** in 2-10 minutes

## Custom URL (Optional)

If you want a custom domain like `turnkeeper.yourname.com`:

1. **Buy domain** from registrar (GoDaddy, Namecheap, etc.)
2. **In repository Settings → Pages:**
   - Custom domain: `turnkeeper.yourname.com`
3. **Update DNS** at your registrar:
   ```
   Type: CNAME
   Name: www
   Value: YOURUSERNAME.github.io
   ```

## Troubleshooting

### Site Not Loading?
- Wait 10 minutes after enabling Pages
- Check Settings → Pages shows green checkmark
- Verify all files uploaded correctly

### PWA Not Installing?
- Generate proper PWA icons first
- Check browser console for errors
- Test on different devices/browsers

### Need Help?
- Check repository "Actions" tab for build errors
- GitHub Pages status: [githubstatus.com](https://www.githubstatus.com/)

## Your Deployment Checklist

- [ ] Repository created: `turnkeeper-pwa`
- [ ] All files uploaded to repository
- [ ] PWA icons generated and uploaded
- [ ] GitHub Pages enabled in Settings
- [ ] Site accessible at: `https://YOURUSERNAME.github.io/turnkeeper-pwa`
- [ ] PWA installs correctly on mobile devices
- [ ] All features work on live site

## 🎉 Success!

Once deployed, your TurnKeeper PWA will be:
- 🌍 **Accessible worldwide**
- 📱 **Installable on any device**
- 📴 **Works offline**
- 🔄 **Auto-updates** when you push changes
- 🆓 **Free forever** on GitHub Pages

**Your live URL will be:** `https://YOURUSERNAME.github.io/turnkeeper-pwa`

Share it with your RPG group and the community! 🎲⚔️
