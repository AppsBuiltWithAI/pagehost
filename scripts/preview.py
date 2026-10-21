"""Serve the local review with fresh HTML on every navigation."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit


class PreviewHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        if self.headers.get("Host", "").lower() not in {"127.0.0.1:4173", "localhost:4173"}:
            self.send_error(403, "Local preview only")
            return None
        requested = unquote(urlsplit(self.path).path).replace("\\", "/")
        if any(part.startswith(".") for part in requested.split("/") if part):
            self.send_error(403, "Private paths are not served")
            return None
        return super().send_head()

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    root = Path(__file__).resolve().parent.parent
    handler = partial(PreviewHandler, directory=str(root))
    with ThreadingHTTPServer(("127.0.0.1", 4173), handler) as server:
        print("Local preview: http://127.0.0.1:4173/", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass
