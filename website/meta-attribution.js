const SESSION_KEY = 'abw_meta_fbc';
const CLICK_ID = /^[A-Za-z0-9_-]{1,1024}$/;
const FBC = /^fb\.\d+\.(\d{13})\.([A-Za-z0-9_-]{1,1024})$/;
const FBP = /^fb\.\d+\.\d{13}\.\d{1,20}$/;
const MAX_CLICK_AGE_MS = 90 * 24 * 60 * 60 * 1000;

function readCookie(name) {
  const prefix = name + '=';
  try {
    return document.cookie.split(';').map(cookie => cookie.trim())
      .find(cookie => cookie.startsWith(prefix))?.slice(prefix.length) || '';
  } catch {
    return '';
  }
}

export function captureMetaClick() {
  if (navigator.globalPrivacyControl === true) return '';

  const now = Date.now();
  const clickId = new URLSearchParams(window.location.search).get('fbclid') || '';
  const cookie = readCookie('_fbc');
  const cookieMatch = FBC.exec(cookie);
  let stored = '';
  try { stored = window.sessionStorage.getItem(SESSION_KEY) || ''; } catch { /* storage may be blocked */ }
  const storedMatch = FBC.exec(stored);
  const storedTime = Number(storedMatch?.[1]);
  const hasRecentClick = storedMatch && now - storedTime <= MAX_CLICK_AGE_MS;

  if (!CLICK_ID.test(clickId)) {
    if (hasRecentClick && (!cookieMatch || storedTime > Number(cookieMatch[1]))) return stored;
    return cookieMatch ? cookie : '';
  }

  let fbc = `fb.1.${now}.${clickId}`;
  if (cookieMatch?.[2] === clickId) fbc = cookie;
  else if (hasRecentClick && storedMatch[2] === clickId) fbc = stored;
  try { window.sessionStorage.setItem(SESSION_KEY, fbc); } catch { /* keep it in memory for this page */ }
  return fbc;
}

export function withSignupAttribution(destination, appOrigin, fbc) {
  const url = new URL(destination, window.location.href);
  if (url.origin !== appOrigin || url.pathname !== '/signup' || navigator.globalPrivacyControl === true) {
    return destination;
  }

  const attribution = new URLSearchParams();
  const click = fbc || readCookie('_fbc');
  const fbp = readCookie('_fbp');
  if (FBC.test(click)) attribution.set('fbc', click);
  if (FBP.test(fbp)) attribution.set('fbp', fbp);
  const fragment = attribution.toString();
  if (!fragment) return destination;

  // The app reads attribution from the fragment, which stays out of HTTP requests.
  url.hash += (url.hash ? '&' : '') + fragment;
  return url.href;
}
