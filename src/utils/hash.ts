/**
 * 把字符串转成 0..1 区间的稳定哈希（用于按 slug 生成稳定的颜色/角度等）
 */
export function hashToUnit(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return (Math.abs(h) % 1000) / 1000;
}

/**
 * 系列 → 默认双色调色板（HEX）
 * 用户在 frontmatter 写 `accentColor` 时可覆盖
 */
const SERIES_PALETTES: Record<string, [string, string, string]> = {
  微光: ['#FCF3F1', '#F4C2C2', '#9CAF88'],
  Gleam: ['#FCF3F1', '#F4C2C2', '#9CAF88'],
  时间: ['#F5F0E8', '#E0BFB8', '#C9A29E'],
  Time: ['#F5F0E8', '#E0BFB8', '#C9A29E'],
};

const FALLBACK_PALETTE: [string, string, string] = ['#FCF3F1', '#F4C2C2', '#9CAF88'];

export function getPalette(series: string | undefined): [string, string, string] {
  if (series && SERIES_PALETTES[series]) return SERIES_PALETTES[series];
  return FALLBACK_PALETTE;
}

export function getAccentColor(series: string | undefined, override?: string): string {
  if (override) return override;
  const [, , accent] = getPalette(series);
  return accent;
}