"""One-time conversion of Jekyll posts/pages to Hugo content. Run from the repo root.

Bakes Liquid (dates, site.url, uid, tags) into plain text, rewrites post_url/link
tags to paths, turns space-separated tags into lists, and adds slug from the filename.
"""
import re
import sys
from datetime import datetime
from pathlib import Path

SITE_URL = "https://www.jsrowe.com"
DATE_PREFIX = re.compile(r"^\d{4}-\d{2}-\d{2}-")


def ordinal(day):
    if 11 <= day % 100 <= 13:
        return f"{day}th"
    return f"{day}{ {1: 'st', 2: 'nd', 3: 'rd'}.get(day % 10, 'th') }"


def date_to_string(value):
    # Jekyll's date_to_string: "ordinal", "US" -> "Mar 12th, 2025". Use the date as written.
    d = datetime.strptime(value.strip()[:10], "%Y-%m-%d")
    return f"{d:%b} {ordinal(d.day)}, {d.year}"


def split_front_matter(text):
    _, fm, body = text.split("---\n", 2)
    return fm, body


def fm_value(fm, key):
    m = re.search(rf"^{key}:\s*(.*)$", fm, re.M)
    return m.group(1).strip().strip('"') if m else ""


def slug_for(filename):
    return DATE_PREFIX.sub("", Path(filename).stem).rstrip("-")  # Jekyll drops trailing hyphens


def convert_body(body, fm):
    date = fm_value(fm, "date")
    uid = fm_value(fm, "uid")
    tags = fm_value(fm, "tags").split()

    body = re.sub(r'\{\{\s*page\.date\s*\|\s*date_to_string[^}]*\}\}', lambda m: date_to_string(date), body)
    body = re.sub(r'\{\{\s*"([^"]+)"\s*\|\s*date_to_string[^}]*\}\}', lambda m: date_to_string(m.group(1)), body)
    body = re.sub(r"\{\{\s*site\.url\s*\}\}", SITE_URL, body)
    body = re.sub(r"\{\{\s*site\.baseurl\s*\}\}", "", body)
    body = re.sub(r"\{\{\s*page\.uid\s*\}\}", uid, body)
    body = re.sub(r'\{\{\s*page\.tags\s*\|\s*join:\s*", "\s*\}\}', ", ".join(tags), body)

    body = re.sub(r"\{%\s*post_url\s+(\S+)\s*%\}", lambda m: f"/{slug_for(m.group(1))}/", body)
    body = re.sub(r"\{%\s*link\s+_posts/(\S+)\s*%\}", lambda m: f"/{slug_for(m.group(1))}/", body)
    body = re.sub(r"\{%\s*link\s+(\w+)\.md\s*%\}", r"/\1/", body)

    body = re.sub(r"\{%\s*highlight\s+(\w+)\s*%\}", r"```\1", body)
    body = re.sub(r"\{%\s*endhighlight\s*%\}", "```", body)

    # kramdown inline attributes; Goldmark has no equivalent for images (styled in CSS instead)
    body = re.sub(r"\)\{:[^}]*\}", ")", body)
    body = body.replace(":warning:", "⚠️")

    leftover = re.findall(r"\{\{.*?\}\}|\{%.*?%\}", body)
    return body, leftover


def convert_front_matter(fm, filename=None):
    tags = fm_value(fm, "tags")
    if tags:
        quoted = ", ".join(f'"{t}"' if t.isdigit() else t for t in tags.replace(",", " ").split())
        fm = re.sub(r"^tags:.*$", f"tags: [{quoted}]", fm, flags=re.M)
    if filename and not re.search(r"^slug:", fm, re.M):
        fm = fm.rstrip("\n") + f"\nslug: {slug_for(filename)}\n"
    return fm


def main(paths):
    problems = 0
    for path in map(Path, paths):
        fm, body = split_front_matter(path.read_text())
        is_post = bool(DATE_PREFIX.match(path.name))
        body, leftover = convert_body(body, fm)
        fm = convert_front_matter(fm, path.name if is_post else None)
        path.write_text(f"---\n{fm}---\n{body}")
        if leftover:
            problems += 1
            print(f"{path}: unconverted {leftover}", file=sys.stderr)
    print(f"converted {len(paths)} files, {problems} with leftovers")


if __name__ == "__main__":
    main(sys.argv[1:])
