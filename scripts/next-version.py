"""Print the next release version: python3 scripts/next-version.py [--major]

major: the merged PR has the `major` label (license change, rewrite; my call).
minor: a post was published since the last tag (new file, or draft removed).
patch: anything else (edits, fixes, design, CI).
"""
import re
import subprocess
import sys

POST_DIRS = ("content/posts/", "_posts/")  # _posts/ is where posts lived before Hugo (v4.0.0 and earlier)


def git(*args):
    return subprocess.run(["git", *args], capture_output=True, text=True, check=True).stdout


def latest_tag():
    tags = git("tag", "--list", "v*", "--sort=-v:refname").split()
    return tags[0] if tags else "v0.0.0"


def published_posts(ref):
    """Filenames of non-draft posts at a ref, regardless of which folder they lived in."""
    files = git("ls-tree", "-r", "--name-only", ref, "--", *POST_DIRS).split("\n")
    names = set()
    for path in filter(None, files):
        name = path.rsplit("/", 1)[-1]
        if name == "_index.md" or not name.endswith(".md"):
            continue
        if re.search(r"^draft:\s*true\s*$", git("show", f"{ref}:{path}"), re.M):
            continue
        names.add(name)
    return names


def main():
    tag = latest_tag()
    major, minor, patch = map(int, tag.lstrip("v").split("."))
    new_posts = sorted(published_posts("HEAD") - published_posts(tag))

    if "--major" in sys.argv:
        version, reason = f"v{major + 1}.0.0", "`major` label"
    elif new_posts:
        version, reason = f"v{major}.{minor + 1}.0", f"new post: {', '.join(new_posts)}"
    else:
        version, reason = f"v{major}.{minor}.{patch + 1}", "edits only"

    print(version)
    print(f"{tag} -> {version} ({reason})", file=sys.stderr)


if __name__ == "__main__":
    main()
