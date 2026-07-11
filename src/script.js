/* ── SHARED JS ── goddess alchemy ── */

document.addEventListener('DOMContentLoaded', () => {

  /* NAV SCROLL */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  /* HAMBURGER */
  const ham = document.querySelector('.hamburger');
  const menu = document.querySelector('.mobile-menu');
  if (ham && menu) {
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      menu.classList.toggle('open');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        ham.classList.remove('open');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* FADE-IN ON SCROLL */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  /* CONTACT FORM */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      btn.textContent = '✦ Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #2a7a3a, #3aaa4a)';
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }

  /* ACTIVE NAV LINK */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  /* DISCOVERY CALL POPUP */
  const discoveryModal = document.getElementById('discoveryModal');
  if (discoveryModal) {
    const closeBtn = discoveryModal.querySelector('.modal-close');

    setTimeout(() => {
      discoveryModal.classList.add('show');
    }, 4000);

    closeBtn.addEventListener('click', () => {
      discoveryModal.classList.remove('show');
    });

    discoveryModal.addEventListener('click', (e) => {
      if (e.target === discoveryModal) {
        discoveryModal.classList.remove('show');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && discoveryModal.classList.contains('show')) {
        discoveryModal.classList.remove('show');
      }
    });
  }
});
