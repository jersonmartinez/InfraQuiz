// === INFRAQUIZ ACCESSIBILITY UTILITIES ===

// Accessibility Utilities Class
class AccessibilityUtils {
    constructor() {
        this.announcer = null;
        this.focusStack = [];
        this.initialized = false;
    }

    // Initialize accessibility features
    init() {
        if (this.initialized) return;
        this.createAnnouncer();
        this.setupKeyboardNavigation();
        this.setupMediaQueryListeners();
        this.setupFocusManagement();
        this.initialized = true;
    }

    // Create screen reader announcer
    createAnnouncer() {
        this.announcer = document.createElement('div');
        this.announcer.setAttribute('aria-live', 'polite');
        this.announcer.setAttribute('aria-atomic', 'true');
        this.announcer.className = 'sr-only accessibility-announcer';
        this.announcer.id = 'accessibility-announcer';
        document.body.appendChild(this.announcer);
    }

    // Announce message to screen readers
    announce(message, priority = 'polite') {
        if (!this.announcer) return;

        this.announcer.setAttribute('aria-live', priority);
        this.announcer.textContent = message;

        // Clear after announcement
        setTimeout(() => {
            this.announcer.textContent = '';
        }, 1000);
    }

    // Setup keyboard navigation enhancements
    setupKeyboardNavigation() {
        // Enhanced tab navigation
        document.addEventListener('keydown', (e) => {
            // Skip to main content with Ctrl+Home
            if (e.ctrlKey && e.key === 'Home') {
                e.preventDefault();
                const mainContent = document.getElementById('main-content');
                if (mainContent) {
                    mainContent.focus();
                    mainContent.scrollIntoView();
                    this.announce('Skipped to main content');
                }
            }

            // Enhanced navigation for quiz cards
            if (e.key === 'Enter' && e.target.classList.contains('quiz-card')) {
                e.preventDefault();
                const firstButton = e.target.querySelector('.difficulty-btn');
                if (firstButton) {
                    firstButton.click();
                }
            }
        });

        // Focus visible enhancement
        document.addEventListener('focusin', (e) => {
            // Add focus-visible class for better focus indicators
            e.target.classList.add('focus-visible');
        });

        document.addEventListener('focusout', (e) => {
            document.querySelectorAll('.focus-visible').forEach(el => {
                el.classList.remove('focus-visible');
            });
        });
    }

    // Setup media query listeners for accessibility preferences
    setupMediaQueryListeners() {
        // High contrast mode
        const contrastQuery = window.matchMedia('(prefers-contrast: high)');
        contrastQuery.addEventListener('change', (e) => {
            document.body.classList.toggle('high-contrast-mode', e.matches);
            this.announce(e.matches ? 'High contrast mode enabled' : 'High contrast mode disabled');
        });

        // Reduced motion
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        motionQuery.addEventListener('change', (e) => {
            document.body.classList.toggle('reduced-motion', e.matches);
            this.announce(e.matches ? 'Reduced motion enabled' : 'Reduced motion disabled');
        });

        // Color scheme preference
        const colorQuery = window.matchMedia('(prefers-color-scheme: dark)');
        colorQuery.addEventListener('change', (e) => {
            if (window.InfraQuiz?.config?.ui?.theme === 'auto') {
                this.announce(e.matches ? 'System prefers dark mode' : 'System prefers light mode');
            }
        });

        // Initialize current states
        document.body.classList.toggle('high-contrast-mode', contrastQuery.matches);
        document.body.classList.toggle('reduced-motion', motionQuery.matches);
    }

