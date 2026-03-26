/* ═══════════════════════════════════════════════════
   PORTFOLIO JS — Dark Mode, Animations, Interactions
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── THEME TOGGLE ───────────────────────────────── */
  const html        = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme  = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  /* ── HAMBURGER MENU ─────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
  });

  // Close on nav link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  /* ── NAVBAR SCROLL EFFECT ───────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    updateActiveNav();
    toggleBackToTop();
  }, { passive: true });

  /* ── ACTIVE NAV LINK ON SCROLL ──────────────────── */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 100;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const bot = top + sec.offsetHeight;
      const id  = sec.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        link.classList.toggle('active', scrollY >= top && scrollY < bot);
      }
    });
  }

  /* ── AOS-LITE INTERSECTION OBSERVER ────────────── */
  const aosEls = document.querySelectorAll('[data-aos]');

  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.aosDelay;
        if (delay) {
          entry.target.style.transitionDelay = delay + 'ms';
        }
        entry.target.classList.add('aos-animate');
        aosObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  aosEls.forEach(el => aosObserver.observe(el));

  /* ── COUNTER ANIMATION ──────────────────────────── */
  const counters = document.querySelectorAll('.hl-number[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.count);
        animateCounter(el, 0, target, 1600);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el, start, end, duration) {
    const startTime = performance.now();
    function update(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease     = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      const value    = Math.floor(start + (end - start) * ease);
      el.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  /* ── SKILL BARS ANIMATION ───────────────────────── */
  const skillFills = document.querySelectorAll('.skill-fill[data-width]');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const width = el.dataset.width;
        setTimeout(() => { el.style.width = width + '%'; }, 200);
        skillObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  skillFills.forEach(f => skillObserver.observe(f));

  /* ── PUBLICATION FILTER ─────────────────────────── */
  const pubFilters = document.querySelectorAll('.pub-filter');
  const pubCards   = document.querySelectorAll('.pub-card');

  pubFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      pubFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      pubCards.forEach(card => {
        const show = filter === 'all' || card.dataset.type === filter;
        card.style.display   = show ? '' : 'none';
        card.style.animation = show ? 'fadeInUp 0.4s ease forwards' : '';
      });
    });
  });

  /* ── BIBTEX TOGGLE ──────────────────────────────── */
  window.toggleBibtex = function(btn) {
    const card   = btn.closest('.pub-card');
    const bibtex = card.querySelector('.pub-bibtex');
    if (!bibtex) return;
    const visible = bibtex.style.display !== 'none';
    bibtex.style.display = visible ? 'none' : 'block';
    btn.innerHTML = visible
      ? '<i class="fas fa-code"></i> BibTeX'
      : '<i class="fas fa-times"></i> Close';
  };

  /* ── BACK TO TOP ────────────────────────────────── */
  const backToTop = document.getElementById('backToTop');

  function toggleBackToTop() {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── FOOTER YEAR ────────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── CONTACT FORM ───────────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn  = contactForm.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;

      btn.innerHTML  = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled   = true;

      try {
        const res = await fetch(contactForm.action, {
          method: 'POST',
          body:   new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          btn.innerHTML = '<i class="fas fa-check"></i> Sent! Thank you.';
          btn.style.background = 'linear-gradient(135deg,#059669,#10B981)';
          contactForm.reset();
        } else {
          throw new Error('Network error');
        }
      } catch {
        btn.innerHTML  = '<i class="fas fa-exclamation-triangle"></i> Error – try email directly';
        btn.style.background = 'linear-gradient(135deg,#DC2626,#EF4444)';
      }

      setTimeout(() => {
        btn.innerHTML  = orig;
        btn.disabled   = false;
        btn.style.background = '';
      }, 5000);
    });
  }

  /* ── SMOOTH SCROLL OFFSET FOR FIXED NAV ─────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── CSS ANIMATION KEYFRAME INJECTION ───────────── */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from { opacity:0; transform:translateY(20px); }
      to   { opacity:1; transform:translateY(0); }
    }
    .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px,5px); }
    .hamburger.open span:nth-child(2) { opacity:0; }
    .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }
  `;
  document.head.appendChild(style);

  console.log('%c🎓 Portfolio loaded!', 'color:#3B82F6;font-weight:bold;font-size:14px;');
});
