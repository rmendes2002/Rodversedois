// Manage global event listeners for Barba.js cleanup
window._activeEventListeners = window._activeEventListeners || [];

window.addTrackedEventListener = function (element, event, handler) {
    element.addEventListener(event, handler);
    window._activeEventListeners.push({ element, event, handler });
};

// Data-Scramble Effect Utility
const scrambleChars = '!<>-_\\\\/[]{}—=+*^M@#01X';
function scrambleText(element, duration = 1.2) {
    if (!element || element.dataset.scrambling === 'true') return;
    element.dataset.scrambling = 'true';

    const originalText = element.textContent;
    const rawText = originalText.trim();
    let frame = 0;
    const totalFrames = Math.round((duration * 1000) / 30); // ~30fps 

    const queue = [];
    for (let i = 0; i < rawText.length; i++) {
        if (rawText[i] === ' ') {
            queue.push({ char: ' ', start: 0, end: 0 });
        } else {
            const start = Math.floor(Math.random() * (totalFrames * 0.4));
            const end = start + Math.floor(Math.random() * (totalFrames * 0.6));
            queue.push({ char: rawText[i], start, end });
        }
    }

    const update = () => {
        let output = '';
        let complete = 0;

        for (let i = 0; i < queue.length; i++) {
            let { char, start, end } = queue[i];

            if (frame >= end) {
                complete++;
                output += char;
            } else if (frame >= start) {
                if (char === ' ') {
                    output += ' ';
                } else {
                    const randomChar = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                    output += randomChar;
                }
            } else {
                output += ''; // Invisible
            }
        }

        element.textContent = output;

        if (complete === queue.length) {
            element.textContent = originalText;
            delete element.dataset.scrambling;
        } else {
            frame++;
            requestAnimationFrame(update);
        }
    };

    update();
}

