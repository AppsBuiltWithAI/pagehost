This is the public website, built from the marketing site in the app repository.

`src/` and `../site/` are copied unchanged from `src/site`, `src/config/importSources.js` and `public/site` in `funnelactive/appsbuiltwithaiapp`. `upstream.json` records the revision and the hash of every copied file. The build rejects any copied file that no longer matches, apart from the modifications listed there:

- `src/site/part1.jsx`: the October 20-23 buildathon banner replaces the Import banner, and Import projects is removed from the Features menu.
- `src/site/use-cases-page.jsx` and `../site/site-images/v2/use-cases/`: new screenshots for the six use cases, as 1400px WebP files, replace the original JPGs. The jump chips use 112px `-thumb.webp` versions.
- `src/site/styles/use-cases.css`: the use case image frames match the screenshots' 1400x788 shape instead of cropping them to 5:4.
- `src/site/features-page.jsx`: the hero headline breaks after "launch" on wider screens (`ft-br`, shown by `overrides.css`).
- `src/site/part1.jsx`: the phone menu closes when one of its links is tapped. Pages share one header, so without this the open menu stayed over the next page.
- `src/site/part1.jsx` and `src/site/part3.jsx`: the Resources dropdown, and the footer's Tutorials and Education links, are removed. Both pages remain at `/education` and `/resources`.
- `src/site/legal-page.jsx`: the legal hub is rewritten to match how the product works (checked against the app repo), summarizes the app's binding Terms of Service, and follows the address so footer links and section links like `/legal#retention` open the right tab.
- `src/site/security-page.jsx`: only practices verified in the app repo remain; the bug bounty is replaced by a plain vulnerability-report box.
- `/status`, `/changelog` and `/roadmap` are not published (`unpublished` in `scripts/build-site.cjs`, so they can come back by removing them there). Status showed mocked uptime. `src/site/part3.jsx` and `src/site/support-page.jsx` drop their links and status indicators, and the footer newsletter form is commented out until it is connected to an email list.
- `src/site/connectors-marketing-page.jsx`: connector logos load from `../site/connector-logos/` (Simple Icons SVGs, plus 64px WebP favicons for Postmark, S3, Slack, Twilio and OpenAI) instead of one outside request per logo. Add a file there when adding a connector.
- `src/site/use-cases-page.jsx`: the bakery quote reads "We take 40% of orders through our app now."
- `src/site/waitlist-flow.jsx`: the demo video opens in a native `<dialog>`, which handles focus, Escape and the backdrop. `../site/demo-video.html` is unchanged and still loads the Voomly player inside the sandboxed frame.
- `../site/`: every PNG and JPG is replaced by a compressed WebP of the same name (photos and screenshots at 1400px wide). The build points image paths in the source at the WebP files and fails if any `.png` or `.jpg` reference remains.

`overrides.css` holds pagehost's own style changes and loads after the upstream styles. It gives every light-background hero headline the homepage's gradient accent, makes the pricing page's Enterprise box one full-width column, keeps the features hero accent bold like the other heroes and centers that hero, and fits every page to phone widths from 320px up.

The generated pages load the Google Fonts stylesheet in their HTML, so fonts download alongside `website.js` instead of after it.

`entry.jsx` runs the upstream `SiteApp` on static hosting. Sign in, sign up and password reset go to https://app.appsbuiltwithai.com. appsbuiltwithai.com (GHL) shows this site in an iframe, so every link to another site, the app included, opens in the full window, and the waitlist's redirect to app sign-up does the same. Paths that are not site routes load as separate pages, so `waitlist-landing.html` keeps its own pagehost version with tracking and the live counter.

Run `npm ci` and `npm run build` after changing the source. The build creates `website.js`, `website.css`, one HTML file per site route (so GitHub Pages serves `/education`, `/about` and the rest), and redirect pages for `signin`, `login`, `signup` and `forgot`. Commit the generated files with the source.

Run `npm run preview` to review locally at http://127.0.0.1:4175/. It resolves `/pricing` to `pricing.html` the way GitHub Pages does.

Run `node --test tests/demo-video.test.mjs` to check player loading, direct-navigation handling and Escape messaging.

To update from the app repository, copy the same folders from the new revision, re-apply the modifications above, and regenerate `upstream.json` with the new revision and hashes.
