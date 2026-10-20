import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const source = readFileSync(new URL('../site/demo-video.html', import.meta.url), 'utf8').match(/<script>([\s\S]*?)<\/script>/)[1];

function embedded() {
  const listeners = new Map();
  const loaded = [];
  const parent = {};
  const window = {
    top: parent, parent,
    location: { href: 'https://pages.appsbuiltwithai.com/site/demo-video.html' },
    addEventListener(name, listener) { listeners.set(name, listener); },
  };
  const document = { createElement() { return {}; }, body: { appendChild(node) { loaded.push(node); } } };
  runInNewContext(source, { window, document, URL });
  return { listeners, loaded, parent };
}

test('a framed helper immediately loads the supplied Voomly embed', () => {
  const { loaded } = embedded();
  assert.equal(loaded.length, 1);
  assert.equal(loaded[0].src, 'https://embed.voomly.com/embed/embed-build.js');
});

test('Escape in the helper requests closing only through the parent', () => {
  const { listeners, parent } = embedded();
  const messages = [];
  parent.postMessage = (message, target) => messages.push({ type: message.type, target });
  listeners.get('keydown')({ key: 'Enter' });
  assert.equal(messages.length, 0);
  listeners.get('keydown')({ key: 'Escape' });
  assert.deepEqual(messages, [{ type: 'abw-demo-close', target: '*' }]);
});

test('direct navigation redirects without loading Voomly', () => {
  let destination;
  const window = { location: { replace(url) { destination = url; } } };
  window.top = window;
  runInNewContext(source, { window });
  assert.equal(destination, '/');
});
