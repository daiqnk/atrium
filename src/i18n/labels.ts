import type { Locale } from './dictionaries';

/**
 * 标签（Badge / Tag / Chip）文案的单一来源。
 *
 * 之所以单独建一个文件：整站所有「状态 / 难度 / 平台 / 通用词」的文案
 * 只允许在这里改一次，避免同一状态在中英文、列表页与详情页里出现
 * 两种写法（例如「已上线」vs「上线」、「Coming soon」vs「Coming Soon」）。
 *
 * 新增一种标签值时的两步：
 *   1. 在下方对应的 map 里补 zh / en 两个值（缺一即编译期报错）
 *   2. 如需新配色，在 Badge.astro 的 TONE 里补一条
 */

/* ------------------------------------------------------------------ */
/* 通用单词                                                             */
/* ------------------------------------------------------------------ */

const WORDS = {
  zh: {
    view: '查看',
    minute: '分钟',
    featured: '精选',
    platform: '平台',
    series: '系列',
    status: '状态',
    difficulty: '难度',
    none: '未标注',
  },
  en: {
    view: 'View',
    minute: 'min',
    featured: 'Featured',
    platform: 'Platform',
    series: 'Series',
    status: 'Status',
    difficulty: 'Level',
    none: 'Unspecified',
  },
} as const;

export type WordKey = keyof (typeof WORDS)['zh'];

/**
 * 取一个通用单词的本地化文案。
 * 传入未知 key 时返回 '—' 而不是抛错，避免一个手误让整页 500。
 */
export function word(key: WordKey, locale: Locale): string {
  const table = WORDS[locale] ?? WORDS.zh;
  return (table as Record<string, string>)[key] ?? '—';
}

/* ------------------------------------------------------------------ */
/* App 状态                                                             */
/* ------------------------------------------------------------------ */

export type AppStatus = 'live' | 'coming-soon' | 'draft';

const STATUS: Record<AppStatus, { zh: string; en: string }> = {
  live: { zh: '已上线', en: 'Live' },
  'coming-soon': { zh: '即将上线', en: 'Coming soon' },
  draft: { zh: '开发中', en: 'In progress' },
};

/** 规范化任意输入为合法状态值，非法输入回落到 draft，永不返回 undefined */
export function normalizeStatus(input?: string | null): AppStatus {
  if (input === 'live' || input === 'coming-soon' || input === 'draft') return input;
  return 'draft';
}

export function statusLabel(status: string | undefined | null, locale: Locale): string {
  return STATUS[normalizeStatus(status)][locale];
}

/* ------------------------------------------------------------------ */
/* 练习难度                                                             */
/* ------------------------------------------------------------------ */

export type Difficulty = 'easy' | 'medium' | 'hard';

const DIFFICULTY: Record<Difficulty, { zh: string; en: string }> = {
  easy: { zh: '轻松上手', en: 'Easy' },
  medium: { zh: '需要一点专注', en: 'Moderate' },
  hard: { zh: '需要投入', en: 'Demanding' },
};

export function normalizeDifficulty(input?: string | null): Difficulty {
  if (input === 'easy' || input === 'medium' || input === 'hard') return input;
  return 'easy';
}

export function difficultyLabel(
  difficulty: string | undefined | null,
  locale: Locale,
): string {
  return DIFFICULTY[normalizeDifficulty(difficulty)][locale];
}

/* ------------------------------------------------------------------ */
/* 平台                                                                 */
/* ------------------------------------------------------------------ */

export type Platform = 'ios' | 'android' | 'web';

const PLATFORM: Record<Platform, { zh: string; en: string }> = {
  ios: { zh: 'iOS', en: 'iOS' },
  android: { zh: 'Android', en: 'Android' },
  web: { zh: '网页版', en: 'Web' },
};

/** 平台名是专有名词，中英一致；未知值原样输出，不做猜测 */
export function platformLabel(platform: string, locale: Locale): string {
  const key = platform as Platform;
  return PLATFORM[key]?.[locale] ?? platform;
}

export function normalizePlatforms(input?: string[] | null): Platform[] {
  if (!Array.isArray(input)) return [];
  return input.filter((p): p is Platform => p === 'ios' || p === 'android' || p === 'web');
}

/* ------------------------------------------------------------------ */
/* 日期                                                                 */
/* ------------------------------------------------------------------ */

const DATE_FORMAT: Record<Locale, Intl.DateTimeFormatOptions> = {
  zh: { year: 'numeric', month: 'long', day: 'numeric' },
  en: { year: 'numeric', month: 'short', day: 'numeric' },
};

/**
 * 统一日期格式：中文 2026年10月2日，英文 Oct 2, 2026
 * 传入非法日期时返回空字符串，避免页面出现 "Invalid Date"
 */
export function formatDate(date: Date | string | undefined | null, locale: Locale): string {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'zh-CN', DATE_FORMAT[locale]).format(d);
}

/**
 * 带占位符的文案替换：tpl('共 {n} 篇', { n: 3 }) → '共 3 篇'
 * 用于「共 N 篇 / N articles」这类计数文案，避免在页面里手写拼接。
 */
export function tpl(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ''));
}

/* ------------------------------------------------------------------ */
/* 配色：文案与颜色也集中管理，保证同一状态全站同色                        */
/* ------------------------------------------------------------------ */

export type Tone = 'live' | 'soon' | 'draft' | 'featured' | 'series' | 'neutral';

export function statusTone(status: string | undefined | null): Tone {
  const s = normalizeStatus(status);
  if (s === 'live') return 'live';
  if (s === 'coming-soon') return 'soon';
  return 'draft';
}

export function difficultyTone(difficulty: string | undefined | null): Tone {
  const d = normalizeDifficulty(difficulty);
  if (d === 'easy') return 'live';
  if (d === 'medium') return 'soon';
  return 'draft';
}
