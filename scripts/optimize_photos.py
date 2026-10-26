#!/usr/bin/env python3
"""Regenerate website photo copies. Optional editing tool; requires Pillow.

Run with: py scripts/optimize_photos.py
Original files are read only. No image tooling is required to serve the site.
"""
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
PHOTOS = (
    "home/formula-car-concept.webp",
    "home/team-with-chassis-blurred.png",
    "home/car-in-workshop.jpeg",
    "home/mechanical-chassis-cad.webp",
    "home/technical-workshop-grinding.webp",
    "home/business-team-planning.webp",
    "home/electrical-team-electronics.webp",
    "about/formula-car-tilt-test.webp",
    "about/mechanical-design-team.png",
    "about/chassis-welding.png",
    "about/business-laptop-blurred.png",
    "about/electrical-workbench.png",
    "about/student-cad-design.png",
    "about/students-reviewing-textbook.png",
    "contact/team-workshop-discussion.png",
    "sponsors/team-around-formula-car.webp",
)


def optimize():
    original_bytes = largest_bytes = 0
    for name in PHOTOS:
        source = ROOT / "assets/images" / name
        destination = source.parent / "optimized"
        destination.mkdir(exist_ok=True)
        with Image.open(source) as original:
            image = ImageOps.exif_transpose(original)
            image = image.convert("RGBA" if "A" in image.getbands() else "RGB")
            maximum = min(image.width, 1600)
            widths = sorted({min(width, maximum) for width in (480, 800, 1200, maximum)})
            for width in widths:
                height = round(image.height * width / image.width)
                copy = image.resize((width, height), Image.Resampling.LANCZOS)
                target = destination / f"{source.stem}-{width}.webp"
                copy.save(target, "WEBP", quality=82, method=6)
            size = target.stat().st_size
            original_bytes += source.stat().st_size
            largest_bytes += size
            print(f"{name}: {source.stat().st_size / 1024:.0f} KB -> {size / 1024:.0f} KB ({maximum}px)")
    print(f"Largest copies: {largest_bytes / 1024 / 1024:.2f} MiB vs {original_bytes / 1024 / 1024:.2f} MiB originals")


if __name__ == "__main__":
    optimize()
