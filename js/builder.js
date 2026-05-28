/* ── SIDEBAR TABS ─────────────────────────────────────── */
document.querySelectorAll('.sidebar-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.sidebar-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.sidebar-tab-content').forEach(c => c.style.display = 'none');
    tab.classList.add('active');
    const id = 'tab' + tab.dataset.tab.charAt(0).toUpperCase() + tab.dataset.tab.slice(1);
    const panel = document.getElementById(id);
    if (panel) panel.style.display = 'block';
  });
});

/* ── RESPONSIVE PREVIEW TABS ──────────────────────────── */
const canvas = document.getElementById('canvasInner');
document.querySelectorAll('.bn-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.bn-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const view = btn.dataset.view;
    if (view === 'desktop') { canvas.style.maxWidth = '800px'; canvas.style.margin = '0'; }
    if (view === 'tablet')  { canvas.style.maxWidth = '768px'; canvas.style.margin = '0 auto'; }
    if (view === 'mobile')  { canvas.style.maxWidth = '390px'; canvas.style.margin = '0 auto'; }
  });
});

/* ── SECTION SELECTION ────────────────────────────────── */
let selectedSection = document.querySelector('.canvas-section.selected');

function selectSection(section) {
  document.querySelectorAll('.canvas-section').forEach(s => s.classList.remove('selected'));
  section.classList.add('selected');
  selectedSection = section;
  updatePropsPanel(section);
}

document.querySelectorAll('.canvas-section').forEach(section => {
  section.addEventListener('click', e => {
    if (e.target.closest('.cs-action')) return;
    selectSection(section);
  });
});

/* ── SECTION ACTIONS ──────────────────────────────────── */
document.querySelectorAll('.cs-action').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const action = btn.dataset.action;
    const section = btn.closest('.canvas-section');
    const parent = section.parentElement;
    const addBtn = document.getElementById('addSectionBtn');

    if (action === 'delete') {
      if (document.querySelectorAll('.canvas-section').length > 1) {
        section.style.opacity = '0';
        section.style.transform = 'scale(.97)';
        section.style.transition = 'all .2s';
        setTimeout(() => section.remove(), 200);
      }
    }
    if (action === 'up') {
      const prev = section.previousElementSibling;
      if (prev && prev.classList.contains('canvas-section')) {
        parent.insertBefore(section, prev);
      }
    }
    if (action === 'down') {
      const next = section.nextElementSibling;
      if (next && next.classList.contains('canvas-section')) {
        parent.insertBefore(next, section);
      } else if (next === addBtn) {
        parent.insertBefore(addBtn, section);
      }
    }
    if (action === 'dupe') {
      const clone = section.cloneNode(true);
      clone.classList.remove('selected');
      clone.id = section.id + '-copy-' + Date.now();
      parent.insertBefore(clone, section.nextSibling);
      attachSectionHandlers(clone);
    }
  });
});

function attachSectionHandlers(section) {
  section.addEventListener('click', e => {
    if (e.target.closest('.cs-action')) return;
    selectSection(section);
  });
  section.querySelectorAll('.cs-action').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const action = btn.dataset.action;
      const s = btn.closest('.canvas-section');
      const p = s.parentElement;
      if (action === 'delete') {
        if (document.querySelectorAll('.canvas-section').length > 1) {
          s.style.opacity = '0'; s.style.transition = 'opacity .2s';
          setTimeout(() => s.remove(), 200);
        }
      }
      if (action === 'up') {
        const prev = s.previousElementSibling;
        if (prev && prev.classList.contains('canvas-section')) p.insertBefore(s, prev);
      }
      if (action === 'down') {
        const next = s.nextElementSibling;
        if (next && next.classList.contains('canvas-section')) p.insertBefore(next, s);
      }
      if (action === 'dupe') {
        const clone = s.cloneNode(true);
        clone.classList.remove('selected');
        clone.id = s.id + '-copy-' + Date.now();
        p.insertBefore(clone, s.nextSibling);
        attachSectionHandlers(clone);
      }
    });
  });
}

