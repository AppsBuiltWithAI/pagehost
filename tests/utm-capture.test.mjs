// KAN-1135: the six UTM parameters are read on page load, kept until the form is
// sent, and passed on as received, with missing ones left out.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import utm from '../utm-capture.js';

const NAMES = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id'];
const ALL = '?utm_source=meta&utm_medium=paid_social&utm_campaign=Launch%20Q4&utm_content=video-a&utm_term=ai+apps&utm_id=cmp_123';
const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

function fakeWindow({ search = '', gpc = false, store = new Map(), storageThrows = false } = {}) {
  const denied = () => { throw new Error('storage denied'); };
  return {
    location: { search },
    navigator: { globalPrivacyControl: gpc },
    sessionStorage: storageThrows
      ? { getItem: denied, setItem: denied, removeItem: denied }
      : {
        getItem: (k) => (store.has(k) ? store.get(k) : null),
        setItem: (k, v) => store.set(k, v),
        removeItem: (k) => store.delete(k),
      },
  };
}

test('the names are exactly the six the ticket lists', () => {
  assert.deepEqual(utm.KEYS, NAMES);
});

test('all six in the URL come back with the values as received', () => {
  const { utm: out } = utm.resolve({ search: ALL });
  assert.deepEqual(out, {
    utm_source: 'meta', utm_medium: 'paid_social', utm_campaign: 'Launch Q4',
    utm_content: 'video-a', utm_term: 'ai apps', utm_id: 'cmp_123',
  });
});

test('values are not lowercased, trimmed or otherwise altered', () => {
  const { utm: out } = utm.resolve({ search: '?utm_source=%20Meta%20&utm_campaign=SPRING_Sale' });
  assert.equal(out.utm_source, ' Meta ');
  assert.equal(out.utm_campaign, 'SPRING_Sale');
});

test('only the parameters present are sent; the rest are omitted, not blank', () => {
  const { utm: out } = utm.resolve({ search: '?utm_source=google&utm_medium=&utm_term=%20%20' });
  assert.deepEqual(out, { utm_source: 'google' });
});

test('other query parameters and look-alike names are ignored', () => {
  const { utm: out } = utm.resolve({ search: '?fbclid=abc&UTM_SOURCE=x&utm_source_extra=y&ref=z&utm_source=ok' });
  assert.deepEqual(out, { utm_source: 'ok' });
});

test('values that are too long or hold control characters are dropped', () => {
  const long = 'a'.repeat(utm.MAX_LENGTH + 1);
  const { utm: out } = utm.resolve({
    search: `?utm_source=${long}&utm_medium=bad%0Avalue&utm_campaign=${'a'.repeat(utm.MAX_LENGTH)}`,
  });
  assert.deepEqual(Object.keys(out), ['utm_campaign']);
});

test('a later page with no UTMs gets the saved ones back', () => {
  const first = utm.resolve({ search: ALL });
  const later = utm.resolve({ search: '?page=2', stored: first.record });
  assert.deepEqual(later.utm, first.utm);
});

test('a new visit with UTMs replaces the saved set as a whole (last touch)', () => {
  const first = utm.resolve({ search: ALL });
  const later = utm.resolve({ search: '?utm_source=tiktok', stored: first.record });
  assert.deepEqual(later.utm, { utm_source: 'tiktok' });
});

test('saved values in the wrong shape are ignored', () => {
  const { utm: out } = utm.resolve({
    stored: { utm_source: ['x'], utm_medium: 5, utm_campaign: 'ok', extra: 'no', utm_term: '' },
  });
  assert.deepEqual(out, { utm_campaign: 'ok' });
});

test('Global Privacy Control: nothing is read, sent or remembered', () => {
  assert.deepEqual(utm.resolve({ search: ALL, stored: { utm_source: 'x' }, optedOut: true }), { utm: {}, record: null });
});

test('the landing page keeps the UTMs and the form, on a later load, gets them', () => {
  const store = new Map();
  utm.capture(fakeWindow({ search: ALL, store }));
  assert.equal(JSON.parse(store.get(utm.STORAGE_KEY)).utm_id, 'cmp_123');
  // A reload or another page in the same tab, with no UTMs in its URL.
  const submitted = utm.capture(fakeWindow({ search: '', store }));
  assert.equal(Object.keys(submitted).length, 6);
  assert.equal(submitted.utm_source, 'meta');
});

test('with storage blocked the values still last for this page', () => {
  utm.capture(fakeWindow({ search: '?utm_source=blocked', storageThrows: true }));
  assert.deepEqual(utm.capture(fakeWindow({ search: '', storageThrows: true })), { utm_source: 'blocked' });
});

test('Global Privacy Control in the browser removes what was saved', () => {
  const store = new Map();
  utm.capture(fakeWindow({ search: ALL, store }));
  assert.deepEqual(utm.capture(fakeWindow({ search: ALL, store, gpc: true })), {});
  assert.equal(store.size, 0);
});

test('the pages send them: the form adds them to the Forms API data, the head script reads them on load', () => {
  assert.match(read('waitlist-flow.jsx'), /const utm = window\.abwUtm \? window\.abwUtm\.capture\(\) : \{\};/);
  assert.match(read('waitlist-flow.jsx'), /source: "waitlist_investfest",\s*\.\.\.utm,/);
  const html = read('waitlist-landing.html');
  assert.ok(html.indexOf('utm-capture.js') > -1 && html.indexOf('utm-capture.js') < html.indexOf('waitlist-flow.jsx'));
  assert.match(html, /window\.abwUtm && window\.abwUtm\.capture\(\)/);
});

test('the sign-up link to the app carries them in the fragment', () => {
  const source = read('website/meta-attribution.js');
  assert.match(source, /import utm from '\.\.\/utm-capture\.js'/);
  assert.match(source, /for \(const \[name, value\] of Object\.entries\(utm\.capture\(\)\)\) attribution\.set\(name, value\)/);
  assert.match(read('website/entry.jsx'), /captureUtm\(\);/);
});

test('no browser events are added: the helper never calls Customer.io', () => {
  assert.doesNotMatch(read('utm-capture.js'), /_cio|\.track\(|identify/);
});
