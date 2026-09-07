#!/usr/bin/env python3
"""
Genere les images du site : partage social et favicons.

  public/og-image.png         1200x630, carte de partage
  public/apple-touch-icon.png 180x180, ecran d'accueil iOS
  public/favicon.ico          fallback navigateurs anciens

public/favicon.svg est ecrit a la main (net a toute taille) et n'est pas
regenere ici. Aucune dependance de rendu HTML/SVG n'etant disponible, Pillow
est le chemin le plus simple. A relancer si la charte (src/styles/tokens.css)
ou le texte change. Debian empeche l'installation directe (PEP 668) :

    python3 -m venv .venv && .venv/bin/pip install Pillow
    .venv/bin/python scripts/generate-og-image.py
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
FOOTER = "cirkali.fr"

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


def draw_mark(size: int) -> Image.Image:
    """Anneau de progression du chrono, meme motif que public/favicon.svg."""
    # On dessine 4x plus grand puis on reduit : Pillow ne lisse pas les arcs.
    scale = 4
    box = size * scale
    image = Image.new("RGB", (box, box), BG)
    draw = ImageDraw.Draw(image)

    stroke = box // 9
    margin = box // 5
    bounds = [margin, margin, box - margin, box - margin]

    draw.ellipse(bounds, outline="#2b352e", width=stroke)
    # Arc partiel : ~75% du tour, demarre en haut comme dans l'app.
    draw.arc(bounds, start=-90, end=180, fill=LIME, width=stroke)

    return image.resize((size, size), Image.LANCZOS)


def write_favicons(public: Path) -> None:
    apple = draw_mark(180)
    apple.save(public / "apple-touch-icon.png", "PNG", optimize=True)
    print(f"Ecrit : {public / 'apple-touch-icon.png'}")

    ico = public / "favicon.ico"
    draw_mark(64).save(ico, "ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print(f"Ecrit : {ico}")


def write_og_image(public: Path) -> None:
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

    out = public / "og-image.png"
    image.save(out, "PNG", optimize=True)
    print(f"Ecrit : {out} ({out.stat().st_size} octets)")


def main() -> None:
    public = Path(__file__).resolve().parent.parent / "public"
    write_og_image(public)
    write_favicons(public)


if __name__ == "__main__":
    main()
