This is the public website, built from the marketing site in the app repository.

`src/` and `../site/` are copied unchanged from `src/site`, `src/config/importSources.js` and `public/site` in `funnelactive/appsbuiltwithaiapp`. `upstream.json` records the revision and the hash of every copied file. The build rejects any copied file that no longer matches, apart from the modifications listed there:

- `src/site/part1.jsx`: the October 21-23 summit banner replaces the Import banner, and Import projects is removed from the Features menu.
- `src/site/use-cases-page.jsx` and `../site/site-images/v2/use-cases/`: new screenshots for the six use cases, as 1400px WebP files, replace the original JPGs.

`entry.jsx` runs the upstream `SiteApp` on static hosting. Sign in, sign up and password reset go to https://app.appsbuiltwithai.com. Paths that are not site routes load as separate pages, so `waitlist-landing.html` keeps its own pagehost version with tracking and the live counter.

Run `npm ci` and `npm run build` after changing the source. The build creates `website.js`, `website.css`, one HTML file per site route (so GitHub Pages serves `/education`, `/about` and the rest), and redirect pages for `signin`, `login`, `signup` and `forgot`. Commit the generated files with the source.

Run `npm run preview` to review locally at http://127.0.0.1:4175/. It resolves `/pricing` to `pricing.html` the way GitHub Pages does.

To update from the app repository, copy the same folders from the new revision, re-apply the modifications above, and regenerate `upstream.json` with the new revision and hashes.
