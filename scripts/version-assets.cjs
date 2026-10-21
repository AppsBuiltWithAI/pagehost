const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
require('./build-homepage.cjs');

const root = path.resolve(__dirname, '..');
const versions = new Map();
for (const name of fs.readdirSync(root).filter(name => name.endsWith('.html'))) {
  const file = path.join(root, name);
  const original = fs.readFileSync(file, 'utf8');
  const updated = original.replace(/((?:src|href)=")([\w-]+\.(?:jsx|css|js))(?:\?v=[^"]*)?("\s*)/g,
    (_, prefix, asset, suffix) => {
      if (!versions.has(asset)) {
        const content = fs.readFileSync(path.join(root, asset));
        versions.set(asset, createHash('sha256').update(content).digest('hex').slice(0, 12));
      }
      return `${prefix}${asset}?v=launch-${versions.get(asset)}${suffix}`;
    });
  if (updated !== original) fs.writeFileSync(file, updated);
}
console.log(`Versioned ${versions.size} local assets from their contents.`);
