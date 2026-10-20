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

function Leave({ to }) {
  useEffect(() => { window.location.replace(to); }, [to]);
  return null;
}

function StaticSite() {
  const { pathname, search, hash } = useLocation();
  if (appRoutes[pathname]) return <Leave to={APP_URL + appRoutes[pathname] + search + hash} />;
  // Pages outside SiteApp (waitlist landing, legal policies) are separate static files.
  if (!routes.has(pathname) && pathname !== clean) return <Leave to={pathname + search + hash} />;
  return <SiteApp />;
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StaticSite />
  </BrowserRouter>
);
