"""
生成社交分享图（og-cover.png，1200×630）

为什么用脚本而不是 AI 生图：
  - 品牌图需要和站点色板严格一致（#FAF7F2 / #F4C2C2 / #C5D2B5 / #2F2418），
    AI 生图无法保证色值，和 CSS 里的颜色对不上
  - 文字必须准确（不能出现错字），AI 生图的中文基本都会变形
  - 不消耗生图额度

改文案 / 改配色：直接改下面的常量后重跑
    python scripts/gen_og_image.py
"""

from PIL import Image, ImageDraw, ImageFilter, ImageFont
import math
import os

# ---------- 画布 ----------
W, H = 1200, 630
S = 2  # 超采样倍数，最后缩回 1x 获得抗锯齿

# ---------- 色板（与 tailwind.config.mjs 严格一致） ----------
CREAM_50 = (250, 247, 242)
CREAM_100 = (245, 240, 232)
CREAM_200 = (235, 228, 214)
ROSE_50 = (252, 243, 241)
ROSE_100 = (244, 194, 194)
ROSE_200 = (224, 191, 184)
ROSE_300 = (201, 162, 158)
SAGE_100 = (197, 210, 181)
SAGE_300 = (122, 142, 106)
INK_900 = (47, 36, 24)
INK_800 = (74, 60, 46)
INK_700 = (92, 74, 62)

# ---------- 文案 ----------
TITLE = "心庭"
SUBTITLE = "温和的科学，陪你看清自己"
SUBTITLE_EN = "Gentle science, to see yourself clearly"
PILLS = ["App 矩阵", "心理学知识", "日常调适"]

FONT_DIR = os.path.join(os.environ.get("WINDIR", r"C:\Windows"), "Fonts")
REGULAR = os.path.join(FONT_DIR, "msyh.ttc")
BOLD = os.path.join(FONT_DIR, "msyhbd.ttc")

OUT = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "public", "og-cover.png"
)


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size * S)


def brand_mark(d: ImageDraw.ImageDraw, cx: float, cy: float, r: float) -> None:
    """品牌标记：柔粉圆底 + 深褐笑脸（与站点 favicon / Header 同一套造型）"""
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=ROSE_200 + (255,))
    # 笑脸：一条正圆弧，避免手画贝塞尔出错
    arc_r = r * 0.46
    d.arc(
        [cx - arc_r, cy - arc_r * 0.55, cx + arc_r, cy + arc_r * 1.45],
        start=20,
        end=160,
        fill=INK_900 + (255,),
        width=max(2, int(r * 0.1)),
    )
    eye_r = r * 0.115
    for ex in (cx - r * 0.36, cx + r * 0.36):
        d.ellipse([ex - eye_r, cy - r * 0.34 - eye_r, ex + eye_r, cy - r * 0.34 + eye_r],
                  fill=INK_900 + (255,))


def main() -> None:
    img = Image.new("RGB", (W * S, H * S), CREAM_50)

    # --- 背景纵向渐变（米白 → 浅米） ---
    d = ImageDraw.Draw(img, "RGBA")
    for y in range(H * S):
        t = y / (H * S)
        c = tuple(round(CREAM_50[i] + (CREAM_100[i] - CREAM_50[i]) * t) for i in range(3))
        d.line([(0, y), (W * S, y)], fill=c)

    # --- 柔光：只保留很淡的玫瑰色，避免大面积绿调发黄 ---
    glow = Image.new("RGBA", (W * S, H * S), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([-260 * S, -300 * S, 460 * S, 300 * S], fill=ROSE_100 + (120,))
    gd.ellipse([820 * S, 340 * S, 1360 * S, 860 * S], fill=ROSE_50 + (170,))
    gd.ellipse([380 * S, -220 * S, 820 * S, 120 * S], fill=ROSE_200 + (70,))
    glow = glow.filter(ImageFilter.GaussianBlur(120 * S))
    img = Image.alpha_composite(img.convert("RGBA"), glow)
    d = ImageDraw.Draw(img, "RGBA")

    # --- 品牌区 ---
    cx, cy, r = 122 * S, 116 * S, 44 * S
    brand_mark(d, cx, cy, r)

    tx = cx + 72 * S
    d.text((tx, cy - 40 * S), TITLE, font=font(BOLD, 56), fill=INK_900 + (255,))
    d.text((tx + 2 * S, cy + 20 * S), SUBTITLE, font=font(REGULAR, 28), fill=INK_700 + (255,))
    d.text((tx + 2 * S, cy + 60 * S), SUBTITLE_EN, font=font(REGULAR, 19),
           fill=INK_700 + (135,))

    # --- 三个内容标签 ---
    pill_font = font(REGULAR, 25)
    ph = 52 * S
    gap = 18 * S
    widths = [d.textlength(p, font=pill_font) + 58 * S for p in PILLS]
    total = sum(widths) + gap * (len(PILLS) - 1)
    x = (W * S - total) / 2
    y = 392 * S
    for label, pw in zip(PILLS, widths):
        d.rounded_rectangle([x, y, x + pw, y + ph], radius=ph // 2,
                            fill=(255, 255, 255, 215), outline=CREAM_200 + (255,), width=2 * S)
        tw = d.textlength(label, font=pill_font)
        d.text((x + (pw - tw) / 2, y + 12 * S), label, font=pill_font, fill=INK_800 + (255,))
        x += pw + gap

    out = img.convert("RGB").resize((W, H), Image.LANCZOS)
    out.save(OUT, "PNG", optimize=True)
    print(f"已生成 {os.path.abspath(OUT)}  {out.size[0]}x{out.size[1]}")


if __name__ == "__main__":
    main()
