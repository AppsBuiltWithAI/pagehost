// Master switch for the entire import feature. When false, every import
// surface shows "Coming soon", the server refuses /api/import requests,
// and the product tour, support KB and marketing site stop promising
// imports. Set back to true to restore everything (KAN-748).
export const IMPORTS_ENABLED = false;

// Import sources other than GitHub: Lovable, Bolt.new, v0, Replit, Figma Make,
// pasting a URL and uploading a zip.
//
// Hidden for launch (KAN-684): they are not ready, so GitHub is the only
// import offered. Nothing is removed. Every card, logo, instruction and line
// of copy that mentions them is still in the code, shown only when this is
// true, so setting it back to true brings them all back in the app, the help
// centre, the legal pages and the public site. The server's zip and URL
// import endpoints are untouched.
export const OTHER_IMPORT_SOURCES_ENABLED = false;
