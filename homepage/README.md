This is the original homepage headed "Build websites & apps with AI."

`upstream.json` records the repository revision and hashes of the saved original source. The only component changes from that snapshot are:

- `source/part1.jsx`: remove Import projects from Features and replace the top banner with the October 21-23 summit announcement.
- `source/waitlist-flow.jsx`: load the supplied Voomly video in the demo modal, including sizing, dismissal, focus restoration, and scroll restoration.

The remaining components, footer, homepage composition, and styles retain their original source. The build verifies their recorded hashes and rejects unsupported imports. Other static pages retain their existing files.

Run `npm ci` and `npm run build` after editing the source. The build creates `homepage.js` and `homepage.css` for GitHub Pages, adapts site asset paths, and maps marketing links to existing static pages. Authentication links and routes absent from this repository retain their original site destination. `demo-video.html` hosts the sandboxed player. Commit generated assets alongside source when publishing is authorized.

Run `npm run preview` to review locally at http://127.0.0.1:4175/.
