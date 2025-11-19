/**
 * Application Initialization Script
 * Handles global event listeners, service worker registration, and performance monitoring
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Register Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            // Detect environment and use appropriate path
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const swPath = isLocal ? './sw.js' : '/sw.js';

            navigator.serviceWorker.register(swPath)
                .then(function (registration) {
                    console.log('✅ Service Worker registered with scope:', registration.scope);

                    // Check for updates
                    registration.addEventListener('updatefound', function () {
                        const newWorker = registration.installing;
                        if (newWorker) {
                            newWorker.addEventListener('statechange', function () {
                                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                    // Show update notification
                                    showUpdateNotification();
                                }
                            });
                        }
                    });
                })
                .catch(function (error) {
                    console.warn('❌ Service Worker registration failed:', error);
                });
        });
    }

    // Monitor Core Web Vitals
    if ('web-vitals' in window) {
        import('https://unpkg.com/web-vitals@3.1.1/dist/web-vitals.es5.min.js').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
            getCLS(console.log);
            getFID(console.log);
            getFCP(console.log);
            getLCP(console.log);
            getTTFB(console.log);
        });
    }

    // Monitor page load performance
    window.addEventListener('load', function () {
        if ('performance' in window && 'getEntriesByType' in performance) {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                const loadTime = perfData.loadEventEnd - perfData.fetchStart;
                console.log(`📊 Page load time: ${Math.round(loadTime)}ms`);
            }
        }
    });

    // Global error handler
    window.addEventListener('error', function (e) {
        console.error('💥 Global error:', e.error);
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', function (e) {
        console.error('💥 Unhandled promise rejection:', e.reason);
    });

    // Network status monitoring
    window.addEventListener('online', function () {
        console.log('🌐 Connection restored');
        showNetworkStatus('Connection restored', 'success');
    });

    window.addEventListener('offline', function () {
        console.log('📴 Connection lost');
        showNetworkStatus('You are offline', 'warning');
    });
});

function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.className = 'alert alert-info alert-dismissible fade show position-fixed';
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 300px;';
    notification.innerHTML = `
        <strong>Update Available!</strong> Refresh to get the latest version.
        <button class="btn btn-sm btn-primary ms-2" onclick="window.location.reload()">Refresh</button>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(notification);
}

function showNetworkStatus(message, type) {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed`;
    notification.style.cssText = 'top: 20px; left: 20px; z-index: 9999; max-width: 300px;';
    notification.innerHTML = `
        <i class="bi bi-${type === 'success' ? 'wifi' : 'wifi-off'} me-2"></i>
        ${message}
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}
