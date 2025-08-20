// 8-script.js
// Toggle mobile menu (hamburger) for screens <= 480px
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  if (!hamburger || !mobileNav) return;

  // Helper to set aria-expanded and hidden attribute
  function setOpen(open) {
    if (open) {
      hamburger.classList.add('is-active');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileNav.classList.add('open');
      mobileNav.hidden = false;
      // prevent body scroll when menu open (mobile UX)
      document.body.style.overflow = 'hidden';
    } else {
      hamburger.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('open');
      // delay hiding to allow transition to finish
      setTimeout(() => { mobileNav.hidden = true; }, 380);
      document.body.style.overflow = '';
    }
  }

  // Toggle on click
  hamburger.addEventListener('click', function () {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    setOpen(!expanded);
  });

  // Close menu when clicking outside (optional but nice)
  document.addEventListener('click', function (e) {
    if (!mobileNav.classList.contains('open')) return;
    const target = e.target;
    if (mobileNav.contains(target) || hamburger.contains(target)) return;
    setOpen(false);
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      setOpen(false);
      hamburger.focus();
    }
  });

  // Ensure menu state resets on resize larger than mobile breakpoint
  window.addEventListener('resize', function () {
    if (window.innerWidth > 480 && mobileNav.classList.contains('open')) {
      // close mobile menu
      setOpen(false);
    }
  });
});