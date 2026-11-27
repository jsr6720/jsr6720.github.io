"""Check the live site after a deploy: python3 scripts/check-live.py [https://www.jsrowe.com]

- every sitemap URL returns 200 with its own <title> (the soft 404 serves the homepage with a 200)
- HTTPS: http:// and the apex 301 to https://www, TLS 1.2+ only, security headers present
Prints PASS/FAIL per check; exits 1 if anything fails. Standard library only.
"""
import re
import socket
import ssl
import sys
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor

SITE = (sys.argv[1] if len(sys.argv) > 1 else "https://www.jsrowe.com").rstrip("/")
HOST = SITE.split("//", 1)[1]
APEX = HOST.removeprefix("www.")

# https://owasp.org/www-project-secure-headers/ ; set in CloudFront (response headers policy), not in this repo
HEADERS = ["strict-transport-security", "x-content-type-options", "referrer-policy", "content-security-policy"]

failures = 0


def check(ok, label, detail=""):
    global failures
    failures += not ok
    print(f"{'PASS' if ok else 'FAIL'}  {label}{'  ' + detail if detail and not ok else ''}")


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args):
        return None


def fetch(url, follow=True):
    opener = urllib.request.build_opener() if follow else urllib.request.build_opener(NoRedirect)
    try:
        with opener.open(urllib.request.Request(url, headers={"User-Agent": "check-live"}), timeout=20) as r:
            return r.status, dict((k.lower(), v) for k, v in r.headers.items()), r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, dict((k.lower(), v) for k, v in e.headers.items()), ""


def title(html):
    m = re.search(r"<title>(.*?)</title>", html, re.S)
    return m[1].strip() if m else ""


# Pages: every sitemap URL, and none of them is the homepage in disguise
_, _, home = fetch(SITE + "/")
home_title = title(home)
_, _, sitemap = fetch(SITE + "/sitemap.xml")
urls = [u.replace("&amp;", "&").replace("&apos;", "'") for u in re.findall(r"<loc>([^<]+)</loc>", sitemap)]


def page(url):
    status, _, html = fetch(url)
    t = title(html)
    if status != 200:
        return f"{status} {url}"
    if t == home_title and url.rstrip("/") != SITE:
        return f"homepage served for {url}"
    return None


with ThreadPoolExecutor(16) as pool:
    bad = [b for b in pool.map(page, urls) if b]
check(len(urls) > 300 and not bad, f"{len(urls)} sitemap URLs load with their own title", "; ".join(bad[:5]))

# HTTPS redirects: one hop each to the canonical host
for start in [f"http://{HOST}/", f"http://{APEX}/", f"https://{APEX}/"]:
    status, headers, _ = fetch(start, follow=False)
    loc = headers.get("location", "")
    check(status == 301 and loc == SITE + "/", f"{start} -> 301 {SITE}/", f"got {status} {loc}")

# TLS: 1.2+ only
for version, should_connect in [(ssl.TLSVersion.TLSv1_1, False), (ssl.TLSVersion.TLSv1_2, True)]:
    ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
    ctx.load_default_certs()
    ctx.minimum_version = ctx.maximum_version = version
    try:
        with socket.create_connection((HOST, 443), timeout=10) as s, ctx.wrap_socket(s, server_hostname=HOST):
            connected = True
    except (ssl.SSLError, OSError):
        connected = False
    check(connected == should_connect, f"{version.name} {'accepted' if should_connect else 'refused'}")

# Security headers
_, headers, _ = fetch(SITE + "/")
for h in HEADERS:
    check(h in headers, f"header {h}", "missing (CloudFront response headers policy)")

print(f"\n{'all checks passed' if not failures else f'{failures} failed'}")
sys.exit(1 if failures else 0)
