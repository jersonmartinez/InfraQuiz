// === INFRAQUIZ ENHANCED CONFIGURATION & CACHE SYSTEM ===

class InfraQuizConfig {
    constructor() {
        this.version = '2.1.0';
        this.cacheVersion = '1.0';

        // GitHub Configuration
        this.github = {
            repo: 'jersonmartinez/InfraQuiz',
            branch: 'main',
            baseUrl: 'https://raw.githubusercontent.com',
            timeout: 10000, // 10 seconds
            retries: 3
        };

        // Quiz Configuration
        this.quiz = {
            maxQuestionsPerQuiz: 21,
            defaultLanguage: 'en',
            supportedLanguages: ['en', 'es'],
            difficulties: ['beginner', 'intermediate', 'advanced'],
            timeLimits: {
                beginner: 30, // seconds per question
                intermediate: 45,
                advanced: 60
            }
        };

        // Cache Configuration
        this.cache = {
            enabled: true,
            ttl: {
                quizContent: 3600000, // 1 hour
                translations: 86400000, // 24 hours
                analytics: 1800000 // 30 minutes
            },
            maxSize: 50 * 1024 * 1024, // 50MB
            compression: true
        };

        // Performance Configuration
        this.performance = {
            lazyLoadImages: true,
            preloadCritical: true,
            serviceWorker: true,
            webpSupport: true,
            reducedMotion: false
        };

        // Analytics Configuration
        this.analytics = {
            enabled: true,
            trackEvents: ['quiz_start', 'quiz_complete', 'question_answer', 'navigation'],
            anonymize: true,
            retention: 90 // days
        };

        // UI Configuration
        this.ui = {
            theme: 'auto', // auto, light, dark
            animations: true,
            notifications: true,
            keyboardShortcuts: true
        };

        // Security Configuration
        this.security = {
            csp: true,
            sanitizeInput: true,
            rateLimit: {
                requests: 100,
                window: 60000 // 1 minute
            }
        };
    }

    // Get configuration for current environment
    getConfig() {
        const env = this.detectEnvironment();
        return this.applyEnvironmentOverrides(env);
    }

    detectEnvironment() {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'development';
        }
        if (window.location.hostname.includes('staging')) {
            return 'staging';
        }
        return 'production';
    }

    applyEnvironmentOverrides(env) {
        const overrides = {
            development: {
                analytics: { enabled: false },
                cache: { enabled: false },
                performance: { serviceWorker: false }
            },
            staging: {
                analytics: { enabled: true },
                cache: { enabled: true }
            },
            production: {
                analytics: { enabled: true },
                cache: { enabled: true },
                performance: { serviceWorker: true }
            }
        };

        return this.deepMerge(this, overrides[env] || {});
    }

    deepMerge(target, source) {
        const result = { ...target };
        Object.keys(source).forEach(key => {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = this.deepMerge(result[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        });
        return result;
    }

    // Update configuration dynamically
    updateConfig(updates) {
        this.deepMerge(this, updates);
        this.saveToStorage();
    }

    // Load from localStorage
    loadFromStorage() {
        try {
            const stored = localStorage.getItem('infraquiz_config');
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed.version === this.version) {
                    this.deepMerge(this, parsed);
                }
            }
        } catch (error) {
            console.warn('Failed to load config from storage:', error);
        }
    }

    // Save to localStorage
    saveToStorage() {
        try {
            localStorage.setItem('infraquiz_config', JSON.stringify(this));
        } catch (error) {
            console.warn('Failed to save config to storage:', error);
        }
    }
}

// === SMART CACHE SYSTEM ===

class SmartCache {
    constructor(config) {
        this.config = config;
        this.cache = new Map();
        this.storageKey = 'infraquiz_cache_v' + config.cacheVersion;
        this.loadFromStorage();
        this.setupCleanup();
    }

    // Get item from cache
    get(key) {
        if (!this.config.cache.enabled) return null;

        const item = this.cache.get(key);
        if (!item) return null;

        // Check if expired
        if (Date.now() > item.expiry) {
            this.cache.delete(key);
            this.saveToStorage();
            return null;
        }

        return item.data;
    }

    // Set item in cache
    set(key, data, customTtl = null) {
        if (!this.config.cache.enabled) return;

        const ttl = customTtl || this.getDefaultTtl(key);
        const expiry = Date.now() + ttl;

        // Compress if enabled
        const processedData = this.config.cache.compression ?
            this.compress(data) : data;

        this.cache.set(key, {
            data: processedData,
            expiry,
            size: this.calculateSize(processedData),
            timestamp: Date.now()
        });

        this.enforceSizeLimit();
        this.saveToStorage();
    }