/* ── ADD SECTION ──────────────────────────────────────── */
const SECTION_TEMPLATES = {
  hero: `
    <div class="canvas-section__handle">Hero</div>
    <div class="canvas-section__actions">
      <div class="cs-action" data-action="up">↑</div>
      <div class="cs-action" data-action="down">↓</div>
      <div class="cs-action" data-action="dupe">⎘</div>
      <div class="cs-action" data-action="delete">✕</div>
    </div>
    <div class="cs-hero">
      <h1 contenteditable="true" spellcheck="false">Your compelling headline here</h1>
      <p contenteditable="true" spellcheck="false">A supporting sentence that reinforces your value proposition and builds trust.</p>
      <div class="cs-hero-btns">
        <button class="cs-btn-primary">Get started free →</button>
        <button class="cs-btn-ghost">Learn more</button>
      </div>
    </div>`,
  features: `
    <div class="canvas-section__handle">Features</div>
    <div class="canvas-section__actions">
      <div class="cs-action" data-action="up">↑</div>
      <div class="cs-action" data-action="down">↓</div>
      <div class="cs-action" data-action="dupe">⎘</div>
      <div class="cs-action" data-action="delete">✕</div>
    </div>
    <div class="cs-features">
      <h2 contenteditable="true" spellcheck="false">Why customers choose us</h2>
      <div class="cs-features-grid">
        <div class="cs-feature-card">
          <div class="icon">🔒</div>
          <h3 contenteditable="true" spellcheck="false">Secure by default</h3>
          <p contenteditable="true" spellcheck="false">Enterprise-grade security baked into every layer.</p>
        </div>
        <div class="cs-feature-card">
          <div class="icon">🌍</div>
          <h3 contenteditable="true" spellcheck="false">Global CDN</h3>
          <p contenteditable="true" spellcheck="false">Lightning-fast delivery from 200+ edge locations.</p>
        </div>
        <div class="cs-feature-card">
          <div class="icon">🔧</div>
          <h3 contenteditable="true" spellcheck="false">Easy to use</h3>
          <p contenteditable="true" spellcheck="false">Zero learning curve. Productive from day one.</p>
        </div>
      </div>
    </div>`,
  cta: `
    <div class="canvas-section__handle">Call to action</div>
    <div class="canvas-section__actions">
      <div class="cs-action" data-action="up">↑</div>
      <div class="cs-action" data-action="down">↓</div>
      <div class="cs-action" data-action="dupe">⎘</div>
      <div class="cs-action" data-action="delete">✕</div>
    </div>
    <div class="cs-cta">
      <h2 contenteditable="true" spellcheck="false">Start your free trial today</h2>
      <p contenteditable="true" spellcheck="false">No credit card required. Cancel anytime.</p>
      <button class="cs-btn-primary" style="background:#fff;color:#7c3aed;font-weight:700">Start for free →</button>
    </div>`,
  testimonial: `
    <div class="canvas-section__handle">Testimonials</div>
    <div class="canvas-section__actions">
      <div class="cs-action" data-action="up">↑</div>
      <div class="cs-action" data-action="down">↓</div>
      <div class="cs-action" data-action="dupe">⎘</div>
      <div class="cs-action" data-action="delete">✕</div>
    </div>
    <div style="padding:64px 48px;background:#fafafa;text-align:center">
      <h2 style="font-size:1.8rem;font-weight:800;color:#111;margin-bottom:40px;font-family:Inter,sans-serif" contenteditable="true" spellcheck="false">What our customers say</h2>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:24px;max-width:700px;margin:0 auto">
        <div style="background:#fff;border-radius:12px;padding:24px;text-align:left;border:1px solid #eee">
          <div style="color:#f59e0b;margin-bottom:10px">★★★★★</div>
          <p style="font-size:.9rem;color:#555;margin-bottom:16px;font-family:Inter,sans-serif" contenteditable="true" spellcheck="false">"This product completely changed the way we work. Highly recommended."</p>
          <strong style="font-size:.85rem;color:#111;font-family:Inter,sans-serif" contenteditable="true" spellcheck="false">Jane D. · CEO, Acme Inc.</strong>
        </div>
        <div style="background:#fff;border-radius:12px;padding:24px;text-align:left;border:1px solid #eee">
          <div style="color:#f59e0b;margin-bottom:10px">★★★★★</div>
          <p style="font-size:.9rem;color:#555;margin-bottom:16px;font-family:Inter,sans-serif" contenteditable="true" spellcheck="false">"Best investment we made this year. Results speak for themselves."</p>
          <strong style="font-size:.85rem;color:#111;font-family:Inter,sans-serif" contenteditable="true" spellcheck="false">Mark T. · Founder, Startup</strong>
        </div>
      </div>
    </div>`,
  pricing: `
    <div class="canvas-section__handle">Pricing</div>
    <div class="canvas-section__actions">
      <div class="cs-action" data-action="up">↑</div>
      <div class="cs-action" data-action="down">↓</div>
      <div class="cs-action" data-action="dupe">⎘</div>
      <div class="cs-action" data-action="delete">✕</div>
    </div>
    <div style="padding:64px 48px;background:#fff">
      <h2 style="font-size:1.8rem;font-weight:800;color:#111;text-align:center;margin-bottom:40px;font-family:Inter,sans-serif" contenteditable="true" spellcheck="false">Simple, transparent pricing</h2>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:700px;margin:0 auto">
        <div style="border:1px solid #eee;border-radius:12px;padding:24px;text-align:center">
          <div style="font-size:.75rem;font-weight:700;text-transform:uppercase;color:#888;margin-bottom:12px;font-family:Inter,sans-serif">Starter</div>
          <div style="font-size:2.2rem;font-weight:900;color:#111;font-family:Inter,sans-serif">Free</div>
          <div style="font-size:.8rem;color:#888;margin-bottom:20px;font-family:Inter,sans-serif">forever</div>
          <button class="cs-btn-ghost" style="color:#333;border-color:#ddd;font-size:.82rem;padding:8px 16px">Get started</button>
        </div>
        <div style="border:2px solid #7c3aed;border-radius:12px;padding:24px;text-align:center;background:rgba(124,58,237,.04)">
          <div style="font-size:.75rem;font-weight:700;text-transform:uppercase;color:#7c3aed;margin-bottom:12px;font-family:Inter,sans-serif">Pro</div>
          <div style="font-size:2.2rem;font-weight:900;color:#111;font-family:Inter,sans-serif">$49</div>
          <div style="font-size:.8rem;color:#888;margin-bottom:20px;font-family:Inter,sans-serif">/month</div>
          <button class="cs-btn-primary" style="font-size:.82rem;padding:8px 16px">Get Pro →</button>
        </div>
        <div style="border:1px solid #eee;border-radius:12px;padding:24px;text-align:center">
          <div style="font-size:.75rem;font-weight:700;text-transform:uppercase;color:#888;margin-bottom:12px;font-family:Inter,sans-serif">Agency</div>
          <div style="font-size:2.2rem;font-weight:900;color:#111;font-family:Inter,sans-serif">$149</div>
          <div style="font-size:.8rem;color:#888;margin-bottom:20px;font-family:Inter,sans-serif">/month</div>
          <button class="cs-btn-ghost" style="color:#333;border-color:#ddd;font-size:.82rem;padding:8px 16px">Contact us</button>
        </div>
      </div>
    </div>`,
  faq: `
    <div class="canvas-section__handle">FAQ</div>
    <div class="canvas-section__actions">
      <div class="cs-action" data-action="up">↑</div>
      <div class="cs-action" data-action="down">↓</div>
      <div class="cs-action" data-action="dupe">⎘</div>
      <div class="cs-action" data-action="delete">✕</div>
    </div>
    <div style="padding:64px 48px;background:#f9f9fc">
      <h2 style="font-size:1.8rem;font-weight:800;color:#111;text-align:center;margin-bottom:40px;font-family:Inter,sans-serif" contenteditable="true" spellcheck="false">Frequently asked questions</h2>
      <div style="max-width:580px;margin:0 auto;display:flex;flex-direction:column;gap:12px">
        <div style="border:1px solid #eee;border-radius:10px;padding:20px;background:#fff">
          <strong style="font-size:.9rem;color:#111;font-family:Inter,sans-serif" contenteditable="true" spellcheck="false">Do I need to know how to code?</strong>
          <p style="font-size:.85rem;color:#666;margin-top:8px;font-family:Inter,sans-serif" contenteditable="true" spellcheck="false">No. Everything is visual and drag-and-drop. No coding knowledge required.</p>
        </div>
        <div style="border:1px solid #eee;border-radius:10px;padding:20px;background:#fff">
          <strong style="font-size:.9rem;color:#111;font-family:Inter,sans-serif" contenteditable="true" spellcheck="false">Is there a free plan?</strong>
          <p style="font-size:.85rem;color:#666;margin-top:8px;font-family:Inter,sans-serif" contenteditable="true" spellcheck="false">Yes. Our Starter plan is free forever with 3 published pages.</p>
        </div>
      </div>
    </div>`,
  footer: `
    <div class="canvas-section__handle">Footer</div>
    <div class="canvas-section__actions">
      <div class="cs-action" data-action="up">↑</div>
      <div class="cs-action" data-action="down">↓</div>
      <div class="cs-action" data-action="dupe">⎘</div>
      <div class="cs-action" data-action="delete">✕</div>
    </div>
    <div style="padding:32px 48px;background:#111;text-align:center;color:#888;font-size:.82rem;font-family:Inter,sans-serif">
      <div style="font-weight:700;color:#fff;font-size:1rem;margin-bottom:8px" contenteditable="true" spellcheck="false">YourBrand</div>
      <div contenteditable="true" spellcheck="false">© 2026 YourBrand. All rights reserved. · Privacy · Terms</div>
    </div>`,
};

