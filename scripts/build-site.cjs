const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const Babel = require('@babel/standalone');
const esbuild = require('esbuild');

const root = path.resolve(__dirname, '..');
const APP_URL = 'https://app.appsbuiltwithai.com';
const upstream = JSON.parse(fs.readFileSync(path.join(root, 'website/upstream.json'), 'utf8'));
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');

// The snapshot must match the recorded upstream revision, apart from the documented modifications.
function localPath(name) {
  for (const [from, to] of Object.entries(upstream.localPaths)) {
    if (name.startsWith(from + '/')) return path.join(root, to, name.slice(from.length + 1));
  }
  throw new Error(`No local path for ${name}`);
}
for (const [name, hash] of Object.entries(upstream.files)) {
  if (upstream.modified[name]) continue;
  if (sha256(fs.readFileSync(localPath(name))) !== hash) throw new Error(`Upstream file changed: ${name}`);
}

const siteDir = path.join(root, 'website/src/site');
const siteApp = fs.readFileSync(path.join(siteDir, 'SiteApp.jsx'), 'utf8').replace(/\{\/\*[\s\S]*?\*\/\}|\/\/.*$/gm, '');
const allRoutes = [...siteApp.matchAll(/path="([^"]+)"/g)]
  .map(match => match[1]).filter(route => route !== '*');
// The waitlist landing page keeps its own pagehost version with tracking and the live counter.
const ownPages = new Set(['/waitlist-landing']);
// Upstream pages the public site doesn't publish (yet). Status showed mocked uptime;
// changelog and roadmap are hidden for now and may come back.
const unpublished = new Set(['/status', '/changelog', '/roadmap']);
const redirectRoutes = new Set(['/login', '/waitlist-site']);
const siteRoutes = allRoutes.filter(route => !ownPages.has(route) && !unpublished.has(route));
const pageRoutes = siteRoutes.filter(route => !redirectRoutes.has(route));
const authPages = { signin: '/signin', login: '/signin', signup: '/signup', forgot: '/forgot' };

