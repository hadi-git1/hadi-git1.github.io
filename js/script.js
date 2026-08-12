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
     Submits to Formspree (https://formspree.io), which forwards the message
     straight to hadi00x@hotmail.fr — no backend of your own required.

     ONE-TIME SETUP (do this before the form will actually send anything):
       1. Go to formspree.io and sign up free with hadi00x@hotmail.fr.
       2. Create a new form — Formspree gives you an endpoint like
          https://formspree.io/f/abcd1234.
       3. In index.html, find the <form id="contactForm" ...> tag and replace
          YOUR_FORM_ID in its action="" attribute with your real form ID.
       4. Formspree emails you a confirmation link the first time — click it
          to activate the form. After that, every submission lands in your
          inbox automatically. */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', async (e) => {
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

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      status.textContent = 'Sending...';
      status.style.color = '';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });

        if (response.ok) {
          status.textContent = `Thanks, ${name}! Your message has been sent.`;
          status.style.color = '#10b981';
          form.reset();
        } else {
          status.textContent = "Something went wrong — please email me directly at hadi00x@hotmail.fr.";
          status.style.color = '#f87171';
        }
      } catch (err) {
        status.textContent = "Couldn't reach the server — please email me directly at hadi00x@hotmail.fr.";
        status.style.color = '#f87171';
      } finally {
        submitBtn.disabled = false;
      }
    });
  }
});
