"""Read public product listings and cache original image files for private review.

Does not publish images or change catalogue data. No cookies or credentials used.
"""
import argparse
import concurrent.futures
import hashlib
from html.parser import HTMLParser
import json
import re
from pathlib import Path
import subprocess
from urllib.parse import urljoin, urlparse, urlunparse

from PIL import Image, ImageDraw, ImageOps

parser = argparse.ArgumentParser()
parser.add_argument("--cache", required=True, type=Path)
parser.add_argument("--listing", required=True)
parser.add_argument("--details", help="Comma-separated observed product detail IDs to review")
args = parser.parse_args()
args.cache.mkdir(parents=True, exist_ok=True)


def retrieve(url, destination):
    if destination.exists() and destination.stat().st_size > 100:
        return True
    result = subprocess.run(["curl", "-sS", "-L", "--max-time", "35", "--fail", url,
                             "-o", str(destination)], capture_output=True)
    return result.returncode == 0


class Listing(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = set()
        self.products = {}
        self.detail = None

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "a":
            href = a.get("href", "")
            if href.startswith("/Products/p-"):
                self.links.add(href)
            self.detail = href if href.startswith("/Products_details/") else None
        if tag == "img" and self.detail:
            image = a.get("lazy", a.get("src", ""))
            if "/cms/image/" in image:
                p = self.products.setdefault(self.detail, {"page": self.detail, "title": a.get("alt", ""), "images": []})
                if image not in p["images"]:
                    p["images"].append(image)

    def handle_endtag(self, tag):
        if tag == "a":
            self.detail = None


products, visited = {}, set()
pending = {args.listing}
while pending:
    urls = sorted(pending - visited)
    if not urls:
        break
    assert len(visited) + len(urls) <= 35, "Unexpected pagination size; inspect before proceeding"
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        paths = {u: args.cache / (hashlib.sha256(u.encode()).hexdigest()[:16] + ".html") for u in urls}
        results = list(pool.map(lambda u: retrieve(u, paths[u]), urls))
    pending = set()
    for url, ok in zip(urls, results):
        visited.add(url)
        if not ok:
            print("Listing unavailable:", url, flush=True)
            continue
        listing = Listing()
        listing.feed(paths[url].read_text())
        products.update(listing.products)
        pending.update(urljoin(args.listing, p) for p in listing.links)
    print("Listings:", len(visited), "Products:", len(products), flush=True)

image_urls = sorted({u for p in products.values() for u in p["images"]})

if products:
    chosen = set(args.details.split(",")) if args.details else {Path(p["page"]).stem for p in products.values()}
    records = [p for p in products.values() if Path(p["page"]).stem in chosen]
    def detail_image(product):
        path = args.cache / ("detail-" + Path(product["page"]).stem + ".html")
        if not retrieve(urljoin(args.listing, product["page"]), path):
            return product
        class Meta(HTMLParser):
            def handle_starttag(self, tag, attrs):
                a = dict(attrs)
                if tag == "meta" and a.get("property") == "og:image":
                    product["original"] = a.get("content")
        m = Meta()
        m.feed(path.read_text())
        # The same public CDN query is emitted by the page's Open Graph image.
        # Keep gallery paths from actual page markup, never guessed product IDs.
        gallery = re.search(r'<ul[^>]*class="[^"]*thumbnail_box[^\"]*"[^>]*>(.*?)</ul>', path.read_text(), re.S)
        product["gallery"] = []
        if gallery and product.get("original"):
            class Gallery(HTMLParser):
                def handle_starttag(self, tag, attrs):
                    a = dict(attrs)
                    if tag == "img" and a.get("lazy"):
                        original = urlparse(product["original"])
                        image = urlparse(a["lazy"])
                        if image.hostname == "omo-oss-image.thefastimg.com":
                            image = image._replace(netloc=original.netloc, query=original.query)
                        product["gallery"].append({"url": urlunparse(image), "name": a.get("alt", "")})
            Gallery().feed(gallery.group(1))
        return product
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        records = list(pool.map(detail_image, records))
    products = {p["page"]: p for p in records}
    image_urls = sorted({p["original"] for p in records if p.get("original")})
    image_urls = sorted(set(image_urls) | {v["url"] for p in records for v in p.get("gallery", [])})
    print("Observed detail images:", len(image_urls), flush=True)


def fetch_image(source):
    parsed = urlparse(source)
    # The page's og:image confirms this public image-service alias and same path.
    if parsed.hostname == "omo-oss-image.thefastimg.com":
        parsed = parsed._replace(netloc="omo-oss-image1.thefastimg.com")
    url = urlunparse(parsed)
    stem = hashlib.sha256(source.encode()).hexdigest()[:20]
    path = args.cache / (stem + ".image")
    if not retrieve(url, path):
        return source, {"error": "download_failed", "retrievedFrom": url}
    try:
        with Image.open(path) as im:
            return source, {"file": str(path), "width": im.width, "height": im.height,
                            "format": im.format, "bytes": path.stat().st_size, "retrievedFrom": url}
    except Exception:
        return source, {"error": "not_an_image", "retrievedFrom": url}


with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    images = dict(pool.map(fetch_image, image_urls))
records = sorted(products.values(), key=lambda p: int(Path(p["page"]).stem))
(args.cache / "inventory.json").write_text(json.dumps({"listings": sorted(visited), "products": records, "images": images}, ensure_ascii=False, indent=2))
print("Original images:", sum("file" in i for i in images.values()), "/", len(images), flush=True)
for start in range(0, len(records), 20):
    batch = records[start:start + 20]
    sheet = Image.new("RGB", (1600, ((len(batch) + 3) // 4) * 290), "#eeeeee")
    draw = ImageDraw.Draw(sheet)
    for index, product in enumerate(batch):
        x, y = index % 4 * 400, index // 4 * 290
        draw.text((x + 8, y + 5), Path(product["page"]).stem + " " + product["title"][:48], fill="black")
        info = images.get(product.get("original", product["images"][0]), {})
        if "file" in info:
            source_image = Image.open(info["file"]).convert("RGBA")
            composite = Image.new("RGBA", source_image.size, "white")
            composite.alpha_composite(source_image)
            im = ImageOps.contain(composite.convert("RGB"), (390, 250))
            sheet.paste(im, (x + (400 - im.width) // 2, y + 25))
            draw.text((x + 8, y + 273), f'{info["width"]} x {info["height"]} {info["format"]}', fill="black")
    sheet.save(args.cache / f"review-{start // 20 + 1}.jpg")
