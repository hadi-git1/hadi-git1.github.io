// =============================================================
// Portfolio Script — mobile nav, smooth scroll close, contact form
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

  /* ---------- Contact Form Handling ----------
     NOTE: This is a front-end-only stub. To actually receive messages,
     connect this form to a backend endpoint or a service such as
     Formspree, Netlify Forms, EmailJS, etc. — replace the
     handleSubmit logic below with a fetch() call to that service. */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        status.textContent = 'Please fill out all fields before sending.';
        status.style.color = '#f87171';
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        status.textContent = 'Please enter a valid email address.';
        status.style.color = '#f87171';
        return;
      }

      // Placeholder success state — swap in a real API/service call here.
      status.textContent = `Thanks, ${name}! Your message has been received.`;
      status.style.color = '#10b981';
      form.reset();
    });
  }
});
