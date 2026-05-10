/* === Romantic Wedding Invitation - Vanilla JS === */

// --- Preloader ---
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  setTimeout(() => pre.classList.add('fading'), 1800);
  setTimeout(() => pre.classList.add('hidden'), 2600);
});

// --- Reveal on scroll (IntersectionObserver) ---
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// --- Countdown to July 10, 2026 8:00 PM ---
const TARGET = new Date('2026-07-10T20:00:00').getTime();
const cdNums = document.querySelectorAll('#countdown .cd-num');

function pad(n) { return String(n).padStart(2, '0'); }

function tick() {
  const diff = Math.max(0, TARGET - Date.now());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const map = { d, h, m, s };
  cdNums.forEach(el => { el.textContent = pad(map[el.dataset.k]); });
}
tick();
setInterval(tick, 1000);

// --- Scroll Heart Path ---
const drawPath = document.getElementById('drawPath');
const heart = document.getElementById('heartFollower');
let pathLen = 0;

function initPath() {
  if (!drawPath) return;
  pathLen = drawPath.getTotalLength();
  drawPath.style.strokeDasharray = pathLen;
  drawPath.style.strokeDashoffset = pathLen;
  drawPath.style.transition = 'stroke-dashoffset 0.15s linear';
}

function updateHeart() {
  if (!pathLen || !drawPath || !heart) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  const drawn = pathLen * p;
  drawPath.style.strokeDashoffset = pathLen - drawn;
  const pt = drawPath.getPointAtLength(drawn);
  heart.style.left = pt.x + '%';
  heart.style.top  = (pt.y / 1000 * 100) + '%';
}

function bootPath() { initPath(); updateHeart(); }

document.addEventListener('DOMContentLoaded', bootPath);
window.addEventListener('load', () => {
  bootPath();
  // Re-measure after images/fonts settle
  setTimeout(bootPath, 300);
  setTimeout(bootPath, 1200);
});
window.addEventListener('resize', bootPath);
window.addEventListener('scroll', updateHeart, { passive: true });

// Recompute when any image finishes loading (page height changes)
document.querySelectorAll('img').forEach(img => {
  if (!img.complete) img.addEventListener('load', bootPath, { once: true });
});

// --- RSVP Toast ---
const rsvpBtn = document.querySelector('.rsvp-btn');
const rsvpToast = document.getElementById('rsvp-toast');
let toastTimeout;

if (rsvpBtn && rsvpToast) {
  rsvpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Clear existing timeout if any
    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }
    
    // Show toast
    rsvpToast.classList.add('show');
    
    // Hide toast after 4 seconds
    toastTimeout = setTimeout(() => {
      rsvpToast.classList.remove('show');
    }, 4000);
  });
}

// --- Background Music ---
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const iconPlay = musicToggle ? musicToggle.querySelector('.icon-play') : null;
const iconPause = musicToggle ? musicToggle.querySelector('.icon-pause') : null;
let userInteracted = false;

function playMusic() {
  if (bgMusic.paused) {
    bgMusic.play().then(() => {
      iconPlay.style.display = 'none';
      iconPause.style.display = 'block';
      userInteracted = true;
    }).catch((e) => {
      console.log('Audio playback failed', e);
      userInteracted = false; // allow retry
    });
  }
}

function toggleMusic() {
  if (!bgMusic.paused) {
    bgMusic.pause();
    iconPause.style.display = 'none';
    iconPlay.style.display = 'block';
  } else {
    playMusic();
  }
}

if (musicToggle && bgMusic) {
  musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    userInteracted = true;
    toggleMusic();
  });

  // Start music on first valid interaction
  const startMusicOnInteraction = () => {
    if (!userInteracted) {
      playMusic();
    }
  };

  // Modern browsers require valid user gestures (scroll does not count)
  document.addEventListener('click', startMusicOnInteraction);
  document.addEventListener('touchstart', startMusicOnInteraction);
  document.addEventListener('keydown', startMusicOnInteraction);
}
