/* ============================================================
   CIRCULAR – Erasmus+ InfoPack Website
   JavaScript – Interactions & Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- MOBILE MENU ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  function openMenu() {
    if (!navToggle || !navLinks) return;
    navToggle.classList.add('active');
    navLinks.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!navToggle || !navLinks) return;
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (navLinks.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });

    // Close menu when clicking outside (on the overlay background)
    navLinks.addEventListener('click', function (e) {
      if (e.target === navLinks) {
        closeMenu();
      }
    });
  }


  /* ---------- NAVBAR SCROLL EFFECT ---------- */
  const nav = document.querySelector('.nav');

  function handleNavScroll() {
    var scrollY = window.scrollY || window.pageYOffset;
    if (nav) {
      if (scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });


  /* ---------- ACTIVE NAV LINK HIGHLIGHTING ---------- */
  var sections = document.querySelectorAll('section[id]');
  var navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

  function updateActiveLink() {
    var scrollPos = (window.scrollY || window.pageYOffset) + 100;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navAnchors.forEach(function (a) {
          a.classList.remove('active');
          if (a.getAttribute('href') === '#' + id) {
            a.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });


  /* ---------- SCROLL REVEAL ANIMATION ---------- */
  var revealElements = document.querySelectorAll('.reveal, .reveal-children');

  function revealOnScroll() {
    var windowHeight = window.innerHeight;
    var revealPoint = 80;

    revealElements.forEach(function (el) {
      var elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('visible');
      }
    });
  }

  // Run once on load
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll, { passive: true });


  /* ---------- SMOOTH SCROLL (for CTA button and other anchors) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (!href || href === '#') return;
      e.preventDefault();
      var target = document.querySelector(href);
      if (target) {
        var navHeight = 70;
        var rootStyle = getComputedStyle(document.documentElement);
        var navHeightValue = rootStyle.getPropertyValue('--nav-height');
        if (navHeightValue) {
          navHeight = parseInt(navHeightValue) || 70;
        }
        var targetPosition = target.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });


  /* ---------- BACK TO TOP BUTTON ---------- */
  var backToTop = document.getElementById('back-to-top');

  function toggleBackToTop() {
    if (backToTop) {
      if ((window.scrollY || window.pageYOffset) > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ---------- KEYBOARD SUPPORT ---------- */
  // Close mobile menu with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('open')) {
      closeMenu();
      navToggle.focus();
    }
  });

});
