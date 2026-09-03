#!/usr/bin/env python3
"""
Genere l'image de partage social (public/og-image.png).

Aucune dependance de rendu HTML/SVG n'est disponible sur les postes de build ;
Pillow est le chemin le plus simple pour produire un PNG 1200x630 aux couleurs
de l'app. A relancer si la charte (src/styles/tokens.css) ou le texte change :

    pip3 install --user Pillow
    python3 scripts/generate-og-image.py
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

WIDTH, HEIGHT = 1200, 630

# Repris de src/styles/tokens.css : ne pas diverger de la charte de l'app.
BG = "#0e1210"
PAPER = "#f2f0e8"
PAPER_DIM = "#a9b0a7"
LIME = "#d7ff3f"

FONT_DIR = Path("/usr/share/fonts/truetype/dejavu")
BOLD = FONT_DIR / "DejaVuSans-Bold.ttf"
REGULAR = FONT_DIR / "DejaVuSans.ttf"

EYEBROW = "PHASE 1 · SANS MATÉRIEL"
TITLE = "Ma séance"
TAGLINE = "Construis ton entraînement, ordonne les exercices, règle les pauses."
FOOTER = "kallly.github.io/SRCR"

PAD = 90


def wrap(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    words = text.split(" ")
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if draw.textlength(candidate, font=font) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def main() -> None:
    image = Image.new("RGB", (WIDTH, HEIGHT), BG)
    draw = ImageDraw.Draw(image)

    # Cercle d'accent discret, dans l'esprit du visuel de la page de couverture
    # du rapport (grand cercle plein hors-cadre), mais tres attenue.
    accent_radius = 420
    draw.ellipse(
        [WIDTH - accent_radius * 0.7, -accent_radius * 0.7, WIDTH + accent_radius * 0.7, accent_radius * 0.7],
        fill="#182a1f",
    )

    eyebrow_font = ImageFont.truetype(str(BOLD), 30)
    title_font = ImageFont.truetype(str(BOLD), 96)
    tagline_font = ImageFont.truetype(str(REGULAR), 34)
    footer_font = ImageFont.truetype(str(REGULAR), 26)

    y = PAD + 20
    draw.text((PAD, y), EYEBROW, font=eyebrow_font, fill=LIME)
    y += 70

    draw.text((PAD, y), TITLE, font=title_font, fill=PAPER)
    y += 130

    for line in wrap(draw, TAGLINE, tagline_font, WIDTH - 2 * PAD):
        draw.text((PAD, y), line, font=tagline_font, fill=PAPER_DIM)
        y += 48

    draw.text((PAD, HEIGHT - PAD), FOOTER, font=footer_font, fill=PAPER_DIM)

    out = Path(__file__).resolve().parent.parent / "public" / "og-image.png"
    image.save(out, "PNG", optimize=True)
    print(f"Ecrit : {out} ({out.stat().st_size} octets)")


if __name__ == "__main__":
    main()
