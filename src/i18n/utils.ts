import { ui, navItems, a11y, type Locale } from './dictionaries';
import { stripBase } from '@/utils/paths';

/**
 * 通过 URL 路径解析当前语言
 * 规则：以 /en 开头视为英文，否则中文
 */
export function getLocaleFromUrl(url: URL): Locale {
  const pathname = stripBase(url.pathname);
  if (pathname.startsWith('/en')) return 'en';
  return 'zh';
}

/**
 * 根据当前 locale + 当前 path 字符串，构造另一语言的等价 URL
 * / → /en
 * /en → /
 * /apps → /en/apps
 * /en/apps → /apps
 * /knowledge/foo → /en/knowledge/foo
 */
export function getAlternateUrl(rawPathname: string, target: Locale): string {
  // 入参可以是带 base 的真实路径；内部统一按逻辑路径处理，返回逻辑路径（调用方自行 withBase）
  const pathname = stripBase(rawPathname);
  // 404 页没有对应语言版本，切换语言时回到目标语言首页
  if (/^\/(en\/)?404(\.html)?\/?$/.test(pathname)) return target === 'en' ? '/en' : '/';
  // 去掉前导斜杠方便处理
  const cleaned = pathname.replace(/^\/+/, '');
  // 是否当前是英文
  const isCurrentlyEn = cleaned.startsWith('en/') || cleaned === 'en';

  if (target === 'en') {
    if (isCurrentlyEn) return pathname; // 已在英文
    // 中文 去英中：/apps → /en/apps
    if (cleaned === '') return '/en';
    return `/en/${cleaned}`;
  } else {
    if (!isCurrentlyEn) return pathname; // 已在中文
    // 英文 去英中：/en/apps → /apps
    const stripped = cleaned.replace(/^en\/?/, '');
    if (stripped === '') return '/';
    return `/${stripped}`;
  }
}

/**
 * 取出「裸 slug」。
 *
 * Astro 4 的 content collection 中，放在子目录里的条目（如 `apps/zh/wilume.md`）
 * 其 entry.slug 会带上目录名，变成 `zh/wilume`。
 * 而我们的路由是 `/apps/wilume`，所以凡是要拼链接的地方都必须先过一遍这个函数，
 * 否则会生成 `/apps/zh/wilume` 这种 404 链接。
 */
export function bareSlug(slug: string): string {
  if (!slug) return slug;
  const parts = slug.split('/').filter(Boolean);
  return parts.length > 0 ? (parts[parts.length - 1] as string) : slug;
}

/**
 * 根据路径获取 UI 文案
 */
export function getDict(locale: Locale) {
  return ui[locale];
}

/**
 * 根据 locale 获取导航项
 */
export function getNav(locale: Locale) {
  return navItems[locale];
}

/**
 * 无障碍文案
 */
export function getA11y(locale: Locale) {
  return a11y[locale];
}

/**
 * 首页文案：所有面向首页的字段聚合在这里，便于调优
 */
export function getHomeDict(locale: Locale) {
  return ui[locale];
}