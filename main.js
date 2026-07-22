// MESH showcase — minimal JS: staggered mount reveal + footer year.
// Reveals are MOUNT-based (not scroll observers) so the full page always renders
// in prerenders/screenshots; prefers-reduced-motion is handled in CSS.
(function () {
  document.getElementById('yr').textContent = String(new Date().getFullYear());

  // mobile menu toggle (closes on link tap)
  var btn = document.getElementById('menuBtn');
  var menu = document.getElementById('mobileMenu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      var open = menu.hasAttribute('hidden');
      if (open) { menu.removeAttribute('hidden'); } else { menu.setAttribute('hidden', ''); }
      btn.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var els = document.querySelectorAll('.reveal');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  els.forEach(function (el, i) {
    setTimeout(function () { el.classList.add('in'); }, 60 + Math.min(i * 45, 900));
  });
})();
