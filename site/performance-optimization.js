// === INFRAQUIZ PERFORMANCE OPTIMIZATION ===

// === LAZY LOADING SYSTEM ===

class LazyLoader {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadElement(entry.target);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
        }
    }

    observe(element) {
        if (this.observer && element) {
            this.observer.observe(element);
        } else {
            // Fallback for browsers without IntersectionObserver
            this.loadElement(element);
        }
    }

    loadElement(element) {
        if (element.tagName === 'IMG') {
            this.loadImage(element);
        } else if (element.classList.contains('lazy-component')) {
            this.loadComponent(element);
        }

        // Stop observing once loaded
        if (this.observer) {
            this.observer.unobserve(element);
        }
    }

    loadImage(img) {
        const src = img.dataset.src;
        if (src) {
            img.src = src;
            img.classList.remove('lazy');
            img.classList.add('loaded');
        }
    }

    async loadComponent(element) {
        const componentName = element.dataset.component;
        if (componentName) {
            try {
                const module = await import(`./components/${componentName}.js`);
                if (module.default) {
                    element.innerHTML = module.default();
                    element.classList.remove('lazy-component');
                    element.classList.add('loaded');
                }
            } catch (error) {
                console.warn(`Failed to load component ${componentName}:`, error);
            }
        }
    }

    // Initialize lazy loading for all elements
    static initAll() {
        const lazyLoader = new LazyLoader();

        // Lazy load images
        document.querySelectorAll('img[data-src]').forEach(img => {
            lazyLoader.observe(img);
        });

        // Lazy load components
        document.querySelectorAll('.lazy-component').forEach(component => {
            lazyLoader.observe(component);
        });
    }
}

// === IMAGE OPTIMIZATION ===

class ImageOptimizer {
    constructor() {
        this.webpSupport = this.checkWebPSupport();
    }

    checkWebPSupport() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('webp') > -1;
    }

    optimizeImage(src, options = {}) {
        const img = new Image();
        const {
            width,
            height,
            quality = 0.8,
            format = this.webpSupport ? 'webp' : 'jpg'
        } = options;

        // In a real implementation, you'd use a service like Cloudinary or Imgix
        // For now, we'll just return the original src
        return src;
    }

    createResponsiveImage(src, alt, sizes = {}) {
        const sources = Object.entries(sizes).map(([breakpoint, width]) => {
            const optimizedSrc = this.optimizeImage(src, { width });
            return `<source media="(max-width: ${breakpoint}px)" srcset="${optimizedSrc}">`;
        }).join('');

        const defaultSrc = this.optimizeImage(src);
        return `
            <picture>
                ${sources}
                <img src="${defaultSrc}" alt="${alt}" loading="lazy">
            </picture>
        `;
    }
}

// === SERVICE WORKER FOR CACHING ===

class ServiceWorkerManager {
    constructor() {
        this.registration = null;
        this.init();
    }

