const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const Babel = require('@babel/standalone');
const React = require('react');
const { createHash } = require('node:crypto');
const { renderToStaticMarkup } = require('react-dom/server');

function site(files = [], hash = '') {
  const dom = new JSDOM('<div id="root"></div>', {
    url: 'http://localhost/' + hash, runScripts: 'outside-only', pretendToBeVisual: true,
  });
  dom.window.React = React;
  for (const file of ['part1.jsx', ...files]) {
    dom.window.eval(Babel.transform(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), {
      presets: ['env', 'react'], filename: file,
    }).code);
  }
  return {
    window: dom.window,
    render(Component, props = {}) {
      const html = renderToStaticMarkup(React.createElement(Component, props));
      return new JSDOM(html).window.document;
    },
  };
}

test('shared navigation does not promote unavailable import', () => {
  const s = site();
  const doc = s.render(s.window.PoofPart1.Nav);
  assert.equal(doc.querySelectorAll('a[href*="import.html"]').length, 0);
  assert.equal(doc.querySelectorAll('a[href="summit.html"]').length, 0);
  assert.doesNotMatch(doc.body.textContent, /import your|now in beta/i);
});

test('marketing preview is labeled coming soon and has no trial CTA', () => {
  const s = site(['part-agents.jsx']);
  const doc = s.render(s.window.PoofAgents.Agents);
  const marketing = [...doc.querySelectorAll('.agent-tile')].find(el => /Tribe Finder|marketing agent/i.test(el.textContent));
  assert.ok(marketing, 'Marketing preview remains visible');
  assert.match(marketing.textContent, /coming soon/i);
  assert.doesNotMatch(marketing.textContent, /try the marketing/i);
});

test('unknown marketing status keeps the launch preview unavailable', () => {
  for (const status of [undefined, null, '', 'unknown']) {
    const s = site(['part-agents.jsx']);
    s.window.ABWAI = { ...s.window.ABWAI, marketing: status };
    const doc = s.render(s.window.PoofAgents.Agents);
    const marketing = [...doc.querySelectorAll('.agent-tile')].find(el => /Tribe Finder/.test(el.textContent));
    assert.match(marketing.textContent, /Coming soon/);
    assert.equal(marketing.querySelectorAll('a,button').length, 0);
  }
});

test('navigation labels every unavailable marketing item', () => {
  const s = site();
  const doc = s.render(s.window.PoofPart1.Nav);
  const marketing = doc.querySelector('.mega-soon');
  assert.equal(marketing.querySelectorAll('a').length, 3);
  for (const link of marketing.querySelectorAll('a')) assert.match(link.textContent, /Coming soon/);
});

test('pricing makes no permanent rate guarantee', () => {
  const s = site(['part3.jsx', 'comparison.jsx', 'pricing-page.jsx']);
  const doc = s.render(s.window.PricingPage);
  assert.doesNotMatch(doc.body.textContent, /price.locked forever|your rate stays the same/i);
});

test('public sign-in and signup hand off to the real app without simulated forms', () => {
  for (const [file, name] of [['signin-page.jsx', 'SignInPage'], ['signup-page.jsx', 'SignUpPage']]) {
    const s = site([file]);
    const doc = s.render(s.window[name]);
    assert.equal(doc.querySelectorAll('form,input').length, 0);
    const link = doc.querySelector('a');
    assert.equal(link.href, 'https://app.appsbuiltwithai.com/dashboard/home');
    assert.equal(link.target, '_blank');
    assert.match(link.rel, /noopener/);
  }
});

test('resources link to verified help inventory rather than nonexistent courses', () => {
  const s = site(['resources-page.jsx']);
  const doc = s.render(s.window.ResourcesPage);
  assert.equal(doc.querySelectorAll('a:not([href]),a[href="#"]').length, 0);
  assert.doesNotMatch(doc.body.textContent, /learners|Start course|12,400/);
  const links = [...doc.querySelectorAll('a[target="_blank"]')];
  assert.ok(links.length > 0);
  assert.ok(links.every(link => link.href === s.window.ABWAI.supportUrl));
});

test('homepage and standalone pricing use identical plan facts', () => {
  const s = site(['part3.jsx', 'comparison.jsx', 'pricing-page.jsx']);
  const home = s.render(s.window.PoofPart3.Pricing);
  const page = s.render(s.window.PricingPage);
  for (const plan of s.window.ABWAI.plans) {
    assert.equal(home.querySelector(`[data-plan="${plan.id}"]`).textContent,
      page.querySelector(`[data-plan="${plan.id}"]`).textContent);
  }
});

