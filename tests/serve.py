"""Static file server for the tests: python3 serve.py <dir> <port>.

Same as `python3 -m http.server`, but with a bigger connection backlog.
The default (5) drops image requests when tests run in parallel.
"""
import functools
import http.server
import sys

directory, port = sys.argv[1], int(sys.argv[2])
http.server.ThreadingHTTPServer.request_queue_size = 128
handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=directory)
http.server.ThreadingHTTPServer(("127.0.0.1", port), handler).serve_forever()
