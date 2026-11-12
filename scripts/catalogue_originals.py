"""Publish reviewed originals without resizing, cropping or lossy re-encoding."""
import argparse
import hashlib
import json
from pathlib import Path
import struct

from PIL import Image


def without_metadata(data):
    if data.startswith(b"\x89PNG\r\n\x1a\n"):
        result = data[:8]
        offset = 8
        while offset < len(data):
            size = struct.unpack(">I", data[offset:offset + 4])[0]
            kind = data[offset + 4:offset + 8]
            chunk = data[offset:offset + size + 12]
            assert len(chunk) == size + 12, "Truncated PNG"
            if kind not in {b"tEXt", b"iTXt", b"zTXt", b"eXIf", b"iCCP", b"tIME"}:
                result += chunk
            offset += size + 12
        return result
    if data.startswith(b"\xff\xd8"):
        result, offset = data[:2], 2
        while offset < len(data):
            assert data[offset] == 255, "Invalid JPEG marker"
            marker = data[offset + 1]
            if marker in {0xDA, 0xD9}:
                return result + data[offset:]
            size = int.from_bytes(data[offset + 2:offset + 4], "big")
            segment = data[offset:offset + size + 2]
            if marker not in {0xE1, 0xE2, 0xED, 0xFE}:
                result += segment
            offset += size + 2
        raise ValueError("Incomplete JPEG")
    raise ValueError("Only original PNG/JPEG files are supported")


def apply_originals(root, public_data, cache):
    manifest_path = root / "assets/product-originals.json"
    if not manifest_path.exists():
        return public_data
    manifest = json.loads(manifest_path.read_text())
    by_id = {p["id"]: p for p in public_data["products"]}
    for item in by_id.values():
        item.setdefault("imageWidth", 800)
        item.setdefault("imageHeight", 600)
        item.setdefault("originalImage", False)
        for view in item["gallery"]:
            view.setdefault("width", 800)
            view.setdefault("height", 600)
            view.setdefault("originalImage", False)
    category_images = []

    def publish(source, stem):
        cached = cache / source["file"]
        extension = ".png" if source["format"] == "PNG" else ".jpg"
        relative = "images/products/originals/" + stem + extension
        target = root / "public" / relative
        if cached.exists():
            raw = cached.read_bytes()
            assert hashlib.sha256(raw).hexdigest() == source["sha256"], "Source changed: " + stem
            cleaned = without_metadata(raw)
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(cleaned)
            with Image.open(cached) as original, Image.open(target) as published:
                assert original.size == published.size
                assert original.convert("RGBA").tobytes() == published.convert("RGBA").tobytes(), "Pixels changed: " + stem
        elif not target.exists():
            raise FileNotFoundError("Original cache is missing; retrieve the reviewed source first: " + stem)
        with Image.open(target) as image:
            return {"src": "/" + relative, "width": image.width, "height": image.height}

    for record in manifest["series"]:
        item = by_id[record["id"]]
        primary = publish(record["primary"], record["id"])
        item.update(image=primary["src"], imageWidth=primary["width"], imageHeight=primary["height"], originalImage=True)
        if not record.get("familyReference"):
            item["descEn"] = item["descEn"].replace(" Image is an A60 family reference.", "")
            item["descZh"] = item["descZh"].replace(" 图片为 A60 同系列示意。", "")
        if record.get("familyReference"):
            for language in ["En", "Zh"]:
                text = " Image is a product-family reference." if language == "En" else " 图片为同系列示意。"
                if "family reference" not in item["desc" + language] and "示意" not in item["desc" + language]:
                    item["desc" + language] += text
        if "gallery" in record:
            item["gallery"] = [{**publish(view, record["id"] + "-view-" + str(i + 1)),
                                "altEn": view["alt"][0], "altZh": view["alt"][1], "originalImage": True}
                               for i, view in enumerate(record["gallery"])]
        if record.get("categoryRepresentative"):
            category_images.append({"categoryId": item["categoryId"], **primary})
    public_data["categoryImages"] = category_images
    return public_data


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--cache", required=True, type=Path)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    path = root / "src/content/catalogue-products.json"
    data = apply_originals(root, json.loads(path.read_text()), args.cache)
    serialized = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
    assert not any(s in serialized.lower() for s in ["shilin", "世林", "thefastimg", "http://", "https://"])
    path.write_text(serialized)
    print("Published originals for", sum(p.get("originalImage", False) for p in data["products"]), "series")