const addSectionBtn = document.getElementById('addSectionBtn');
addSectionBtn.addEventListener('click', () => {
  showSectionPicker();
});

document.querySelectorAll('[data-section-type]').forEach(btn => {
  btn.addEventListener('click', () => {
    addSection(btn.dataset.sectionType);
  });
});

function addSection(type) {
  const tmpl = SECTION_TEMPLATES[type];
  if (!tmpl) return;
  const section = document.createElement('div');
  section.className = 'canvas-section';
  section.dataset.section = type;
  section.id = 'section-' + type + '-' + Date.now();
  section.innerHTML = tmpl;
  section.style.opacity = '0';
  section.style.transform = 'translateY(10px)';
  section.style.transition = 'all .25s';
  const parent = document.getElementById('canvasInner');
  parent.insertBefore(section, addSectionBtn);
  requestAnimationFrame(() => {
    section.style.opacity = '1';
    section.style.transform = 'translateY(0)';
  });
  attachSectionHandlers(section);
  selectSection(section);
}

function showSectionPicker() {
  const types = ['hero', 'features', 'testimonial', 'pricing', 'faq', 'cta', 'footer'];
  const labels = { hero:'🦸 Hero', features:'✨ Features', testimonial:'⭐ Testimonials', pricing:'💲 Pricing', faq:'❓ FAQ', cta:'📣 Call to action', footer:'🔻 Footer' };
  const existing = document.createElement('div');
  existing.style.cssText = 'position:fixed;inset:0;z-index:400;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center';
  existing.innerHTML = `
    <div style="background:#18181f;border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:28px;width:480px;max-width:95vw">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
        <h3 style="font-size:1rem;font-weight:700">Add section</h3>
        <button id="closePicker" style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.08);border-radius:7px;width:28px;height:28px;color:#888;cursor:pointer;font-size:.9rem">✕</button>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        ${types.map(t => `<button class="element-block" data-add-type="${t}" style="flex-direction:column;padding:16px;font-size:.82rem">${labels[t]}</button>`).join('')}
      </div>
    </div>`;
  document.body.appendChild(existing);
  existing.querySelector('#closePicker').addEventListener('click', () => existing.remove());
  existing.addEventListener('click', e => { if (e.target === existing) existing.remove(); });
  existing.querySelectorAll('[data-add-type]').forEach(btn => {
    btn.addEventListener('click', () => {
      addSection(btn.dataset.addType);
      existing.remove();
    });
  });
}

