// === INFRAQUIZ SERVICE WORKER ===

// Cache version - increment to force cache update
const CACHE_VERSION = 'v2.2.2';
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
    `${basePath}/flashcards.html`,
    `${basePath}/css/main.css`,
    `${basePath}/css/variables.css`,
    `${basePath}/css/layout.css`,
    `${basePath}/css/components.css`,
    `${basePath}/css/dark-mode.css`,
    `${basePath}/css/flashcards.css`,
    `${basePath}/js/modules/core.js`,
    `${basePath}/js/modules/home.js`,
    `${basePath}/js/modules/analytics.js`,
    `${basePath}/js/modules/quiz-editor.js`,
    `${basePath}/js/modules/gamification-engine.js`,
    `${basePath}/js/modules/flashcards-system.js`,
    `${basePath}/js/modules/quiz-controller.js`,
    `${basePath}/js/modules/quiz-state.js`,
    `${basePath}/js/modules/quiz-parser.js`,
    `${basePath}/js/modules/quiz-ui.js`,
    `${basePath}/js/modules/quiz-service.js`
];

// Cache strategies
const CACHE_STRATEGIES = {
    CACHE_FIRST: 'cache-first',
    NETWORK_FIRST: 'network-first',
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

    if (request.method !== 'GET') return;
    if (url.protocol === 'chrome-extension:') return;

    // Choose caching strategy based on resource type
    let strategy = CACHE_STRATEGIES.NETWORK_FIRST;

    if (PRECACHE_URLS.some(u => request.url.includes(u))) {
        strategy = CACHE_STRATEGIES.CACHE_FIRST;
    } else if (request.url.includes('/quizzes/') || request.url.includes('.md')) {
        // Quizzes are now in the root, so we need to handle them carefully.
        // We use Network First for quizzes to ensure users get the latest questions.
        strategy = CACHE_STRATEGIES.NETWORK_FIRST;
    } else if (request.url.includes('.css') || request.url.includes('.js')) {
        strategy = CACHE_STRATEGIES.CACHE_FIRST;
    }

    event.respondWith(handleRequest(request, strategy));
});

// === REQUEST HANDLING ===
async function handleRequest(request, strategy) {
    try {
        switch (strategy) {
            case CACHE_STRATEGIES.CACHE_FIRST:
                return await cacheFirst(request);
            case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
                return await staleWhileRevalidate(request);
            default:
                return await networkFirst(request);
        }
    } catch (error) {
        console.error(`❌ Request failed for ${request.url}:`, error);
        return await fallbackResponse(request);
    }
}

// Strategies
async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) return cachedResponse;

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
        if (cachedResponse) return cachedResponse;
        return await fallbackResponse(request);
    }
}

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

async function fallbackResponse(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) return cachedResponse;

    if (request.mode === 'navigate') {
        const cache = await caches.open(CACHE_NAME);
        return await cache.match(`${basePath}/index.html`);
    }

    return new Response('Offline', { status: 503, statusText: 'Offline' });
}