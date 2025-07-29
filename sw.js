const CACHE_NAME = 'turnkeeper-v1.1.0';
const urlsToCache = [
    './',
    './index.html',
    './styles.css',
    './app.js',
    './manifest.json',
    './mobile-test.html',
    './icons/icon-72x72.png',
    './icons/icon-96x96.png',
    './icons/icon-128x128.png',
    './icons/icon-144x144.png',
    './icons/icon-152x152.png',
    './icons/icon-192x192.png',
    './icons/icon-384x384.png',
    './icons/icon-512x512.png'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                // Skip waiting to activate immediately
                return self.skipWaiting();
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // Take control of all pages immediately
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version if available
                if (response) {
                    return response;
                }

                // Clone the request because it's a stream
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then((response) => {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response because it's a stream
                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }).catch(() => {
                    // If network fails, return a custom offline page for navigation requests
                    if (event.request.destination === 'document') {
                        return new Response(`
                            <!DOCTYPE html>
                            <html>
                            <head>
                                <title>Offline - TurnKeeper</title>
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <style>
                                    body {
                                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        min-height: 100vh;
                                        margin: 0;
                                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                        color: white;
                                        text-align: center;
                                        padding: 1rem;
                                    }
                                    .offline-content {
                                        background: rgba(255, 255, 255, 0.1);
                                        padding: 2rem;
                                        border-radius: 10px;
                                        backdrop-filter: blur(10px);
                                    }
                                    h1 { margin-bottom: 1rem; }
                                    button {
                                        background: #2196F3;
                                        color: white;
                                        border: none;
                                        padding: 0.75rem 1.5rem;
                                        border-radius: 5px;
                                        cursor: pointer;
                                        font-size: 1rem;
                                        margin-top: 1rem;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="offline-content">
                                    <h1>⚔️ You're Offline</h1>
                                    <p>TurnKeeper is not available right now.</p>
                                    <p>Please check your internet connection and try again.</p>
                                    <button onclick="window.location.reload()">🔄 Try Again</button>
                                </div>
                            </body>
                            </html>
                        `, {
                            headers: {
                                'Content-Type': 'text/html',
                            },
                        });
                    }
                });
            })
    );
});

// Background sync for offline task management (future enhancement)
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        console.log('Background sync triggered');
        // Here you could sync tasks with a server when back online
    }
});

// Push notifications (future enhancement)
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: './icons/icon-192x192.png',
            badge: './icons/icon-72x72.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: '1'
            }
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    console.log('Notification click received.');
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow('/')
    );
});
