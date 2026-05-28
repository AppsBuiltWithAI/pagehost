/* ── NAV SCROLL ───────────────────────────────────────── */
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

/* ── MOBILE MENU ──────────────────────────────────────── */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

/* ── FAQ ACCORDION ────────────────────────────────────── */
document.querySelectorAll('.faq-item__q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ── PRICING TOGGLE ───────────────────────────────────── */
const billingToggle = document.getElementById('billingToggle');
if (billingToggle) {
  billingToggle.addEventListener('change', () => {
    const annual = billingToggle.checked;
    document.querySelectorAll('.price-amount').forEach(el => {
      const val = annual ? el.dataset.annual : el.dataset.monthly;
      el.textContent = val === '0' ? 'Free' : '$' + val;
    });
  });
}

/* ── TEMPLATES GALLERY ────────────────────────────────── */
const TEMPLATES = [
  { name: 'Launchpad Pro',   cat: 'SaaS',       color: '#7c3aed', icon: '🚀', tags: ['saas','all'] },
  { name: 'Course Drop',     cat: 'Courses',     color: '#0ea5e9', icon: '🎓', tags: ['course','all'] },
  { name: 'Product Hunt',    cat: 'SaaS',        color: '#f59e0b', icon: '🏆', tags: ['saas','all'] },
  { name: 'Agency Kit',      cat: 'Agency',      color: '#10b981', icon: '💼', tags: ['agency','all'] },
  { name: 'Flash Sale',      cat: 'E-commerce',  color: '#ef4444', icon: '🛍', tags: ['ecommerce','all'] },
  { name: 'Webinar Reg',     cat: 'Events',      color: '#6366f1', icon: '📡', tags: ['event','all'] },
  { name: 'App Download',    cat: 'SaaS',        color: '#ec4899', icon: '📱', tags: ['saas','all'] },
  { name: 'Lead Magnet',     cat: 'Agency',      color: '#14b8a6', icon: '🧲', tags: ['agency','all'] },
  { name: 'Early Access',    cat: 'SaaS',        color: '#f97316', icon: '🔐', tags: ['saas','all'] },
];

function buildTemplateCard(t) {
  return `
    <div class="template-card" data-tags="${t.tags.join(',')}">
      <div class="template-card__preview" style="background:${t.color}18">
        <div style="font-size:3rem">${t.icon}</div>
        <div style="width:60%;height:8px;background:${t.color};border-radius:4px;opacity:.5"></div>
        <div style="width:80%;height:6px;background:rgba(255,255,255,.15);border-radius:3px"></div>
        <div class="template-card__overlay">
          <div class="template-card__overlay-btn">Use template</div>
        </div>
      </div>
      <div class="template-card__info">
        <div class="template-card__name">${t.name}</div>
        <div class="template-card__cat">${t.cat}</div>
      </div>
    </div>`;
}

const grid = document.getElementById('templatesGrid');
if (grid) {
  grid.innerHTML = TEMPLATES.map(buildTemplateCard).join('');

  document.querySelectorAll('.tf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('tf-btn--active'));
      btn.classList.add('tf-btn--active');
      const filter = btn.dataset.filter;
      grid.querySelectorAll('.template-card').forEach(card => {
        const tags = card.dataset.tags.split(',');
        card.style.display = tags.includes(filter) ? '' : 'none';
      });
    });
  });

  grid.querySelectorAll('.template-card').forEach(card => {
    card.addEventListener('click', () => {
      window.location.href = 'builder.html';
    });
  });
}

/* ── SCROLL REVEAL ────────────────────────────────────── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .testi-card, .price-card, .how-step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .5s, transform .5s';
  observer.observe(el);
});
