// MESH showcase — minimal JS: staggered mount reveal + footer year.
// Reveals are MOUNT-based (not scroll observers) so the full page always renders
// in prerenders/screenshots; prefers-reduced-motion is handled in CSS.
(function () {
  document.getElementById('yr').textContent = String(new Date().getFullYear());

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
