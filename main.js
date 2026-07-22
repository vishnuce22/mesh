// MESH showcase — modern motion layer (vanilla, reduced-motion safe).
// Timing per Material/HIG guidance: micro 150–300ms, section reveals ≤650ms,
// stagger 40–60ms, transform/opacity only.
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.getElementById('yr').textContent = String(new Date().getFullYear());

  /* ── mobile menu ─────────────────────────────────────────────────────── */
  var btn = document.getElementById('menuBtn');
  var menu = document.getElementById('mobileMenu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      var open = menu.hasAttribute('hidden');
      if (open) menu.removeAttribute('hidden'); else menu.setAttribute('hidden', '');
      btn.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── scroll-driven reveals (staggered within each section) ──────────── */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // stagger siblings that arrive in the same tick
        var section = el.closest('section') || document.body;
        var pending = Array.prototype.slice.call(section.querySelectorAll('.reveal:not(.in):not(.queued)'))
          .filter(function (s) { return s.getBoundingClientRect().top < window.innerHeight + 40; });
        pending.forEach(function (s, i) {
          s.classList.add('queued');
          setTimeout(function () { s.classList.add('in'); }, i * 55);
        });
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
    // hero is above the fold — reveal immediately
    document.querySelectorAll('.hero .reveal').forEach(function (el, i) {
      el.classList.add('queued');
      setTimeout(function () { el.classList.add('in'); }, 80 + i * 90);
    });
  }
  // rail draw-in hooks off .rail.in
  var rail = document.querySelector('.rail');
  if (rail) {
    if (reduce) rail.classList.add('in');
    else new IntersectionObserver(function (e, obs) {
      if (e[0].isIntersecting) { rail.classList.add('in'); obs.disconnect(); }
    }, { threshold: 0.3 }).observe(rail);
  }

  /* ── scroll progress + nav state ─────────────────────────────────────── */
  var bar = document.getElementById('progress');
  var nav = document.querySelector('.nav');
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      if (bar && !reduce) bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
      if (nav) nav.classList.toggle('scrolled', h.scrollTop > 10);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── scrollspy ───────────────────────────────────────────────────────── */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  var targets = links.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  if (targets.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    targets.forEach(function (t) { spy.observe(t); });
  }

  /* ── stat count-ups ─────────────────────────────────────────────────── */
  document.querySelectorAll('.stat .n[data-n]').forEach(function (el) {
    var target = parseInt(el.getAttribute('data-n'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduce || !('IntersectionObserver' in window)) return; // final value already in markup
    new IntersectionObserver(function (entries, obs) {
      if (!entries[0].isIntersecting) return;
      obs.disconnect();
      var t0 = performance.now(), dur = 900;
      (function step(t) {
        var p = Math.min((t - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
        el.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    }, { threshold: 0.6 }).observe(el);
  });

  /* ── live-simulated floor board ─────────────────────────────────────── */
  var rows = Array.prototype.slice.call(document.querySelectorAll('.mock-board .mock-row'));
  if (rows.length && !reduce) {
    var STATES = [
      { cls: 'run', label: 'RUN' },
      { cls: 'setup', label: 'SETUP' },
      { cls: 'insp', label: 'INSPECT' },
      { cls: 'idle', label: 'QUEUE' }
    ];
    setInterval(function () {
      var row = rows[Math.floor(Math.random() * rows.length)];
      var chip = row.querySelector('.chip');
      var bars = row.querySelectorAll('.bar');
      var next = STATES[Math.floor(Math.random() * STATES.length)];
      chip.className = 'chip ' + next.cls;
      chip.textContent = next.label;
      bars.forEach(function (b) { b.style.width = (2.5 + Math.random() * 4.5) + 'rem'; });
      row.classList.add('tick');
      setTimeout(function () { row.classList.remove('tick'); }, 700);
    }, 2400);
  }

  /* ── screenshot lightbox ────────────────────────────────────────────── */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightboxImg');
  if (lb && lbImg) {
    document.querySelectorAll('.shot-frame img').forEach(function (img) {
      img.closest('.shot-frame').addEventListener('click', function () {
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeLb() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
    }
    lb.addEventListener('click', closeLb);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lb.classList.contains('open')) closeLb();
    });
  }
})();
