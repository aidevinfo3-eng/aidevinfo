"""Crawl-based SEO audit for aidevinfo.online.

Checks the issues tracked in "AI DEV issues fixing.xlsx":
canonical tags, H1 presence, duplicate meta keywords, title/description
lengths, title == H1, image alt text, image width/height attributes,
parametric URLs and broken internal links.

Usage:
    python scripts/seo-audit.py [base_url]
"""

import html
import io
import re
import sys
import urllib.error
import urllib.request
from collections import Counter, defaultdict

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

BASE = (sys.argv[1] if len(sys.argv) > 1 else "https://aidevinfo.online").rstrip("/")
# Canonicals always point at production, even when auditing a local build.
CANONICAL_ORIGIN = "https://aidevinfo.online"
UA = "Mozilla/5.0 (compatible; seo-audit/1.0)"

CATEGORY_SLUGS = [
    "ai-chatbots",
    "ai-writing",
    "image-generation",
    "video-generation",
    "ai-coding",
    "productivity",
    "voice-ai",
    "business-ai",
    "marketing",
    "automation",
]

STATIC_PATHS = [
    "/",
    "/services",
    "/development-services",
    "/blogs",
    "/about",
    "/contact",
    "/advertising",
    "/advertising-policy",
    "/privacy-policy",
    "/terms",
]

DEV_SERVICE_SLUGS = [
    "ai-agent-development",
    "ai-chatbot-development",
    "ai-automation",
    "ai-consulting",
    "ai-saas-development",
    "custom-gpt-solutions",
    "llm-integration",
    "rag-applications",
]

TOOL_SLUGS = [
    "chatgpt",
    "claude",
    "gemini",
    "perplexity",
    "midjourney",
    "dall-e-3",
    "stable-diffusion",
    "firefly",
    "notion-ai",
    "copy-ai",
    "jasper",
]

BLOG_SLUGS = [
    "machine-learning-vs-deep-learning-vs-ai-development",
    "ai-development-lifecycle",
    "history-and-evolution-of-ai-development",
    "how-ai-models-are-built",
    "ai-for-finance",
    "30-ai-automation-examples",
    "artificial-intelligence-in-marketing",
    "enterprise-ai-agents",
    "artificial-intelligence-guide",
    "latest-ai-technology-news",
    "use-ai-to-boost-your-marketing",
    "ai-content-workflows",
    "ai-tools-used-in-food-technology",
    "ai-model-management",
    "ai-app-development-process",
    "ai-agent-development",
    "top-ai-tools-for-coding",
    "best-free-ai-app-builder",
    "what-is-ai-development",
    "ai-tools-for-data-analysis",
    "best-ai-productivity-tools",
    "ai-for-marketing",
    "ai-development-services",
    "perplexity-vs-chatgpt",
    "best-ai-application-development-platforms",
    "best-free-ai-tools-for-marketing",
    "how-clearly-ai-understands-your-business",
    "ai-search-evaluates-your-brand",
]


def all_paths():
    paths = list(STATIC_PATHS)
    paths += [f"/services/{s}" for s in CATEGORY_SLUGS]
    paths += [f"/services/{s}" for s in TOOL_SLUGS]
    paths += [f"/development-services/{s}" for s in DEV_SERVICE_SLUGS]
    paths += [f"/blog/{s}" for s in BLOG_SLUGS]
    return paths


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=45) as resp:
            return resp.status, resp.geturl(), resp.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", "replace") if exc.fp else ""
        return exc.code, url, body
    except Exception as exc:  # noqa: BLE001
        return 0, url, f"ERROR: {exc}"


def meta(doc, name):
    m = re.search(
        r'<meta[^>]+name="%s"[^>]+content="([^"]*)"' % name, doc, re.I
    ) or re.search(r'<meta[^>]+content="([^"]*)"[^>]+name="%s"' % name, doc, re.I)
    return html.unescape(m.group(1)) if m else None


def canonical(doc):
    m = re.search(r'<link[^>]+rel="canonical"[^>]+href="([^"]*)"', doc, re.I) or re.search(
        r'<link[^>]+href="([^"]*)"[^>]+rel="canonical"', doc, re.I
    )
    return html.unescape(m.group(1)) if m else None


def title(doc):
    m = re.search(r"<title>(.*?)</title>", doc, re.I | re.S)
    return html.unescape(m.group(1)).strip() if m else None


def strip_tags(fragment):
    return html.unescape(re.sub(r"<[^>]+>", "", fragment)).strip()


def h1s(doc):
    return [strip_tags(m) for m in re.findall(r"<h1\b[^>]*>(.*?)</h1>", doc, re.I | re.S)]


def imgs(doc):
    """Return (src, alt-or-None, has_width, has_height, is_hidden) per <img>."""
    out = []
    for tag in re.findall(r"<img\b[^>]*>", doc, re.I):
        src = re.search(r'\bsrc="([^"]*)"', tag)
        alt = re.search(r'\balt="([^"]*)"', tag)
        out.append(
            (
                html.unescape(src.group(1)) if src else "",
                html.unescape(alt.group(1)) if alt else None,
                bool(re.search(r'\bwidth="[^"]*"', tag)),
                bool(re.search(r'\bheight="[^"]*"', tag)),
                bool(re.search(r'\baria-hidden(=|\s|>)', tag)),
            )
        )
    return out


def internal_links(doc):
    return {html.unescape(h) for h in re.findall(r'href="(/[^"#]*)"', doc)}