    // Get default TTL based on key pattern
    getDefaultTtl(key) {
        if (key.includes('quiz_content')) return this.config.cache.ttl.quizContent;
        if (key.includes('translation')) return this.config.cache.ttl.translations;
        if (key.includes('analytics')) return this.config.cache.ttl.analytics;
        return 1800000; // 30 minutes default
    }

    // Calculate approximate size of data
    calculateSize(data) {
        try {
            const str = JSON.stringify(data);
            return str.length * 2; // Rough estimate in bytes
        } catch {
            return 0;
        }
    }

    // Compress data (simple implementation)
    compress(data) {
        // In a real implementation, you'd use a compression library
        // For now, just return the data
        return data;
    }

    // Decompress data
    decompress(data) {
        return data;
    }

    // Enforce cache size limit using LRU eviction
    enforceSizeLimit() {
        let totalSize = 0;
        const entries = Array.from(this.cache.entries());

        // Sort by timestamp (oldest first)
        entries.sort((a, b) => a[1].timestamp - b[1].timestamp);

        // Calculate total size and remove old entries if needed
        for (const [key, item] of entries) {
            totalSize += item.size;
            if (totalSize > this.config.cache.maxSize) {
                this.cache.delete(key);
            }
        }
    }

    // Clear expired items
    clearExpired() {
        const now = Date.now();
        for (const [key, item] of this.cache.entries()) {
            if (now > item.expiry) {
                this.cache.delete(key);
            }
        }
        this.saveToStorage();
    }

    // Clear all cache
    clear() {
        this.cache.clear();
        localStorage.removeItem(this.storageKey);
    }

    // Get cache statistics
    getStats() {
        const now = Date.now();
        let totalSize = 0;
        let itemCount = 0;
        let expiredCount = 0;

        for (const [key, item] of this.cache.entries()) {
            totalSize += item.size;
            itemCount++;
            if (now > item.expiry) expiredCount++;
        }

        return {
            itemCount,
            totalSize,
            expiredCount,
            hitRate: this.calculateHitRate()
        };
    }

    // Calculate hit rate (simplified)
    calculateHitRate() {
        // In a real implementation, you'd track hits/misses
        return 0.85; // Placeholder
    }

    // Load cache from localStorage
    loadFromStorage() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                this.cache = new Map(parsed);
                this.clearExpired(); // Clean up on load
            }
        } catch (error) {
            console.warn('Failed to load cache from storage:', error);
            this.cache = new Map();
        }
    }

    // Save cache to localStorage
    saveToStorage() {
        try {
            const serialized = Array.from(this.cache.entries());
            localStorage.setItem(this.storageKey, JSON.stringify(serialized));
        } catch (error) {
            console.warn('Failed to save cache to storage:', error);
        }
    }

    // Setup automatic cleanup
    setupCleanup() {
        // Clean up expired items every 5 minutes
        setInterval(() => {
            this.clearExpired();
        }, 300000);
    }

    // Preload critical resources
    async preloadCritical() {
        if (!this.config.performance.preloadCritical) return;

        // Detect environment and use appropriate paths
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const basePath = isLocal ? '.' : '';

        const criticalResources = [
            `${basePath}/styles.css`,
            `${basePath}/script.js`,
            // Add other critical resources
        ];

        for (const resource of criticalResources) {
            try {
                const response = await fetch(resource);
                if (response.ok) {
                    const content = await response.text();
                    this.set(`preload_${resource}`, content, 3600000); // 1 hour
                }
            } catch (error) {
                console.warn(`Failed to preload ${resource}:`, error);
            }
        }
    }
}

// === ENHANCED GITHUB SERVICE ===

class GitHubService {
    constructor(config, cache) {
        this.config = config.github;
        this.cache = cache;
        this.rateLimiter = new RateLimiter(
            config.security.rateLimit.requests,
            config.security.rateLimit.window
        );
    }

