// =============================================================
// Portfolio Script: mobile nav + smooth scroll close
// =============================================================

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Mobile Navigation Toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu after clicking a nav link (mobile)
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Footer Year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Clickable Project Cards ----------
     Clicking anywhere on a project card opens its case study (the first link
     inside .project-links, i.e. "Read Case Study →"). Clicks on an actual
     link inside the card (including "Source Code →") still go to that link's
     own destination instead of being hijacked. */
  document.querySelectorAll('.project-card').forEach((card) => {
    const primaryLink = card.querySelector('.project-links a');
    if (!primaryLink) return;

    card.classList.add('is-clickable');
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      window.location.href = primaryLink.getAttribute('href');
    });
  });
});