def main():
    print(f"SEO AUDIT — {BASE}\n" + "=" * 78)

    pages = {}
    for path in all_paths():
        status, final, doc = fetch(BASE + path)
        pages[path] = {"status": status, "final": final, "doc": doc}

    fail = defaultdict(list)

    # ---- 1. status codes -------------------------------------------------
    for path, p in pages.items():
        if p["status"] != 200:
            fail["Non-200 pages"].append(f"{path} -> {p['status']}")

    ok = {k: v for k, v in pages.items() if v["status"] == 200}

    # ---- 2. canonical ----------------------------------------------------
    for path, p in ok.items():
        c = canonical(p["doc"])
        expected = CANONICAL_ORIGIN + path
        if not c:
            fail["Missing canonical"].append(path)
        elif c.rstrip("/") != expected.rstrip("/"):
            fail["Non self-referencing canonical"].append(f"{path} -> {c}")

    # ---- 3. H1 -----------------------------------------------------------
    for path, p in ok.items():
        found = h1s(p["doc"])
        if not found:
            fail["Missing H1"].append(path)
        elif len(found) > 1:
            fail["Multiple H1"].append(f"{path} ({len(found)})")

    # ---- 4. meta keywords duplication ------------------------------------
    kw = Counter()
    for path, p in ok.items():
        k = meta(p["doc"], "keywords")
        if k:
            kw[k] += 1
    for value, count in kw.items():
        if count > 1:
            fail["Duplicate meta keywords"].append(f"{count} pages share: {value[:70]}...")

    # ---- 5. title / description ------------------------------------------
    titles = Counter()
    descs = Counter()
    for path, p in ok.items():
        t = title(p["doc"]) or ""
        d = meta(p["doc"], "description") or ""
        titles[t] += 1
        descs[d] += 1
        if not t:
            fail["Missing title"].append(path)
        elif len(t) > 60:
            fail["Title over 60 chars"].append(f"{path} ({len(t)}) {t}")
        if not d:
            fail["Missing description"].append(path)
        elif len(d) > 160:
            fail["Description over 160 chars"].append(f"{path} ({len(d)})")
        elif len(d) < 70:
            fail["Description under 70 chars"].append(f"{path} ({len(d)})")
        found = h1s(p["doc"])
        if found and t and t.strip().lower() == found[0].strip().lower():
            fail["Title identical to H1"].append(f"{path} :: {t}")

    for value, count in titles.items():
        if count > 1 and value:
            fail["Duplicate titles"].append(f"{count}x {value}")
    for value, count in descs.items():
        if count > 1 and value:
            fail["Duplicate descriptions"].append(f"{count}x {value[:60]}...")

    # ---- 6. images: alt + size -------------------------------------------
    missing_alt = set()
    missing_size = set()
    for path, p in ok.items():
        for src, alt, has_w, has_h, hidden in imgs(p["doc"]):
            if not src:
                continue
            if (alt is None or alt.strip() == "") and not hidden:
                missing_alt.add(src)
            if not (has_w and has_h):
                missing_size.add(src)
    for src in sorted(missing_alt):
        fail["Images missing alt text"].append(src[:110])
    for src in sorted(missing_size):
        fail["Images missing width/height"].append(src[:110])

    # ---- 7. parametric URLs ----------------------------------------------
    for slug in CATEGORY_SLUGS:
        status, final, doc = fetch(f"{BASE}/services?category={slug}")
        if status == 200 and "?category=" in final:
            fail["Parametric URL still served"].append(f"/services?category={slug}")
        clean = pages.get(f"/services/{slug}")
        if not clean or clean["status"] != 200:
            fail["Category path URL not working"].append(f"/services/{slug}")

    # ---- 8. broken internal links ----------------------------------------
    link_sources = defaultdict(set)
    for path, p in ok.items():
        for link in internal_links(p["doc"]):
            link_sources[link].add(path)
    checked = {}
    for link in sorted(link_sources):
        if link.startswith(("/_next/", "/api/", "/admin")):
            continue
        base_link = link.split("?")[0]
        if base_link in checked:
            status = checked[base_link]
        else:
            status, _, _ = fetch(BASE + link)
            checked[base_link] = status
        if status >= 400:
            srcs = ", ".join(sorted(link_sources[link])[:4])
            fail["Broken internal links"].append(f"{link} ({status}) from: {srcs}")

    # ---- report ----------------------------------------------------------
    order = [
        "Non-200 pages",
        "Missing canonical",
        "Non self-referencing canonical",
        "Missing H1",
        "Multiple H1",
        "Duplicate meta keywords",
        "Missing title",
        "Title over 60 chars",
        "Title identical to H1",
        "Duplicate titles",
        "Missing description",
        "Description over 160 chars",
        "Description under 70 chars",
        "Duplicate descriptions",
        "Images missing alt text",
        "Images missing width/height",
        "Parametric URL still served",
        "Category path URL not working",
        "Broken internal links",
    ]

    total = 0
    print(f"\nPages crawled: {len(pages)} (200 OK: {len(ok)})\n")
    for key in order:
        items = fail.get(key, [])
        mark = "PASS" if not items else "FAIL"
        print(f"[{mark}] {key}: {len(items)}")
        for item in items[:30]:
            print(f"        - {item}")
        if len(items) > 30:
            print(f"        ... and {len(items) - 30} more")
        total += len(items)

    print("\n" + "=" * 78)
    print(f"TOTAL ISSUES: {total}")
    return 0 if total == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