test('FAQ hides collapsed answers and footer does not offer nonexistent translations', () => {
  const s = site(['part3.jsx']);
  const faq = s.render(s.window.PoofPart3.FAQ);
  assert.equal(faq.querySelectorAll('.faq-a:not([hidden])').length, 1);
  const footer = s.render(s.window.PoofPart3.Footer);
  assert.equal(footer.querySelectorAll('[aria-label="Change language"]').length, 0);
  assert.equal(footer.querySelector('.footer-language').textContent, 'English');
});

test('copying an idea reports success and clipboard failure selects the original text', async () => {
  const s = site();
  global.window = s.window;
  global.document = s.window.document;
  global.requestAnimationFrame = s.window.requestAnimationFrame.bind(s.window);
  global.IS_REACT_ACT_ENVIRONMENT = true;
  let copied;
  const clipboard = { writeText: async text => { copied = text; } };
  Object.defineProperty(s.window.navigator, 'clipboard', { configurable: true, value: clipboard });
  const { createRoot } = require('react-dom/client');
  const root = createRoot(document.getElementById('root'));
  try {
    await React.act(async () => root.render(React.createElement(s.window.PoofPart1.PromptBox, { value: 'A booking page' })));
    const button = document.querySelector('button');
    await React.act(async () => button.click());
    assert.equal(copied, 'A booking page');
    assert.match(document.querySelector('[role="status"]').textContent, /Idea copied/);
    clipboard.writeText = async () => { throw new Error('Clipboard unavailable'); };
    await React.act(async () => button.click());
    const input = document.querySelector('textarea');
    assert.equal(document.activeElement, input);
    assert.equal(input.selectionEnd, input.value.length);
    assert.match(document.querySelector('[role="status"]').textContent, /Select and copy/);
  } finally {
    await React.act(async () => root.unmount());
    s.window.close();
    for (const key of ['window', 'document', 'requestAnimationFrame']) delete global[key];
  }
});

test('billing toggle updates the displayed prices and selected state', async () => {
  const s = site(['part3.jsx']);
  global.window = s.window;
  global.document = s.window.document;
  global.requestAnimationFrame = s.window.requestAnimationFrame.bind(s.window);
  global.IS_REACT_ACT_ENVIRONMENT = true;
  const { createRoot } = require('react-dom/client');
  const root = createRoot(document.getElementById('root'));
  try {
    await React.act(async () => root.render(React.createElement(s.window.PoofPart3.Pricing)));
    assert.match(document.querySelector('[data-plan="pro"] .price-amt').textContent, /79/);
    const monthly = [...document.querySelectorAll('button')].find(el => el.textContent === 'Monthly');
    await React.act(async () => monthly.dispatchEvent(new s.window.MouseEvent('click', { bubbles: true })));
    assert.equal(monthly.getAttribute('aria-pressed'), 'true');
    assert.match(document.querySelector('[data-plan="pro"] .price-amt').textContent, /99/);
  } finally {
    await React.act(async () => root.unmount());
    s.window.close();
    delete global.window;
    delete global.document;
    delete global.requestAnimationFrame;
  }
});

test('feature and use-case pages expose real destinations and explicit marketing status', () => {
  const s = site(['features-page.jsx', 'use-cases-page.jsx']);
  const features = s.render(s.window.FeaturesPage);
  for (const id of ['build', 'test', 'secure', 'launch', 'marketing']) assert.ok(features.getElementById(id));
  const marketing = features.getElementById('marketing');
  assert.match(marketing.textContent, /coming soon/i);
  assert.equal(marketing.querySelectorAll('a,button').length, 0);
  const cases = s.render(s.window.UseCasesPage);
  assert.match(cases.body.textContent, /illustrative examples/i);
  for (const file of ['features.html', 'use-cases.html']) assert.ok(fs.existsSync(path.join(__dirname, '..', file)));
});

test('comparison credits competitors for building and testing and labels our marketing as future', () => {
  const s = site(['comparison.jsx']);
  const doc = s.render(s.window.ProductComparison);
  const table = doc.querySelector('table');
  assert.match(table.textContent, /Lovable/);
  assert.match(table.textContent, /Replit/);
  assert.match(table.textContent, /Hiring a developer/);
  const marketing = [...table.querySelectorAll('tr')].find(el => el.querySelector('th')?.textContent === 'Marketing');
  assert.match(marketing.querySelector('td').textContent, /Coming soon/);
  assert.doesNotMatch(table.textContent, /~25 min|only.*mockup|not available|surprise bills/i);
});

