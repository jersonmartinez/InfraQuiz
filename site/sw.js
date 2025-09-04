// === INFRAQUIZ SERVICE WORKER ===

// Cache version - increment to force cache update
const CACHE_VERSION = 'v2.1.0';
const CACHE_NAME = `infraquiz-${CACHE_VERSION}`;

// Detect environment and adjust paths
const isLocalDev = self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1';
const basePath = isLocalDev ? '.' : '';

// Resources to cache immediately
const PRECACHE_URLS = [
    basePath || '/',
    `${basePath}/index.html`,
    `${basePath}/quiz.html`,
    `${basePath}/analytics.html`,
    `${basePath}/quiz-editor.html`,
    `${basePath}/styles.css`,
    `${basePath}/script.js`,
    `${basePath}/quiz_page.js`,
    `${basePath}/analytics.js`,
    `${basePath}/quiz-editor.js`,
    `${basePath}/enhanced-config.js`,
    `${basePath}/performance-optimization.js`,
    // Add other critical resources
];

// Resources to cache on demand
const RUNTIME_CACHE = [
    `${basePath}/quizzes/`, // Quiz content from GitHub
    `${basePath}/images/`,
    `${basePath}/fonts/`,
];

// Cache strategies
const CACHE_STRATEGIES = {
    // Cache first, then network
    CACHE_FIRST: 'cache-first',
    // Network first, then cache
    NETWORK_FIRST: 'network-first',
    // Cache only
    CACHE_ONLY: 'cache-only',
    // Network only
    NETWORK_ONLY: 'network-only',
    // Stale while revalidate
    STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

// === INSTALL EVENT ===

self.addEventListener('install', event => {
    console.log('🚀 Service Worker installing');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📦 Precaching resources');
                return cache.addAll(PRECACHE_URLS);
            })
            .then(() => {
                console.log('✅ Service Worker installed');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('❌ Service Worker installation failed:', error);
            })
    );
});

// === ACTIVATE EVENT ===

self.addEventListener('activate', event => {
    console.log('🎯 Service Worker activating');

    event.waitUntil(
        // Clean up old caches
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log(`🗑️ Deleting old cache: ${cacheName}`);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {
            console.log('✅ Service Worker activated');
            return self.clients.claim();
        })
    );
});

// === FETCH EVENT ===

self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Skip Chrome extension requests
    if (url.protocol === 'chrome-extension:') return;

    // Skip external requests (except allowed domains)
    const allowedDomains = [
        'raw.githubusercontent.com',
        'fonts.googleapis.com',
        'fonts.gstatic.com',
        'cdn.jsdelivr.net',
        'unpkg.com'
    ];

    const isAllowedDomain = allowedDomains.some(domain => url.hostname.includes(domain));
    const isSameOrigin = url.origin === self.location.origin;

    if (!isSameOrigin && !isAllowedDomain) return;

    // Choose caching strategy based on resource type
    let strategy = CACHE_STRATEGIES.NETWORK_FIRST;

    if (PRECACHE_URLS.some(url => request.url.includes(url))) {
        strategy = CACHE_STRATEGIES.CACHE_FIRST;
    if (request.url.includes(`${basePath}/quizzes/`) || request.url.includes('.md')) {
        strategy = CACHE_STRATEGIES.STALE_WHILE_REVALIDATE;
    } else if (request.url.includes('.css') || request.url.includes('.js')) {
        strategy = CACHE_STRATEGIES.CACHE_FIRST;
    }

    event.respondWith(
        handleRequest(request, strategy)
    );
});

// === REQUEST HANDLING ===

async function handleRequest(request, strategy) {
    try {
        switch (strategy) {
            case CACHE_STRATEGIES.CACHE_FIRST:
                return await cacheFirst(request);
            case CACHE_STRATEGIES.NETWORK_FIRST:
                return await networkFirst(request);
            case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
                return await staleWhileRevalidate(request);
            case CACHE_STRATEGIES.CACHE_ONLY:
                return await cacheOnly(request);
            case CACHE_STRATEGIES.NETWORK_ONLY:
                return await networkOnly(request);
            default:
                return await networkFirst(request);
        }
    } catch (error) {
        console.error(`❌ Request failed for ${request.url}:`, error);
        return await fallbackResponse(request);
    }
}

// Cache-first strategy
async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }

    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        return await fallbackResponse(request);
    }
}

// Network-first strategy
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        return await fallbackResponse(request);
    }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidate(request) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);

    const fetchPromise = fetch(request).then(networkResponse => {
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    });

    return cachedResponse || fetchPromise;
}

// Cache-only strategy
async function cacheOnly(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }
    return await fallbackResponse(request);
}

// Network-only strategy
async function networkOnly(request) {
    try {
        return await fetch(request);
    } catch (error) {
        return await fallbackResponse(request);
    }
}

// Fallback response
async function fallbackResponse(request) {
    // Try to serve cached version
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }

    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
        const cache = await caches.open(CACHE_NAME);
        return await cache.match(`${basePath}/index.html`) || new Response('Offline', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'text/plain' }
        });
    }

    // Return error response
    return new Response('Resource not available offline', {
        status: 404,
        statusText: 'Not Found',
        headers: { 'Content-Type': 'text/plain' }
    });
}

// === BACKGROUND SYNC ===

