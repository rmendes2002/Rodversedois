// ========================
// Sobre Page Entry Animation
// ========================
window.initSobre = function () {
    // Select elements to animate
    const overline = document.querySelector('.about-overline');
    const title = document.querySelector('.about-title');
    const videoBlock = document.querySelector('.about-column-left');
    const storySections = document.querySelectorAll('.story-section');

    // Create a GSAP Timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Reveal overline and title slightly offset
    if (overline && title) {
        tl.fromTo(overline,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 },
            0.1 // start after small delay
        )
            .fromTo(title,
                { y: 40, opacity: 0, rotationX: -20 },
                { y: 0, opacity: 1, rotationX: 0, duration: 1.2, transformPerspective: 800 },
                "-=0.5" // overlap
            );
    }

    // 2. Reveal video container floating up
    if (videoBlock) {
        tl.fromTo(videoBlock,
            { y: 60, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.1)" },
            "-=0.7"
        );
    }

    // 3. Stagger the paragraphs on the right
    if (storySections.length > 0) {
        tl.fromTo(storySections,
            { x: 30, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, stagger: 0.2 },
            "-=1"
        );
    }
};

// Also init on direct page load
document.addEventListener('DOMContentLoaded', () => {
    // Check if we are physically on the about page wrapper
    const container = document.querySelector('[data-barba-namespace="sobre"]');
    if (container) {
        window.initSobre();
    }
});
