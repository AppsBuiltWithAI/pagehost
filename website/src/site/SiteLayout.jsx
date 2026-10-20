import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import './image-slot.js';
import './styles/styles.css';
import './styles/showcase.css';
import './styles/enhance.css';
import './styles/alive.css';
import './styles/hero-demo.css';
import './styles/polish.css';
import './styles/waitlist-flow.css';
import './styles/waitlist.css';
import './styles/about.css';
import './styles/affiliate.css';
import './styles/auth.css';
import './styles/careers.css';
import './styles/certified-builders.css';
import './styles/community.css';
import './styles/community-events.css';
import './styles/compare.css';
import './styles/editorial.css';
import './styles/education.css';
import './styles/embed.css';
import './styles/features.css';
import './styles/import-lp.css';
import './styles/training.css';
import './styles/use-cases.css';
import './styles/vision.css';
import './styles/pricing2.css';
import './styles/ambassador.css';
import './styles/contact.css';

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Roboto:wght@300;400;500;700&family=Roboto+Mono:wght@400;500&family=Roboto+Serif:ital,wght@0,300;0,400;0,500;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;700&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&family=Inter:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=Schibsted+Grotesk:ital,wght@0,400..900;1,400..900&display=swap';

function bodyClassFor(pathname) {
  if (pathname === '/compare') return 'is-compare';
  if (pathname === '/embed') return 'is-embed';
  if (pathname === '/waitlist-landing') return 'is-waitlist-landing';
  if (pathname === '/signup') return 'is-auth';
  return '';
}

export default function SiteLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const extra = bodyClassFor(location.pathname);
  const prevPath = useRef(null);

  useEffect(() => {
    const id = 'abw-site-fonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = FONT_HREF;
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    const prev = history.scrollRestoration;
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    return () => {
      if ('scrollRestoration' in history) history.scrollRestoration = prev || 'auto';
    };
  }, []);

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const samePage = prevPath.current === location.pathname;
    prevPath.current = location.pathname;
    if (location.hash) {
      const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (el) {
        el.scrollIntoView({ behavior: samePage && !reduce ? 'smooth' : 'auto', block: 'start' });
        return;
      }
    }
    if (samePage) return;
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname, location.search, location.hash, location.key]);

  function onClick(e) {
    const a = e.target.closest('a');
    if (!a || e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target && a.target !== '_self') return;
    if (a.hasAttribute('download')) return;
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    let url;
    try { url = new URL(href, window.location.href); } catch { return; }
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
    if (url.origin !== window.location.origin) return;
    if (url.pathname.startsWith('/api') || url.pathname.startsWith('/share')) return;
    e.preventDefault();
    const same = url.pathname === window.location.pathname && url.search === window.location.search;
    navigate(url.pathname + url.search + url.hash, same ? { preventScrollReset: true } : undefined);
  }

  return (
    <div className={'abw-site' + (extra ? ' ' + extra : '')} onClick={onClick}>
      <Outlet />
    </div>
  );
}