    async init() {
        if ('serviceWorker' in navigator && window.InfraQuiz?.config?.performance?.serviceWorker) {
            try {
                // Detect environment and use appropriate path
                const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
                const swPath = isLocal ? './sw.js' : '/sw.js';

                this.registration = await navigator.serviceWorker.register(swPath);
                console.log('✅ Service Worker registered');

                this.registration.addEventListener('updatefound', () => {
                    const newWorker = this.registration.installing;
                    if (newWorker) {
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                this.showUpdateNotification();
                            }
                        });
                    }
                });

            } catch (error) {
                console.warn('❌ Service Worker registration failed:', error);
            }
        }
    }

    showUpdateNotification() {
        const notification = document.createElement('div');
        notification.className = 'update-notification';
        notification.innerHTML = `
            <div class="alert alert-info alert-dismissible fade show" role="alert">
                <strong>Update Available!</strong> A new version is available.
                <button type="button" class="btn btn-sm btn-primary ms-2" onclick="window.location.reload()">
                    Refresh
                </button>
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 10000);
    }

    async update() {
        if (this.registration) {
            await this.registration.update();
        }
    }
}

// === RESOURCE PRELOADER ===

class ResourcePreloader {
    constructor() {
        this.preloaded = new Set();
    }

    preloadResource(url, type = 'fetch') {
        if (this.preloaded.has(url)) return Promise.resolve();

        return new Promise((resolve, reject) => {
            let element;

            switch (type) {
                case 'script':
                    element = document.createElement('link');
                    element.rel = 'preload';
                    element.as = 'script';
                    element.href = url;
                    break;

                case 'style':
                    element = document.createElement('link');
                    element.rel = 'preload';
                    element.as = 'style';
                    element.href = url;
                    break;

                case 'image':
                    element = document.createElement('link');
                    element.rel = 'preload';
                    element.as = 'image';
                    element.href = url;
                    break;

                default:
                    // Generic fetch preload
                    fetch(url, { priority: 'low' })
                        .then(() => resolve())
                        .catch(reject);
                    return;
            }

            if (element) {
                element.onload = () => {
                    this.preloaded.add(url);
                    resolve();
                };
                element.onerror = reject;
                document.head.appendChild(element);
            }
        });
    }

    preloadCriticalResources() {
        // Detect environment and use appropriate paths
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const basePath = isLocal ? '.' : '';

        const criticalResources = [
            { url: `${basePath}/styles.css`, type: 'style' },
            { url: `${basePath}/script.js`, type: 'script' },
            // Add other critical resources
        ];

        return Promise.all(
            criticalResources.map(resource =>
                this.preloadResource(resource.url, resource.type)
            )
        );
    }

    preloadQuizResources(category) {
        // Preload quiz-specific resources
        const quizResources = [
            `/quizzes/${category}/en/questions1.md`,
            `/quizzes/${category}/es/cuestionario1.md`,
        ];

        return Promise.all(
            quizResources.map(url => this.preloadResource(url, 'fetch'))
        );
    }
}

// === CODE SPLITTER FOR LARGE COMPONENTS ===

class CodeSplitter {
    constructor() {
        this.loadedModules = new Map();
    }

    async loadModule(moduleName) {
        if (this.loadedModules.has(moduleName)) {
            return this.loadedModules.get(moduleName);
        }

        try {
            const module = await import(`./modules/${moduleName}.js`);
            this.loadedModules.set(moduleName, module);
            return module;
        } catch (error) {
            console.error(`Failed to load module ${moduleName}:`, error);
            throw error;
        }
    }

    async loadQuizPage() {
        return this.loadModule('quiz-page');
    }

    async loadAnalyticsPage() {
        return this.loadModule('analytics-page');
    }

    async loadEditorPage() {
        return this.loadModule('quiz-editor');
    }

    // Preload modules based on user behavior
    async preloadBasedOnRoute(route) {
        const preloadMap = {
            '/': ['quiz-page'],
            '/analytics': ['analytics-page'],
            '/editor': ['quiz-editor']
        };

        const modulesToPreload = preloadMap[route] || [];
        return Promise.all(
            modulesToPreload.map(module => this.loadModule(module))
        );
    }
}

// === MEMORY MANAGEMENT ===

class MemoryManager {
    constructor() {
        this.gcThreshold = 50 * 1024 * 1024; // 50MB
        this.checkInterval = 30000; // 30 seconds
        this.startMonitoring();
    }

    startMonitoring() {
        setInterval(() => {
            this.checkMemoryUsage();
        }, this.checkInterval);
    }

    checkMemoryUsage() {
        if ('memory' in performance) {
            const memInfo = performance.memory;
            const usedPercent = (memInfo.usedJSHeapSize / memInfo.totalJSHeapSize) * 100;

            if (usedPercent > 80) {
                console.warn(`⚠️ High memory usage: ${usedPercent.toFixed(1)}%`);
                this.performCleanup();
            }

            // Log memory stats
            console.log(`📊 Memory: ${Math.round(memInfo.usedJSHeapSize / 1024 / 1024)}MB used of ${Math.round(memInfo.totalJSHeapSize / 1024 / 1024)}MB total`);
        }
    }

    performCleanup() {
        // Clear non-essential caches
        if (window.InfraQuiz?.cache) {
            // Keep only critical cache entries
            const criticalKeys = ['quiz_content_', 'translation_'];
            const cache = window.InfraQuiz.cache;

            for (const [key] of cache.cache.entries()) {
                const isCritical = criticalKeys.some(criticalKey => key.includes(criticalKey));
                if (!isCritical) {
                    cache.cache.delete(key);
                }
            }
        }

        // Force garbage collection if available
        if (window.gc) {
            window.gc();
        }
    }

    getMemoryStats() {
        if ('memory' in performance) {
            return {
                used: performance.memory.usedJSHeapSize,
                total: performance.memory.totalJSHeapSize,
                limit: performance.memory.jsHeapSizeLimit
            };
        }
        return null;
    }
}

// === NETWORK OPTIMIZATION ===

class NetworkOptimizer {
    constructor() {
        this.connection = this.getConnectionInfo();
        this.setupConnectionMonitoring();
    }

    getConnectionInfo() {
        if ('connection' in navigator) {
            return navigator.connection;
        }
        return { effectiveType: 'unknown', downlink: 1 };
    }

    setupConnectionMonitoring() {
        if ('connection' in navigator) {
            navigator.connection.addEventListener('change', () => {
                this.connection = navigator.connection;
                this.adaptToConnection();
            });
        }
    }

    adaptToConnection() {
        const { effectiveType, downlink } = this.connection;

        // Adjust loading strategies based on connection
        if (effectiveType === 'slow-2g' || effectiveType === '2g' || downlink < 1) {
            this.enableLowBandwidthMode();
        } else if (effectiveType === '3g' || downlink < 2) {
            this.enableMediumBandwidthMode();
        } else {
            this.enableHighBandwidthMode();
        }
    }

    enableLowBandwidthMode() {
        console.log('📶 Low bandwidth mode enabled');

        // Disable non-essential features
        if (window.InfraQuiz?.config) {
            window.InfraQuiz.config.performance.lazyLoadImages = true;
            window.InfraQuiz.config.cache.enabled = true;
        }

        // Reduce image quality
        document.documentElement.classList.add('low-bandwidth');
    }

    enableMediumBandwidthMode() {
        console.log('📶 Medium bandwidth mode enabled');
        document.documentElement.classList.remove('low-bandwidth');
        document.documentElement.classList.add('medium-bandwidth');
    }

    enableHighBandwidthMode() {
        console.log('📶 High bandwidth mode enabled');
        document.documentElement.classList.remove('low-bandwidth', 'medium-bandwidth');
    }

    isSlowConnection() {
        return this.connection.effectiveType === 'slow-2g' ||
               this.connection.effectiveType === '2g' ||
               this.connection.downlink < 1;
    }
}

// === CSS OPTIMIZATION ===

class CSSOptimizer {
    constructor() {
        this.criticalCSS = '';
        this.nonCriticalCSS = '';
    }

    extractCriticalCSS() {
        // Extract CSS for above-the-fold content
        const criticalSelectors = [
            'body', 'html', '.navbar', '.hero', '.quiz-card',
            '.btn', '.alert', '.progress', '.badge'
        ];

        // In a real implementation, you'd extract actual CSS rules
        // For now, we'll mark this as a placeholder
        console.log('🎨 Critical CSS extraction would happen here');
    }

    inlineCriticalCSS() {
        if (this.criticalCSS) {
            const style = document.createElement('style');
            style.textContent = this.criticalCSS;
            document.head.appendChild(style);
        }
    }

    loadNonCriticalCSS() {
        // Detect environment and use appropriate paths
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const basePath = isLocal ? '.' : '';

        // Load remaining CSS asynchronously
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `${basePath}/styles.css`;
        link.media = 'print';
        link.onload = () => {
            link.media = 'all';
        };
        document.head.appendChild(link);
    }

    optimizeCSSDelivery() {
        // Inline critical CSS
        this.inlineCriticalCSS();

        // Load non-critical CSS asynchronously
        this.loadNonCriticalCSS();
    }
}

// === INITIALIZATION ===

// Initialize all performance optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize lazy loading
    LazyLoader.initAll();

    // Initialize service worker
    new ServiceWorkerManager();

    // Initialize resource preloader
    const preloader = new ResourcePreloader();
    preloader.preloadCriticalResources();

    // Initialize code splitter
    window.InfraQuiz = window.InfraQuiz || {};
    window.InfraQuiz.codeSplitter = new CodeSplitter();

    // Initialize memory manager
    new MemoryManager();

    // Initialize network optimizer
    new NetworkOptimizer();

    // Initialize CSS optimizer
    const cssOptimizer = new CSSOptimizer();
    cssOptimizer.optimizeCSSDelivery();

    // Initialize image optimizer
    window.InfraQuiz.imageOptimizer = new ImageOptimizer();

    console.log('🚀 Performance optimizations initialized');
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LazyLoader,
        ImageOptimizer,
        ServiceWorkerManager,
        ResourcePreloader,
        CodeSplitter,
        MemoryManager,
        NetworkOptimizer,
        CSSOptimizer
    };
}