const BRAND = 'AppsBuiltWithAI';
const SITE_URL = 'https://pages.appsbuiltwithai.com';
const DEFAULT_DESCRIPTION = 'Build websites and apps with AI. AppsBuiltWithAI lets you create, launch, and grow your online presence — no coding required.';
const titles = {
  '/': `${BRAND}: Build websites & apps with AI`,
  '/full-site': `${BRAND}: Build websites & apps with AI`,
  '/affiliate': 'Affiliate program', '/affiliate-thanks': 'Thanks for applying',
  '/certified-builders': 'Certified builders', '/changelog': 'Change log',
  '/compare': `${BRAND} vs. the alternatives`, '/embed': '"Built with" badge',
  '/how-it-works': 'How it works', '/summit': 'Summit 2026', '/use-cases': 'Use cases',
};
const descriptions = {
  '/': DEFAULT_DESCRIPTION,
  '/full-site': DEFAULT_DESCRIPTION,
  '/about': 'Learn about AppsBuiltWithAI — our story, mission, and the team building the future of AI-powered app creation.',
  '/affiliate': 'Join the AppsBuiltWithAI affiliate program. Earn commissions by referring new users to our AI-powered website and app builder.',
  '/ambassador': 'Become an AppsBuiltWithAI ambassador. Represent our community and help others build with AI.',
  '/careers': 'Join the AppsBuiltWithAI team. Explore open roles and help us shape the future of AI-powered app building.',
  '/catalysts': 'Meet the AppsBuiltWithAI catalysts — community leaders driving adoption and innovation.',
  '/certified-builders': 'Find certified AppsBuiltWithAI builders for hire. Experts who can create custom websites and apps with AI.',
  '/community': 'Join the AppsBuiltWithAI community. Connect with fellow builders, share ideas, and grow together.',
  '/compare': 'See how AppsBuiltWithAI compares to other website and app builders. Features, pricing, and capabilities side by side.',
  '/connectors': 'Connect AppsBuiltWithAI to your favorite tools. Explore integrations and connectors for payments, CRM, email, and more.',
  '/contact': 'Get in touch with the AppsBuiltWithAI team. We\'re here to help with questions, partnerships, and support.',
  '/education': 'Learn to build with AI. Free courses, tutorials, and resources to master AppsBuiltWithAI.',
  '/embed': 'Add a "Built with AppsBuiltWithAI" badge to your site. Show the world what powers your app.',
  '/events': 'Upcoming AppsBuiltWithAI events, meetups, and webinars. Learn, connect, and build with our community.',
  '/features': 'Explore AppsBuiltWithAI features — AI-powered design, hosting, payments, connectors, and everything you need to launch.',
  '/how-it-works': 'See how AppsBuiltWithAI works. From prompt to published app in minutes — no coding required.',
  '/import': 'Import your existing website or project into AppsBuiltWithAI. Migrate seamlessly and start building with AI.',
  '/legal': 'AppsBuiltWithAI legal information — terms of service, privacy policy, and usage guidelines.',
  '/meetups': 'Find AppsBuiltWithAI meetups near you. Connect with local builders and learn in person.',
  '/partners': 'Partner with AppsBuiltWithAI. Explore partnership opportunities for agencies, educators, and developers.',
  '/press': 'AppsBuiltWithAI press resources. Logos, brand assets, and company information for media coverage.',
  '/pricing': 'AppsBuiltWithAI pricing plans. Find the right plan for your needs — from free to professional.',
  '/resources': 'AppsBuiltWithAI resources — guides, tutorials, and documentation to help you build better with AI.',
  '/security': 'AppsBuiltWithAI security practices. How we protect your data and keep your apps safe.',
  '/summit': 'AppsBuiltWithAI Summit 2026. The annual gathering of AI builders, creators, and innovators.',
  '/support': 'Get help with AppsBuiltWithAI. Support articles, FAQs, and ways to reach our team.',
  '/templates': 'Browse AppsBuiltWithAI templates. Start from a professionally designed template and customize with AI.',
  '/use-cases': 'See how people use AppsBuiltWithAI — from founders and freelancers to agencies and local businesses.',
  '/vision': 'The AppsBuiltWithAI vision. Where we\'re headed and how AI will transform app building.',
  '/waitlist': 'Join the AppsBuiltWithAI waitlist. Be first in line for new features and early access.',
};
function titleFor(route) {
  const title = titles[route] || route.slice(1).replace(/-/g, ' ').replace(/^./, c => c.toUpperCase());
  return title.includes(BRAND) ? title : `${title} — ${BRAND}`;
}
function descriptionFor(route) {
  return descriptions[route] || DEFAULT_DESCRIPTION;
}