self.addEventListener('sync', event => {
    console.log('🔄 Background sync triggered:', event.tag);

    if (event.tag === 'analytics-sync') {
        event.waitUntil(syncAnalytics());
    } else if (event.tag === 'quiz-progress-sync') {
        event.waitUntil(syncQuizProgress());
    }
});

// Sync analytics data
async function syncAnalytics() {
    try {
        const cache = await caches.open(CACHE_NAME);
        const analyticsData = await cache.match(`${basePath}/analytics-queue`);

        if (analyticsData) {
            // Send analytics data to server
            console.log('📊 Syncing analytics data');
            // Implementation would send data to analytics endpoint
        }
    } catch (error) {
        console.error('❌ Analytics sync failed:', error);
    }
}

// Sync quiz progress
async function syncQuizProgress() {
    try {
        const cache = await caches.open(CACHE_NAME);
        const progressData = await cache.match(`${basePath}/progress-queue`);

        if (progressData) {
            // Send progress data to server
            console.log('📈 Syncing quiz progress');
            // Implementation would send data to progress endpoint
        }
    } catch (error) {
        console.error('❌ Progress sync failed:', error);
    }
}

// === PUSH NOTIFICATIONS ===

self.addEventListener('push', event => {
    console.log('📬 Push notification received');

    if (!event.data) return;

    const data = event.data.json();

    const options = {
        body: data.body,
        icon: `${basePath}/icon-192x192.png`,
        badge: `${basePath}/icon-192x192.png`,
        vibrate: [100, 50, 100],
        data: {
            url: data.url || (basePath || '/')
        },
        actions: [
            {
                action: 'view',
                title: 'View'
            },
            {
                action: 'dismiss',
                title: 'Dismiss'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Handle notification click
self.addEventListener('notificationclick', event => {
    console.log('🔔 Notification clicked');

    event.notification.close();

    if (event.action === 'dismiss') return;

    const url = event.notification.data.url;

    event.waitUntil(
        clients.openWindow(url)
    );
});

// === PERIODIC BACKGROUND SYNC ===

self.addEventListener('periodicsync', event => {
    console.log('🔄 Periodic sync triggered:', event.tag);

    if (event.tag === 'content-update') {
        event.waitUntil(updateContent());
    }
});

// Update content in background
async function updateContent() {
    try {
        console.log('📦 Updating content in background');

        // Check for quiz content updates
        const categories = ['bash', 'python', 'terraform', 'aws', 'docker', 'kubernetes'];
        const languages = ['en', 'es'];

        for (const category of categories) {
            for (const language of languages) {
                try {
                    const response = await fetch(
                        `https://raw.githubusercontent.com/jersonmartinez/InfraQuiz/main/quizzes/${category}/${language}/questions1.md`,
                        { cache: 'no-cache' }
                    );

                    if (response.ok) {
                        const cache = await caches.open(CACHE_NAME);
                        await cache.put(
                            `${basePath}/quizzes/${category}/${language}/questions1.md`,
                            response
                        );
                    }
                } catch (error) {
                    console.warn(`Failed to update ${category}/${language}:`, error);
                }
            }
        }

        console.log('✅ Content update completed');
    } catch (error) {
        console.error('❌ Content update failed:', error);
    }
}

// === MESSAGE HANDLING ===

self.addEventListener('message', event => {
    const { type, data } = event.data;

    switch (type) {
        case 'SKIP_WAITING':
            self.skipWaiting();
            break;

        case 'GET_CACHE_STATS':
            getCacheStats().then(stats => {
                event.ports[0].postMessage(stats);
            });
            break;

        case 'CLEAR_CACHE':
            clearCache().then(() => {
                event.ports[0].postMessage({ success: true });
            });
            break;

        default:
            console.log('📨 Unknown message type:', type);
    }
});

// Get cache statistics
async function getCacheStats() {
    const cache = await caches.open(CACHE_NAME);
    const keys = await cache.keys();

    let totalSize = 0;
    const resources = [];

    for (const request of keys) {
        try {
            const response = await cache.match(request);
            if (response) {
                const content = await response.text();
                const size = content.length;
                totalSize += size;
                resources.push({
                    url: request.url,
                    size: size
                });
            }
        } catch (error) {
            console.warn(`Failed to get size for ${request.url}:`, error);
        }
    }

    return {
        version: CACHE_VERSION,
        totalResources: resources.length,
        totalSize: totalSize,
        resources: resources.slice(0, 10) // First 10 resources
    };
}

// Clear cache
async function clearCache() {
    const cacheNames = await caches.keys();
    await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
    );
}

// === ERROR HANDLING ===

self.addEventListener('error', event => {
    console.error('💥 Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', event => {
    console.error('💥 Service Worker unhandled rejection:', event.reason);
});

// === UTILITY FUNCTIONS ===

function isValidResponse(response) {
    return response && response.status >= 200 && response.status < 300;
}

function createOfflineResponse() {
    return new Response(
        `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Offline - InfraQuiz</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                h1 { color: #2563eb; }
                p { color: #6b7280; }
            </style>
        </head>
        <body>
            <h1>You're Offline</h1>
            <p>Some features may not be available without an internet connection.</p>
            <p>Please check your connection and try again.</p>
        </body>
        </html>
        `,
        {
            headers: { 'Content-Type': 'text/html' }
        }
    );
}