/* ── PROPERTIES PANEL ─────────────────────────────────── */
function updatePropsPanel(section) {
  const type = section.dataset.section || 'section';
  document.getElementById('propsTitle').textContent = type.charAt(0).toUpperCase() + type.slice(1) + ' — Properties';
}

document.getElementById('propHeadline').addEventListener('input', e => {
  const el = document.getElementById('hero-headline');
  if (el) el.textContent = e.target.value;
});
document.getElementById('propSub').addEventListener('input', e => {
  const el = document.getElementById('hero-subheadline');
  if (el) el.textContent = e.target.value;
});

document.querySelectorAll('.prop-align-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.prop-align-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

/* ── AI COPY GENERATOR (MOCK) ─────────────────────────── */
const aiPhrases = {
  default: [
    { h: 'The smarter way to get results', s: 'Thousands of teams use us to move faster and grow more confidently.' },
    { h: 'Stop guessing. Start converting.', s: 'Data-driven tools built for people who care about outcomes, not just output.' },
    { h: 'Everything you need, nothing you don\'t', s: 'A focused, powerful platform that respects your time and your audience.' },
  ],
  saas: [
    { h: 'Ship features your users will actually love', s: 'The platform that turns product chaos into calm, confident delivery.' },
    { h: 'Your team deserves better tools', s: 'Modern software for modern teams — fast setup, no headaches.' },
  ],
  course: [
    { h: 'Turn your knowledge into income', s: 'Launch your course to an engaged audience that\'s ready to buy.' },
    { h: 'Teach more. Earn more. Work less.', s: 'A course platform that handles the tech so you can focus on your students.' },
  ],
};

document.getElementById('aiGenerateBtn').addEventListener('click', () => {
  const prompt = document.getElementById('aiPromptInput').value.toLowerCase();
  let pool = aiPhrases.default;
  if (prompt.includes('saas') || prompt.includes('software') || prompt.includes('app')) pool = [...aiPhrases.saas, ...aiPhrases.default];
  if (prompt.includes('course') || prompt.includes('teach') || prompt.includes('learn')) pool = [...aiPhrases.course, ...aiPhrases.default];
  const pick = pool[Math.floor(Math.random() * pool.length)];

  const hInput = document.getElementById('propHeadline');
  const sInput = document.getElementById('propSub');
  hInput.value = pick.h;
  sInput.value = pick.s;
  hInput.dispatchEvent(new Event('input'));
  sInput.dispatchEvent(new Event('input'));

  const btn = document.getElementById('aiGenerateBtn');
  btn.textContent = '✓ Copy applied!';
  btn.style.background = '#10b981';
  setTimeout(() => { btn.textContent = '✨ Generate copy'; btn.style.background = ''; }, 2000);
});

/* ── ELEMENT SEARCH ───────────────────────────────────── */
document.getElementById('elemSearch').addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  document.querySelectorAll('.element-block[data-type]').forEach(el => {
    const name = el.querySelector('span')?.textContent.toLowerCase() || '';
    el.style.display = name.includes(q) ? '' : 'none';
  });
});