test('public navigation and footer local routes exist', () => {
  const s = site(['part3.jsx']);
  for (const Component of [s.window.PoofPart1.Nav, s.window.PoofPart3.Footer]) {
    const doc = s.render(Component);
    for (const link of doc.querySelectorAll('a[href]')) {
      const href = link.getAttribute('href');
      if (/^(https?:|mailto:|#)/.test(href)) continue;
      assert.ok(fs.existsSync(path.join(__dirname, '..', href.split(/[?#]/)[0])), `Missing destination: ${href}`);
    }
  }
});

test('navigation disclosure supports hover, switching, Escape focus, outside dismissal and mobile state', async () => {
  const s = site();
  let hoverDesktop = true;
  s.window.matchMedia = () => ({ matches: hoverDesktop, addEventListener() {}, removeEventListener() {} });
  global.window = s.window;
  global.document = s.window.document;
  global.requestAnimationFrame = s.window.requestAnimationFrame.bind(s.window);
  global.localStorage = s.window.localStorage;
  global.IS_REACT_ACT_ENVIRONMENT = true;
  const { createRoot } = require('react-dom/client');
  const root = createRoot(document.getElementById('root'));
  const click = async (el, detail = 0) => React.act(async () => el.dispatchEvent(new s.window.MouseEvent('click', { bubbles: true, detail })));
  try {
    await React.act(async () => root.render(React.createElement(s.window.PoofPart1.Nav)));
    const buttons = [...document.querySelectorAll('button')];
    const features = buttons.find(el => el.textContent.trim() === 'Features');
    const resources = buttons.find(el => el.textContent.trim() === 'Resources');
    const featurePanel = document.getElementById(features.getAttribute('aria-controls'));
    const resourcePanel = document.getElementById(resources.getAttribute('aria-controls'));
    assert.equal(featurePanel.hidden, true);
    const pointer = async (el, type, pointerType = 'mouse', relatedTarget = null) => React.act(async () => {
      const event = new s.window.MouseEvent(type, { bubbles: true, relatedTarget });
      Object.defineProperty(event, 'pointerType', { value: pointerType });
      el.dispatchEvent(event);
    });
    await pointer(features, 'pointerover', 'touch');
    assert.equal(featurePanel.hidden, true, 'touch does not open menus on rollover');
    await pointer(features, 'pointerover');
    assert.equal(featurePanel.hidden, false, 'mouse rollover opens Features without a click');
    await pointer(features, 'pointerdown');
    await click(features, 1);
    assert.equal(featurePanel.hidden, false, 'click after mouse rollover keeps the menu open');
    await pointer(features, 'pointerout', 'mouse', resources);
    await pointer(resources, 'pointerover', 'mouse', features);
    assert.equal(featurePanel.hidden, true);
    assert.equal(resourcePanel.hidden, false, 'mouse rollover switches to Resources');
    const resourceLink = resourcePanel.querySelector('a');
    await React.act(async () => resourceLink.focus());
    await pointer(resources, 'pointerout', 'mouse', features);
    assert.equal(resourcePanel.hidden, false, 'hover cannot hide a panel containing keyboard focus');
    assert.equal(document.activeElement, resourceLink);
    await React.act(async () => resourceLink.blur());
    await pointer(resources, 'pointerout', 'mouse', document.body);
    await React.act(async () => new Promise(resolve => setTimeout(resolve, 200)));
    assert.equal(resourcePanel.hidden, true, 'leaving the header dismisses the hover menu');
    await click(features);
    assert.equal(features.getAttribute('aria-expanded'), 'true');
    assert.equal(featurePanel.hidden, false);
    await click(resources);
    assert.equal(featurePanel.hidden, true);
    assert.equal(resourcePanel.hidden, false);
    await React.act(async () => document.dispatchEvent(new s.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true })));
    assert.equal(resourcePanel.hidden, true);
    assert.equal(document.activeElement, resources);
    await click(features);
    await React.act(async () => document.body.dispatchEvent(new s.window.Event('pointerdown', { bubbles: true })));
    assert.equal(featurePanel.hidden, true);
    const mobile = document.querySelector('.mobile-menu-toggle');
    hoverDesktop = false;
    await click(mobile);
    assert.equal(mobile.getAttribute('aria-expanded'), 'true');
    await pointer(features, 'pointerdown');
    await click(features, 1);
    await pointer(features, 'pointerout', 'mouse', document.body);
    await React.act(async () => new Promise(resolve => setTimeout(resolve, 200)));
    assert.equal(featurePanel.hidden, false, 'mobile click-open menu is unaffected by mouse leave');
    await click(features);
    await React.act(async () => document.dispatchEvent(new s.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true })));
    assert.equal(mobile.getAttribute('aria-expanded'), 'false');
    assert.equal(document.activeElement, mobile);
  } finally {
    await React.act(async () => root.unmount());
    s.window.close();
    for (const key of ['window', 'document', 'requestAnimationFrame', 'localStorage']) delete global[key];
  }
});

test('legacy template export retains its layout and existing example destination', () => {
  const s = site(['part2.jsx']);
  const gallery = s.render(s.window.PoofPart2.Templates);
  assert.equal(gallery.querySelectorAll('.tpl-card').length, 8);
  assert.equal(gallery.querySelectorAll('.tpl-card a').length, 0);
  assert.equal(gallery.querySelector('.homepage-examples-link a').getAttribute('href'), 'use-cases.html');
  assert.equal(gallery.querySelectorAll('image-slot,a:not([href])').length, 0);
  for (const img of gallery.querySelectorAll('img')) {
    assert.ok(fs.existsSync(path.join(__dirname, '..', img.getAttribute('src'))));
    assert.ok(img.alt.length > 10);
  }
  const features = s.render(s.window.PoofPart1.Features);
  assert.equal(features.querySelectorAll('image-slot').length, 0);
  const waitlistFeatures = s.render(s.window.PoofPart1.Features, { onStart() {} });
  assert.ok(Array.from(waitlistFeatures.querySelectorAll('.feature-copy button')).every(button => button.textContent.includes('Join the waitlist')));
});

test('walkthrough isolates vendor scripts and skips them on direct navigation', () => {
  const s = site(['part-agents.jsx']);
  const frame = s.render(s.window.PoofAgents.Agents).querySelector('iframe.home-video');
  assert.equal(frame.getAttribute('src'), 'home-video.html');
  assert.equal(frame.getAttribute('sandbox'), 'allow-scripts');
  const wrapper = new JSDOM(fs.readFileSync(path.join(__dirname, '../home-video.html'), 'utf8'));
  const source = wrapper.window.document.querySelector('script').textContent;
  const vm = require('node:vm');
  for (const embedded of [false, true]) {
    const scripts = [];
    let redirect;
    const window = { location: { replace(url) { redirect = url; } } };
    window.top = embedded ? {} : window;
    vm.runInNewContext(source, { window, document: { createElement() { return {}; }, body: { appendChild(script) { scripts.push(script.src); } } } });
    assert.equal(redirect, embedded ? undefined : 'index.html');
    assert.deepEqual(scripts, embedded ? ['https://embed.voomly.com/embed/embed-build.js'] : []);
  }
  wrapper.window.close();
  s.window.close();
});

test('homepage retains the original owner-approved statistics', () => {
  const s = site(['part2.jsx']);
  const stats = s.render(s.window.PoofPart2.Stats);
  assert.deepEqual(Array.from(stats.querySelectorAll('.stat .num'), node => node.textContent), ['9 min', '200K+', '0']);
  assert.equal(stats.querySelectorAll('.stat').length, 3);
  assert.match(stats.body.textContent, /Lines of code/);
});

test('booking and dashboard examples have real local interactions without submitting data', () => {
  const options = { runScripts: 'dangerously', url: 'http://localhost/examples/' };
  const booking = new JSDOM(fs.readFileSync(path.join(__dirname, '../examples/booking.html'), 'utf8'), options);
  booking.window.document.querySelectorAll('.booking-days button')[1].click();
  booking.window.document.querySelectorAll('.booking-times button')[2].click();
  booking.window.document.getElementById('preview-booking').click();
  assert.match(booking.window.document.getElementById('booking-status').textContent, /22 Thursday at 2:00 PM/);
  assert.match(booking.window.document.getElementById('booking-status').textContent, /No booking has been sent/);
  const operations = new JSDOM(fs.readFileSync(path.join(__dirname, '../examples/operations.html'), 'utf8'), options);
  operations.window.document.querySelector('[data-filter="Ready"]').click();
  assert.equal(operations.window.document.querySelectorAll('tr[data-status]:not([hidden])').length, 2);
  operations.window.document.querySelector('[data-filter="In progress"]').click();
  assert.equal(operations.window.document.querySelectorAll('tr[data-status]:not([hidden])').length, 1);
  booking.window.close();
  operations.window.close();
});

test('public pages use versioned components and all referenced scripts exist', () => {
  for (const name of ['index', 'features', 'use-cases', 'how-it-works', 'compare', 'pricing', 'resources', 'signin', 'signup', 'connectors']) {
    const doc = new JSDOM(fs.readFileSync(path.join(__dirname, '..', name + '.html'), 'utf8')).window.document;
    for (const script of doc.querySelectorAll('script[src]')) {
      const src = script.getAttribute('src');
      if (src.startsWith('https://')) continue;
      assert.ok(fs.existsSync(path.join(__dirname, '..', src.split('?')[0])), `${name}: ${src}`);
      assert.match(src, /\?v=launch-/, `${name}: version changed scripts`);
      const [asset, query] = src.split('?');
      const hash = createHash('sha256').update(fs.readFileSync(path.join(__dirname, '..', asset))).digest('hex').slice(0, 12);
      assert.equal(new URLSearchParams(query).get('v'), 'launch-' + hash, `${name}: script hash reflects current contents`);
    }
    assert.match(doc.querySelector('link[href^="styles.css"]').getAttribute('href'), /\?v=launch-/);
    const sheets = [...doc.querySelectorAll('link[rel="stylesheet"]')].map(link => link.getAttribute('href'));
    const brand = sheets.findIndex(href => href.startsWith('launch-brand.css'));
    if (name === 'index') assert.equal(brand, -1, 'homepage uses its original stylesheet');
    else {
      assert.ok(brand > sheets.findIndex(href => href.startsWith('styles.css')), `${name}: brand styles load after shared styles`);
      assert.match(sheets[brand], /\?v=launch-/);
    }
    for (const href of sheets.filter(href => !href.startsWith('https://'))) {
      const [asset, query] = href.split('?');
      const hash = createHash('sha256').update(fs.readFileSync(path.join(__dirname, '..', asset))).digest('hex').slice(0, 12);
      assert.equal(new URLSearchParams(query).get('v'), 'launch-' + hash, `${name}: stylesheet hash reflects current contents`);
    }
  }
});

test('actual HTML entry points compile and mount a complete page', () => {
  for (const name of ['index', 'features', 'use-cases', 'how-it-works', 'pricing', 'compare', 'resources', 'signin', 'signup', 'connectors']) {
    const source = fs.readFileSync(path.join(__dirname, '..', name + '.html'), 'utf8');
    const dom = new JSDOM(source, { runScripts: 'outside-only', url: 'http://localhost/' });
    let mounted;
    dom.window.React = React;
    dom.window.ReactDOM = { createRoot: () => ({ render: element => { mounted = element; } }) };
    if (name === 'index') dom.window.eval(fs.readFileSync(path.join(__dirname, '../homepage-original.js'), 'utf8'));
    for (const script of dom.window.document.querySelectorAll('script[type="text/babel"]')) {
      const src = script.getAttribute('src');
      const code = src ? fs.readFileSync(path.join(__dirname, '..', src.split('?')[0]), 'utf8') : script.textContent;
      dom.window.eval(Babel.transform(code, { presets: ['env', 'react'], filename: src || name + '-bootstrap.jsx' }).code);
    }
    assert.ok(mounted, `${name} mounts`);
    const result = new JSDOM(renderToStaticMarkup(mounted)).window.document;
    assert.equal(result.querySelectorAll('h1').length, 1, `${name} has a page heading`);
    assert.equal(result.querySelectorAll('main').length, 1, `${name} has one main landmark`);
    if (name !== 'index') assert.equal(result.querySelectorAll('image-slot').length, 0, `${name} has no authoring placeholders`);
    const announcement = result.querySelector('.summit-announcement');
    assert.equal(announcement?.querySelector('strong')?.textContent, 'Join the summit', `${name} announces the summit`);
    assert.equal(result.querySelectorAll('.topbar').length, 1, `${name} has only the summit announcement`);
    assert.equal(announcement.querySelectorAll('a, button').length, 0, `${name} waits for the real summit URL`);
    assert.equal(result.querySelectorAll('header a[href="summit.html"]').length, 0, `${name} has no placeholder Summit navigation`);
    if (name === 'index') {
      assert.equal(result.querySelector('.logos-label').firstChild.textContent, 'Being built right now by');
      const builders = ['Bakers', 'Authors', 'Coaches', 'Photographers', 'Florists', 'Studios', 'Therapists', 'Tutors', 'Yoga teachers', 'Shop owners', 'Consultants', 'Nonprofits'];
      assert.deepEqual([...result.querySelectorAll('.logos .logo-item')].map(item => item.textContent), [...builders, ...builders]);
      const sections = [...result.querySelectorAll('main [data-screen-label]')].map(node => node.getAttribute('data-screen-label'));
      assert.deepEqual(sections, ['hero', 'differentiator', 'agents', 'alive', 'features', 'pricing', 'faq', 'final-cta'], 'homepage matches the AWS original with the approved pricing exception');
      assert.equal(result.querySelector('h1').textContent, 'Build websites & apps with AI.');
      assert.equal(result.querySelector('.price-card.featured').getAttribute('data-plan'), 'growth');
      assert.match(result.querySelector('#pricing h2').textContent, /Start free\.Pay when it works\./);
      assert.equal(result.querySelectorAll('footer .fstage').length, 1, 'original animated footer is restored');
      assert.equal(result.querySelectorAll('footer .footer-news').length, 1, 'original footer markup is retained');
      assert.equal(result.querySelectorAll('header .mega-panel').length, 2, 'approved navigation is retained');
    }
    dom.window.close();
  }
});

test('original homepage source and footer match the pinned upstream files byte for byte', () => {
  const directory = path.join(__dirname, '../homepage-original');
  const manifest = JSON.parse(fs.readFileSync(path.join(directory, 'manifest.json'), 'utf8'));
  assert.equal(manifest.revision, '3719da445463477a1bc79bc73b24b8339991183b');
  for (const [name, record] of Object.entries(manifest.files)) {
    const bytes = fs.readFileSync(path.join(directory, 'source', name));
    assert.equal(createHash('sha256').update(bytes).digest('hex'), record.sha256, name);
  }
});

test('client-rendered fragment links reach their destination after mount and on navigation', async () => {
  const s = site([], '#test');
  const calls = [];
  s.window.HTMLElement.prototype.scrollIntoView = function (options) { calls.push({ id: this.id, block: options.block }); };
  global.window = s.window;
  global.document = s.window.document;
  global.IS_REACT_ACT_ENVIRONMENT = true;
  const { createRoot } = require('react-dom/client');
  const root = createRoot(document.getElementById('root'));
  try {
    await React.act(async () => root.render(React.createElement(React.Fragment, null,
      React.createElement(s.window.PoofPart1.Nav),
      React.createElement('section', { id: 'test' }),
      React.createElement('section', { id: 'marketing' }))));
    assert.equal(calls[0]?.id, 'test', 'initial fragment scrolls after client content mounts');
    assert.equal(calls[0].block, 'start');
    s.window.history.replaceState({}, '', '#marketing');
    s.window.dispatchEvent(new s.window.HashChangeEvent('hashchange'));
    assert.equal(calls.at(-1).id, 'marketing');
    const errors = [];
    s.window.addEventListener('error', event => { errors.push(event.error); event.preventDefault(); });
    const beforeMalformed = calls.length;
    s.window.history.replaceState({}, '', '#%E0%A4%A');
    s.window.dispatchEvent(new s.window.HashChangeEvent('hashchange'));
    assert.equal(errors.length, 0, 'malformed fragments do not raise errors inside the listener');
    assert.equal(calls.length, beforeMalformed);
    await React.act(async () => root.unmount());
    const persistentTarget = document.createElement('section');
    persistentTarget.id = 'test';
    document.body.appendChild(persistentTarget);
    const count = calls.length;
    s.window.history.replaceState({}, '', '#test');
    s.window.dispatchEvent(new s.window.HashChangeEvent('hashchange'));
    assert.equal(calls.length, count, 'listener is removed when navigation unmounts');
  } finally {
    await React.act(async () => root.unmount());
    s.window.close();
    delete global.window;
    delete global.document;
  }
});

module.exports = { site };
