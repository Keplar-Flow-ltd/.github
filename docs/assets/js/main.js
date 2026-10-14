/* Keplar Flow website - interactions
   - Sticky nav background state (IntersectionObserver, no scroll listeners)
   - Mobile menu disclosure
   - Reveal-on-scroll: synchronous initial reveal + IO for the rest + failsafe
*/
(function () {
  'use strict';

  var statik = location.hash === '#static';

  /* --- sticky nav state: observe the hero leaving the viewport ---------- */
  var nav = document.getElementById('topnav');
  var hero = document.querySelector('.hero');
  if (nav && hero && 'IntersectionObserver' in window) {
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        nav.classList.toggle('scrolled', !en.isIntersecting);
      });
    }, { threshold: 0, rootMargin: '-70px 0px 0px 0px' });
    navIO.observe(hero);
  }

  /* --- mobile menu -------------------------------------------------------- */
  var toggle = document.getElementById('navtoggle');
  var links = document.getElementById('navlinks');
  if (toggle && links && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target && e.target.tagName === 'A' && window.innerWidth <= 860) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* --- reveal on scroll ---------------------------------------------------- */
  var els = Array.prototype.slice.call(document.querySelectorAll('.rv'));
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function revealAll() {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  if (statik || reduced || !('IntersectionObserver' in window)) {
    revealAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

    els.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight + 40 && r.bottom > -40) {
        el.classList.add('in');
      } else {
        io.observe(el);
      }
    });

    /* hero entrance stagger */
    var heroEls = document.querySelectorAll('.hero .rv');
    heroEls.forEach(function (el, i) {
      if (!el.classList.contains('in')) {
        el.style.transitionDelay = (80 + i * 90) + 'ms';
      }
    });
  }

  /* failsafe: never leave content hidden */
  setTimeout(revealAll, 1500);
})();