/* ── PUBLISH MODAL ────────────────────────────────────── */
document.getElementById('publishBtn').addEventListener('click', () => {
  document.getElementById('publishModal').classList.add('open');
});
document.getElementById('closePublish').addEventListener('click', () => {
  document.getElementById('publishModal').classList.remove('open');
});
document.getElementById('publishModal').addEventListener('click', e => {
  if (e.target === document.getElementById('publishModal')) {
    document.getElementById('publishModal').classList.remove('open');
  }
});
document.getElementById('doPublishBtn').addEventListener('click', () => {
  const btn = document.getElementById('doPublishBtn');
  btn.textContent = '🚀 Publishing…';
  setTimeout(() => {
    btn.textContent = '✓ Published! View page →';
    btn.style.background = '#10b981';
    setTimeout(() => {
      document.getElementById('publishModal').classList.remove('open');
      btn.textContent = '🚀 Publish now';
      btn.style.background = '';
    }, 2000);
  }, 1200);
});

/* ── SAVE DRAFT ───────────────────────────────────────── */
function showToast(msg = '✓ Draft saved') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.style.transform = 'translateY(0)';
  toast.style.opacity = '1';
  setTimeout(() => {
    toast.style.transform = 'translateY(80px)';
    toast.style.opacity = '0';
  }, 2500);
}

document.getElementById('saveDraftBtn').addEventListener('click', () => showToast('✓ Draft saved'));

document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key === 's') {
    e.preventDefault();
    showToast('✓ Saved');
  }
  if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
    e.preventDefault();
    showToast('↩ Undo (demo)');
  }
});

/* ── UNDO / REDO BUTTONS ──────────────────────────────── */
document.getElementById('undoBtn').addEventListener('click', () => showToast('↩ Undo'));
document.getElementById('redoBtn').addEventListener('click', () => showToast('↪ Redo'));

/* ── PREVIEW ──────────────────────────────────────────── */
document.getElementById('previewBtn').addEventListener('click', () => {
  const html = document.getElementById('canvasInner').innerHTML;
  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet"><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:Inter,sans-serif}[contenteditable]{outline:none}.canvas-section__handle,.canvas-section__actions,.add-section-btn{display:none!important}.canvas-section{border:none!important}</style></head><body>${html}</body></html>`);
  win.document.close();
});

/* ── ADD PAGE BUTTON ──────────────────────────────────── */
const addPageBtn = document.getElementById('addPageBtn');
if (addPageBtn) {
  addPageBtn.addEventListener('click', () => {
    showToast('📄 New page created');
  });
}
