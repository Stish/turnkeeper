# TurnKeeper Mobile Testing Guide

## How to Test Your PWA on Mobile Devices

### Option 1: Local Network Testing

1. **Start the development server:**
   - Double-click `start-mobile-server.bat` in the TurnKeeper folder
   - Note the IP addresses shown (e.g., 192.168.0.30 or 10.113.196.165)

2. **Test on your mobile device:**
   - Make sure your phone/tablet is on the same WiFi network as your computer
   - Open a web browser on your mobile device
   - Navigate to: `http://192.168.0.30:8080` (replace with your actual IP)

3. **Install as PWA:**
   - On **iPhone/iPad**: Tap the Share button → "Add to Home Screen"
   - On **Android**: Tap the menu (⋮) → "Add to Home screen" or "Install app"

### Option 2: Chrome DevTools Mobile Simulation

1. Open Chrome on your computer
2. Go to: `file:///c:/work/_scripts/pwa/TurnKeeper/index.html`
3. Press `F12` to open DevTools
4. Click the device toggle icon (📱) or press `Ctrl+Shift+M`
5. Select different devices from the dropdown:
   - iPhone 12/13/14 Pro
   - iPhone SE
   - Samsung Galaxy S20/S21
   - iPad Air
   - Various Android devices

### Option 3: Edge DevTools (Similar to Chrome)

1. Open Microsoft Edge
2. Navigate to your app
3. Press `F12` → click device emulation icon
4. Test various mobile devices

### Option 4: Firefox Responsive Design Mode

1. Open Firefox
2. Navigate to your app  
3. Press `Ctrl+Shift+M` for responsive design mode
4. Choose device presets or custom dimensions

## Mobile PWA Features to Test

### Installation
- [ ] "Add to Home Screen" prompt appears
- [ ] App installs without browser UI
- [ ] App icon appears on home screen
- [ ] App opens in standalone mode

### Offline Functionality
- [ ] App loads when offline
- [ ] Data persists when offline
- [ ] Service worker caches resources
- [ ] Graceful offline message

### Touch Interactions
- [ ] All buttons are easily tappable (44px minimum)
- [ ] Drag and drop works on touch devices
- [ ] Scrolling feels smooth
- [ ] No accidental zooming on input focus

### Mobile UI/UX
- [ ] Navigation is thumb-friendly
- [ ] Text is readable without zooming
- [ ] Modals fit properly on screen
- [ ] Burger menu works smoothly
- [ ] Settings page is mobile-optimized

### Performance
- [ ] App loads quickly on mobile data
- [ ] Animations are smooth
- [ ] No layout shifts on load
- [ ] Battery usage is reasonable

## Your Local IP Addresses

Based on your network configuration:
- **192.168.0.30** (most likely for home WiFi)
- **10.113.196.165** (possibly work/office network)

Use these addresses like: `http://192.168.0.30:8080`

## PWA Manifest Features

Your app includes:
- ✅ Proper mobile viewport handling
- ✅ Touch-friendly icon sizes (72px to 512px)  
- ✅ Standalone display mode
- ✅ Theme color matching your design
- ✅ Support for both portrait and landscape
- ✅ Offline capability via service worker
- ✅ Categories for app stores
- ✅ Safe area support for iPhone X+ devices

## Troubleshooting

**Can't connect from mobile device:**
- Ensure both devices are on same WiFi network
- Check Windows Firewall isn't blocking port 8080
- Try the other IP address if one doesn't work

**PWA won't install:**
- Make sure you're using HTTPS or localhost
- Check that manifest.json is valid
- Verify service worker is properly registered

**Touch targets too small:**
- Minimum 44px touch targets are implemented
- Use browser zoom if needed during testing

**App doesn't work offline:**
- Clear browser cache and reload
- Check browser's Application tab in DevTools
- Verify service worker status