    // Setup focus management for dynamic content
    setupFocusManagement() {
        // Trap focus in modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const modal = document.querySelector('.modal.show, .offcanvas.show');
                if (modal) {
                    this.trapFocus(modal, e);
                }
            }
        });

        // Restore focus when modals close
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.removedNodes.forEach((node) => {
                        if (node.classList && node.classList.contains('modal')) {
                            this.restoreFocus();
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Trap focus within an element
    trapFocus(container, event) {
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
            if (document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    }

    // Save and restore focus
    saveFocus() {
        this.focusStack.push(document.activeElement);
    }

    restoreFocus() {
        const element = this.focusStack.pop();
        if (element && element.focus) {
            element.focus();
        }
    }

    // Generate unique IDs for accessibility
    generateId(prefix = 'a11y') {
        return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    // Set up ARIA relationships
    setAriaRelationship(element, relationship, targetId) {
        element.setAttribute(`aria-${relationship}`, targetId);
    }

    // Create ARIA labelled by relationship
    labelBy(element, labelElement) {
        const labelId = labelElement.id || this.generateId('label');
        if (!labelElement.id) {
            labelElement.id = labelId;
        }
        element.setAttribute('aria-labelledby', labelId);
    }

    // Create ARIA described by relationship
    describeBy(element, descriptionElement) {
        const descId = descriptionElement.id || this.generateId('desc');
        if (!descriptionElement.id) {
            descriptionElement.id = descId;
        }
        element.setAttribute('aria-describedby', descId);
    }

    // Check if element is visible to screen readers
    isScreenReaderVisible(element) {
        const style = window.getComputedStyle(element);
        return style.display !== 'none' &&
               style.visibility !== 'hidden' &&
               element.getAttribute('aria-hidden') !== 'true';
    }

    // Make element screen reader only
    makeScreenReaderOnly(element) {
        element.classList.add('sr-only');
        element.setAttribute('aria-hidden', 'false');
    }

    // Hide element from screen readers
    hideFromScreenReader(element) {
        element.setAttribute('aria-hidden', 'true');
    }

    // Set up live region for dynamic content
    createLiveRegion(politeness = 'polite') {
        const region = document.createElement('div');
        region.setAttribute('aria-live', politeness);
        region.setAttribute('aria-atomic', 'true');
        region.className = 'sr-only live-region';
        document.body.appendChild(region);
        return region;
    }

    // Update live region content
    updateLiveRegion(region, content) {
        region.textContent = content;
    }

    // Validate accessibility of an element
    validateAccessibility(element) {
        const issues = [];

        // Check for alt text on images
        if (element.tagName === 'IMG' && !element.alt) {
            issues.push('Image missing alt text');
        }

        // Check for labels on form elements
        if (['INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName)) {
            const hasLabel = element.labels && element.labels.length > 0;
            const hasAriaLabel = element.getAttribute('aria-label');
            const hasAriaLabelledBy = element.getAttribute('aria-labelledby');

            if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) {
                issues.push('Form element missing label');
            }
        }

        // Check for heading hierarchy
        if (element.tagName.match(/^H[1-6]$/)) {
            const level = parseInt(element.tagName.charAt(1));
            const prevHeading = this.findPreviousHeading(element);
            if (prevHeading) {
                const prevLevel = parseInt(prevHeading.tagName.charAt(1));
                if (level > prevLevel + 1) {
                    issues.push(`Heading level skipped from h${prevLevel} to h${level}`);
                }
            }
        }

        return issues;
    }

    // Find previous heading element
    findPreviousHeading(element) {
        let sibling = element.previousElementSibling;
        while (sibling) {
            if (sibling.tagName.match(/^H[1-6]$/)) {
                return sibling;
            }
            sibling = sibling.previousElementSibling;
        }
        return null;
    }

    // Get accessibility summary
    getAccessibilitySummary() {
        const summary = {
            imagesWithoutAlt: document.querySelectorAll('img:not([alt])').length,
            formElementsWithoutLabels: document.querySelectorAll('input:not([aria-label]):not([aria-labelledby]), select:not([aria-label]):not([aria-labelledby]), textarea:not([aria-label]):not([aria-labelledby])').length,
            headings: document.querySelectorAll('h1, h2, h3, h4, h5, h6').length,
            buttonsWithoutAriaLabel: document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])').length,
            linksWithoutAriaLabel: document.querySelectorAll('a:not([aria-label]):not([aria-labelledby])').length
        };

        return summary;
    }

    // Export accessibility report
    exportAccessibilityReport() {
        const summary = this.getAccessibilitySummary();
        const report = {
            timestamp: new Date().toISOString(),
            url: window.location.href,
            summary,
            recommendations: this.generateRecommendations(summary)
        };

        console.table(summary);
        console.log('Accessibility Report:', report);

        return report;
    }

    // Generate accessibility recommendations
    generateRecommendations(summary) {
        const recommendations = [];

        if (summary.imagesWithoutAlt > 0) {
            recommendations.push(`${summary.imagesWithoutAlt} images are missing alt text`);
        }

        if (summary.formElementsWithoutLabels > 0) {
            recommendations.push(`${summary.formElementsWithoutLabels} form elements are missing labels`);
        }

        if (summary.buttonsWithoutAriaLabel > 0) {
            recommendations.push(`${summary.buttonsWithoutAriaLabel} buttons are missing aria-label or aria-labelledby`);
        }

        if (summary.linksWithoutAriaLabel > 0) {
            recommendations.push(`${summary.linksWithoutAriaLabel} links are missing aria-label or aria-labelledby`);
        }

        return recommendations;
    }
}

// Create global instance
window.AccessibilityUtils = new AccessibilityUtils();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.AccessibilityUtils.init();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AccessibilityUtils;
}