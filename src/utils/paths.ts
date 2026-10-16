/**
 * 部署子路径（GitHub Pages 项目站，如 https://daiqnk.github.io/atrium/）支持。
 *
 * 约定：站内代码一律写「逻辑路径」（不含 base，如 `/apps/wilume`），
 * 输出到 HTML 前用 withBase() 加上 base；读取 Astro.url.pathname 时用 stripBase() 去掉 base。
 * base 由 astro.config.mjs 的 `base` 决定（环境变量 SITE_BASE，默认 /atrium）。
 */
const RAW_BASE: string = import.meta.env.BASE_URL ?? '/';
/** 不带结尾斜杠的 base：'/atrium' 或 ''（根部署） */
export const BASE = RAW_BASE.replace(/\/+$/, '');

/** 逻辑路径 → 实际 URL 路径。外链、锚点、mailto 原样返回。 */
export function withBase(path: string): string {
  if (!path) return path;
  if (/^([a-z]+:|#|\/\/)/i.test(path)) return path;
  if (!path.startsWith('/')) return path;
  if (BASE && (path === BASE || path.startsWith(`${BASE}/`))) return path;
  if (path === '/') return BASE ? `${BASE}/` : '/';
  return `${BASE}${path}`;
}

/** 实际 URL 路径 → 逻辑路径 */
export function stripBase(pathname: string): string {
  if (BASE && (pathname === BASE || pathname.startsWith(`${BASE}/`))) {
    return pathname.slice(BASE.length) || '/';
  }
  return pathname || '/';
}

/** 逻辑路径 → 绝对 URL（用于 canonical / og / JSON-LD） */
export function absUrl(path: string, site: URL | string | undefined, fallbackOrigin: string): string {
  return new URL(withBase(path), site ?? fallbackOrigin).toString();
}