    async fetchQuizContent(category, language) {
        const cacheKey = `quiz_content_${category}_${language}`;

        // Try cache first
        const cached = this.cache.get(cacheKey);
        if (cached) {
            console.log(`📋 Cache hit for ${category}/${language}`);
            return cached;
        }

        // Check rate limit
        if (!this.rateLimiter.canMakeRequest()) {
            throw new Error('Rate limit exceeded. Please try again later.');
        }

        const url = `${this.config.baseUrl}/${this.config.repo}/${this.config.branch}/quizzes/${category}/${language}/questions1.md`;

        try {
            console.log(`📡 Fetching from GitHub: ${url}`);

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

            const response = await fetch(url, {
                signal: controller.signal,
                headers: {
                    'Accept': 'text/plain',
                    'Cache-Control': 'no-cache'
                }
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`GitHub fetch failed: ${response.status}`);
            }

            const content = await response.text();

            if (content.length < 100 || content.includes('404')) {
                throw new Error('Invalid content received from GitHub');
            }

            // Cache the result
            this.cache.set(cacheKey, content);

            console.log(`✅ Successfully loaded from GitHub (${Math.round(content.length / 1024)}KB)`);
            return content;

        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('Request timeout - GitHub may be slow');
            }

            console.error('❌ Failed to load quiz content:', error);
            throw new Error(`Failed to load quiz for ${category}/${language}: ${error.message}`);
        }
    }

    async fetchWithRetry(url, options = {}, retries = this.config.retries) {
        for (let i = 0; i <= retries; i++) {
            try {
                return await fetch(url, options);
            } catch (error) {
                if (i === retries) throw error;
                console.warn(`Retry ${i + 1}/${retries} for ${url}`);
                await this.delay(Math.pow(2, i) * 1000); // Exponential backoff
            }
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// === RATE LIMITER ===

class RateLimiter {
    constructor(maxRequests, windowMs) {
        this.maxRequests = maxRequests;
        this.windowMs = windowMs;
        this.requests = [];
    }

    canMakeRequest() {
        const now = Date.now();
        this.requests = this.requests.filter(time => now - time < this.windowMs);

        if (this.requests.length >= this.maxRequests) {
            return false;
        }

        this.requests.push(now);
        return true;
    }

    getRemainingRequests() {
        const now = Date.now();
        this.requests = this.requests.filter(time => now - time < this.windowMs);
        return Math.max(0, this.maxRequests - this.requests.length);
    }

    getResetTime() {
        if (this.requests.length === 0) return 0;
        return this.requests[0] + this.windowMs;
    }
}

// === PERFORMANCE MONITOR ===

class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.startTracking();
    }

    startTracking() {
        // Track page load performance
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.trackPageLoad();
            }, 0);
        });

        // Track navigation timing
        if (window.performance && window.performance.timing) {
            window.addEventListener('load', () => {
                this.trackNavigationTiming();
            });
        }
    }

    trackPageLoad() {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
            this.metrics.pageLoad = {
                domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
                totalTime: perfData.loadEventEnd - perfData.fetchStart
            };
        }
    }

    trackNavigationTiming() {
        const timing = window.performance.timing;
        this.metrics.navigation = {
            dnsLookup: timing.domainLookupEnd - timing.domainLookupStart,
            tcpConnect: timing.connectEnd - timing.connectStart,
            serverResponse: timing.responseStart - timing.requestStart,
            pageDownload: timing.responseEnd - timing.responseStart,
            domProcessing: timing.domContentLoadedEventStart - timing.responseEnd,
            domComplete: timing.domComplete - timing.domContentLoadedEventStart
        };
    }

    trackQuizPerformance(quizData) {
        this.metrics.quiz = {
            questionsLoaded: quizData.questionCount,
            averageResponseTime: quizData.averageResponseTime,
            completionTime: quizData.completionTime,
            timestamp: Date.now()
        };
    }

    getMetrics() {
        return { ...this.metrics };
    }

    reportMetrics() {
        console.log('📊 Performance Metrics:', this.metrics);

        // Send to analytics if enabled
        if (window.InfraQuiz?.analytics?.enabled) {
            // Implementation for sending metrics to analytics service
        }
    }
}

// === INITIALIZATION ===

// Create global instances
window.InfraQuiz = window.InfraQuiz || {};
window.InfraQuiz.config = new InfraQuizConfig();
window.InfraQuiz.cache = new SmartCache(window.InfraQuiz.config);
window.InfraQuiz.github = new GitHubService(window.InfraQuiz.config, window.InfraQuiz.cache);
window.InfraQuiz.performance = new PerformanceMonitor();

// Load configuration from storage
window.InfraQuiz.config.loadFromStorage();

// Preload critical resources
window.InfraQuiz.cache.preloadCritical();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        InfraQuizConfig,
        SmartCache,
        GitHubService,
        RateLimiter,
        PerformanceMonitor
    };
}