/**
 * AARON "LUCKY DE PRINCE" - Professional Football Coach Portfolio
 * JavaScript: Mobile menu, sticky nav, smooth scroll, counters, scroll reveal, parallax.
 */

(function () {
  'use strict';

  // ========== YEAR ==========
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ========== MOBILE HAMBURGER MENU ==========
  const hamburger = document.getElementById('hamburger');
  const navList = document.getElementById('navList');
  if (hamburger && navList) {
    hamburger.addEventListener('click', () => navList.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 900 && !navList.contains(e.target) && !hamburger.contains(e.target))
        navList.classList.remove('open');
    });
  }

  // ========== STICKY NAVBAR ON SCROLL ==========
  window.addEventListener('scroll', () => {
    document.body.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ========== SMOOTH SCROLL ==========
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.innerWidth <= 900 && navList) navList.classList.remove('open');
      }
    });
  });

  // ========== ANIMATED COUNTERS (easing) ==========
  const counters = document.querySelectorAll('.count');
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      const plus = el.dataset.plus === 'true';
      const duration = 2000;
      let startTime = null;
      counterObs.unobserve(el);
      function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }
      function step(ts) {
        if (!startTime) startTime = ts;
        const progress = easeOutQuart(Math.min((ts - startTime) / duration, 1));
        el.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target + (plus ? '+' : '');
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.4 });
  counters.forEach(c => counterObs.observe(c));

  // ========== SCROLL REVEAL ==========
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fade-up').forEach(el => revealObs.observe(el));

    // ========== HERO FADE-IN ON LOAD ==========
    document.querySelectorAll('#hero .fade-up').forEach(el => el.classList.add('in-view'));

    // ========== REVEAL GALLERY & TEAM IMAGES ON LOAD (ensure visibility) ==========
    document.querySelectorAll('#gallery .fade-up, #team .fade-up, #about .fade-up').forEach(el => el.classList.add('in-view'));

  // ========== PARALLAX (subtle) ==========
  const parallax = document.querySelector('.parallax-layer');
  if (parallax) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const rate = scrolled * 0.15;
      parallax.style.transform = `translateY(${rate}px)`;
    });
  }
})();
