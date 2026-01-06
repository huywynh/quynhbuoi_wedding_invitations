// Music Player with State Persistence
const musicPlayer = {
    audio: null,
    toggleBtn: null,
    isPlaying: false,
    playlist: [],
    currentTrack: 0,
    initialized: false,
    storageKey: 'wedding_music_state',

    async init() {
        if (this.initialized) return;

        this.audio = document.getElementById('bgMusic');
        this.toggleBtn = document.getElementById('musicToggle');

        if (!this.audio || !this.toggleBtn) {
            console.log('⚠️ Music elements not found');
            return;
        }

        // Load playlist
        await this.loadPlaylist();

        // Restore state from localStorage
        this.restoreState();

        // Bind events
        this.bindEvents();

        this.initialized = true;
        console.log('🎵 Music player initialized');
    },

    getDefaultPlaylist() {
        const files = [];
        for (let i = 1; i <= 5; i++) {
            files.push(`music/song${i}.mp3`);
            files.push(`music/track${i}.mp3`);
            files.push(`music/${i}.mp3`);
        }
        return files;
    },

    async loadPlaylist() {
        try {
            const res = await fetch('music/manifest.json');
            if (res.ok) {
                const list = await res.json();
                if (Array.isArray(list) && list.length) {
                    this.playlist = list.map(p => p.startsWith('http') || p.startsWith('/') ? p : `music/${p}`);
                    // console.log('✅ Loaded playlist:', this.playlist.length);
                    return;
                }
            }
        } catch (e) {
            // console.log('ℹ️ Default playlist used');
        }
        this.playlist = this.getDefaultPlaylist();
    },

    restoreState() {
        try {
            const savedState = localStorage.getItem(this.storageKey);
            if (savedState) {
                const state = JSON.parse(savedState);
                if (state) {
                    this.currentTrack = state.currentTrack || 0;
                    this.audio.src = this.playlist[this.currentTrack];
                    this.audio.currentTime = state.currentTime || 0;

                    if (state.isPlaying) {
                        this.play(false); // Don't reset time
                    } else {
                        // Just set UI to paused
                        this.updateUI(false);
                    }
                    console.log('🔄 Restored music state', state);
                }
            } else if (this.playlist.length > 0) {
                // First visit - prepare audio but don't autoplay (browser blocks it)
                this.audio.src = this.playlist[0];
                this.updateUI(false);
                console.log('🎵 Music ready - click button to play');
            }
        } catch (e) {
            console.error('Error restoring state:', e);
        }
    },

    saveState() {
        if (!this.audio) return;
        const state = {
            currentTime: this.audio.currentTime,
            isPlaying: !this.audio.paused,
            currentTrack: this.currentTrack,
            timestamp: Date.now()
        };
        localStorage.setItem(this.storageKey, JSON.stringify(state));
    },

    play(resetTime = true) {
        if (!this.playlist.length) return;

        if (resetTime && this.audio.src !== this.playlist[this.currentTrack]) {
            this.audio.src = this.playlist[this.currentTrack];
            this.audio.load();
        }

        const playPromise = this.audio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                this.isPlaying = true;
                this.updateUI(true);
            }).catch(error => {
                console.log('⚠️ Autoplay prevented or failed:', error);
                this.isPlaying = false;
                this.updateUI(false);
            });
        }
    },

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.updateUI(false);
        this.saveState();
    },

    toggle() {
        if (this.audio.paused) {
            this.play(false);
        } else {
            this.pause();
        }
    },

    nextTrack() {
        this.currentTrack = (this.currentTrack + 1) % this.playlist.length;
        this.audio.src = this.playlist[this.currentTrack];
        this.play(true);
    },

    updateUI(isPlaying) {
        if (!this.toggleBtn) return;
        if (isPlaying) {
            this.toggleBtn.classList.remove('paused');
            this.toggleBtn.querySelector('.music-icon').textContent = '🎵';
        } else {
            this.toggleBtn.classList.add('paused');
            this.toggleBtn.querySelector('.music-icon').textContent = '🔇';
        }
    },

    bindEvents() {
        // Toggle button
        this.toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
            // Remove pulse animation after first click
            this.toggleBtn.classList.remove('pulse');
        });

        // Track ended
        this.audio.addEventListener('ended', () => {
            this.nextTrack();
        });

        // Save state on unload
        window.addEventListener('beforeunload', () => {
            this.saveState();
        });

        // Auto-save periodically just in case of crash/mobile switch
        setInterval(() => {
            if (!this.audio.paused) this.saveState();
        }, 3000);

        // Add pulse animation to music button on page load to attract attention
        setTimeout(() => {
            if (this.audio.paused && this.playlist.length > 0) {
                this.toggleBtn.classList.add('pulse');
            }
        }, 2000);

        // Auto-play music on ANY user interaction (click, scroll, touch, swipe)
        this.setupAutoPlayOnInteraction();
    },

    setupAutoPlayOnInteraction() {
        let hasInteracted = false;

        const tryAutoPlay = (eventType) => {
            console.log(`🎯 User interaction detected: ${eventType}`);

            if (hasInteracted) {
                console.log('⏭️ Already interacted, skipping');
                return;
            }

            console.log(`🔍 Audio paused: ${this.audio.paused}, Playlist length: ${this.playlist.length}`);

            // Auto-play if music is paused and we have playlist
            // ALWAYS play on first interaction, regardless of saved state
            if (this.audio.paused && this.playlist.length > 0) {
                this.play(false);
                this.toggleBtn.classList.remove('pulse');
                hasInteracted = true;
                console.log('🎵 Auto-playing music after user interaction');
            } else {
                console.log('❌ Cannot auto-play - audio already playing or no playlist');
            }
        };

        // Desktop events - wrap in arrow function to pass event type
        document.addEventListener('click', () => tryAutoPlay('click'), { once: true, passive: true });
        document.addEventListener('scroll', () => tryAutoPlay('scroll'), { once: true, passive: true });
        document.addEventListener('wheel', () => tryAutoPlay('wheel'), { once: true, passive: true });
        document.addEventListener('keydown', () => tryAutoPlay('keydown'), { once: true, passive: true });

        // Mobile/Touch events
        document.addEventListener('touchstart', () => tryAutoPlay('touchstart'), { once: true, passive: true });
        document.addEventListener('touchmove', () => tryAutoPlay('touchmove'), { once: true, passive: true });

        // Mobile orientation change
        window.addEventListener('orientationchange', () => tryAutoPlay('orientationchange'), { once: true, passive: true });

        console.log('✅ Auto-play interaction listeners registered');
    }
};

// Initialize after DOM load
document.addEventListener('DOMContentLoaded', () => {
    musicPlayer.init();
});
