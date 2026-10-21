# ABWAI website local development

The site uses static HTML entry points and shared React components. React and Babel are loaded from pinned CDN URLs. No framework migration or production deployment is needed for local review.

## Preview and checks

```powershell
npm.cmd ci
npm.cmd run preview
```

Open <http://127.0.0.1:4173/>. The preview binds to the local machine only and disables caching so navigation uses current local pages. If an older preview was already open, refresh each old page once.

After editing source or styles:

```powershell
npm.cmd run version-assets
npm.cmd test
```

Asset versions are content hashes shared across the HTML entry points. Refresh the preview after updating them. Tests compile and mount the actual entry points and check important React interactions with JSDOM. Desktop and mobile browser inspection remains a separate check.

The homepage uses the original AWS site's components and styles copied from the app repository into `homepage-original/source/`. The manifest pins their upstream revision and SHA256 hashes. Keep these source files unchanged, including the footer. `scripts/build-homepage.cjs`, run by `version-assets`, compiles them for this static site and adapts internal links to existing HTML routes. `homepage-original/entry.jsx` supplies the approved navigation, current pricing, and real app handoff. Other pages continue using their existing components.

## Styling

The restored homepage uses its original `styles.css`, followed by `homepage-mobile.css`, which carries phone layout fixes without editing the pinned snapshot. The edited subpages load `launch-brand.css` after their existing styles. Its `brand-page` scope carries the original homepage display type, gradient accents, and colored scene treatment without restyling legacy app and event pages. Shared navigation remains in `styles.css`.

## Launch content

Import is omitted from the public offering. Marketing tools are previews marked Coming soon. Current plan data and app destinations live in `window.ABWAI` in `part1.jsx`; verify any launch pricing changes against the product before publishing.

The examples in `examples/` are illustrative websites with fictional data, not customer results. Their screenshots live in `assets/examples/`. The example pages are marked noindex.

The public resources page links directly to the real app help center. Opening individual articles after authentication depends on the app supporting stable article URLs and preserving the requested destination through login.

Local planning and browser evidence are ignored by Git. The preview command does not push or publish changes.
