// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('2026-01-25T11:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<h2 style="font-family: var(--font-script); font-size: 3rem;">Chúc mừng ngày trọng đại! 🎉</h2>';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Music Player
const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isPlaying = false;

// Auto play music (with user interaction required by browsers)
document.addEventListener('click', function initMusic() {
    if (!isPlaying) {
        music.play().then(() => {
            isPlaying = true;
            musicToggle.classList.remove('paused');
        }).catch(() => {
            console.log('Autoplay prevented');
        });
    }
    document.removeEventListener('click', initMusic);
}, { once: true });

musicToggle.addEventListener('click', function() {
    if (isPlaying) {
        music.pause();
        musicToggle.classList.add('paused');
        musicToggle.querySelector('.music-icon').textContent = '🔇';
    } else {
        music.play();
        musicToggle.classList.remove('paused');
        musicToggle.querySelector('.music-icon').textContent = '🎵';
    }
    isPlaying = !isPlaying;
});

// Scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.person, .event-item, .gallery-item').forEach(el => {
    observer.observe(el);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form handling
const rsvpForm = document.getElementById('rsvpForm');
const formMessage = document.getElementById('formMessage');

rsvpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        attendance: document.getElementById('attendance').value,
        guests: document.getElementById('guests').value || 0,
        message: document.getElementById('message').value
    };

    // Simulate form submission
    console.log('Form submitted:', formData);
    
    // Show success message
    formMessage.className = 'form-message success';
    formMessage.textContent = '✅ Cảm ơn bạn đã xác nhận! Chúng tôi rất mong được gặp bạn trong ngày trọng đại.';
    
    // Reset form
    rsvpForm.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);

    // In production, you would send this data to a server or Google Sheets
    // Example with Google Sheets Web App:
    /*
    fetch('YOUR_GOOGLE_SHEETS_WEB_APP_URL', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(() => {
        formMessage.className = 'form-message success';
        formMessage.textContent = '✅ Cảm ơn bạn đã xác nhận!';
        rsvpForm.reset();
    })
    .catch((error) => {
        formMessage.className = 'form-message error';
        formMessage.textContent = '❌ Có lỗi xảy ra. Vui lòng thử lại!';
    });
    */
});

// Gallery lightbox (simple version)
const galleryItems = document.querySelectorAll('.gallery-item img');
galleryItems.forEach(img => {
    img.addEventListener('click', function() {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
        `;
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = this.src;
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
        `;
        
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);
        
        // Close lightbox on click
        lightbox.addEventListener('click', function() {
            document.body.removeChild(lightbox);
        });
    });
});

// Parallax effect for hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 700);
    }
});

// Add entrance animation to sections on scroll
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(section);
});

// Prevent hero animation on initial load
document.querySelector('.hero').style.opacity = '1';
document.querySelector('.hero').style.transform = 'translateY(0)';

console.log('🎉 Wedding invitation loaded successfully!');
console.log('💝 Made with love for Quỳnh & Hoa Bưởi');