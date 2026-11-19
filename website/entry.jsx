import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import SiteApp from './src/site/SiteApp.jsx';
import { captureMetaClick, captureUtm, withSignupAttribution } from './meta-attribution.js';

// Static hosting for the upstream SiteApp. SITE_ROUTES and APP_URL are injected by scripts/build-site.cjs.
const routes = new Set(SITE_ROUTES);
const appRoutes = { '/signin': '/signin', '/login': '/signin', '/signup': '/signup', '/forgot': '/forgot' };
const metaClick = captureMetaClick();
// The UTMs in this page's URL are kept for the tab, so they reach the app's sign-up (KAN-1135).
captureUtm();

// GitHub Pages serves /pricing and /pricing.html alike; the router expects the clean path.
const clean = window.location.pathname.replace(/(index)?\.html$/, '').replace(/(.)\/$/, '$1') || '/';
if (clean !== window.location.pathname) {
  window.history.replaceState(window.history.state, '', clean + window.location.search + window.location.hash);
}

// appsbuiltwithai.com shows this site inside a GHL iframe. The app needs the whole window
// (Stripe Checkout refuses to load in a frame), so app links and redirects leave the frame,
// as do links to other sites (the GHL pages themselves, or sites like X that refuse frames).
function openApp(url) {
  const destination = withSignupAttribution(url, APP_URL, metaClick);
  if (window.top !== window.self) {
    try { window.top.location.href = destination; return; } catch (error) { /* blocked: stay in the frame */ }
  }
  window.location.href = destination;
}
window.__abwOpenApp = openApp;

function prepareLink(event) {
  const link = event.target.closest && event.target.closest('a[href]');
  if (!link) return;
  if (link.origin === APP_URL) {
    const destination = withSignupAttribution(link.href, APP_URL, metaClick);
    if (destination !== link.href) {
      const originalHref = link.getAttribute('href');
      link.href = destination;
      // Restore the link after navigation so copying it does not share visitor IDs.
      setTimeout(() => {
        if (link.getAttribute('href') === destination) link.setAttribute('href', originalHref);
      }, 0);
    }
  }
  if (event.type === 'click' && !link.target && /^https?:$/.test(link.protocol) && link.origin !== window.location.origin) {
    link.target = '_top';
  }
}
document.addEventListener('click', prepareLink, true);
document.addEventListener('auxclick', prepareLink, true);

function Leave({ to }) {
  useEffect(() => { window.location.replace(to); }, [to]);
  return null;
}

function LeaveForApp({ to }) {
  useEffect(() => { openApp(to); }, [to]);
  return null;
}

function StaticSite() {
  const { pathname, search, hash } = useLocation();
  if (appRoutes[pathname]) return <LeaveForApp to={APP_URL + appRoutes[pathname] + search + hash} />;
  // Pages outside SiteApp (waitlist landing, legal policies) are separate static files.
  if (!routes.has(pathname) && pathname !== clean) return <Leave to={pathname + search + hash} />;
  return <SiteApp />;
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StaticSite />
  </BrowserRouter>
);
