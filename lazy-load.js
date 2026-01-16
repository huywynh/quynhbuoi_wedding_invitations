/**
 * Lazy Loading System cho Wedding Website
 * Load thumbnails trước, chỉ load hình gốc khi cần
 */

class LazyImageLoader {
    constructor() {
        this.images = [];
        this.lightboxImages = new Map(); // Cache hình gốc cho lightbox
        this.init();
    }

    init() {
        // Tìm tất cả hình có thuộc tính data-src
        this.images = document.querySelectorAll('img[data-src]');

        // Sử dụng Intersection Observer để lazy load
        if ('IntersectionObserver' in window) {
            this.observeImages();
        } else {
            // Fallback cho trình duyệt cũ
            this.loadAllImages();
        }
    }

    observeImages() {
        const options = {
            root: null,
            rootMargin: '50px', // Load trước 50px khi sắp vào viewport
            threshold: 0.01
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, options);

        this.images.forEach(img => observer.observe(img));
    }

    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) return;

        // Tạo hình mới để preload
        const tempImg = new Image();

        tempImg.onload = () => {
            img.src = src;
            img.classList.add('loaded');
            img.removeAttribute('data-src');
        };

        tempImg.onerror = () => {
            console.error('Lỗi load hình:', src);
            img.classList.add('error');
        };

        tempImg.src = src;
    }

    loadAllImages() {
        // Fallback: load tất cả hình
        this.images.forEach(img => this.loadImage(img));
    }

    /**
     * Load hình gốc cho lightbox
     * @param {string} thumbnailSrc - Đường dẫn thumbnail
     * @returns {Promise<string>} - Đường dẫn hình gốc
     */
    loadOriginalForLightbox(thumbnailSrc) {
        // Chuyển từ thumbnail path sang original path
        const originalSrc = thumbnailSrc.replace('/thumbs/', '/');

        // Nếu đã cache, return luôn
        if (this.lightboxImages.has(originalSrc)) {
            return Promise.resolve(originalSrc);
        }

        // Preload hình gốc
        return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = () => {
                this.lightboxImages.set(originalSrc, true);
                resolve(originalSrc);
            };

            img.onerror = () => {
                console.error('Lỗi load hình gốc:', originalSrc);
                reject(new Error('Failed to load original image'));
            };

            img.src = originalSrc;
        });
    }
}

// Khởi tạo lazy loader khi DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.lazyLoader = new LazyImageLoader();
    });
} else {
    window.lazyLoader = new LazyImageLoader();
}

/**
 * Helper function để load hình gốc cho lightbox
 * Sử dụng trong gallery và event-details
 */
window.loadOriginalImage = function (thumbnailSrc) {
    if (window.lazyLoader) {
        return window.lazyLoader.loadOriginalForLightbox(thumbnailSrc);
    }
    // Fallback
    return Promise.resolve(thumbnailSrc.replace('/thumbs/', '/'));
};
