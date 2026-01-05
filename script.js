// Heart Sparkle Effect
function createHeartSparkles() {
    const heartDivider = document.querySelector('.heart-divider span');
    if (!heartDivider) return;

    // Create sparkle particles
    for (let i = 0; i < 3; i++) {
        const sparkle = document.createElement('span');
        sparkle.className = 'heart-sparkle';
        sparkle.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 5px;
            height: 5px;
            background: radial-gradient(circle, var(--primary-color), transparent);
            border-radius: 50%;
            pointer-events: none;
            animation: sparkle${i} 3s ease-in-out infinite;
            animation-delay: ${i * 0.5}s;
        `;
        heartDivider.appendChild(sparkle);
    }

    // Add sparkle animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkle0 {
            0%, 100% { opacity: 0; transform: translate(-50%, -50%) translate(-20px, -20px) scale(0); }
            50% { opacity: 1; transform: translate(-50%, -50%) translate(-20px, -20px) scale(1); }
        }
        @keyframes sparkle1 {
            0%, 100% { opacity: 0; transform: translate(-50%, -50%) translate(20px, -20px) scale(0); }
            50% { opacity: 1; transform: translate(-50%, -50%) translate(20px, -20px) scale(1); }
        }
        @keyframes sparkle2 {
            0%, 100% { opacity: 0; transform: translate(-50%, -50%) translate(0, -28px) scale(0); }
            50% { opacity: 1; transform: translate(-50%, -50%) translate(0, -28px) scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize heart sparkles after DOM loaded
document.addEventListener('DOMContentLoaded', createHeartSparkles);

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!mainNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

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

// Music Player (playlist from /music)
const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isPlaying = false;
let playlist = [];
let currentTrack = 0;
let playlistInitialized = false;

// Danh sách file nhạc mặc định
// Bạn có thể thêm file nhạc vào thư mục /music với tên: song1.mp3, song2.mp3, ...
function getDefaultPlaylist() {
    const files = [];
    // Thử các tên file phổ biến
    for (let i = 1; i <= 5; i++) {
        files.push(`music/song${i}.mp3`);
        files.push(`music/track${i}.mp3`);
        files.push(`music/${i}.mp3`);
    }
    return files;
}

// Load playlist từ manifest.json hoặc dùng danh sách mặc định
async function loadPlaylist() {
    try {
        const res = await fetch('music/manifest.json');
        if (res.ok) {
            const list = await res.json();
            if (Array.isArray(list) && list.length) {
                playlist = list.map(p => p.startsWith('http') || p.startsWith('/') ? p : `music/${p}`);
                console.log('✅ Loaded playlist from manifest.json:', playlist.length, 'tracks');
                return;
            }
        }
    } catch (e) {
        console.log('ℹ️ No manifest.json found, using default playlist');
    }

    // Nếu không có manifest, dùng danh sách mặc định
    playlist = getDefaultPlaylist();
    console.log('ℹ️ Using default playlist:', playlist.length, 'tracks');
}

function playTrack(index) {
    if (!playlist.length) {
        console.log('⚠️ No playlist available');
        return;
    }

    currentTrack = index % playlist.length;
    const trackUrl = playlist[currentTrack];

    console.log(`🎵 Playing track ${currentTrack + 1}/${playlist.length}: ${trackUrl}`);

    music.src = trackUrl;
    music.load();

    music.play().then(() => {
        isPlaying = true;
        musicToggle.classList.remove('paused');
        musicToggle.querySelector('.music-icon').textContent = '🎵';
        console.log('✅ Playback started');
    }).catch((error) => {
        console.log('⚠️ Playback failed:', error.message);
        // Thử track tiếp theo nếu track hiện tại không load được
        if (currentTrack < playlist.length - 1) {
            console.log('Trying next track...');
            setTimeout(() => playTrack(currentTrack + 1), 500);
        }
    });
}

function nextTrack() {
    if (!playlist.length) return;
    currentTrack = (currentTrack + 1) % playlist.length;
    playTrack(currentTrack);
}

function prevTrack() {
    if (!playlist.length) return;
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    playTrack(currentTrack);
}

// Khi track kết thúc, tự động phát track tiếp theo
music.addEventListener('ended', () => {
    console.log('Track ended, playing next...');
    nextTrack();
});

// Xử lý lỗi khi load track
music.addEventListener('error', (e) => {
    console.log('❌ Error loading track:', music.src);
    // Tự động chuyển sang track tiếp theo
    setTimeout(() => nextTrack(), 500);
});

// Khởi tạo và phát nhạc khi người dùng tương tác lần đầu
let musicInitialized = false;

async function initMusic() {
    if (musicInitialized) return;
    musicInitialized = true;

    console.log('🎵 Initializing music player...');
    await loadPlaylist();

    if (playlist.length > 0) {
        playTrack(0);
    } else {
        console.log('⚠️ No music files found. Please add music files to /music folder');
    }
}

// Tự động phát nhạc khi người dùng click vào bất kỳ đâu trên trang
document.addEventListener('click', initMusic, { once: true });

// Hoặc khi scroll
document.addEventListener('scroll', initMusic, { once: true });

// Hoặc khi di chuyển chuột
document.addEventListener('mousemove', initMusic, { once: true });

// Toggle play/pause button
musicToggle.addEventListener('click', async function (e) {
    e.stopPropagation(); // Ngăn trigger init music event

    // Nếu chưa khởi tạo, khởi tạo trước
    if (!musicInitialized) {
        await initMusic();
        return;
    }

    if (isPlaying) {
        music.pause();
        musicToggle.classList.add('paused');
        musicToggle.querySelector('.music-icon').textContent = '🔇';
        isPlaying = false;
        console.log('⏸️ Music paused');
    } else {
        music.play().then(() => {
            musicToggle.classList.remove('paused');
            musicToggle.querySelector('.music-icon').textContent = '🎵';
            isPlaying = true;
            console.log('▶️ Music resumed');
        }).catch(() => {
            console.log('⚠️ Play prevented');
        });
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
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

// Google Apps Script Web App URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbythhSAuZQr2EzL65_x-u0pCznEktm5y1Gvh_B62-9ecY34HAX2YPC3aiTyXlLDDEZ5JQ/exec';

rsvpForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        attendance: document.getElementById('attendance').value,
        guests: document.getElementById('guests').value || 0,
        message: document.getElementById('message').value
    };

    // Show loading message
    formMessage.style.display = 'block';
    formMessage.className = 'form-message loading';
    formMessage.textContent = '⏳ Đang gửi xác nhận...';

    // Send data to Google Apps Script
    fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
        .then(() => {
            // Show success message
            formMessage.className = 'form-message success';
            formMessage.textContent = '✅ Cảm ơn bạn đã xác nhận! Chúng tôi rất mong được gặp bạn trong ngày trọng đại.';

            // Reset form
            rsvpForm.reset();

            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);

            console.log('✅ RSVP submitted successfully');
        })
        .catch((error) => {
            console.error('Error submitting RSVP:', error);
            formMessage.className = 'form-message error';
            formMessage.textContent = '❌ Có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ trực tiếp với chúng tôi.';

            // Hide error message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
});

// Gallery lightbox (simple version)
const galleryItems = document.querySelectorAll('.gallery-item img');
galleryItems.forEach(img => {
    img.addEventListener('click', function () {
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
        lightbox.addEventListener('click', function () {
            document.body.removeChild(lightbox);
        });
    });
});

// Parallax effect for hero
window.addEventListener('scroll', function () {
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

// Hero slider (3 images in `pic_hero/hero1.jpg`..`hero3.jpg`)
(function initHeroSlider() {
    const slides = Array.from(document.querySelectorAll('.hero-slider .slide'));
    if (!slides.length) return;

    let current = 0;
    slides.forEach((s, i) => { if (i === 0) s.classList.add('active'); });

    const show = (index) => {
        slides.forEach((s, i) => {
            s.classList.toggle('active', i === index);
        });
        current = index;
    };

    const next = () => show((current + 1) % slides.length);
    const prev = () => show((current - 1 + slides.length) % slides.length);

    // autoplay every 4s
    let timer = setInterval(next, 4000);

    // buttons
    const btnNext = document.querySelector('.slider-btn.next');
    const btnPrev = document.querySelector('.slider-btn.prev');
    if (btnNext) btnNext.addEventListener('click', () => { next(); resetTimer(); });
    if (btnPrev) btnPrev.addEventListener('click', () => { prev(); resetTimer(); });

    // pause on hover
    const heroEl = document.querySelector('.hero');
    if (heroEl) {
        heroEl.addEventListener('mouseenter', () => clearInterval(timer));
        heroEl.addEventListener('mouseleave', () => { timer = setInterval(next, 2000); });
    }

    function resetTimer() {
        clearInterval(timer);
        timer = setInterval(next, 2000);
    }
})();

// Add to Calendar Function
function addToCalendar(eventId) {
    const events = {
        'dinh-hon': {
            title: 'Lễ Định Hôn - Huy Quỳnh & Hoa Bưởi',
            location: 'Tư gia nhà gái',
            description: 'Lễ Định Hôn (Đám Hỏi) của Huy Quỳnh và Hoa Bưởi',
            start: '2025-11-30T10:00:00',
            end: '2025-11-30T12:00:00'
        },
        'vu-quy': {
            title: 'Lễ Vu Quy - Huy Quỳnh & Hoa Bưởi',
            location: 'Tư gia nhà gái',
            description: 'Lễ Vu Quy - Ngày về nhà chồng',
            start: '2026-01-17T06:00:00',
            end: '2026-01-17T09:00:00'
        },
        'thanh-hon': {
            title: 'Lễ Thành Hôn - Huy Quỳnh & Hoa Bưởi',
            location: 'Tư gia nhà trai',
            description: 'Lễ Thành Hôn - Rước dâu & Lễ gia tiên',
            start: '2026-01-24T10:00:00',
            end: '2026-01-24T13:00:00'
        },
        'tiec-cuoi': {
            title: 'Tiệc Cưới - Huy Quỳnh & Hoa Bưởi',
            location: 'Nhà Hàng Tiệc Cưới Kim Cương - Sảnh Cát Tường',
            description: 'Tiệc Mừng Thành Hôn tại Nhà Hàng Kim Cương',
            start: '2026-01-25T11:00:00',
            end: '2026-01-25T14:00:00'
        }
    };

    const event = events[eventId];
    if (!event) {
        console.error('Event not found:', eventId);
        return;
    }

    // Format dates for different calendar formats
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);

    // Google Calendar format
    const formatDateForGoogle = (date) => {
        return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatDateForGoogle(startDate)}/${formatDateForGoogle(endDate)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;

    // iCal format (for Apple Calendar, Outlook, etc.)
    const formatDateForICal = (date) => {
        return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const icalContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Huy Quỳnh & Hoa Bưởi//Wedding//EN
BEGIN:VEVENT
DTSTART:${formatDateForICal(startDate)}
DTEND:${formatDateForICal(endDate)}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;

    // Create modal to let user choose calendar type
    showCalendarModal(googleCalendarUrl, icalContent, eventId);
}

// Show calendar selection modal
function showCalendarModal(googleUrl, icalContent, eventId) {
    // Remove existing modal if any
    const existingModal = document.getElementById('calendarModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal
    const modal = document.createElement('div');
    modal.id = 'calendarModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 2rem;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.3s ease;
    `;

    modalContent.innerHTML = `
        <h3 style="margin: 0 0 1.5rem 0; font-family: var(--font-serif); color: var(--primary-color); text-align: center; font-size: 1.5rem;">
            Thêm vào lịch
        </h3>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <button class="calendar-option" data-type="google" style="
                padding: 1rem;
                border: 2px solid var(--primary-color);
                background: white;
                border-radius: 10px;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                font-family: var(--font-body);
            ">
                <span style="font-size: 1.5rem;">📅</span>
                <span style="flex: 1; text-align: left;">Google Calendar</span>
            </button>
            <button class="calendar-option" data-type="apple" style="
                padding: 1rem;
                border: 2px solid var(--primary-color);
                background: white;
                border-radius: 10px;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                font-family: var(--font-body);
            ">
                <span style="font-size: 1.5rem;">🍎</span>
                <span style="flex: 1; text-align: left;">Apple Calendar</span>
            </button>
            <button class="calendar-option" data-type="outlook" style="
                padding: 1rem;
                border: 2px solid var(--primary-color);
                background: white;
                border-radius: 10px;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                font-family: var(--font-body);
            ">
                <span style="font-size: 1.5rem;">📧</span>
                <span style="flex: 1; text-align: left;">Outlook / Office 365</span>
            </button>
            <button class="calendar-option" data-type="ics" style="
                padding: 1rem;
                border: 2px solid var(--primary-color);
                background: white;
                border-radius: 10px;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                font-family: var(--font-body);
            ">
                <span style="font-size: 1.5rem;">💾</span>
                <span style="flex: 1; text-align: left;">Tải file .ics</span>
            </button>
        </div>
        <button id="closeCalendarModal" style="
            margin-top: 1.5rem;
            padding: 0.75rem;
            width: 100%;
            border: none;
            background: #f0f0f0;
            border-radius: 10px;
            cursor: pointer;
            font-size: 1rem;
            font-family: var(--font-body);
            transition: background 0.3s ease;
        ">
            Đóng
        </button>
    `;

    // Add animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .calendar-option:hover {
            background: var(--primary-color) !important;
            color: white !important;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        #closeCalendarModal:hover {
            background: #e0e0e0 !important;
        }
    `;
    document.head.appendChild(style);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Handle calendar option clicks
    const options = modal.querySelectorAll('.calendar-option');
    options.forEach(option => {
        option.addEventListener('click', function () {
            const type = this.getAttribute('data-type');

            if (type === 'google') {
                // Open Google Calendar
                window.open(googleUrl, '_blank');
                console.log('📅 Opening Google Calendar');
            } else if (type === 'apple' || type === 'outlook' || type === 'ics') {
                // Download .ics file
                const blob = new Blob([icalContent], { type: 'text/calendar;charset=utf-8' });
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = `wedding-event-${eventId}.ics`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Show instruction message
                const msg = document.createElement('div');
                msg.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: var(--primary-color);
                    color: white;
                    padding: 1.5rem 2rem;
                    border-radius: 10px;
                    z-index: 10001;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                    text-align: center;
                    font-family: var(--font-body);
                `;
                msg.innerHTML = `
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">✅</div>
                    <div style="font-size: 1.1rem; font-weight: 500;">File đã được tải xuống!</div>
                    <div style="font-size: 0.9rem; margin-top: 0.5rem; opacity: 0.9;">Mở file để thêm vào lịch của bạn</div>
                `;
                document.body.appendChild(msg);

                setTimeout(() => {
                    msg.style.transition = 'opacity 0.3s ease';
                    msg.style.opacity = '0';
                    setTimeout(() => msg.remove(), 300);
                }, 2500);

                console.log('📅 Calendar file downloaded');
            }

            modal.remove();
        });
    });

    // Close modal
    const closeBtn = modal.querySelector('#closeCalendarModal');
    closeBtn.addEventListener('click', () => modal.remove());

    // Close on background click
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

console.log('🎉 Wedding invitation loaded successfully!');
console.log('💝 Made with love for Quỳnh & Hoa Bưởi');