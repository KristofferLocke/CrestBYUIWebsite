#!/usr/bin/env python3
"""Dependency-free static site checks. Run from any directory with Python 3.9+."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import json
import os
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
PAGES = ("index.html", "about/index.html", "sponsors/index.html", "contact/index.html")
# Old root .html URLs stay as redirect stubs so bookmarks keep working.
REDIRECTS = ("about.html", "sponsors.html", "contact.html")
errors = []


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path, self.ids, self.references = path, set(), []
        self.id_references = []
        self.h1_count, self.has_description, self.has_lang = 0, False, False
        self.main_count, self.title_count = 0, 0
        self.in_title, self.title = False, ""
        self.has_doctype, self.has_charset, self.has_viewport = False, False, False
        self.feed(path.read_text(encoding="utf-8"))

    def handle_decl(self, decl):
        if decl.lower() == "doctype html":
            self.has_doctype = True

    def handle_starttag(self, tag, attrs):
        names = [name for name, _ in attrs]
        if len(names) != len(set(names)):
            errors.append(f"{self.path.name}: duplicate attribute on <{tag}>")
        attrs = dict(attrs)
        if "id" in attrs:
            if attrs["id"] in self.ids:
                errors.append(f"{self.path.name}: duplicate id {attrs['id']!r}")
            self.ids.add(attrs["id"])
        if tag == "h1":
            self.h1_count += 1
        if tag == "main":
            self.main_count += 1
        if tag == "title":
            self.title_count += 1
            self.in_title = True
        if tag == "html":
            self.has_lang = bool(attrs.get("lang"))
        if tag == "meta":
            if attrs.get("name") == "description":
                self.has_description = bool(attrs.get("content"))
            if (attrs.get("charset") or "").lower() == "utf-8":
                self.has_charset = True
            if attrs.get("name") == "viewport":
                self.has_viewport = "width=device-width" in (attrs.get("content") or "")
        if tag == "img" and "alt" not in attrs:
            errors.append(f"{self.path.name}: image missing alt attribute")
        for key in ("src", "href"):
            if key in attrs:
                self.references.append(attrs[key])
        for key in ("aria-labelledby", "aria-describedby", "aria-controls"):
            self.id_references.extend((attrs.get(key) or "").split())
        if tag == "label" and attrs.get("for"):
            self.id_references.append(attrs["for"])

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data


def check_reference(base, reference, pages):
    if not reference:
        return
    url = urlsplit(reference)
    if url.scheme or url.netloc:
        return
    if url.path.startswith("/"):
        errors.append(f"{base.name}: root-absolute path breaks repository sites: {reference}")
        return
    # Keep the requested spelling: resolve() can correct casing on Windows.
    requested = Path(os.path.abspath(base.parent / unquote(url.path))) if url.path else base
    # Static hosts serve directory URLs from their index.html files.
    if requested.is_dir():
        requested = requested / "index.html"
    target = requested.resolve()
    if not requested.is_relative_to(ROOT) or not target.is_relative_to(ROOT):
        errors.append(f"{base.name}: path leaves project: {reference}")
        return
    if not target.is_file():
        errors.append(f"{base.name}: missing local file {reference!r}")
        return
    parent = ROOT
    for part in requested.relative_to(ROOT).parts:
        if part not in {entry.name for entry in parent.iterdir()}:
            errors.append(f"{base.name}: filename capitalization mismatch: {reference!r}")
            return
        parent = parent / part
    if url.fragment and target.suffix == ".html":
        page = pages.get(target)
        if page and unquote(url.fragment) not in page.ids:
            errors.append(f"{base.name}: missing fragment {reference!r}")


def unique_properties(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError(f"duplicate property {key!r}")
        result[key] = value
    return result


def reject_constant(value):
    raise ValueError(f"nonstandard numeric constant {value!r}")


def main():
    errors.clear()
    pages = {}
    for name in PAGES:
        path = ROOT / name
        if not path.exists():
            errors.append(f"Missing page: {name}")
            continue
        page = Page(path)
        pages[path] = page
        if page.h1_count != 1:
            errors.append(f"{name}: expected one h1, found {page.h1_count}")
        if page.main_count != 1:
            errors.append(f"{name}: expected one main landmark, found {page.main_count}")
        if page.title_count != 1 or not page.title.strip():
            errors.append(f"{name}: expected one nonempty document title")
        if not (page.has_doctype and page.has_charset and page.has_viewport):
            errors.append(f"{name}: missing HTML doctype, UTF-8 charset, or device-width viewport")
        if not page.has_description or not page.has_lang:
            errors.append(f"{name}: missing description or document language")
    for name in REDIRECTS:
        path = ROOT / name
        if not path.exists():
            errors.append(f"Missing redirect: {name}")
            continue
        for ref in Page(path).references:
            check_reference(path, ref, pages)
    for path, page in pages.items():
        for ref in page.references:
            check_reference(path, ref, pages)
        for identifier in page.id_references:
            if identifier not in page.ids:
                errors.append(f"{path.name}: label or ARIA reference to missing id {identifier!r}")
    for css in (ROOT / "assets/css").glob("*.css"):
        for ref in re.findall(r'url\([\'"]?([^\)\'"\s]+)', css.read_text(encoding="utf-8")):
            check_reference(css, ref, pages)
    # Classic scripts resolve DOM asset URLs relative to the root HTML documents.
    # Inspect static strings in config and shared templates without executing JS.
    for script in (ROOT / "assets/js").glob("*.js"):
        source = script.read_text(encoding="utf-8")
        source = source.replace("${siteRoot}", "")
        source = re.sub(r"/\*.*?\*/", "", source, flags=re.S)
        source = re.sub(r"^\s*//.*$", "", source, flags=re.M)
        for ref in re.findall(r'[\'"](assets/[^\'"\n]+)[\'"]', source):
            check_reference(ROOT / "index.html", ref, pages)
    json_files = sorted((ROOT / ".vscode").glob("*.json")) + sorted((ROOT / "brand-source").glob("*.json"))
    for path in json_files:
        try:
            json.loads(path.read_text(encoding="utf-8"), object_pairs_hook=unique_properties,
                       parse_constant=reject_constant)
        except (ValueError, OSError) as error:
            errors.append(f"{path.relative_to(ROOT)}: invalid JSON: {error}")
    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        print(f"\n{len(errors)} problem(s) found.")
        return 1
    print(f"PASS: {len(pages)} pages; HTML structure, labels/ARIA IDs, local references and casing, "
          "fragments, CSS/JS assets, and JSON checked.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
