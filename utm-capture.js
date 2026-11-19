// UTM parameters for the waitlist and sign-up sync to Customer.io (KAN-1135).
//
// An ad lands on the page with ?utm_source=...&utm_campaign=... in the URL, but
// the visitor signs up later, often on another page or after a reload. This
// remembers the values for the tab so the form can send them.
//
// One file, two ways in: pages load it with a <script> tag (it sets
// window.abwUtm), and the site bundle imports it (website/meta-attribution.js).
//
// Rules:
//  - the six names below, exactly, and only those;
//  - values are kept as received: not trimmed, lowercased, hashed or encoded;
//  - a parameter that is missing, empty or not a plain short string is left
//    out, never sent blank;
//  - the newest visit that carries any UTM replaces the saved set as a whole
//    (last touch), so a profile never gets a mix of two campaigns; a visit
//    with none keeps what is saved;
//  - nothing is read, saved or sent when the visitor sends Global Privacy
//    Control, the same as the Meta IDs (KAN-995).
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.abwUtm = api;
})(typeof window !== 'undefined' ? window : null, function () {
  var KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id'];
  var STORAGE_KEY = 'abw_utm';
  // The app applies the same limit (src/helpers/utmAttribution.js there); longer is not a campaign tag.
  var MAX_LENGTH = 512;
  var CONTROL = /[\u0000-\u001f\u007f]/;

  function usable(value) {
    return typeof value === 'string' && value.trim() !== '' && value.length <= MAX_LENGTH && !CONTROL.test(value);
  }

  // Keep only the six names, and only values that are usable.
  function pick(source) {
    var out = {};
    if (!source || typeof source !== 'object') return out;
    for (var i = 0; i < KEYS.length; i++) {
      if (Object.prototype.hasOwnProperty.call(source, KEYS[i]) && usable(source[KEYS[i]])) {
        out[KEYS[i]] = source[KEYS[i]];
      }
    }
    return out;
  }

  function fromSearch(search) {
    var params = new URLSearchParams(search || '');
    var found = {};
    for (var i = 0; i < KEYS.length; i++) {
      var value = params.get(KEYS[i]);
      if (value !== null) found[KEYS[i]] = value;
    }
    return pick(found);
  }

  /**
   * Work out the UTMs for this visit. Pure: no browser needed.
   * @param {{ search?: string, stored?: object|null, optedOut?: boolean }} input
   * @returns {{ utm: object, record: object|null }} utm is what to send; record
   *   is what to remember (null: remember nothing)
   */
  function resolve(input) {
    input = input || {};
    if (input.optedOut) return { utm: {}, record: null };
    var current = fromSearch(input.search);
    var utm = Object.keys(current).length ? current : pick(input.stored);
    return { utm: utm, record: Object.keys(utm).length ? Object.assign({}, utm) : null };
  }

  // Storage can be missing or refuse writes (private windows, blocked cookies).
  // The values then live in memory for this page only.
  var memory = null;

  function readStored(win) {
    try {
      var raw = win.sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : memory;
    } catch (e) {
      return memory;
    }
  }

  function writeStored(win, record) {
    memory = record;
    try {
      if (record) win.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(record));
      else win.sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) { /* kept in memory above */ }
  }

  /**
   * Read this page's UTMs, remember them, and return what a form should send.
   * Safe to call on every page load and again at submit time.
   */
  function capture(win) {
    win = win || (typeof window === 'undefined' ? null : window);
    if (!win) return {};
    try {
      var out = resolve({
        search: win.location && win.location.search,
        stored: readStored(win),
        optedOut: !!(win.navigator && win.navigator.globalPrivacyControl === true),
      });
      writeStored(win, out.record);
      return out.utm;
    } catch (e) {
      return {};
    }
  }

  return { KEYS: KEYS, STORAGE_KEY: STORAGE_KEY, MAX_LENGTH: MAX_LENGTH, pick: pick, resolve: resolve, capture: capture };
});