function initGlobalScripts() {
    // Parallax effect on hero content with mouse move
    const heroContent = document.querySelector('.hero-text-content');

    // Remove old listeners to prevent duplication on Barba navigation
    const parallaxHandler = (e) => {
        if (!heroContent) return;
        const x = (e.clientX - window.innerWidth / 2) * 0.02;
        const y = (e.clientY - window.innerHeight / 2) * 0.02;
        heroContent.style.transform = `translate(${x}px, ${y}px)`;
    };

    document.removeEventListener('mousemove', window._parallaxHandler);
    window._parallaxHandler = parallaxHandler;
    addTrackedEventListener(document, 'mousemove', parallaxHandler);

    // Button click effect (ripple or subtle scale)
    const buttons = document.querySelectorAll('button, .cta-primary');
    buttons.forEach(btn => {
        addTrackedEventListener(btn, 'mousedown', () => btn.style.transform = 'scale(0.96)');
        addTrackedEventListener(btn, 'mouseup', () => btn.style.transform = '');
        addTrackedEventListener(btn, 'mouseleave', () => btn.style.transform = '');
    });

    // --- Liquid Hover Effect on Headline ---
    const headlineLines = document.querySelectorAll('.headline span');

    // Trigger Scramble on Load
    headlineLines.forEach((line, index) => {
        // Delay slightly on first load so the page can fade in first
        setTimeout(() => scrambleText(line, 1.5), 500 + (index * 400));
    });

    const headline = document.querySelector('.headline');
    const displacementMap = document.querySelector('#liquid-displacement');
    if (headline && displacementMap) {
        // Apply filter via CSS strictly during JS setup
        headline.style.filter = 'url(#liquid-melt)';

        let meltTween;
        addTrackedEventListener(headline, 'mouseenter', () => {
            if (meltTween) meltTween.kill();
            // Start morphing the displacement map scale to simulate melting
            meltTween = gsap.to(displacementMap, {
                attr: { scale: 35 },
                duration: 0.8,
                ease: "power2.out"
            });
            // We also blur slightly and tint the opacity to make the edges look genuinely liquid
            gsap.to(headline, { opacity: 0.8, duration: 0.8, filter: 'url(#liquid-melt) blur(2px)' });
        });

        addTrackedEventListener(headline, 'mouseleave', () => {
            if (meltTween) meltTween.kill();
            // Solidify back to crisp text
            meltTween = gsap.to(displacementMap, {
                attr: { scale: 0 },
                duration: 1.2,
                ease: "elastic.out(1, 0.3)"
            });
            gsap.to(headline, { opacity: 1, duration: 1.2, filter: 'url(#liquid-melt) blur(0px)' });
        });
    }

    // --- Video Reel Modal Logic ---
    const reelBtn = document.querySelector('.cta-secondary');
    const reelModal = document.getElementById('reelModal');

    if (reelBtn && reelModal) {
        const closeBtn = reelModal.querySelector('.reel-modal-close');
        const videoContainer = reelModal.querySelector('.reel-video-container');
        const backdrop = reelModal.querySelector('.reel-modal-backdrop');

        const vimeoUrl = "https://player.vimeo.com/video/1170035596?autoplay=1&title=0&byline=0&portrait=0";

        function openReelModal(e) {
            if (e) e.preventDefault();
            videoContainer.innerHTML = `<iframe src="${vimeoUrl}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
            reelModal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Hide Navbar ONLY on mobile
            if (typeof gsap !== 'undefined' && window.innerWidth <= 768) {
                gsap.to('#persistent-navbar', { y: -100, opacity: 0, duration: 0.4, ease: "power2.inOut" });
            }
        }

        function closeReelModal() {
            // Show Navbar ONLY on mobile
            if (typeof gsap !== 'undefined' && window.innerWidth <= 768) {
                gsap.to('#persistent-navbar', { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", delay: 0.2 });
            }

            reelModal.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                videoContainer.innerHTML = '';
            }, 400);
        }

        reelBtn.removeEventListener('click', openReelModal);
        reelBtn.addEventListener('click', openReelModal);

        closeBtn.removeEventListener('click', closeReelModal);
        addTrackedEventListener(closeBtn, 'click', closeReelModal);

        backdrop.removeEventListener('click', closeReelModal);
        addTrackedEventListener(backdrop, 'click', closeReelModal);

        const escHandler = (e) => {
            if (e.key === 'Escape' && reelModal.classList.contains('active')) {
                closeReelModal();
            }
        };
        addTrackedEventListener(document, 'keydown', escHandler);
    }
}

// ========================
// Theme Manager
// ========================
function initThemeManager() {
    const toggleCheckbox = document.getElementById('theme-toggle-checkbox');
    if (!toggleCheckbox) return;

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', currentTheme);
    toggleCheckbox.checked = currentTheme === 'dark';

    const bgVideo = document.getElementById('bg-video');
    const bgVideoDark = document.getElementById('bg-video-dark');
    const logoImg = document.querySelector('.logo-img');

    // Helper to switch logo source
    const applyLogo = (theme) => {
        if (!logoImg) return;
        if (theme === 'dark') {
            logoImg.src = 'assets/images/logo.webp';
        } else {
            logoImg.src = 'assets/images/logo-light.webp';
        }
    };

    // Initial state setup for video and logo
    applyLogo(currentTheme);
    if (currentTheme === 'dark') {
        if (bgVideoDark) bgVideoDark.play().catch(e => console.log('Autoplay prevented', e));
    } else {
        if (bgVideo) bgVideo.play().catch(e => console.log('Autoplay prevented', e));
    }

    // Remove existing listener to avoid duplicates if re-initialized
    if (toggleCheckbox._themeListenerAttached) return;

    toggleCheckbox.addEventListener('change', (e) => {
        const targetTheme = e.target.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', targetTheme);
        localStorage.setItem('theme', targetTheme);

        if (targetTheme === 'dark') {
            if (logoImg) logoImg.src = 'assets/images/logo.webp';
            if (bgVideoDark && bgVideoDark.paused) bgVideoDark.play().catch(e => console.log('Autoplay prevented', e));
        } else {
            if (logoImg) logoImg.src = 'assets/images/logo-light.webp';
            if (bgVideo && bgVideo.paused) bgVideo.play().catch(e => console.log('Autoplay prevented', e));
        }
    });
    toggleCheckbox._themeListenerAttached = true;
}

// ========================
// Active Nav Link Manager
// ========================
function updateActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('#persistent-navbar .nav-links a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href').split('#')[0]; // strip hash
        link.classList.remove('active');
        if (href === currentPath) {
            link.classList.add('active');
        }
    });
}

// ========================
// Mobile Cinematic Menu
// ========================
function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const overlay = document.getElementById('mobileMenu');

    if (!toggleBtn || !overlay) return;

    // We only attach this once per session since elements persist outside Barba
    if (toggleBtn._menuListenerAttached) return;

    toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('active');
        overlay.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (overlay.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking outside the links (on the blur itself)
    overlay.addEventListener('click', (e) => {
        if (e.target.classList.contains('mobile-menu-overlay') || e.target.classList.contains('mobile-menu-content')) {
            toggleBtn.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    toggleBtn._menuListenerAttached = true;
}

// ========================
// Barba.js SPA Transitions
// ========================
function initBarba() {
    if (typeof barba === 'undefined') return;

    barba.init({
        preventRunning: true,
        // Prevent Barba from handling hash-only links
        prevent: ({ el }) => {
            const href = el.getAttribute('href');
            if (!href) return true;
            if (href.startsWith('#')) return true;
            // Allow links to other pages, even with hashes
            return false;
        },
        transitions: [{
            name: 'fade',
            beforeLeave() {
                // CLEANUP MEMORY LEAKS BEFORE TRANSITION
                if (window._activeEventListeners) {
                    window._activeEventListeners.forEach(({ element, event, handler }) => {
                        if (element && typeof element.removeEventListener === 'function') {
                            element.removeEventListener(event, handler);
                        }
                    });
                    window._activeEventListeners = [];
                }

                // FORCE CLOSE MOBILE MENU ON NAVIGATION
                const mobileToggle = document.querySelector('.mobile-menu-toggle');
                const mobileOverlay = document.getElementById('mobileMenu');
                if (mobileToggle) mobileToggle.classList.remove('active');
                if (mobileOverlay) mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';

                // CLEANUP GSAP SCROLLTRIGGERS
                if (typeof ScrollTrigger !== 'undefined') {
                    ScrollTrigger.getAll().forEach(t => t.kill());
                }
            },
            leave(data) {
                return gsap.to(data.current.container, {
                    opacity: 0,
                    y: -20,
                    duration: 0.4,
                    ease: "power2.in"
                });
            },
            afterLeave(data) {
                // Scroll to top between pages
                window.scrollTo(0, 0);

                // Load page-specific CSS
                const nextHtml = data.next.html;
                const parser = new DOMParser();
                const doc = parser.parseFromString(nextHtml, 'text/html');
                const nextLinks = doc.querySelectorAll('link[rel="stylesheet"]');

                nextLinks.forEach(newLink => {
                    const href = newLink.getAttribute('href');
                    // Check if this stylesheet is already loaded
                    const existing = document.querySelector(`link[href="${href}"]`);
                    if (!existing) {
                        const linkEl = document.createElement('link');
                        linkEl.rel = 'stylesheet';
                        linkEl.href = href;
                        document.head.appendChild(linkEl);
                    }
                });

                // Update body class
                const nextBody = doc.querySelector('body');
                document.body.className = nextBody ? nextBody.className : '';
            },
            enter(data) {
                // Update active nav link
                updateActiveNavLink();

                return gsap.fromTo(data.next.container,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1, y: 0,
                        duration: 0.5,
                        ease: "power2.out",
                        onComplete: () => {
                            gsap.set(data.next.container, { clearProps: "transform" });
                            // Re-initialize page-specific scripts
                            initGlobalScripts();
                            if (typeof window.initAudio === 'function') {
                                window.initAudio();
                            }
                            if (typeof window.initLanguageToggle === 'function') {
                                window.initLanguageToggle();
                            }
                            if (typeof window.initProjetos === 'function' && data.next.namespace === 'projetos') {
                                window.initProjetos();
                            }
                            if (typeof window.initSobre === 'function' && data.next.namespace === 'sobre') {
                                window.initSobre();
                            }
                        }
                    }
                );
            }
        }]
    });
}

// ========================
// Initialize on first load
// ========================
document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // DEVICE DETECTION
    // =============================================
    initThemeManager();
    initMobileMenu();
    initGlobalScripts();
    updateActiveNavLink();
    initBarba();
});
