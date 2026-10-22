(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var touchPrimary = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  if (reducedMotion || touchPrimary) return;

  var LINE = 34;
  var EPS = 1;
  var SNAP = 0.35;
  var TAU_ACTIVE = 60;
  var TAU_IDLE = 140;
  var ACTIVE_WINDOW = 110;
  var MAX_STEP_DT = 64;

  var current = window.scrollY || window.pageYOffset || 0;
  var target = current;
  var rafId = null;
  var owned = false;
  var lastInput = -1e9;
  var lastTime = 0;

  function scrollY() {
    return window.scrollY || window.pageYOffset || 0;
  }

  function maxScroll() {
    var doc = document.documentElement;
    var body = document.body;
    return Math.max(0, Math.max(doc.scrollHeight, body ? body.scrollHeight : 0) - window.innerHeight);
  }

  function clamp(v) {
    var max = maxScroll();
    return v < 0 ? 0 : v > max ? max : v;
  }

  function resyncIfExternal() {
    var y = scrollY();
    if (Math.abs(y - current) > EPS) {
      current = y;
      target = y;
    }
  }

  function stop() {
    if (rafId != null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function start() {
    if (rafId == null) {
      lastTime = performance.now();
      rafId = window.requestAnimationFrame(frame);
    }
  }

  function frame(now) {
    var dt = Math.min(now - lastTime, MAX_STEP_DT);
    lastTime = now;

    var alpha = 1 - Math.exp(-dt / ((now - lastInput) < ACTIVE_WINDOW ? TAU_ACTIVE : TAU_IDLE));

    var y = scrollY();
    if (Math.abs(y - current) > EPS) {
      current = y;
      target = y;
    }

    target = clamp(target);
    var diff = target - current;

    if (Math.abs(diff) < SNAP) {
      current = target;
      owned = true;
      scrollToInstant(current);
      rafId = null;
      return;
    }

    current = clamp(current + diff * alpha);
    owned = true;
    scrollToInstant(current);

    var settled = Math.abs(target - current) < SNAP;
    if (settled) {
      rafId = null;
      return;
    }
    rafId = window.requestAnimationFrame(frame);
  }

  function scrollToInstant(top) {
    try {
      window.scrollTo({ top: top, left: 0, behavior: 'instant' });
    } catch (err) {
      window.scrollTo(0, top);
    }
  }

  function onWheel(event) {
    if (event.ctrlKey || event.metaKey) return;
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

    var dy = event.deltaY;
    if (event.deltaMode === 1) dy *= LINE;
    else if (event.deltaMode === 2) dy *= window.innerHeight;
    if (dy === 0) return;

    event.preventDefault();
    if (maxScroll() <= 0) return;

    resyncIfExternal();
    target = clamp(target + dy);
    lastInput = performance.now();
    start();
  }

  function onScroll() {
    if (owned) {
      owned = false;
      return;
    }
    var y = scrollY();
    if (Math.abs(y - current) <= EPS) return;

    stop();
    current = y;
    target = y;
  }

  function onAnchorClick(event) {
    if (event.defaultPrevented) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    var link = event.target.closest ? event.target.closest('a[href^="#"]') : null;
    if (!link) return;

    var href = link.getAttribute('href');
    if (!href || href === '#') return;

    var el = href.length > 1 ? document.getElementById(href.slice(1)) : document.documentElement;
    if (!el) return;

    var margin = parseFloat(window.getComputedStyle(el).scrollMarginTop) || 0;
    var dest = clamp(el.getBoundingClientRect().top + scrollY() - margin);

    event.preventDefault();
    try {
      if (history.replaceState) history.replaceState(null, '', href);
    } catch (err) {}

    resyncIfExternal();
    target = dest;
    lastInput = performance.now();
    start();

    try {
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    } catch (err) {}
  }

  function onResize() {
    var y = scrollY();
    current = clamp(current);
    target = clamp(current);
    if (Math.abs(y - current) > EPS) {
      current = y;
      target = y;
    }
    stop();
  }

  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('click', onAnchorClick);
  window.addEventListener('resize', onResize);
})();
