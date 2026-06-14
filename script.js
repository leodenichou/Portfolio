// ── NAV SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ── BURGER MENU ──
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
document.querySelectorAll('.ml').forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ── COMPÉTENCES TABS ──
const tabs = document.querySelectorAll('.comp-tab');
const tables = {
  support: document.getElementById('tabSupport'),
  sisr:    document.getElementById('tabSisr'),
  secu:    document.getElementById('tabSecu'),
};
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const key = tab.dataset.tab;
    Object.entries(tables).forEach(([k, el]) => {
      if (el) el.classList.toggle('hidden', k !== key);
    });
  });
});

// ── SCROLL REVEAL ──
document.querySelectorAll(
  '.section-title, .section-eyebrow, .section-sub, ' +
  '.formation-card, .fstat, .info-card, ' +
  '.profil-card, .pat-item, .projet-row, ' +
  '.tool-card, .hero-card, .comp-table-wrap, ' +
  '.hero-text, .footer-col'
).forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = Array.from(entry.target.parentElement.children);
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), idx * 70);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── NAV ACTIVE LINK ──
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const secObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id
          ? 'var(--text)' : '';
      });
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => secObs.observe(s));
