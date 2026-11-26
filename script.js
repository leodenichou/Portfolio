/* ── Portfolio Léo Denichou — script.js ── */

/* ── RÉGLAGE DU TABLEAU DE SYNTHÈSE ──
   Taille « réelle » du tableau Google Sheets, en pixels (estimée à partir de ta capture).
   - Barre de défilement horizontale visible, ou colonne de droite coupée → augmente SHEET_W
   - Grand espace blanc sous le tableau → diminue SHEET_H
   - Bas du tableau coupé ou barre verticale visible → augmente SHEET_H */
const SHEET_W = 1600;
const SHEET_H = 1500;

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV : fond au scroll ── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── MENU MOBILE ── */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  const closeMenu = () => {
    if (!mobileMenu || !burger) return;
    mobileMenu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  };

  if (burger && mobileMenu) {
    burger.setAttribute('aria-expanded', 'false');

    burger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    // Referme le menu quand on clique sur un lien
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Referme avec Échap ou si on repasse en affichage desktop
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 920) closeMenu();
    });
  }

  /* ── TABLEAU DE SYNTHÈSE : tient en entier dans la largeur ── */
  const synWrap = document.getElementById('syntheseWrap');
  const synScale = document.getElementById('syntheseScale');

  if (synWrap && synScale) {
    synScale.style.width = SHEET_W + 'px';
    synScale.style.height = SHEET_H + 'px';

    const fitSheet = () => {
      const scale = Math.min(1, synWrap.clientWidth / SHEET_W);
      synScale.style.transform = `scale(${scale})`;
      synWrap.style.height = Math.round(SHEET_H * scale) + 'px';
    };
    fitSheet();
    window.addEventListener('resize', fitSheet);
  }

  /* ── APPARITION AU SCROLL ── */
  // Les classes .fade-up / .visible sont définies dans style.css.
  // Elles sont ajoutées ici, pas besoin de modifier le HTML.
  const revealSelectors = [
    '.section-eyebrow',
    '.section-title',
    '.section-sub',
    '.formation-grid',
    '.formation-stats',
    '.profil-card',
    '.profil-right',
    '.synthese-iframe-wrap',
    '.projets-list'
  ];

  const targets = document.querySelectorAll(revealSelectors.join(','));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => {
      el.classList.add('fade-up');
      observer.observe(el);
    });
  }
  // Sinon : rien n'est masqué, le contenu reste visible.
});
