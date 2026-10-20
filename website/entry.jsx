import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import SiteApp from './src/site/SiteApp.jsx';

// Static hosting for the upstream SiteApp. SITE_ROUTES and APP_URL are injected by scripts/build-site.cjs.
const routes = new Set(SITE_ROUTES);
const appRoutes = { '/signin': '/signin', '/login': '/signin', '/signup': '/signup', '/forgot': '/forgot' };

// GitHub Pages serves /pricing and /pricing.html alike; the router expects the clean path.
const clean = window.location.pathname.replace(/(index)?\.html$/, '').replace(/(.)\/$/, '$1') || '/';
if (clean !== window.location.pathname) {
  window.history.replaceState(window.history.state, '', clean + window.location.search + window.location.hash);
}

// appsbuiltwithai.com shows this site inside a GHL iframe. The app needs the whole window
// (Stripe Checkout refuses to load in a frame), so app links and redirects leave the frame.
function openApp(url) {
  if (window.top !== window.self) {
    try { window.top.location.href = url; return; } catch (error) { /* blocked: stay in the frame */ }
  }
  window.location.href = url;
}
window.__abwOpenApp = openApp;
document.addEventListener('click', event => {
  const link = event.target.closest && event.target.closest('a[href]');
  if (link && !link.target && link.href.startsWith(APP_URL + '/')) link.target = '_top';
}, true);

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
