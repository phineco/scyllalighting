"""Export reviewed catalogue crops and public product data, without source metadata.

Needs Pillow, pypdf and pdftoppm. The private manifest is never imported by the site.
Use --category to finish and review one category at a time.
"""
import argparse
import json
import logging
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageChops, ImageOps, ImageDraw
from pypdf import PdfReader

logging.getLogger("pypdf").setLevel(logging.ERROR)
parser = argparse.ArgumentParser()
parser.add_argument("--source", required=True, type=Path)
parser.add_argument("--cache", type=Path, default=Path(tempfile.gettempdir()) / "scylla-full-catalogue")
parser.add_argument("--category")
parser.add_argument("--review", action="store_true")
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
manifest = json.loads((root / "assets/catalogue-products.json").read_text())
args.cache.mkdir(parents=True, exist_ok=True)
reader = PdfReader(args.source)


def source_page(number):
    path = args.cache / f"page-{number:02d}.png"
    if not path.exists():
        page = reader.pages[number - 1]
        images = list(page.images)
        if len(images) == 1 and images[0].image.width > 1500:
            images[0].image.convert("RGB").save(path)
        else:
            subprocess.run(["pdftoppm", "-f", str(number), "-l", str(number),
                            "-scale-to", "2200", "-png", str(args.source),
                            str(args.cache / "page")], check=True, capture_output=True)
    return Image.open(path).convert("RGB")


def export_crop(crop, name, scene=False):
    source = source_page(crop["page"])
    ref = crop.get("ref", [1845, 1260] if crop["page"] < 39 or crop["page"] == 44 else [1920, 1311])
    x = source.width / ref[0]
    y = source.height / ref[1]
    box = crop["box"]
    assert len(box) == 4 and 0 <= box[0] < box[2] <= ref[0] and 0 <= box[1] < box[3] <= ref[1], (name, box)
    image = source.crop(tuple(round(v * (x if i % 2 == 0 else y)) for i, v in enumerate(box)))
    # Crop unrelated background fragments without altering any product pixels.
    for clear in crop.get("backgroundTrim", []):
        rect = [(clear[i] - box[i % 2]) * (x if i % 2 == 0 else y) for i in range(4)]
        ImageDraw.Draw(image).rectangle(tuple(round(v) for v in rect), fill="white")
    if scene:
        output = ImageOps.contain(image, (1400, 900), Image.Resampling.LANCZOS)
    else:
        diff = ImageChops.difference(image, Image.new("RGB", image.size, "white")).convert("L")
        bounds = diff.point(lambda v: 255 if v > 18 else 0).getbbox()
        if bounds:
            l, t, r, b = bounds
            image = image.crop((max(0, l - 10), max(0, t - 10), min(image.width, r + 10), min(image.height, b + 10)))
        image = ImageOps.contain(image, (670, 470), Image.Resampling.LANCZOS)
        output = Image.new("RGB", (800, 600), "white")
        output.paste(image, ((800 - image.width) // 2, (600 - image.height) // 2))
    path = root / "public/images/catalogue" / name
    path.parent.mkdir(parents=True, exist_ok=True)
    output.save(path, "WEBP", quality=91, method=6)
    return "/images/catalogue/" + name


products = []
scenes = []
ids = set()
for category in manifest["categories"]:
    selected = args.category is None or args.category == category["id"]
    for item in category["products"]:
        assert item["id"] not in ids, item["id"]
        ids.add(item["id"])
        image_path = "series/" + item["id"] + ".webp"
        if selected:
            export_crop(item["image"], image_path, item.get("applicationImage", False))
        views = []
        for index, view in enumerate(item.get("gallery", [])):
            name = f"series/{item['id']}-view-{index + 1}.webp"
            if selected:
                export_crop(view, name, view.get("scene", False))
            views.append({"src": "/images/catalogue/" + name, "altEn": view["alt"][0], "altZh": view["alt"][1]})
        products.append({
            "id": item["id"], "categoryId": category["id"],
            "titleEn": item["title"][0], "titleZh": item["title"][1],
            "descEn": item["description"][0], "descZh": item["description"][1],
            "spec": item["spec"], "variantsEn": item.get("variants", [[], []])[0],
            "variantsZh": item.get("variants", [[], []])[1],
            "image": "/images/catalogue/" + image_path,
            "applicationImage": item.get("applicationImage", False), "gallery": views,
        })
    for item in category.get("scenes", []):
        name = "scenes/" + item["id"] + ".webp"
        if selected:
            export_crop(item, name, True)
        scenes.append({"id": item["id"], "categoryId": category["id"],
                       "image": "/images/catalogue/" + name,
                       "titleEn": item["title"][0], "titleZh": item["title"][1]})
    if selected:
        print(category["id"], len(category["products"]), "series,", len(category.get("scenes", [])), "scenes")
        if args.review:
            paths = []
            for item in category["products"]:
                paths.append("series/" + item["id"] + ".webp")
                paths.extend(f"series/{item['id']}-view-{i + 1}.webp" for i in range(len(item.get("gallery", []))))
            paths.extend("scenes/" + item["id"] + ".webp" for item in category.get("scenes", []))
            for start in range(0, len(paths), 12):
                batch = paths[start:start + 12]
                sheet = Image.new("RGB", (1600, ((len(batch) + 3) // 4) * 330), "#dddddd")
                draw = ImageDraw.Draw(sheet)
                for i, name in enumerate(batch):
                    image = Image.open(root / "public/images/catalogue" / name)
                    image.thumbnail((390, 300))
                    x, y = (i % 4) * 400, (i // 4) * 330
                    sheet.paste(image, (x, y + 24))
                    draw.text((x + 5, y + 5), Path(name).stem, fill="black")
                sheet.save(args.cache / f"review-{category['id']}-{start // 12 + 1}.jpg")

public_data = {"products": products, "scenes": scenes}
serialized = json.dumps(public_data, ensure_ascii=False, indent=2) + "\n"
assert not any(word in serialized.lower() for word in ["shilin", "世林", "http://", "https://"])
(root / "src/content/catalogue-products.json").write_text(serialized)
print("Public data:", len(products), "series;", len(scenes), "scenes")
