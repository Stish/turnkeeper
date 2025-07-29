# ⚔️ TurnKeeper - Combat Initiative Tracker

A mobile-first Progressive Web App (PWA) for tracking combat initiative in tabletop RPG games like D&D, Pathfinder, and more.

## 🚀 [Try TurnKeeper Live](https://yourusername.github.io/turnkeeper-pwa)

## ✨ Features

- 👥 **Party Management** - Create and manage multiple adventuring parties
- ⚔️ **Combat Tracking** - Track initiative order with drag & drop reordering
- 🎲 **Flexible Initiative** - Auto-roll or manual entry for initiative values
- 📱 **Mobile Optimized** - Touch-friendly interface for phones and tablets
- 🌙 **Dark/Light Theme** - Switch between themes for any lighting condition
- � **Offline Ready** - Works without internet after installation
- 🏠 **Install as App** - Add to home screen for native-like experience
- 💾 **Local Storage** - All data stays on your device, no server required
- ⚡ **Fast Loading** - Cached resources for quick startup
- 🎨 **Native Feel** - App-like experience

✅ **RPG Combat Management:**
- 👥 **Party Management** - Create and manage adventuring parties
- ⚔️ **Character Tracking** - Add characters with initiative modifiers
- 🎲 **Initiative Rolling** - Automatic d20 initiative rolls
- 📊 **Turn Order** - Clear visual turn tracking
- 🔄 **Round Management** - Track combat rounds
- 🧌 **NPC Support** - Add NPCs to combat on the fly
- 💾 **Persistent State** - Combat state saved automatically

## How to Use

### 1. Create a Party
1. Go to the "Parties" tab
2. Click "New Party"
3. Enter party name and add characters with their initiative modifiers
4. Save the party

### 2. Start Combat
1. Go to the "Combat" tab
2. Click "New Combat"
3. Select a party from the dropdown
4. Add any NPCs with their initiative modifiers
5. Click "Roll Initiative & Start Combat"

### 3. Track Combat
- See initiative order with rolled results
- Current turn is highlighted in gold
- Click "Next Turn" to advance
- Round counter automatically increments
- End combat when finished

## How to Run

1. **Serve the files** using a local server (required for PWA features):
   ```bash
   # Using Python (if installed)
   cd pwa/TurnKeeper
   python -m http.server 8000
   
   # Using Node.js (if installed)
   npx http-server
   
   # Using VS Code Live Server extension
   Right-click index.html -> Open with Live Server
   ```

2. **Open in browser:**
   - Navigate to `http://localhost:8000` (or the port shown)

3. **Test PWA features:**
   - **Install**: Look for install prompt or browser install button
   - **Offline**: Disconnect internet and reload - app still works
   - **Responsive**: Resize browser or test on mobile device

## Perfect for:

- 🐉 **D&D 5e** - Any edition of Dungeons & Dragons
- ⚔️ **Pathfinder** - 1st and 2nd edition
- 🎭 **Any RPG** - Works with any system using initiative
- 🏠 **Home Games** - Perfect for kitchen table gaming
- 💻 **Virtual Tabletops** - Great companion for online play
- 📱 **Mobile Gaming** - Works great on tablets and phones

## Game Master Benefits

- **Faster Combat** - No more paper lists or mental tracking
- **Clear Visibility** - Everyone can see turn order
- **Reduced Errors** - Automatic calculations and tracking
- **Easy Setup** - Add parties and NPCs quickly
- **Persistent Data** - Never lose your party setups
- **Offline Play** - Works in basements and remote locations

## PWA Components

### 1. App Manifest (`manifest.json`)
- Defines app metadata, icons, and display options
- Enables "Add to Home Screen" functionality
- Configured for RPG gaming theme

### 2. Service Worker (`sw.js`)
- Caches app resources for offline use
- Handles network requests with cache-first strategy
- Provides custom offline page

### 3. App Shell (`index.html`, `styles.css`, `app.js`)
- Fast-loading RPG-themed interface
- Responsive design for all devices
- Complete combat tracking functionality

## File Structure

```
TurnKeeper/
├── index.html          # Main HTML file
├── manifest.json       # PWA manifest
├── sw.js              # Service worker
├── app.js             # Application logic
├── styles.css         # RPG-themed styling
├── icons/             # App icons
│   ├── icon.svg       # Source icon (sword & shield theme)
│   └── icon-*.png     # Generated PNG icons (create these)
└── README.md          # This file
```

## Data Storage

All data is stored locally in your browser:
- **Parties** - Saved party configurations
- **Combat State** - Current combat session (if active)
- **Settings** - App preferences

No data is sent to external servers - everything stays private!

## Creating Icons

Convert the `icons/icon.svg` (sword & shield design) to PNG files:
- Required sizes: 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512
- Use tools like [PWA Builder](https://www.pwabuilder.com/) or image editors

## Browser Support

- ✅ Chrome/Chromium (best support)
- ✅ Firefox (good support)  
- ✅ Safari (good support)
- ✅ Edge (good support)

## Future Enhancement Ideas

- 🎯 **Conditions Tracking** - Track status effects
- ⏱️ **Turn Timers** - Optional turn time limits
- 📊 **Combat Statistics** - Track damage, healing, etc.
- 🔔 **Turn Notifications** - Audio/visual turn alerts
- ☁️ **Cloud Sync** - Sync parties across devices
- � **Advanced Dice** - Custom dice rolling
- � **Combat Notes** - Add notes for each participant
- 🏆 **Combat History** - Save completed combats
- � **Themes** - Different RPG system themes
- � **Multiple GMs** - Share control features

## Troubleshooting

**App not installing?**
- Ensure you're serving over HTTPS or localhost
- Check manifest.json is valid
- Verify service worker is registered

**Combat state lost?**
- Data is stored in browser localStorage
- Clearing browser data will reset the app
- Export/backup feature coming in future update

**Initiative ties?**
- Currently sorted by total initiative
- Future update will add tiebreaker options

## Community & Support

This is an open-source PWA designed for the tabletop gaming community. Perfect for:
- New Game Masters learning combat tracking
- Experienced GMs wanting digital efficiency  
- Groups playing in locations without internet
- Anyone who wants fast, reliable initiative tracking

Roll for initiative! ⚔️🎲