// Account links go straight to the app so they work without the client router.
const linkTargets = new Set();
const routing = /[\\/](SiteApp|SiteLayout)\.jsx$/;
// Links inside unpublished pages (roadmap-page.jsx and so on) are never shown, so they aren't checked.
const unpublishedFiles = new RegExp('[\\\\/](' + [...unpublished].map(route => route.slice(1)).join('|') + ')-page\\.jsx$');
function webpUrl(value) {
  const url = value.replace(/\.(png|jpe?g)$/i, '.webp');
  if (!fs.existsSync(path.join(root, url))) throw new Error(`No WebP version of ${value}`);
  return url;
}
function appUrl(value) {
  const [, pathname] = value.match(/^([^?#]*)/);
  if (!['/signup', '/signin', '/login'].includes(pathname)) return value;
  return APP_URL + (pathname === '/login' ? '/signin' : pathname) + value.slice(pathname.length);
}
function staticLinks({ types: t }) {
  function usesUrl(nodePath) {
    // Climb through "prefix" + value, cond ? a : b and {...} to reach what uses the URL.
    let expression = nodePath;
    while (
      (expression.parent?.type === 'BinaryExpression' && expression.parent.operator === '+' && expression.parent.left === expression.node) ||
      (expression.parent?.type === 'ConditionalExpression' && expression.parent.test !== expression.node) ||
      expression.parent?.type === 'JSXExpressionContainer'
    ) {
      expression = expression.parentPath;
    }
    const parent = expression.parent;
    if (parent.type === 'JSXAttribute') return parent.name.name === 'href';
    if (parent.type === 'ObjectProperty') {
      return (parent.key.name === 'href' || parent.key.value === 'href') && parent.value === expression.node;
    }
    const target = parent.type === 'AssignmentExpression' && parent.left;
    return target?.type === 'MemberExpression' && target.property.name === 'href' &&
      target.object.type === 'MemberExpression' && target.object.property.name === 'location';
  }
  // Images are served as WebP; paths may also be built as "/site/.../" + id + ".png".
  function builtFromSite(nodePath) {
    let left = nodePath.parent;
    if (left?.type !== 'BinaryExpression' || left.right !== nodePath.node) return false;
    while (left.type === 'BinaryExpression') left = left.left;
    return left.type === 'StringLiteral' && left.value.startsWith('/site/');
  }
  // Pages also keep account URLs in variables and lookup tables, so every account string is rewritten.
  // SiteApp and SiteLayout compare paths for routing and stay untouched.
  return { visitor: {
    // window.location.href = "/signup..." becomes window.__abwOpenApp(...), which leaves the GHL frame.
    AssignmentExpression(nodePath) {
      const { left, right } = nodePath.node;
      const href = left.type === 'MemberExpression' && left.property.name === 'href' &&
        left.object.type === 'MemberExpression' && left.object.property.name === 'location';
      let first = right;
      while (first.type === 'BinaryExpression') first = first.left;
      if (!href || first.type !== 'StringLiteral' || !/^\/(signup|signin|login)\b/.test(first.value)) return;
      nodePath.replaceWith(t.callExpression(t.memberExpression(t.identifier('window'), t.identifier('__abwOpenApp')), [right]));
    },
    StringLiteral(nodePath, state) {
      let { value } = nodePath.node;
      if (/^\.(png|jpe?g)$/i.test(value) && builtFromSite(nodePath)) nodePath.node.value = '.webp';
      if (/^\/site\/.*\.(png|jpe?g)$/i.test(value)) value = nodePath.node.value = webpUrl(value);
      if (!value.startsWith('/')) return;
      if (usesUrl(nodePath) && !unpublishedFiles.test(state.filename)) linkTargets.add(value);
      if (!routing.test(state.filename)) nodePath.node.value = appUrl(value);
    },
    TemplateLiteral(nodePath, state) {
      const first = nodePath.node.quasis[0];
      if (!first.value.cooked.startsWith('/')) return;
      if (usesUrl(nodePath) && !unpublishedFiles.test(state.filename)) linkTargets.add(first.value.cooked);
      if (!routing.test(state.filename)) first.value.cooked = first.value.raw = appUrl(first.value.cooked);
    },
  } };
}

const sourcePlugin = {
  name: 'website-source',
  setup(build) {
    // Styles are concatenated below in the order SiteLayout imports them.
    build.onResolve({ filter: /\.css$/ }, args => ({ path: args.path, namespace: 'skip-css' }));
    build.onLoad({ filter: /.*/, namespace: 'skip-css' }, () => ({ contents: '', loader: 'js' }));
    build.onLoad({ filter: /website[\\/]src[\\/].*\.jsx?$/ }, args => ({
      contents: Babel.transform(fs.readFileSync(args.path, 'utf8'), {
        plugins: [staticLinks], parserOpts: { plugins: ['jsx'] }, filename: args.path,
      }).code,
      loader: 'jsx',
    }));
  },
};

function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

function page(title, head, body) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)}</title>
${head}
</head>
<body>
${body}
</body>
</html>
`;
}

async function main() {
  const result = await esbuild.build({
    entryPoints: [path.join(root, 'website/entry.jsx')],
    bundle: true, minify: true, format: 'iife', target: 'es2020', jsx: 'automatic', write: false,
    plugins: [sourcePlugin], outfile: path.join(root, 'website.js'), legalComments: 'none', logLevel: 'warning',
    define: {
      'process.env.NODE_ENV': '"production"',
      SITE_ROUTES: JSON.stringify(siteRoutes),
      APP_URL: JSON.stringify(APP_URL),
    },
  });
  const javascript = result.outputFiles[0].contents;
  const leftover = Buffer.from(javascript).toString().match(/\/site\/[^"'`]*\.(png|jpe?g)\b|["'`]\.(png|jpe?g)["'`]/gi);
  if (leftover) throw new Error(`Images not mapped to WebP: ${[...new Set(leftover)].join(', ')}`);

  const layout = fs.readFileSync(path.join(siteDir, 'SiteLayout.jsx'), 'utf8');
  const styles = [...layout.matchAll(/^import '\.\/(styles\/[^']+\.css)';$/gm)].map(match => match[1]);
  const css = 'html,body{margin:0;padding:0}\n' +
    styles.map(name => fs.readFileSync(path.join(siteDir, name), 'utf8')).join('\n') + '\n' +
    fs.readFileSync(path.join(root, 'website/overrides.css'), 'utf8');

  fs.writeFileSync(path.join(root, 'website.js'), javascript);
  fs.writeFileSync(path.join(root, 'website.css'), css);

  // Each route gets its own file so GitHub Pages serves /education, /about and the rest directly.
  const version = sha256(Buffer.concat([Buffer.from(javascript), Buffer.from(css)])).slice(0, 12);
  // Load SiteLayout's fonts from the HTML so they download alongside the bundle; SiteLayout skips its own copy.
  const fontHref = layout.match(/const FONT_HREF =\s*'([^']+)'/)[1].replace(/&/g, '&amp;');
  const ogImage = `${SITE_URL}/site/assets/og-image.png`;
  function seoHead(route) {
    const title = titleFor(route);
    const description = descriptionFor(route);
    const url = route === '/' ? SITE_URL + '/' : `${SITE_URL}${route}`;
    return `  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${esc(url)}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${esc(BRAND)}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${esc(url)}" />
  <meta property="og:image" content="${esc(ogImage)}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${esc(ogImage)}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link id="abw-site-fonts" rel="stylesheet" href="${fontHref}" />
  <link rel="stylesheet" href="/website.css?v=${version}" />
  <script src="/website.js?v=${version}" defer></script>`;
  }
  for (const route of pageRoutes) {
    const file = route === '/' ? 'index.html' : route.slice(1) + '.html';
    fs.writeFileSync(path.join(root, file), page(titleFor(route), seoHead(route), '  <div id="root"></div>'));
  }

  // Account pages live in the app.
  for (const [name, route] of Object.entries(authPages)) {
    const target = APP_URL + route;
    fs.writeFileSync(path.join(root, name + '.html'), page(`Redirecting — ${BRAND}`,
      `  <meta name="robots" content="noindex" />
  <meta http-equiv="refresh" content="0; url=${target}" />
  <link rel="canonical" href="${target}" />
  <script>
    var url = ${JSON.stringify(target)} + window.location.search + window.location.hash;
    try { (window.top !== window.self ? window.top : window).location.replace(url); } catch (error) { window.location.replace(url); }
  </script>`,
      `  <p><a href="${target}" target="_top">Continue to ${BRAND}</a></p>`));
  }

  // Generate sitemap.xml for search engines.
  const today = new Date().toISOString().slice(0, 10);
  const sitemapEntries = pageRoutes.map(route => {
    const loc = route === '/' ? SITE_URL + '/' : `${SITE_URL}${route}`;
    const priority = route === '/' ? '1.0' : route === '/features' || route === '/pricing' ? '0.8' : '0.5';
    return `  <url>\n    <loc>${esc(loc)}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
  }).join('\n');
  fs.writeFileSync(path.join(root, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`);

  // Every root-relative link must reach a site route, an app page, or a static file.
  const missing = [...linkTargets].map(target => target.match(/^([^?#]*)/)[1]).filter(pathname =>
    !siteRoutes.includes(pathname) && !authPages[pathname.slice(1)] &&
    !fs.existsSync(path.join(root, pathname)) && !fs.existsSync(path.join(root, pathname + '.html')));
  if (missing.length) throw new Error(`Links without a destination: ${[...new Set(missing)].join(', ')}`);

  console.log(`Built ${pageRoutes.length} pages, ${Object.keys(authPages).length} app redirects, and sitemap.xml (${version}).`);
}

main().catch(error => { console.error(error); process.exit(1); });
