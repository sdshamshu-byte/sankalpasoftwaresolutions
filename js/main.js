/* ============================================================
   SANKALPA SOFTWARE SOLUTIONS — Main JavaScript
   W3C Compliant | Accessible | No Dependencies
   ============================================================ */

'use strict';

// ─── NAVBAR ───────────────────────────────────────────────
(function initNavbar() {
  const navbar   = document.querySelector('.navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu  = document.getElementById('navMenu');
  const navItems = document.querySelectorAll('.nav-item.has-dropdown');

  if (!navbar) return;

  // Scroll shadow
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    const btn = document.getElementById('backToTop');
    if (btn) btn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });

  // Mobile hamburger
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      navMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', String(open));
    });
  }

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('open')) {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });

  // Mobile: tap dropdown toggle
  navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    if (link) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth < 768) {
          e.preventDefault();
          item.classList.toggle('open');
        }
      });
    }
  });

  // Close menu on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && navMenu) {
      navMenu.classList.remove('open');
      if (hamburger) { hamburger.classList.remove('open'); }
      document.body.style.overflow = '';
    }
  });

  // Keyboard accessibility: Escape closes menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (navMenu) navMenu.classList.remove('open');
      if (hamburger) hamburger.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
})();


// ─── HERO SLIDER ──────────────────────────────────────────
(function initHeroSlider() {
  const slides  = document.querySelectorAll('.hero-slide');
  const dots    = document.querySelectorAll('.hero-dot');
  const prevBtn = document.getElementById('heroPrev');
  const nextBtn = document.getElementById('heroNext');
  if (!slides.length) return;

  let current  = 0;
  let autoTimer = null;

  function goTo(n) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(next, 5500);
  }
  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startAuto(); });
  });

  // Touch swipe
  let startX = 0;
  const sliderEl = document.querySelector('.hero-slider');
  if (sliderEl) {
    sliderEl.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    sliderEl.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); startAuto(); }
    }, { passive: true });
  }

  startAuto();
})();


// ─── SCROLL REVEAL ────────────────────────────────────────
(function initScrollReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

  els.forEach(el => observer.observe(el));
})();


// ─── COUNTER ANIMATION ────────────────────────────────────
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  function animateCounter(el) {
    const target    = parseFloat(el.dataset.count);
    const suffix    = el.dataset.suffix || '';
    const prefix    = el.dataset.prefix || '';
    const decimals  = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const duration  = 2000;
    const step      = 16;
    const increment = target / (duration / step);
    let current     = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = prefix + (decimals ? current.toFixed(decimals) : Math.floor(current)) + suffix;
    }, step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();


// ─── TESTIMONIALS SLIDER ──────────────────────────────────
(function initTestiSlider() {
  const track = document.querySelector('.testimonials-track');
  const dots  = document.querySelectorAll('.testi-dot');
  if (!track) return;

  const cards     = track.querySelectorAll('.testimonial-card');
  const perView   = window.innerWidth >= 768 ? 2 : 1;
  let current     = 0;
  const maxSlide  = Math.ceil(cards.length / perView) - 1;

  function update() {
    const cardWidth = track.parentElement.offsetWidth;
    const offset    = -(current * (cardWidth + 28));
    track.style.transform = `translateX(${offset}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { current = i; update(); });
  });

  // Auto-advance
  setInterval(() => {
    current = current >= maxSlide ? 0 : current + 1;
    update();
  }, 6000);

  // Touch
  let tx = 0;
  track.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const d = tx - e.changedTouches[0].clientX;
    if (Math.abs(d) > 50) {
      current = d > 0 ? Math.min(current + 1, maxSlide) : Math.max(current - 1, 0);
      update();
    }
  }, { passive: true });

  window.addEventListener('resize', update, { passive: true });
})();


// ─── RIPPLE EFFECT ────────────────────────────────────────
(function initRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top: ${e.clientY - rect.top - size / 2}px;
      `;
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
})();


// ─── BACK TO TOP ──────────────────────────────────────────
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


// ─── CONTACT FORM ─────────────────────────────────────────
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = form.querySelector('[type="submit"]');
    const successEl = document.getElementById('formSuccess');
    const errorEl   = document.getElementById('formError');

    // Collect data
    const data = {
      name:    form.cf_name?.value.trim(),
      email:   form.cf_email?.value.trim(),
      phone:   form.cf_phone?.value.trim(),
      service: form.cf_service?.value,
      message: form.cf_message?.value.trim()
    };

    // Validate
    let valid = true;
    if (!data.name)    { markError(form.cf_name, 'Name is required'); valid = false; }
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
                       { markError(form.cf_email, 'Valid email is required'); valid = false; }
    if (!data.message) { markError(form.cf_message, 'Message is required'); valid = false; }
    if (!valid) return;

    // Loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-svg"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Sending...';
    submitBtn.disabled = true;

    // Simulate async send (replace with real EmailJS / fetch call)
    await new Promise(r => setTimeout(r, 1600));

    // ── TO INTEGRATE EMAILJS ──
    // emailjs.init('YOUR_PUBLIC_KEY');
    // await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form);

    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;

    if (successEl) { successEl.style.display = 'flex'; }
    if (errorEl)   { errorEl.style.display = 'none'; }
    form.reset();

    setTimeout(() => { if (successEl) successEl.style.display = 'none'; }, 6000);
  });

  function markError(el, msg) {
    if (!el) return;
    el.style.borderColor = 'var(--pink)';
    el.focus();
    const existing = el.parentElement.querySelector('.field-error');
    if (!existing) {
      const err = document.createElement('p');
      err.className = 'field-error';
      err.style.cssText = 'color: var(--pink); font-size: 12px; margin-top: 4px;';
      err.textContent = msg;
      el.parentElement.appendChild(err);
    }
    el.addEventListener('input', () => {
      el.style.borderColor = '';
      const errEl = el.parentElement.querySelector('.field-error');
      if (errEl) errEl.remove();
    }, { once: true });
  }
})();


// ─── PROGRESS BARS ────────────────────────────────────────
(function initProgressBars() {
  const bars = document.querySelectorAll('.progress-bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(b => observer.observe(b));
})();


// ─── ACTIVE NAV LINK ──────────────────────────────────────
(function setActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === path || href === '../' + path) {
      link.classList.add('active');
    }
  });
})();


// ─── LAZY LOAD IMAGES ─────────────────────────────────────
(function initLazyImages() {
  const imgs = document.querySelectorAll('img[data-src]');
  if (!imgs.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  imgs.forEach(img => observer.observe(img));
})();


// ─── SMOOTH ANCHOR LINKS ──────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


// ─── TYPING ANIMATION ─────────────────────────────────────
(function initTyping() {
  const el = document.querySelector('.typing-text');
  if (!el) return;

  const phrases = JSON.parse(el.dataset.phrases || '[]');
  if (!phrases.length) return;

  let phraseIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const phrase = phrases[phraseIdx];
    if (!deleting) {
      el.textContent = phrase.substring(0, ++charIdx);
      if (charIdx === phrase.length) {
        deleting = true;
        setTimeout(type, 2200);
        return;
      }
    } else {
      el.textContent = phrase.substring(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 55 : 95);
  }
  setTimeout(type, 800);
})();


// ─── SPIN CSS for loading ──────────────────────────────────
const styleTag = document.createElement('style');
styleTag.textContent = '.spin-svg { animation: spin .7s linear infinite; }';
document.head.appendChild(styleTag);
