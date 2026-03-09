// audio.js - Zero-latency Generative UI Sounds using Web Audio API

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function unlockAudio() {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

// Unlock audio context on first user interaction
document.addEventListener('click', unlockAudio, { once: true });
document.addEventListener('touchstart', unlockAudio, { once: true });

function playHoverSound() {
    if (audioCtx.state === 'suspended') return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    // Very soft, high-pitched "tick"
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.03);

    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.015, audioCtx.currentTime + 0.01); // Very quiet: 0.015 volume
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.04);
}

function playClickSound() {
    if (audioCtx.state === 'suspended') return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    // Slightly lower, punchier "thock"
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.06);

    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 0.01); // Slightly louder: 0.04 volume
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.07);
}

window.initAudio = function () {
    // Select all interactive elements
    const interactables = document.querySelectorAll('a, button, .project-card, .theme-slider, .social-link');

    interactables.forEach(el => {
        // Prevent double binding during SPA transitions
        if (el.dataset.audioBound) return;
        el.dataset.audioBound = 'true';

        el.addEventListener('mouseenter', () => {
            playHoverSound();
        });

        el.addEventListener('click', () => {
            playClickSound();
        });
    });
};

// Initialize on first load
document.addEventListener('DOMContentLoaded', window.initAudio);
