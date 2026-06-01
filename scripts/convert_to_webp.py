"""Generate WebP versions of raster images in img/. Run: python scripts/convert_to_webp.py"""
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    raise SystemExit("Install Pillow: pip install Pillow")

IMG = Path(__file__).resolve().parent.parent / "img"
TARGETS = [
    ("before1.jpg", 82),
    ("before2.jpeg", 82),
    ("realtor.png", 85),
    ("after1.png", 85),
    ("after2.png", 85),
]

for name, quality in TARGETS:
    src = IMG / name
    if not src.exists():
        print("skip (missing):", name)
        continue
    dest = IMG / (src.stem + ".webp")
    im = Image.open(src)
    if im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGBA" if "A" in im.getbands() else "RGB")
    im.save(dest, "WEBP", quality=quality, method=6)
    print("created:", dest.name)
